package controller

import (
	"model-monitor/internal/service"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

// GET /api/v1/ccs/detect - auto-detect CC-Switch db path
func DetectCCSPath(c *gin.Context) {
	home, err := os.UserHomeDir()
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"found": false})
		return
	}
	candidates := []string{
		filepath.Join(home, ".cc-switch", "cc-switch.db"),
		filepath.Join(home, "AppData", "Roaming", "cc-switch", "cc-switch.db"),
		filepath.Join(home, ".config", "cc-switch", "cc-switch.db"),
	}
	for _, p := range candidates {
		if fi, err := os.Stat(p); err == nil && !fi.IsDir() {
			c.JSON(http.StatusOK, gin.H{"found": true, "path": p})
			return
		}
	}
	c.JSON(http.StatusOK, gin.H{"found": false})
}

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
	cleanup := c.Query("cleanup") == "true"
	res, err := service.SyncCCSProviders(cleanup)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "同步完成",
		"added":   res.Added,
		"updated": res.Updated,
		"removed": res.Removed,
	})
}
