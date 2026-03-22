package service

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"
)

// Parsed from Claude Code JSONL assistant messages
type ccUsageRecord struct {
	Model               string
	InputTokens         int64
	OutputTokens        int64
	CacheReadTokens     int64
	CacheCreationTokens int64
	Timestamp           time.Time
	Project             string
	SessionID           string
}

// Response types (shared with frontend)
type TokenStatsSummary struct {
	TotalInputTokens  int64   `json:"total_input_tokens"`
	TotalOutputTokens int64   `json:"total_output_tokens"`
	TotalCacheRead    int64   `json:"total_cache_read"`
	TotalCacheWrite   int64   `json:"total_cache_write"`
	TotalTokens       int64   `json:"total_tokens"`
	TotalRequests     int     `json:"total_requests"`
	TotalCostUsd      float64 `json:"total_cost_usd"`
}

type TokenStatsModel struct {
	Model            string  `json:"model"`
	InputTokens      int64   `json:"input_tokens"`
	OutputTokens     int64   `json:"output_tokens"`
	CacheReadTokens  int64   `json:"cache_read_tokens"`
	CacheWriteTokens int64   `json:"cache_write_tokens"`
	Requests         int     `json:"requests"`
	TotalCostUsd     float64 `json:"total_cost_usd"`
}

type TokenStatsGroup struct {
	AppType   string            `json:"app_type"`
	Label     string            `json:"label"`
	Models    []TokenStatsModel `json:"models"`
	TotalIn   int64             `json:"total_in"`
	TotalOut  int64             `json:"total_out"`
	TotalCost float64           `json:"total_cost"`
	Requests  int               `json:"requests"`
}

type TokenStatsTimeline struct {
	Time     string  `json:"time"`
	InputT   int64   `json:"input"`
	OutputT  int64   `json:"output"`
	Requests int     `json:"requests"`
	CostUsd  float64 `json:"cost"`
}

type TokenStatsResponse struct {
	Summary  TokenStatsSummary    `json:"summary"`
	Groups   []TokenStatsGroup    `json:"groups"`
	Timeline []TokenStatsTimeline `json:"timeline"`
}

// Model pricing (hardcoded for common Claude models, $/million tokens)
var modelPricing = map[string][2]float64{
	// [input, output] per million tokens
	"claude-opus-4-6":              {15, 75},
	"claude-opus-4-5-20251101":     {5, 25},
	"claude-sonnet-4-6":            {3, 15},
	"claude-sonnet-4-5-20250929":   {3, 15},
	"claude-haiku-4-5-20251001":    {1, 5},
	"claude-opus-4-20250514":       {15, 75},
	"claude-opus-4-1-20250805":     {15, 75},
	"claude-sonnet-4-20250514":     {3, 15},
}

func estimateCost(model string, inTok, outTok, cacheRead, cacheWrite int64) float64 {
	p, ok := modelPricing[model]
	if !ok {
		// Try prefix match
		for k, v := range modelPricing {
			if strings.HasPrefix(model, k) {
				p = v
				ok = true
				break
			}
		}
		if !ok {
			p = [2]float64{3, 15} // default to sonnet pricing
		}
	}
	inCost := float64(inTok) * p[0] / 1_000_000
	outCost := float64(outTok) * p[1] / 1_000_000
	cacheRCost := float64(cacheRead) * p[0] * 0.1 / 1_000_000
	cacheWCost := float64(cacheWrite) * p[0] * 1.25 / 1_000_000
	return inCost + outCost + cacheRCost + cacheWCost
}

func GetClaudeTokenStats(timeRange string) (*TokenStatsResponse, error) {
	home, err := os.UserHomeDir()
	if err != nil {
		return nil, fmt.Errorf("无法获取用户目录: %w", err)
	}

	projectsDir := filepath.Join(home, ".claude", "projects")
	if _, err := os.Stat(projectsDir); os.IsNotExist(err) {
		return nil, fmt.Errorf("未找到 Claude Code 数据目录: %s", projectsDir)
	}

	// Time boundary
	var since time.Time
	now := time.Now()
	switch timeRange {
	case "7d":
		since = now.Add(-7 * 24 * time.Hour)
	case "30d":
		since = now.Add(-30 * 24 * time.Hour)
	default:
		since = now.Add(-24 * time.Hour)
	}

	// Scan all JSONL files
	var records []ccUsageRecord
	err = filepath.Walk(projectsDir, func(path string, info os.FileInfo, err error) error {
		if err != nil || info.IsDir() || !strings.HasSuffix(path, ".jsonl") {
			return nil
		}
		// Skip files not modified since 'since' (optimization)
		if info.ModTime().Before(since) {
			return nil
		}
		// Extract project name from directory
		rel, _ := filepath.Rel(projectsDir, path)
		parts := strings.SplitN(filepath.ToSlash(rel), "/", 2)
		project := parts[0]

		recs, _ := parseJSONLFile(path, since)
		for i := range recs {
			recs[i].Project = project
		}
		records = append(records, recs...)
		return nil
	})
	if err != nil {
		return nil, fmt.Errorf("扫描日志目录失败: %w", err)
	}

	// Sort by timestamp
	sort.Slice(records, func(i, j int) bool {
		return records[i].Timestamp.Before(records[j].Timestamp)
	})

	// Build summary
	var summary TokenStatsSummary
	summary.TotalRequests = len(records)

	// Group by model
	modelAgg := make(map[string]*TokenStatsModel)
	for _, r := range records {
		summary.TotalInputTokens += r.InputTokens
		summary.TotalOutputTokens += r.OutputTokens
		summary.TotalCacheRead += r.CacheReadTokens
		summary.TotalCacheWrite += r.CacheCreationTokens

		agg, ok := modelAgg[r.Model]
		if !ok {
			agg = &TokenStatsModel{Model: r.Model}
			modelAgg[r.Model] = agg
		}
		agg.InputTokens += r.InputTokens
		agg.OutputTokens += r.OutputTokens
		agg.CacheReadTokens += r.CacheReadTokens
		agg.CacheWriteTokens += r.CacheCreationTokens
		agg.Requests++
	}
	summary.TotalTokens = summary.TotalInputTokens + summary.TotalOutputTokens +
		summary.TotalCacheRead + summary.TotalCacheWrite

	// Compute costs
	for _, agg := range modelAgg {
		agg.TotalCostUsd = estimateCost(agg.Model, agg.InputTokens, agg.OutputTokens, agg.CacheReadTokens, agg.CacheWriteTokens)
		summary.TotalCostUsd += agg.TotalCostUsd
	}

	// Build single group "Claude Code" with models sorted by total tokens desc
	var models []TokenStatsModel
	for _, agg := range modelAgg {
		models = append(models, *agg)
	}
	sort.Slice(models, func(i, j int) bool {
		ti := models[i].InputTokens + models[i].OutputTokens + models[i].CacheReadTokens + models[i].CacheWriteTokens
		tj := models[j].InputTokens + models[j].OutputTokens + models[j].CacheReadTokens + models[j].CacheWriteTokens
		return ti > tj
	})

	var groups []TokenStatsGroup
	if len(models) > 0 {
		g := TokenStatsGroup{
			AppType: "claude", Label: "Claude Code",
			Models: models,
		}
		for _, m := range models {
			g.TotalIn += m.InputTokens
			g.TotalOut += m.OutputTokens
			g.TotalCost += m.TotalCostUsd
			g.Requests += m.Requests
		}
		groups = append(groups, g)
	}

	// Build timeline
	var timeline []TokenStatsTimeline
	if len(records) > 0 {
		var bucketDur time.Duration
		var timeFmt string
		switch timeRange {
		case "30d":
			bucketDur = 24 * time.Hour
			timeFmt = "01-02"
		case "7d":
			bucketDur = 6 * time.Hour
			timeFmt = "01-02 15:04"
		default:
			bucketDur = time.Hour
			timeFmt = "15:04"
		}

		bucketSec := int64(bucketDur.Seconds())
		sinceUnix := since.Unix()
		nowUnix := now.Unix()
		bucketStart := (sinceUnix / bucketSec) * bucketSec
		bucketEnd := ((nowUnix / bucketSec) + 1) * bucketSec

		buckets := make(map[int64]*TokenStatsTimeline)
		for ts := bucketStart; ts < bucketEnd; ts += bucketSec {
			t := time.Unix(ts, 0)
			buckets[ts] = &TokenStatsTimeline{Time: t.Format(timeFmt)}
		}

		for _, r := range records {
			bk := (r.Timestamp.Unix() / bucketSec) * bucketSec
			b, ok := buckets[bk]
			if !ok {
				continue
			}
			b.InputT += r.InputTokens + r.CacheReadTokens + r.CacheCreationTokens
			b.OutputT += r.OutputTokens
			b.Requests++
			b.CostUsd += estimateCost(r.Model, r.InputTokens, r.OutputTokens, r.CacheReadTokens, r.CacheCreationTokens)
		}

		for ts := bucketStart; ts < bucketEnd; ts += bucketSec {
			if b, ok := buckets[ts]; ok {
				timeline = append(timeline, *b)
			}
		}
	}

	return &TokenStatsResponse{
		Summary:  summary,
		Groups:   groups,
		Timeline: timeline,
	}, nil
}

func parseJSONLFile(path string, since time.Time) ([]ccUsageRecord, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	var records []ccUsageRecord
	scanner := bufio.NewScanner(f)
	scanner.Buffer(make([]byte, 5*1024*1024), 5*1024*1024) // 5MB per line

	for scanner.Scan() {
		line := scanner.Bytes()

		// Quick filter: only parse assistant messages with usage
		if !strings.Contains(string(line), `"assistant"`) {
			continue
		}

		var entry struct {
			Type      string `json:"type"`
			Timestamp string `json:"timestamp"`
			SessionID string `json:"sessionId"`
			Message   struct {
				Model string         `json:"model"`
				Usage map[string]any `json:"usage"`
			} `json:"message"`
		}
		if err := json.Unmarshal(line, &entry); err != nil {
			continue
		}
		if entry.Type != "assistant" || entry.Message.Usage == nil || entry.Message.Model == "" {
			continue
		}

		ts, err := time.Parse(time.RFC3339Nano, entry.Timestamp)
		if err != nil {
			ts, err = time.Parse("2006-01-02T15:04:05.000Z", entry.Timestamp)
			if err != nil {
				continue
			}
		}
		if ts.Before(since) {
			continue
		}

		u := entry.Message.Usage
		r := ccUsageRecord{
			Model:               entry.Message.Model,
			InputTokens:         jsonInt64(u, "input_tokens"),
			OutputTokens:        jsonInt64(u, "output_tokens"),
			CacheReadTokens:     jsonInt64(u, "cache_read_input_tokens"),
			CacheCreationTokens: jsonInt64(u, "cache_creation_input_tokens"),
			Timestamp:           ts,
			SessionID:           entry.SessionID,
		}
		records = append(records, r)
	}
	return records, nil
}

func jsonInt64(m map[string]any, key string) int64 {
	v, ok := m[key]
	if !ok {
		return 0
	}
	switch n := v.(type) {
	case float64:
		return int64(n)
	case int64:
		return n
	default:
		return 0
	}
}
