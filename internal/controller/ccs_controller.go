package controller

import (
	"model-monitor/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /api/v1/ccs/providers - list providers from CC-Switch db (read-only)
func ListCCSProviders(c *gin.Context) {
	providers, err := service.ReadCCSProviders()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": providers})
}

// POST /api/v1/ccs/sync - import CC-Switch providers as channels
func SyncCCSProviders(c *gin.Context) {
	added, err := service.SyncCCSProviders()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "同步完成", "added": added})
}
