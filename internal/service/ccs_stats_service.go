package service

import (
	"fmt"
	"strings"
	"time"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// CCS proxy_request_logs row
type CCSRequestLog struct {
	RequestID           string  `gorm:"column:request_id"`
	ProviderID          string  `gorm:"column:provider_id"`
	AppType             string  `gorm:"column:app_type"`
	Model               string  `gorm:"column:model"`
	RequestModel        *string `gorm:"column:request_model"`
	InputTokens         int     `gorm:"column:input_tokens"`
	OutputTokens        int     `gorm:"column:output_tokens"`
	CacheReadTokens     int     `gorm:"column:cache_read_tokens"`
	CacheCreationTokens int     `gorm:"column:cache_creation_tokens"`
	InputCostUsd        string  `gorm:"column:input_cost_usd"`
	OutputCostUsd       string  `gorm:"column:output_cost_usd"`
	CacheReadCostUsd    string  `gorm:"column:cache_read_cost_usd"`
	CacheCreationCostUsd string `gorm:"column:cache_creation_cost_usd"`
	TotalCostUsd        string  `gorm:"column:total_cost_usd"`
	LatencyMs           int     `gorm:"column:latency_ms"`
	FirstTokenMs        *int    `gorm:"column:first_token_ms"`
	DurationMs          *int    `gorm:"column:duration_ms"`
	StatusCode          int     `gorm:"column:status_code"`
	IsStreaming         int     `gorm:"column:is_streaming"`
	CostMultiplier      string  `gorm:"column:cost_multiplier"`
	CreatedAt           int64   `gorm:"column:created_at"`
}

type CCSModelPricing struct {
	ModelID                    string `gorm:"column:model_id"`
	DisplayName                string `gorm:"column:display_name"`
	InputCostPerMillion        string `gorm:"column:input_cost_per_million"`
	OutputCostPerMillion       string `gorm:"column:output_cost_per_million"`
	CacheReadCostPerMillion    string `gorm:"column:cache_read_cost_per_million"`
	CacheCreationCostPerMillion string `gorm:"column:cache_creation_cost_per_million"`
}

// Response types
type TokenStatsSummary struct {
	TotalInputTokens   int64   `json:"total_input_tokens"`
	TotalOutputTokens  int64   `json:"total_output_tokens"`
	TotalCacheRead     int64   `json:"total_cache_read"`
	TotalCacheWrite    int64   `json:"total_cache_write"`
	TotalTokens        int64   `json:"total_tokens"`
	TotalRequests      int     `json:"total_requests"`
	SuccessRequests    int     `json:"success_requests"`
	TotalCostUsd       float64 `json:"total_cost_usd"`
}

type TokenStatsModel struct {
	Model           string  `json:"model"`
	DisplayName     string  `json:"display_name"`
	InputTokens     int64   `json:"input_tokens"`
	OutputTokens    int64   `json:"output_tokens"`
	CacheReadTokens int64   `json:"cache_read_tokens"`
	CacheWriteTokens int64  `json:"cache_write_tokens"`
	Requests        int     `json:"requests"`
	SuccessReqs     int     `json:"success_reqs"`
	AvgLatencyMs    int     `json:"avg_latency_ms"`
	TotalCostUsd    float64 `json:"total_cost_usd"`
}

type TokenStatsGroup struct {
	AppType  string            `json:"app_type"`
	Label    string            `json:"label"`
	Models   []TokenStatsModel `json:"models"`
	TotalIn  int64             `json:"total_in"`
	TotalOut int64             `json:"total_out"`
	TotalCost float64          `json:"total_cost"`
	Requests int               `json:"requests"`
}

type TokenStatsTimeline struct {
	Time     string `json:"time"`
	InputT   int64  `json:"input"`
	OutputT  int64  `json:"output"`
	Requests int    `json:"requests"`
	CostUsd  float64 `json:"cost"`
}

type TokenStatsResponse struct {
	Summary  TokenStatsSummary    `json:"summary"`
	Groups   []TokenStatsGroup    `json:"groups"`
	Timeline []TokenStatsTimeline `json:"timeline"`
	Pricing  []CCSModelPricing    `json:"pricing"`
}

func openCCSDB() (*gorm.DB, error) {
	dbPath := GetSetting("ccs_db_path")
	if dbPath == "" {
		return nil, fmt.Errorf("未配置 CC-Switch 数据库路径")
	}
	dbPath = strings.ReplaceAll(dbPath, "\\", "/")
	dsn := dbPath + "?_pragma=query_only(1)"
	db, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	if err != nil {
		return nil, fmt.Errorf("打开 CC-Switch 数据库失败: %w", err)
	}
	return db, nil
}

func GetCCSTokenStats(timeRange string) (*TokenStatsResponse, error) {
	db, err := openCCSDB()
	if err != nil {
		return nil, err
	}
	sqlDB, _ := db.DB()
	defer sqlDB.Close()

	// Compute time boundary (unix timestamp)
	var since int64
	now := time.Now().Unix()
	switch timeRange {
	case "7d":
		since = now - 7*86400
	case "30d":
		since = now - 30*86400
	default: // 24h
		since = now - 86400
	}

	// Fetch request logs in range
	var logs []CCSRequestLog
	if err := db.Raw("SELECT * FROM proxy_request_logs WHERE created_at >= ? ORDER BY created_at ASC", since).Scan(&logs).Error; err != nil {
		return nil, fmt.Errorf("查询请求日志失败: %w", err)
	}

	// Fetch pricing
	var pricing []CCSModelPricing
	db.Raw("SELECT * FROM model_pricing").Scan(&pricing)
	priceMap := make(map[string]CCSModelPricing)
	for _, p := range pricing {
		priceMap[p.ModelID] = p
	}

	// Build summary
	var summary TokenStatsSummary
	summary.TotalRequests = len(logs)

	// Group by app_type -> model
	type modelKey struct{ appType, model string }
	modelAgg := make(map[modelKey]*TokenStatsModel)
	appTypes := make(map[string]bool)

	for _, l := range logs {
		summary.TotalInputTokens += int64(l.InputTokens)
		summary.TotalOutputTokens += int64(l.OutputTokens)
		summary.TotalCacheRead += int64(l.CacheReadTokens)
		summary.TotalCacheWrite += int64(l.CacheCreationTokens)
		cost := parseFloat(l.TotalCostUsd)
		summary.TotalCostUsd += cost
		if l.StatusCode >= 200 && l.StatusCode < 400 {
			summary.SuccessRequests++
		}

		mk := modelKey{l.AppType, l.Model}
		appTypes[l.AppType] = true
		agg, ok := modelAgg[mk]
		if !ok {
			dn := l.Model
			if p, ok := priceMap[l.Model]; ok && p.DisplayName != "" {
				dn = p.DisplayName
			}
			agg = &TokenStatsModel{Model: l.Model, DisplayName: dn}
			modelAgg[mk] = agg
		}
		agg.InputTokens += int64(l.InputTokens)
		agg.OutputTokens += int64(l.OutputTokens)
		agg.CacheReadTokens += int64(l.CacheReadTokens)
		agg.CacheWriteTokens += int64(l.CacheCreationTokens)
		agg.Requests++
		agg.AvgLatencyMs += l.LatencyMs
		agg.TotalCostUsd += cost
		if l.StatusCode >= 200 && l.StatusCode < 400 {
			agg.SuccessReqs++
		}
	}
	summary.TotalTokens = summary.TotalInputTokens + summary.TotalOutputTokens +
		summary.TotalCacheRead + summary.TotalCacheWrite

	// Finalize averages
	for _, agg := range modelAgg {
		if agg.Requests > 0 {
			agg.AvgLatencyMs = agg.AvgLatencyMs / agg.Requests
		}
	}

	// Build groups
	appOrder := []string{"claude", "codex", "gemini"}
	appLabels := map[string]string{
		"claude": "Claude", "codex": "Codex", "gemini": "Gemini",
	}
	// Add any app types not in predefined order
	for at := range appTypes {
		found := false
		for _, o := range appOrder {
			if o == at { found = true; break }
		}
		if !found {
			appOrder = append(appOrder, at)
			appLabels[at] = at
		}
	}

	var groups []TokenStatsGroup
	for _, at := range appOrder {
		if !appTypes[at] { continue }
		g := TokenStatsGroup{
			AppType: at,
			Label:   appLabels[at],
		}
		for mk, agg := range modelAgg {
			if mk.appType != at { continue }
			g.Models = append(g.Models, *agg)
			g.TotalIn += agg.InputTokens
			g.TotalOut += agg.OutputTokens
			g.TotalCost += agg.TotalCostUsd
			g.Requests += agg.Requests
		}
		if len(g.Models) > 0 {
			groups = append(groups, g)
		}
	}

	// Build timeline
	var timeline []TokenStatsTimeline
	if len(logs) > 0 {
		// Determine bucket size
		var bucketSec int64
		var timeFmt string
		switch timeRange {
		case "30d":
			bucketSec = 86400 // 1 day
			timeFmt = "01-02"
		case "7d":
			bucketSec = 21600 // 6 hours
			timeFmt = "01-02 15:04"
		default: // 24h
			bucketSec = 3600 // 1 hour
			timeFmt = "15:04"
		}

		// Create buckets
		bucketStart := (since / bucketSec) * bucketSec
		bucketEnd := ((now / bucketSec) + 1) * bucketSec
		buckets := make(map[int64]*TokenStatsTimeline)
		for ts := bucketStart; ts < bucketEnd; ts += bucketSec {
			t := time.Unix(ts, 0)
			buckets[ts] = &TokenStatsTimeline{Time: t.Format(timeFmt)}
		}

		for _, l := range logs {
			bk := (l.CreatedAt / bucketSec) * bucketSec
			b, ok := buckets[bk]
			if !ok { continue }
			b.InputT += int64(l.InputTokens)
			b.OutputT += int64(l.OutputTokens)
			b.Requests++
			b.CostUsd += parseFloat(l.TotalCostUsd)
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
		Pricing:  pricing,
	}, nil
}

func parseFloat(s string) float64 {
	var f float64
	fmt.Sscanf(s, "%f", &f)
	return f
}
