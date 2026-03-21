package controller

import (
	"model-monitor/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /api/v1/stats/tokens?range=24h|7d|30d
func GetTokenStats(c *gin.Context) {
	timeRange := c.DefaultQuery("range", "24h")
	data, err := service.GetCCSTokenStats(timeRange)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, data)
}
