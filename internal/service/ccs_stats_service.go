package service

import (
	"bufio"
	"encoding/json"
	"fmt"
	"model-monitor/internal/model"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"
)

// Unified usage record from any tool
type usageRecord struct {
	AppType             string // "claude" or "codex"
	APISource           string // "anthropic", "openai", "openai-responses", "proxy", "unknown"
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
	DisplayName      string  `json:"display_name"`
	Provider         string  `json:"provider"`   // anthropic, openai, google, zhipu, minimax, moonshot, other
	APISource        string  `json:"api_source"`  // anthropic, openai, openai-responses, proxy, unknown
	InputTokens      int64   `json:"input_tokens"`
	OutputTokens     int64   `json:"output_tokens"`
	CacheReadTokens  int64   `json:"cache_read_tokens"`
	CacheWriteTokens int64   `json:"cache_write_tokens"`
	Requests         int     `json:"requests"`
	TotalCostUsd     float64 `json:"total_cost_usd"`
	PriceIn          float64 `json:"price_in"`  // $/M input
	PriceOut         float64 `json:"price_out"` // $/M output
}

type TokenStatsGroup struct {
	AppType        string            `json:"app_type"`
	Label          string            `json:"label"`
	APISource      string            `json:"api_source,omitempty"`
	APISourceLabel string            `json:"api_source_label,omitempty"`
	Models         []TokenStatsModel `json:"models"`
	TotalIn        int64             `json:"total_in"`
	TotalOut       int64             `json:"total_out"`
	TotalCost      float64           `json:"total_cost"`
	Requests       int               `json:"requests"`
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

// Official model pricing from provider websites ($/million tokens)
// [input, output, cache_read_ratio, cache_write_ratio]
// cache_read_ratio: multiplier on input price for cached reads (e.g. 0.1 = 10% of input)
// cache_write_ratio: multiplier on input price for cache creation (e.g. 1.25 = 125% of input)
type modelPrice struct {
	In, Out, CacheReadRatio, CacheWriteRatio float64
}

// Sources:
//   Anthropic: https://docs.anthropic.com/en/docs/about-claude/pricing
//   OpenAI:    https://openai.com/api/pricing/
//   Google:    https://ai.google.dev/gemini-api/docs/pricing
var officialPricing = map[string]modelPrice{
	// ── Anthropic Claude (cache: read 0.1x, write 1.25x) ──
	"claude-opus-4-6":            {5, 25, 0.1, 1.25},
	"claude-opus-4-5":            {5, 25, 0.1, 1.25},
	"claude-sonnet-4-6":          {3, 15, 0.1, 1.25},
	"claude-sonnet-4-5":          {3, 15, 0.1, 1.25},
	"claude-haiku-4-5":           {1, 5, 0.1, 1.25},
	"claude-opus-4-1":            {15, 75, 0.1, 1.25},
	"claude-opus-4":              {15, 75, 0.1, 1.25},
	"claude-sonnet-4":            {3, 15, 0.1, 1.25},
	"claude-3-5-sonnet":          {3, 15, 0.1, 1.25},
	"claude-3-5-haiku":           {0.8, 4, 0.1, 1.25},
	// ── OpenAI GPT-5.x (cache: 90% off input = 0.1x) ──
	"gpt-5.4":                    {2.5, 15, 0.1, 0},
	"gpt-5.4-pro":                {30, 180, 0.1, 0},
	"gpt-5.4-mini":               {0.4, 1.6, 0.1, 0},
	"gpt-5.3-codex":              {1.75, 14, 0.1, 0},
	"gpt-5.2-codex":              {1.75, 14, 0.1, 0},
	"gpt-5.2":                    {1.75, 14, 0.1, 0},
	"gpt-5.1-codex":              {1.25, 10, 0.1, 0},
	"gpt-5.1":                    {1.25, 10, 0.1, 0},
	"gpt-5-codex":                {1.25, 10, 0.1, 0},
	"gpt-5":                      {1.25, 10, 0.1, 0},
	// ── Google Gemini (cache: read 0.1x, no write cost) ──
	"gemini-2.5-pro":             {1.25, 10, 0.1, 0},
	"gemini-2.5-flash":           {0.30, 2.5, 0.1, 0},
	"gemini-3-pro":               {1.25, 10, 0.1, 0},
	"gemini-3-flash":             {0.30, 2.5, 0.1, 0},
}

func lookupPrice(modelName string) modelPrice {
	// Check custom pricing from DB first
	var custom model.ModelPricing
	if err := model.DB.Where("model_key = ?", modelName).First(&custom).Error; err == nil {
		return modelPrice{custom.InputPrice, custom.OutputPrice, custom.CacheReadRatio, custom.CacheWriteRatio}
	}
	// Try prefix match in custom pricing
	var allCustom []model.ModelPricing
	model.DB.Find(&allCustom)
	for _, cp := range allCustom {
		if strings.HasPrefix(modelName, cp.ModelKey) {
			return modelPrice{cp.InputPrice, cp.OutputPrice, cp.CacheReadRatio, cp.CacheWriteRatio}
		}
	}

	// Fall back to official pricing
	if p, ok := officialPricing[modelName]; ok {
		return p
	}
	// Try prefix match: "claude-opus-4-6-20260206" -> "claude-opus-4-6"
	for prefix, p := range officialPricing {
		if strings.HasPrefix(modelName, prefix) {
			return p
		}
	}
	// Heuristic by model name keywords
	ml := strings.ToLower(modelName)
	switch {
	case strings.Contains(ml, "opus"):
		return modelPrice{5, 25, 0.1, 1.25}
	case strings.Contains(ml, "sonnet"):
		return modelPrice{3, 15, 0.1, 1.25}
	case strings.Contains(ml, "haiku"):
		return modelPrice{1, 5, 0.1, 1.25}
	case strings.Contains(ml, "gpt-5"):
		return modelPrice{2.5, 15, 0.1, 0}
	case strings.Contains(ml, "gemini"):
		return modelPrice{1.25, 10, 0.1, 0}
	default:
		return modelPrice{3, 15, 0.1, 1.25} // default sonnet-level
	}
}

// GetOfficialPricing returns the built-in official pricing table
func GetOfficialPricing() map[string]modelPrice {
	return officialPricing
}

type OfficialPricingItem struct {
	ModelKey        string  `json:"model_key"`
	InputPrice      float64 `json:"input_price"`
	OutputPrice     float64 `json:"output_price"`
	CacheReadRatio  float64 `json:"cache_read_ratio"`
	CacheWriteRatio float64 `json:"cache_write_ratio"`
}

func ListOfficialPricing() []OfficialPricingItem {
	var items []OfficialPricingItem
	for k, p := range officialPricing {
		items = append(items, OfficialPricingItem{
			ModelKey:        k,
			InputPrice:      p.In,
			OutputPrice:     p.Out,
			CacheReadRatio:  p.CacheReadRatio,
			CacheWriteRatio: p.CacheWriteRatio,
		})
	}
	sort.Slice(items, func(i, j int) bool { return items[i].ModelKey < items[j].ModelKey })
	return items
}

func estimateCost(modelName string, inTok, outTok, cacheRead, cacheWrite int64) float64 {
	p := lookupPrice(modelName)
	inCost := float64(inTok) * p.In / 1_000_000
	outCost := float64(outTok) * p.Out / 1_000_000
	cacheRCost := float64(cacheRead) * p.In * p.CacheReadRatio / 1_000_000
	cacheWCost := float64(cacheWrite) * p.In * p.CacheWriteRatio / 1_000_000
	return inCost + outCost + cacheRCost + cacheWCost
}

func cleanModelName(model string) string {
	// model is already normalized (lowercase, no provider prefix)
	switch {
	case strings.HasPrefix(model, "claude-opus-4-6"):
		return "Claude Opus 4.6"
	case strings.HasPrefix(model, "claude-opus-4-5"):
		return "Claude Opus 4.5"
	case strings.HasPrefix(model, "claude-opus-4-1"):
		return "Claude Opus 4.1"
	case strings.HasPrefix(model, "claude-opus-4"):
		return "Claude Opus 4"
	case strings.HasPrefix(model, "claude-4.6-sonnet"):
		return "Claude Sonnet 4.6"
	case strings.HasPrefix(model, "claude-sonnet-4-6"), strings.HasPrefix(model, "claude-sonnet-4.6"):
		return "Claude Sonnet 4.6"
	case strings.HasPrefix(model, "claude-sonnet-4-5"):
		return "Claude Sonnet 4.5"
	case strings.HasPrefix(model, "claude-sonnet-4"):
		return "Claude Sonnet 4"
	case strings.HasPrefix(model, "claude-haiku-4-5"):
		return "Claude Haiku 4.5"
	case strings.HasPrefix(model, "gpt-5.4-pro"):
		return "GPT-5.4 Pro"
	case strings.HasPrefix(model, "gpt-5.4-mini"):
		return "GPT-5.4 Mini"
	case strings.HasPrefix(model, "gpt-5.4"):
		return "GPT-5.4"
	case strings.HasPrefix(model, "gpt-5.3-codex"):
		return "GPT-5.3 Codex"
	case strings.HasPrefix(model, "gpt-5.2-codex"):
		return "GPT-5.2 Codex"
	case strings.HasPrefix(model, "gpt-5.2"):
		return "GPT-5.2"
	case strings.HasPrefix(model, "gpt-5.1-codex"):
		return "GPT-5.1 Codex"
	case strings.HasPrefix(model, "gpt-5.1"):
		return "GPT-5.1"
	case strings.HasPrefix(model, "gpt-5-codex"):
		return "GPT-5 Codex"
	case strings.HasPrefix(model, "gpt-5"):
		return "GPT-5"
	case strings.HasPrefix(model, "gemini-2.5-pro"):
		return "Gemini 2.5 Pro"
	case strings.HasPrefix(model, "gemini-2.5-flash"):
		return "Gemini 2.5 Flash"
	case strings.HasPrefix(model, "glm-5"), strings.HasPrefix(model, "glm5"):
		return "GLM-5"
	case strings.HasPrefix(model, "minimax-m2.5"):
		return "MiniMax-M2.5"
	case strings.HasPrefix(model, "minimax-m2"):
		return "MiniMax-M2"
	case strings.HasPrefix(model, "kimi-k2"):
		return "Kimi-K2"
	default:
		return model
	}
}

// normalizeModel strips provider prefix, normalizes case, filters invalid names.
// Returns empty string for invalid models.
func normalizeModel(raw string) string {
	m := strings.TrimSpace(raw)
	if m == "" || strings.HasPrefix(m, "<") {
		return ""
	}
	// Filter obviously invalid names
	ml := strings.ToLower(m)
	if ml == "model" || ml == "unknown" || ml == "test" {
		return ""
	}
	// Strip provider prefix: "anthropic/claude-sonnet-4.6" → "claude-sonnet-4.6"
	if idx := strings.LastIndex(ml, "/"); idx >= 0 {
		ml = ml[idx+1:]
	}
	// Strip trailing parenthesized variants: "gpt-5.4(xhigh)" → "gpt-5.4-xhigh"
	ml = strings.ReplaceAll(ml, "(", "-")
	ml = strings.TrimRight(ml, ")")
	return ml
}

// detectProvider determines the API provider from the normalized model name
func detectProvider(model string) string {
	switch {
	case strings.HasPrefix(model, "claude"):
		return "anthropic"
	case strings.HasPrefix(model, "gpt-"), strings.HasPrefix(model, "o1"), strings.HasPrefix(model, "o3"), strings.HasPrefix(model, "o4"):
		return "openai"
	case strings.HasPrefix(model, "gemini"):
		return "google"
	case strings.HasPrefix(model, "glm"):
		return "zhipu"
	case strings.HasPrefix(model, "minimax"):
		return "minimax"
	case strings.HasPrefix(model, "kimi"):
		return "moonshot"
	case strings.HasPrefix(model, "deepseek"):
		return "deepseek"
	case strings.HasPrefix(model, "qwen"):
		return "alibaba"
	default:
		return "other"
	}
}

// detectAPISource determines the API source from message ID format
func detectAPISource(msgID string) string {
	switch {
	case strings.HasPrefix(msgID, "msg_"):
		return "anthropic"
	case strings.HasPrefix(msgID, "chatcmpl-"):
		return "openai"
	case strings.HasPrefix(msgID, "resp_"):
		return "openai-responses"
	case len(msgID) == 32:
		allHex := true
		for _, c := range msgID {
			if !((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F')) {
				allHex = false
				break
			}
		}
		if allHex {
			return "proxy"
		}
		return "unknown"
	default:
		return "unknown"
	}
}

// apiSourceLabel returns a human-readable label for an API source
func apiSourceLabel(src string) string {
	switch src {
	case "anthropic":
		return "Anthropic API"
	case "openai":
		return "OpenAI 兼容"
	case "openai-responses":
		return "OpenAI Responses"
	case "proxy":
		return "代理/网关"
	default:
		return "其他"
	}
}

func sortModels(models []TokenStatsModel) {
	providerOrder := map[string]int{
		"anthropic": 0, "openai": 1, "google": 2, "deepseek": 3,
		"zhipu": 4, "minimax": 5, "moonshot": 6, "alibaba": 7, "other": 8,
	}
	sort.Slice(models, func(i, j int) bool {
		pi := providerOrder[models[i].Provider]
		pj := providerOrder[models[j].Provider]
		if pi != pj {
			return pi < pj
		}
		ti := models[i].InputTokens + models[i].OutputTokens + models[i].CacheReadTokens + models[i].CacheWriteTokens
		tj := models[j].InputTokens + models[j].OutputTokens + models[j].CacheReadTokens + models[j].CacheWriteTokens
		return ti > tj
	})
}

func GetClaudeTokenStats(timeRange string, startStr, endStr string) (*TokenStatsResponse, error) {
	home, err := os.UserHomeDir()
	if err != nil {
		return nil, fmt.Errorf("无法获取用户目录: %w", err)
	}

	var since time.Time
	var until time.Time
	now := time.Now()

	if startStr != "" {
		// Custom date range
		parsed, err := time.ParseInLocation("2006-01-02", startStr, time.Local)
		if err != nil {
			return nil, fmt.Errorf("invalid start date: %w", err)
		}
		since = parsed
		if endStr != "" {
			parsed, err := time.ParseInLocation("2006-01-02", endStr, time.Local)
			if err != nil {
				return nil, fmt.Errorf("invalid end date: %w", err)
			}
			until = parsed.Add(24*time.Hour - time.Second) // end of day
		}
		// Determine bucket size from custom range span
		days := now.Sub(since).Hours() / 24
		if !until.IsZero() {
			days = until.Sub(since).Hours() / 24
		}
		timeRange = "custom"
		_ = days // used below for timeline bucketing
	} else {
		switch timeRange {
		case "7d":
			since = now.Add(-7 * 24 * time.Hour)
		case "30d":
			since = now.Add(-30 * 24 * time.Hour)
		case "90d":
			since = now.Add(-90 * 24 * time.Hour)
		case "all":
			since = time.Time{} // zero time = no filter
		default:
			since = now.Add(-24 * time.Hour)
		}
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

	// Filter by end date if custom range
	if !until.IsZero() {
		filtered := records[:0]
		for _, r := range records {
			if !r.Timestamp.After(until) {
				filtered = append(filtered, r)
			}
		}
		records = filtered
		if len(records) == 0 {
			return &TokenStatsResponse{}, nil
		}
	}

	sort.Slice(records, func(i, j int) bool {
		return records[i].Timestamp.Before(records[j].Timestamp)
	})

	// Aggregate by app_type + display_name (merge across API sources)
	var summary TokenStatsSummary
	summary.TotalRequests = len(records)

	type groupModelKey struct{ appType, displayName string }
	modelAgg := make(map[groupModelKey]*TokenStatsModel)
	appTypes := make(map[string]bool)

	for _, r := range records {
		summary.TotalInputTokens += r.InputTokens
		summary.TotalOutputTokens += r.OutputTokens
		summary.TotalCacheRead += r.CacheReadTokens
		summary.TotalCacheWrite += r.CacheCreationTokens
		appTypes[r.AppType] = true

		dn := cleanModelName(r.Model)
		k := groupModelKey{r.AppType, dn}
		agg, ok := modelAgg[k]
		if !ok {
			p := lookupPrice(r.Model)
			agg = &TokenStatsModel{Model: r.Model, DisplayName: dn, Provider: detectProvider(r.Model), PriceIn: p.In, PriceOut: p.Out}
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

	// Build groups — one group per tool
	groupOrder := []struct{ key, label string }{
		{"claude", "Claude Code"},
		{"codex", "Codex"},
		{"gemini", "Gemini CLI"},
		{"opencode", "OpenCode"},
		{"openclaw", "OpenClaw"},
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
		sortModels(grp.Models)
		if len(grp.Models) > 0 {
			groups = append(groups, grp)
		}
	}

	// Timeline
	var timeline []TokenStatsTimeline
	var bucketSec int64
	var timeFmt string
	switch timeRange {
	case "custom":
		// Determine bucket size from span
		span := now.Sub(since)
		if !until.IsZero() {
			span = until.Sub(since)
		}
		days := span.Hours() / 24
		if days <= 1 {
			bucketSec = 3600
			timeFmt = "15:04"
		} else if days <= 7 {
			bucketSec = 21600
			timeFmt = "01-02 15:04"
		} else {
			bucketSec = 86400
			timeFmt = "01-02"
		}
	case "90d", "all":
		bucketSec = 86400
		timeFmt = "01-02"
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
	endU := now.Unix()
	if !until.IsZero() {
		endU = until.Unix()
	}
	bStart := (sinceU / bucketSec) * bucketSec
	bEnd := ((endU / bucketSec) + 1) * bucketSec
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
				ID    string         `json:"id"`
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
		modelName := normalizeModel(entry.Message.Model)
		if modelName == "" {
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
		inTok := jsonInt64(u, "input_tokens")
		outTok := jsonInt64(u, "output_tokens")
		cacheR := jsonInt64(u, "cache_read_input_tokens")
		cacheW := jsonInt64(u, "cache_creation_input_tokens")
		if inTok+outTok+cacheR+cacheW == 0 {
			continue
		}
		records = append(records, usageRecord{
			AppType:             "claude",
			APISource:           detectAPISource(entry.Message.ID),
			Model:               modelName,
			InputTokens:         inTok,
			OutputTokens:        outTok,
			CacheReadTokens:     cacheR,
			CacheCreationTokens: cacheW,
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
		modelName := normalizeModel(currentModel)
		if modelName == "" {
			continue
		}
		inTok := u.InputTokens
		outTok := u.OutputTokens + u.ReasoningOutputTokens
		cacheR := u.CachedInputTokens
		if inTok+outTok+cacheR == 0 {
			continue
		}

		records = append(records, usageRecord{
			AppType:         "codex",
			APISource:       "openai",
			Model:           modelName,
			InputTokens:     inTok,
			OutputTokens:    outTok,
			CacheReadTokens: cacheR,
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
