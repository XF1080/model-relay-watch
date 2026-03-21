package controller

import (
	"model-monitor/internal/model"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func ListHistory(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "50"))
	if page < 1 {
		page = 1
	}
	if pageSize < 1 || pageSize > 200 {
		pageSize = 50
	}

	q := model.DB.Model(&model.TestResult{})

	if cid := c.Query("channel_id"); cid != "" {
		q = q.Where("channel_id = ?", cid)
	}
	if mn := c.Query("model_name"); mn != "" {
		q = q.Where("model_name LIKE ?", "%"+mn+"%")
	}
	if s := c.Query("success"); s != "" {
		q = q.Where("success = ?", s == "true")
	}
	if from := c.Query("from"); from != "" {
		if t, err := time.Parse("2006-01-02", from); err == nil {
			q = q.Where("tested_at >= ?", t)
		}
	}
	if to := c.Query("to"); to != "" {
		if t, err := time.Parse("2006-01-02", to); err == nil {
			q = q.Where("tested_at < ?", t.AddDate(0, 0, 1))
		}
	}

	var total int64
	q.Count(&total)

	var results []model.TestResult
	q.Order("tested_at desc").Offset((page - 1) * pageSize).Limit(pageSize).Find(&results)

	// Enrich with channel names
	channelNames := make(map[uint]string)
	for i := range results {
		cid := results[i].ChannelID
		if _, ok := channelNames[cid]; !ok {
			var ch model.Channel
			if model.DB.Select("name").First(&ch, cid).Error == nil {
				channelNames[cid] = ch.Name
			}
		}
		results[i].ChannelName = channelNames[cid]
	}

	c.JSON(http.StatusOK, gin.H{
		"data":      results,
		"total":     total,
		"page":      page,
		"page_size": pageSize,
	})
}

func GetHistoryStats(c *gin.Context) {
	type ModelStat struct {
		ModelName   string  `json:"model_name"`
		ChannelID   uint    `json:"channel_id"`
		TotalTests  int     `json:"total_tests"`
		SuccessRate float64 `json:"success_rate"`
		AvgLatency  float64 `json:"avg_latency_ms"`
	}

	var stats []ModelStat
	model.DB.Model(&model.TestResult{}).
		Select("model_name, channel_id, COUNT(*) as total_tests, AVG(CASE WHEN success THEN 1.0 ELSE 0.0 END)*100 as success_rate, AVG(CASE WHEN success THEN response_ms ELSE NULL END) as avg_latency").
		Group("channel_id, model_name").
		Order("success_rate asc").
		Find(&stats)

	c.JSON(http.StatusOK, gin.H{"data": stats})
}

func ClearHistory(c *gin.Context) {
	days, _ := strconv.Atoi(c.DefaultQuery("days", "7"))
	cutoff := time.Now().AddDate(0, 0, -days)
	result := model.DB.Where("tested_at < ?", cutoff).Delete(&model.TestResult{})
	c.JSON(http.StatusOK, gin.H{
		"message": "cleared",
		"deleted": result.RowsAffected,
	})
}
