package controller

import (
	"model-relay-watch/internal/model"
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
		ModelName   string  `gorm:"column:model_name" json:"model_name"`
		TotalTests  int     `gorm:"column:total_tests" json:"total_tests"`
		SuccessRate float64 `gorm:"column:success_rate" json:"success_rate"`
		AvgLatency  float64 `gorm:"column:avg_latency_ms" json:"avg_latency_ms"`
	}

	var stats []ModelStat
	model.DB.Model(&model.TestResult{}).
		Select("model_name, COUNT(*) AS total_tests, SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*) AS success_rate, AVG(CASE WHEN success = 1 THEN response_ms ELSE NULL END) AS avg_latency_ms").
		Group("model_name").
		Order("success_rate asc, total_tests desc").
		Find(&stats)

	c.JSON(http.StatusOK, gin.H{"data": stats})
}

func ClearHistory(c *gin.Context) {
	days, err := strconv.Atoi(c.DefaultQuery("days", "7"))
	if err != nil || days < 1 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "days must be a positive integer"})
		return
	}
	cutoff := time.Now().AddDate(0, 0, -days)
	result := model.DB.Where("tested_at < ?", cutoff).Delete(&model.TestResult{})
	c.JSON(http.StatusOK, gin.H{
		"message": "cleared",
		"deleted": result.RowsAffected,
	})
}
