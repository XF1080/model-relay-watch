package controller

import (
	"model-relay-watch/internal/model"
	"model-relay-watch/internal/service"
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
	if err := service.StartChannelTest(uint(id)); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "channel test started"})
}

func TestAll(c *gin.Context) {
	if err := service.StartAllModelsTest(); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "testing all models started"})
}

func TestBatch(c *gin.Context) {
	var input struct {
		IDs []uint `json:"ids"`
	}
	if err := c.ShouldBindJSON(&input); err != nil || len(input.IDs) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "请提供模型 ID 列表"})
		return
	}
	if err := service.StartSelectedModelsTest(input.IDs); err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "batch test started", "count": len(input.IDs)})
}

func TestStatus(c *gin.Context) {
	p := service.GetBatchProgress()
	c.JSON(http.StatusOK, p)
}
