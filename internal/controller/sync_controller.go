package controller

import (
	"model-monitor/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

func TestSyncConnection(c *gin.Context) {
	if err := service.TestWebDAVConnection(); err != nil {
		c.JSON(http.StatusOK, gin.H{"success": false, "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "message": "连接成功"})
}

func SyncUpload(c *gin.Context) {
	if err := service.UploadSnapshot(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "上传成功"})
}

func SyncDownload(c *gin.Context) {
	if err := service.DownloadSnapshot(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "下载成功，数据库已更新"})
}

func GetSyncStatus(c *gin.Context) {
	status := service.GetSyncStatus()
	c.JSON(http.StatusOK, gin.H{"data": status})
}
