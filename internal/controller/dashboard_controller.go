package controller

import (
	"math"
	"model-monitor/internal/model"
	"net/http"
	"sort"
	"time"

	"github.com/gin-gonic/gin"
)

func GetDashboard(c *gin.Context) {
	var totalModels, healthyModels int64
	model.DB.Model(&model.ModelEntry{}).Count(&totalModels)
	model.DB.Model(&model.ModelEntry{}).Where("status = ?", model.ChannelStatusEnabled).Count(&healthyModels)

	cutoff := time.Now().Add(-24 * time.Hour)
	var totalTests, successTests int64
	model.DB.Model(&model.TestResult{}).Where("tested_at >= ?", cutoff).Count(&totalTests)
	model.DB.Model(&model.TestResult{}).Where("tested_at >= ? AND success = ?", cutoff, true).Count(&successTests)

	var overallRate float64
	if totalTests > 0 {
		overallRate = float64(successTests) / float64(totalTests) * 100
	}

	// Avg TTFB and TPS across successful tests
	var avgTtfb, avgTps float64
	row := model.DB.Model(&model.TestResult{}).
		Where("tested_at >= ? AND success = ? AND ttfb_ms > 0", cutoff, true).
		Select("AVG(ttfb_ms)").Row()
	row.Scan(&avgTtfb)

	row2 := model.DB.Model(&model.TestResult{}).
		Where("tested_at >= ? AND success = ? AND tokens_per_sec > 0", cutoff, true).
		Select("AVG(tokens_per_sec)").Row()
	row2.Scan(&avgTps)

	var goodModels int64
	model.DB.Model(&model.ModelEntry{}).
		Where("test_count > 0 AND (test_count - fail_count) * 100.0 / test_count >= 80").
		Count(&goodModels)

	c.JSON(http.StatusOK, gin.H{
		"total_models":         totalModels,
		"healthy_models":       healthyModels,
		"overall_success_rate": overallRate,
		"good_models":          goodModels,
		"total_tests_24h":      totalTests,
		"avg_ttfb_ms":          avgTtfb,
		"avg_tps":              avgTps,
	})
}

// GetModelStats returns per-model aggregated metrics for radar chart cards.
func GetModelStats(c *gin.Context) {
	cutoff := time.Now().Add(-24 * time.Hour)

	var results []model.TestResult
	model.DB.Where("tested_at >= ?", cutoff).Find(&results)

	// Get model entries
	var entries []model.ModelEntry
	model.DB.Preload("Channel").Find(&entries)
	entryMap := make(map[uint]*model.ModelEntry)
	for i := range entries {
		entryMap[entries[i].ID] = &entries[i]
	}

	type ModelStats struct {
		ModelName   string `json:"model_name"`
		ModelID     uint   `json:"model_id"`
		ChannelName string `json:"channel_name"`
		ChannelType string `json:"channel_type"`

		// Reliability
		TotalTests  int     `json:"total_tests"`
		SuccessRate float64 `json:"success_rate"`
		TimeoutRate float64 `json:"timeout_rate"`

		// Latency
		AvgLatency float64 `json:"avg_latency_ms"`
		P50Latency float64 `json:"p50_latency_ms"`
		P90Latency float64 `json:"p90_latency_ms"`
		P99Latency float64 `json:"p99_latency_ms"`
		AvgTtfb    float64 `json:"avg_ttfb_ms"`

		// Throughput
		AvgTps       float64 `json:"avg_tps"`
		AvgInTokens  float64 `json:"avg_input_tokens"`
		AvgOutTokens float64 `json:"avg_output_tokens"`

		// Network
		AvgDns float64 `json:"avg_dns_ms"`
		AvgTcp float64 `json:"avg_tcp_ms"`
		AvgTls float64 `json:"avg_tls_ms"`

		// Radar scores (0-100, higher = better)
		ScoreReliability float64 `json:"score_reliability"`
		ScoreLatency     float64 `json:"score_latency"`
		ScoreThroughput  float64 `json:"score_throughput"`
		ScoreNetwork     float64 `json:"score_network"`
	}

	// Group by ModelEntryID so same model name on different channels stays separate
	grouped := make(map[uint][]model.TestResult)
	for _, r := range results {
		grouped[r.ModelEntryID] = append(grouped[r.ModelEntryID], r)
	}

	var stats []ModelStats
	// Track which model entries have test data
	seenEntries := make(map[uint]bool)

	for entryID, rs := range grouped {
		entry, ok := entryMap[entryID]
		if !ok {
			continue
		}
		s := ModelStats{
			ModelName:  entry.ModelName,
			ModelID:    entryID,
			TotalTests: len(rs),
		}
		seenEntries[entryID] = true

		if entry.Channel != nil {
			s.ChannelName = entry.Channel.Name
			s.ChannelType = entry.Channel.Type
		}

		var successCount, timeoutCount int
		var latencies []float64
		var sumTtfb, sumTps, sumIn, sumOut float64
		var sumDns, sumTcp, sumTls float64
		var ttfbCount, tpsCount, netCount int

		for _, r := range rs {
			if r.Success {
				successCount++
				latencies = append(latencies, float64(r.ResponseMs))
			}
			if r.ErrorType == "connection_error" && r.ResponseMs >= 29000 {
				timeoutCount++
			}
			if r.TtfbMs > 0 {
				sumTtfb += float64(r.TtfbMs)
				ttfbCount++
			}
			if r.TokensPerSec > 0 {
				sumTps += r.TokensPerSec
				tpsCount++
			}
			if r.InputTokens > 0 {
				sumIn += float64(r.InputTokens)
				sumOut += float64(r.OutputTokens)
			}
			if r.DnsMs > 0 || r.TcpMs > 0 || r.TlsMs > 0 {
				sumDns += float64(r.DnsMs)
				sumTcp += float64(r.TcpMs)
				sumTls += float64(r.TlsMs)
				netCount++
			}
		}

		s.SuccessRate = safePct(successCount, len(rs))
		s.TimeoutRate = safePct(timeoutCount, len(rs))

		if len(latencies) > 0 {
			sort.Float64s(latencies)
			s.AvgLatency = avg(latencies)
			s.P50Latency = percentile(latencies, 50)
			s.P90Latency = percentile(latencies, 90)
			s.P99Latency = percentile(latencies, 99)
		}
		if ttfbCount > 0 {
			s.AvgTtfb = sumTtfb / float64(ttfbCount)
		}
		if tpsCount > 0 {
			s.AvgTps = sumTps / float64(tpsCount)
		}
		if successCount > 0 {
			s.AvgInTokens = sumIn / float64(successCount)
			s.AvgOutTokens = sumOut / float64(successCount)
		}
		if netCount > 0 {
			s.AvgDns = sumDns / float64(netCount)
			s.AvgTcp = sumTcp / float64(netCount)
			s.AvgTls = sumTls / float64(netCount)
		}

		// Radar scores (0-100)
		s.ScoreReliability = s.SuccessRate
		s.ScoreLatency = clamp(100-s.P90Latency/100, 0, 100) // lower latency = higher score
		s.ScoreThroughput = clamp(s.AvgTps*2, 0, 100)         // 50 tps = 100
		totalNet := s.AvgDns + s.AvgTcp + s.AvgTls
		s.ScoreNetwork = clamp(100-totalNet/5, 0, 100) // 500ms total net = 0

		stats = append(stats, s)
	}

	// Add model entries that have no test data in the last 24h
	for _, entry := range entries {
		if seenEntries[entry.ID] {
			continue
		}
		s := ModelStats{
			ModelName: entry.ModelName,
			ModelID:   entry.ID,
		}
		if entry.Channel != nil {
			s.ChannelName = entry.Channel.Name
			s.ChannelType = entry.Channel.Type
		}
		stats = append(stats, s)
	}

	sort.Slice(stats, func(i, j int) bool {
		return stats[i].SuccessRate > stats[j].SuccessRate
	})

	c.JSON(http.StatusOK, gin.H{"data": stats})
}

// GetHeatmap (kept for backward compat)
func GetHeatmap(c *gin.Context) {
	cutoff := time.Now().Add(-24 * time.Hour)
	var results []model.TestResult
	model.DB.Where("tested_at >= ?", cutoff).Order("model_name asc, tested_at asc").Find(&results)

	var entries []model.ModelEntry
	model.DB.Preload("Channel").Find(&entries)
	entryMap := make(map[uint]*model.ModelEntry)
	for i := range entries {
		entryMap[entries[i].ID] = &entries[i]
	}

	now := time.Now()
	windowMinutes := 30
	windowCount := 48

	type WindowData struct {
		Total   int     `json:"total"`
		Success int     `json:"success"`
		Rate    float64 `json:"rate"`
		Time    string  `json:"time"`
	}
	type ModelHeatmap struct {
		ModelName   string       `json:"model_name"`
		ModelID     uint         `json:"model_id"`
		ChannelName string       `json:"channel_name"`
		SuccessRate float64      `json:"success_rate"`
		TotalTests  int          `json:"total_tests"`
		Windows     []WindowData `json:"windows"`
	}

	modelResults := make(map[string][]model.TestResult)
	modelEntryIDs := make(map[string]uint)
	for _, r := range results {
		modelResults[r.ModelName] = append(modelResults[r.ModelName], r)
		modelEntryIDs[r.ModelName] = r.ModelEntryID
	}

	var heatmaps []ModelHeatmap
	for modelName, rs := range modelResults {
		hm := ModelHeatmap{ModelName: modelName, ModelID: modelEntryIDs[modelName], TotalTests: len(rs)}
		if entry, ok := entryMap[hm.ModelID]; ok && entry.Channel != nil {
			hm.ChannelName = entry.Channel.Name
		}
		successCount := 0
		for _, r := range rs {
			if r.Success {
				successCount++
			}
		}
		if len(rs) > 0 {
			hm.SuccessRate = float64(successCount) / float64(len(rs)) * 100
		}
		windows := make([]WindowData, windowCount)
		for i := 0; i < windowCount; i++ {
			windowEnd := now.Add(-time.Duration(windowCount-1-i) * time.Duration(windowMinutes) * time.Minute)
			windowStart := windowEnd.Add(-time.Duration(windowMinutes) * time.Minute)
			windows[i] = WindowData{Time: windowStart.Format("15:04")}
			for _, r := range rs {
				if r.TestedAt.After(windowStart) && !r.TestedAt.After(windowEnd) {
					windows[i].Total++
					if r.Success {
						windows[i].Success++
					}
				}
			}
			if windows[i].Total > 0 {
				windows[i].Rate = float64(windows[i].Success) / float64(windows[i].Total) * 100
			} else {
				windows[i].Rate = -1
			}
		}
		hm.Windows = windows
		heatmaps = append(heatmaps, hm)
	}
	sort.Slice(heatmaps, func(i, j int) bool { return heatmaps[i].SuccessRate > heatmaps[j].SuccessRate })
	c.JSON(http.StatusOK, gin.H{"data": heatmaps})
}

func safePct(n, total int) float64 {
	if total == 0 {
		return 0
	}
	return float64(n) / float64(total) * 100
}

func avg(vals []float64) float64 {
	if len(vals) == 0 {
		return 0
	}
	var sum float64
	for _, v := range vals {
		sum += v
	}
	return sum / float64(len(vals))
}

func percentile(sorted []float64, pct int) float64 {
	if len(sorted) == 0 {
		return 0
	}
	idx := int(math.Ceil(float64(pct)/100*float64(len(sorted)))) - 1
	if idx < 0 {
		idx = 0
	}
	if idx >= len(sorted) {
		idx = len(sorted) - 1
	}
	return sorted[idx]
}

func clamp(v, min, max float64) float64 {
	if v < min {
		return min
	}
	if v > max {
		return max
	}
	return v
}
