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
	Provider         string  `json:"provider"` // anthropic, openai, google, zhipu, minimax, moonshot, other
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
	AppType     string            `json:"app_type"`
	Label       string            `json:"label"`
	Models      []TokenStatsModel `json:"models"`
	TotalIn     int64             `json:"total_in"`
	TotalOut    int64             `json:"total_out"`
	TotalCost   float64           `json:"total_cost"`
	Requests    int               `json:"requests"`
	EndpointURL string            `json:"endpoint_url,omitempty"`
	ChannelName string            `json:"channel_name,omitempty"`
	ChannelID   uint              `json:"channel_id,omitempty"`
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

func lookupPrice(model string) modelPrice {
	if p, ok := officialPricing[model]; ok {
		return p
	}
	// Try prefix match: "claude-opus-4-6-20260206" → "claude-opus-4-6"
	for prefix, p := range officialPricing {
		if strings.HasPrefix(model, prefix) {
			return p
		}
	}
	// Heuristic by model name keywords
	ml := strings.ToLower(model)
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

func estimateCost(model string, inTok, outTok, cacheRead, cacheWrite int64) float64 {
	p := lookupPrice(model)
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

	// Aggregate by app_type + display_name to merge model variants
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

	// Detect tool endpoints
	endpointMap := map[string]string{
		"claude": readClaudeEndpoint(home),
		"codex":  readCodexEndpoint(home),
	}

	// Build groups - extensible for future tools
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
		if ep, ok := endpointMap[g.key]; ok && ep != "" {
			grp.EndpointURL = ep
			if chID, chName := matchChannel(ep); chID > 0 {
				grp.ChannelID = chID
				grp.ChannelName = chName
			}
		}
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
		// Sort by provider group, then by token count within each provider
		providerOrder := map[string]int{
			"anthropic": 0, "openai": 1, "google": 2, "deepseek": 3,
			"zhipu": 4, "minimax": 5, "moonshot": 6, "alibaba": 7, "other": 8,
		}
		sort.Slice(grp.Models, func(i, j int) bool {
			pi := providerOrder[grp.Models[i].Provider]
			pj := providerOrder[grp.Models[j].Provider]
			if pi != pj {
				return pi < pj
			}
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
			Model:           modelName,
			InputTokens:     inTok,
			OutputTokens:    outTok,
			CacheReadTokens: cacheR,
			Timestamp:       ts,
		})
	}
	return records, nil
}

// ── Tool endpoint detection ──

// readClaudeEndpoint reads ANTHROPIC_BASE_URL from ~/.claude/settings.json
func readClaudeEndpoint(home string) string {
	data, err := os.ReadFile(filepath.Join(home, ".claude", "settings.json"))
	if err != nil {
		return ""
	}
	var cfg struct {
		Env map[string]string `json:"env"`
	}
	if json.Unmarshal(data, &cfg) != nil {
		return ""
	}
	return cfg.Env["ANTHROPIC_BASE_URL"]
}

// readCodexEndpoint reads the first model_provider base_url from ~/.codex/config.toml
func readCodexEndpoint(home string) string {
	data, err := os.ReadFile(filepath.Join(home, ".codex", "config.toml"))
	if err != nil {
		return ""
	}
	// Simple TOML parse: find base_url = "..."
	for _, line := range strings.Split(string(data), "\n") {
		line = strings.TrimSpace(line)
		if strings.HasPrefix(line, "base_url") {
			parts := strings.SplitN(line, "=", 2)
			if len(parts) == 2 {
				val := strings.TrimSpace(parts[1])
				val = strings.Trim(val, `"'`)
				return val
			}
		}
	}
	return ""
}

// matchChannel finds a channel whose BaseURL matches the given endpoint URL
func matchChannel(endpointURL string) (uint, string) {
	if endpointURL == "" {
		return 0, ""
	}
	// Normalize: remove trailing slash and /v1 suffix
	norm := func(u string) string {
		u = strings.TrimRight(u, "/")
		u = strings.TrimSuffix(u, "/v1")
		u = strings.TrimSuffix(u, "/v1beta")
		return strings.ToLower(u)
	}
	target := norm(endpointURL)

	var channels []model.Channel
	model.DB.Find(&channels)

	for _, ch := range channels {
		if norm(ch.BaseURL) == target {
			return ch.ID, ch.Name
		}
	}
	// Partial match: check if endpoint contains channel URL host or vice versa
	for _, ch := range channels {
		chNorm := norm(ch.BaseURL)
		if chNorm != "" && (strings.Contains(target, extractHost(chNorm)) || strings.Contains(chNorm, extractHost(target))) {
			return ch.ID, ch.Name
		}
	}
	return 0, ""
}

func extractHost(u string) string {
	u = strings.TrimPrefix(u, "https://")
	u = strings.TrimPrefix(u, "http://")
	if idx := strings.Index(u, "/"); idx > 0 {
		u = u[:idx]
	}
	return u
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
