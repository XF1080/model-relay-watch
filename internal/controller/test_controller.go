package controller

import (
	"model-monitor/internal/model"
	"model-monitor/internal/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func TestSingleModel(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	entry, err := service.GetModel(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "model not found"})
		return
	}

	var ch model.Channel
	if err := model.DB.First(&ch, entry.ChannelID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "channel not found"})
		return
	}

	result := service.TestSingleModel(entry, &ch)
	c.JSON(http.StatusOK, gin.H{
		"success":     result.Success,
		"response_ms": result.ResponseMs,
		"message":     result.ErrorMessage,
		"data":        result,
	})
}

func TestChannel(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	if service.IsBatchRunning() {
		c.JSON(http.StatusConflict, gin.H{"error": "batch test already in progress"})
		return
	}

	go func() {
		_ = service.TestAllModels(uint(id))
	}()
	c.JSON(http.StatusOK, gin.H{"message": "channel test started"})
}

func TestAll(c *gin.Context) {
	if service.IsBatchRunning() {
		c.JSON(http.StatusConflict, gin.H{"error": "batch test already in progress"})
		return
	}

	go func() {
		_ = service.TestAllModels(0)
	}()
	c.JSON(http.StatusOK, gin.H{"message": "testing all models started"})
}

func TestStatus(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"running": service.IsBatchRunning()})
}
