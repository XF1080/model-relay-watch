package router

import (
	"embed"
	"io/fs"
	"model-relay-watch/internal/controller"
	"model-relay-watch/internal/middleware"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Setup(r *gin.Engine, frontendFS *embed.FS) {
	r.Use(middleware.CORS())

	api := r.Group("/api/v1")
	{
		// Channels
		ch := api.Group("/channels")
		{
			ch.GET("", controller.ListChannels)
			ch.GET("/:id", controller.GetChannel)
			ch.POST("", controller.CreateChannel)
			ch.PUT("/:id", controller.UpdateChannel)
			ch.DELETE("/:id", controller.DeleteChannel)
			ch.POST("/batch-delete", controller.BatchDeleteChannels)
			ch.PUT("/:id/status", controller.UpdateChannelStatus)
			ch.POST("/:id/discover", controller.DiscoverModels)
		}

		// Models
		m := api.Group("/models")
		{
			m.GET("", controller.ListModels)
			m.GET("/:id", controller.GetModel)
			m.PUT("/:id", controller.UpdateModel)
			m.DELETE("/:id", controller.DeleteModel)
			m.PUT("/:id/status", controller.UpdateModelStatus)
		}

		// Testing
		t := api.Group("/test")
		{
			t.POST("/model/:id", controller.TestSingleModel)
			t.POST("/channel/:id", controller.TestChannel)
			t.POST("/all", controller.TestAll)
			t.POST("/batch", controller.TestBatch)
			t.GET("/status", controller.TestStatus)
		}

		// History
		h := api.Group("/history")
		{
			h.GET("", controller.ListHistory)
			h.GET("/stats", controller.GetHistoryStats)
			h.DELETE("", controller.ClearHistory)
		}

		// Settings
		api.GET("/settings", controller.GetSettings)
		api.PUT("/settings", controller.UpdateSettings)

		// Sync (WebDAV)
		sync := api.Group("/sync")
		{
			sync.POST("/test", controller.TestSyncConnection)
			sync.POST("/upload", controller.SyncUpload)
			sync.POST("/download", controller.SyncDownload)
			sync.GET("/status", controller.GetSyncStatus)
		}

		// CC-Switch
		ccs := api.Group("/ccs")
		{
			ccs.GET("/detect", controller.DetectCCSPath)
			ccs.GET("/providers", controller.ListCCSProviders)
			ccs.POST("/sync", controller.SyncCCSProviders)
		}

		// Dashboard
		api.GET("/dashboard", controller.GetDashboard)
		api.GET("/dashboard/heatmap", controller.GetHeatmap)
		api.GET("/dashboard/model-stats", controller.GetModelStats)

		// Stats (token usage from CCS)
		api.GET("/stats/tokens", controller.GetTokenStats)
		api.GET("/stats/tokens/sources/detect", controller.DetectTokenStatsSources)

		// Pricing
		pricing := api.Group("/pricing")
		{
			pricing.GET("", controller.ListPricing)
			pricing.PUT("", controller.SavePricing)
			pricing.DELETE("/:key", controller.DeletePricing)
		}
	}

	// Serve frontend
	if frontendFS != nil {
		distFS, err := fs.Sub(frontendFS, "web/dist")
		if err == nil {
			fileServer := http.FileServer(http.FS(distFS))
			r.NoRoute(func(c *gin.Context) {
				// Try to serve static file first
				path := c.Request.URL.Path
				f, err := distFS.(fs.ReadFileFS).ReadFile(path[1:]) // strip leading /
				if err == nil && len(f) > 0 {
					fileServer.ServeHTTP(c.Writer, c.Request)
					return
				}
				// Fallback to index.html for SPA routing
				indexData, err := distFS.(fs.ReadFileFS).ReadFile("index.html")
				if err != nil {
					c.String(http.StatusNotFound, "not found")
					return
				}
				c.Data(http.StatusOK, "text/html; charset=utf-8", indexData)
			})
		}
	}
}
