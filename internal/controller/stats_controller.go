package controller

import (
	"model-monitor/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /api/v1/stats/tokens?range=24h|7d|30d|all&start=2006-01-02&end=2006-01-02
func GetTokenStats(c *gin.Context) {
	timeRange := c.DefaultQuery("range", "24h")
	start := c.Query("start")
	end := c.Query("end")
	data, err := service.GetClaudeTokenStats(timeRange, start, end)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, data)
}

// GET /api/v1/stats/tokens/sources/detect
func DetectTokenStatsSources(c *gin.Context) {
	data, err := service.DetectTokenStatsSources()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, data)
}
