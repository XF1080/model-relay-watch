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

// Unified usage record from any tool
type usageRecord struct {
	AppType             string // "claude" or "codex"
	Model               string
	InputTokens         int64
	OutputTokens        int64
	CacheReadTokens     int64
	CacheCreationTokens int64
	Timestamp           time.Time
}

// Response types
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

// Model pricing: [input, output] per million tokens
var modelPricing = map[string][2]float64{
	"claude-opus-4-6":            {15, 75},
	"claude-opus-4-5-20251101":   {5, 25},
	"claude-sonnet-4-6":          {3, 15},
	"claude-sonnet-4-5-20250929": {3, 15},
	"claude-haiku-4-5-20251001":  {1, 5},
	"claude-opus-4-20250514":     {15, 75},
	"claude-opus-4-1-20250805":   {15, 75},
	"claude-sonnet-4-20250514":   {3, 15},
	"gpt-5.4":                    {2.5, 10},
	"gpt-5.4-xhigh":             {2.5, 10},
	"gpt-5.3-codex":             {2.5, 10},
	"gpt-5.2-codex":             {2.5, 10},
	"gpt-5":                     {2.5, 10},
	"gpt-5.1":                   {2.5, 10},
	"gpt-5.2":                   {2.5, 10},
}

func estimateCost(model string, inTok, outTok, cacheRead, cacheWrite int64) float64 {
	p, ok := modelPricing[model]
	if !ok {
		for k, v := range modelPricing {
			if strings.HasPrefix(model, k) {
				p = v
				ok = true
				break
			}
		}
		if !ok {
			p = [2]float64{3, 15}
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

	// Collect records from both tools
	var records []usageRecord

	// 1) Claude Code: ~/.claude/projects/**/*.jsonl
	claudeDir := filepath.Join(home, ".claude", "projects")
	if info, err := os.Stat(claudeDir); err == nil && info.IsDir() {
		filepath.Walk(claudeDir, func(path string, fi os.FileInfo, err error) error {
			if err != nil || fi.IsDir() || !strings.HasSuffix(path, ".jsonl") {
				return nil
			}
			if fi.ModTime().Before(since) {
				return nil
			}
			recs, _ := parseClaudeJSONL(path, since)
			records = append(records, recs...)
			return nil
		})
	}

	// 2) Codex: ~/.codex/sessions/**/*.jsonl
	codexDir := filepath.Join(home, ".codex", "sessions")
	if info, err := os.Stat(codexDir); err == nil && info.IsDir() {
		filepath.Walk(codexDir, func(path string, fi os.FileInfo, err error) error {
			if err != nil || fi.IsDir() || !strings.HasSuffix(path, ".jsonl") {
				return nil
			}
			if fi.ModTime().Before(since) {
				return nil
			}
			recs, _ := parseCodexJSONL(path, since)
			records = append(records, recs...)
			return nil
		})
	}

	if len(records) == 0 {
		return &TokenStatsResponse{}, nil
	}

	sort.Slice(records, func(i, j int) bool {
		return records[i].Timestamp.Before(records[j].Timestamp)
	})

	// Aggregate
	var summary TokenStatsSummary
	summary.TotalRequests = len(records)

	type groupModelKey struct{ appType, model string }
	modelAgg := make(map[groupModelKey]*TokenStatsModel)
	appTypes := make(map[string]bool)

	for _, r := range records {
		summary.TotalInputTokens += r.InputTokens
		summary.TotalOutputTokens += r.OutputTokens
		summary.TotalCacheRead += r.CacheReadTokens
		summary.TotalCacheWrite += r.CacheCreationTokens
		appTypes[r.AppType] = true

		k := groupModelKey{r.AppType, r.Model}
		agg, ok := modelAgg[k]
		if !ok {
			agg = &TokenStatsModel{Model: r.Model}
			modelAgg[k] = agg
		}
		agg.InputTokens += r.InputTokens
		agg.OutputTokens += r.OutputTokens
		agg.CacheReadTokens += r.CacheReadTokens
		agg.CacheWriteTokens += r.CacheCreationTokens
		agg.Requests++
	}
	summary.TotalTokens = summary.TotalInputTokens + summary.TotalOutputTokens +
		summary.TotalCacheRead + summary.TotalCacheWrite

	for _, agg := range modelAgg {
		agg.TotalCostUsd = estimateCost(agg.Model, agg.InputTokens, agg.OutputTokens, agg.CacheReadTokens, agg.CacheWriteTokens)
		summary.TotalCostUsd += agg.TotalCostUsd
	}

	// Build groups
	groupOrder := []struct{ key, label string }{
		{"claude", "Claude Code"},
		{"codex", "Codex"},
	}
	var groups []TokenStatsGroup
	for _, g := range groupOrder {
		if !appTypes[g.key] {
			continue
		}
		grp := TokenStatsGroup{AppType: g.key, Label: g.label}
		for k, agg := range modelAgg {
			if k.appType != g.key {
				continue
			}
			total := agg.InputTokens + agg.OutputTokens + agg.CacheReadTokens + agg.CacheWriteTokens
			if total == 0 {
				continue
			}
			grp.Models = append(grp.Models, *agg)
			grp.TotalIn += agg.InputTokens
			grp.TotalOut += agg.OutputTokens
			grp.TotalCost += agg.TotalCostUsd
			grp.Requests += agg.Requests
		}
		sort.Slice(grp.Models, func(i, j int) bool {
			ti := grp.Models[i].InputTokens + grp.Models[i].OutputTokens + grp.Models[i].CacheReadTokens + grp.Models[i].CacheWriteTokens
			tj := grp.Models[j].InputTokens + grp.Models[j].OutputTokens + grp.Models[j].CacheReadTokens + grp.Models[j].CacheWriteTokens
			return ti > tj
		})
		if len(grp.Models) > 0 {
			groups = append(groups, grp)
		}
	}

	// Timeline
	var timeline []TokenStatsTimeline
	var bucketSec int64
	var timeFmt string
	switch timeRange {
	case "30d":
		bucketSec = 86400
		timeFmt = "01-02"
	case "7d":
		bucketSec = 21600
		timeFmt = "01-02 15:04"
	default:
		bucketSec = 3600
		timeFmt = "15:04"
	}
	sinceU := since.Unix()
	nowU := now.Unix()
	bStart := (sinceU / bucketSec) * bucketSec
	bEnd := ((nowU / bucketSec) + 1) * bucketSec
	buckets := make(map[int64]*TokenStatsTimeline)
	for ts := bStart; ts < bEnd; ts += bucketSec {
		buckets[ts] = &TokenStatsTimeline{Time: time.Unix(ts, 0).Format(timeFmt)}
	}
	for _, r := range records {
		bk := (r.Timestamp.Unix() / bucketSec) * bucketSec
		if b, ok := buckets[bk]; ok {
			b.InputT += r.InputTokens + r.CacheReadTokens + r.CacheCreationTokens
			b.OutputT += r.OutputTokens
			b.Requests++
			b.CostUsd += estimateCost(r.Model, r.InputTokens, r.OutputTokens, r.CacheReadTokens, r.CacheCreationTokens)
		}
	}
	for ts := bStart; ts < bEnd; ts += bucketSec {
		if b, ok := buckets[ts]; ok {
			timeline = append(timeline, *b)
		}
	}

	return &TokenStatsResponse{
		Summary:  summary,
		Groups:   groups,
		Timeline: timeline,
	}, nil
}

// ── Claude Code JSONL parser ──
func parseClaudeJSONL(path string, since time.Time) ([]usageRecord, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	var records []usageRecord
	scanner := bufio.NewScanner(f)
	scanner.Buffer(make([]byte, 5*1024*1024), 5*1024*1024)

	for scanner.Scan() {
		line := scanner.Bytes()
		if !strings.Contains(string(line), `"assistant"`) {
			continue
		}
		var entry struct {
			Type      string `json:"type"`
			Timestamp string `json:"timestamp"`
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
		if strings.HasPrefix(entry.Message.Model, "<") {
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
		records = append(records, usageRecord{
			AppType:             "claude",
			Model:               entry.Message.Model,
			InputTokens:         jsonInt64(u, "input_tokens"),
			OutputTokens:        jsonInt64(u, "output_tokens"),
			CacheReadTokens:     jsonInt64(u, "cache_read_input_tokens"),
			CacheCreationTokens: jsonInt64(u, "cache_creation_input_tokens"),
			Timestamp:           ts,
		})
	}
	return records, nil
}

// ── Codex JSONL parser ──
// Codex sessions: ~/.codex/sessions/YYYY/MM/DD/rollout-*.jsonl
// Model comes from "turn_context" events, tokens from "token_count" events.
func parseCodexJSONL(path string, since time.Time) ([]usageRecord, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	var records []usageRecord
	scanner := bufio.NewScanner(f)
	scanner.Buffer(make([]byte, 5*1024*1024), 5*1024*1024)

	currentModel := ""

	for scanner.Scan() {
		line := scanner.Bytes()
		lineStr := string(line)

		// Track current model from turn_context
		if strings.Contains(lineStr, `"turn_context"`) {
			var tc struct {
				Timestamp string `json:"timestamp"`
				Type      string `json:"type"`
				Payload   struct {
					Model string `json:"model"`
				} `json:"payload"`
			}
			if json.Unmarshal(line, &tc) == nil && tc.Type == "turn_context" && tc.Payload.Model != "" {
				currentModel = tc.Payload.Model
			}
			continue
		}

		// Parse token_count events
		if !strings.Contains(lineStr, `"token_count"`) {
			continue
		}
		var ev struct {
			Timestamp string `json:"timestamp"`
			Type      string `json:"type"`
			Payload   struct {
				Type string `json:"type"`
				Info *struct {
					LastTokenUsage struct {
						InputTokens          int64 `json:"input_tokens"`
						CachedInputTokens    int64 `json:"cached_input_tokens"`
						OutputTokens         int64 `json:"output_tokens"`
						ReasoningOutputTokens int64 `json:"reasoning_output_tokens"`
					} `json:"last_token_usage"`
				} `json:"info"`
			} `json:"payload"`
		}
		if json.Unmarshal(line, &ev) != nil {
			continue
		}
		if ev.Payload.Type != "token_count" || ev.Payload.Info == nil {
			continue
		}

		ts, err := time.Parse(time.RFC3339Nano, ev.Timestamp)
		if err != nil {
			ts, err = time.Parse("2006-01-02T15:04:05.000Z", ev.Timestamp)
			if err != nil {
				continue
			}
		}
		if ts.Before(since) {
			continue
		}

		u := ev.Payload.Info.LastTokenUsage
		model := currentModel
		if model == "" {
			model = "unknown"
		}

		records = append(records, usageRecord{
			AppType:         "codex",
			Model:           model,
			InputTokens:     u.InputTokens,
			OutputTokens:    u.OutputTokens + u.ReasoningOutputTokens,
			CacheReadTokens: u.CachedInputTokens,
			Timestamp:       ts,
		})
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
