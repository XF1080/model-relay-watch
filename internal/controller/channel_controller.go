package controller

import (
	"model-monitor/internal/model"
	"model-monitor/internal/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ListChannels(c *gin.Context) {
	channels, err := service.GetAllChannels()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": channels})
}

func GetChannel(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	ch, err := service.GetChannel(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "channel not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ch})
}

func CreateChannel(c *gin.Context) {
	var ch model.Channel
	if err := c.ShouldBindJSON(&ch); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if ch.Name == "" || ch.BaseURL == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "name and base_url are required"})
		return
	}
	ch.Status = model.ChannelStatusEnabled
	if err := service.CreateChannel(&ch); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ch.ComputeHint()
	c.JSON(http.StatusOK, gin.H{"data": ch})
}

func UpdateChannel(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	existing, err := service.GetChannel(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "channel not found"})
		return
	}

	var input struct {
		Name      *string `json:"name"`
		Type      *string `json:"type"`
		BaseURL   *string `json:"base_url"`
		APIKey    *string `json:"api_key"`
		AutoBan   *bool   `json:"auto_ban"`
		TestModel *string `json:"test_model"`
		Priority  *int    `json:"priority"`
		Remark    *string `json:"remark"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Name != nil {
		existing.Name = *input.Name
	}
	if input.Type != nil {
		existing.Type = *input.Type
	}
	if input.BaseURL != nil {
		existing.BaseURL = *input.BaseURL
	}
	if input.APIKey != nil && *input.APIKey != "" {
		existing.APIKey = *input.APIKey
	}
	if input.AutoBan != nil {
		existing.AutoBan = *input.AutoBan
	}
	if input.TestModel != nil {
		existing.TestModel = *input.TestModel
	}
	if input.Priority != nil {
		existing.Priority = *input.Priority
	}
	if input.Remark != nil {
		existing.Remark = *input.Remark
	}

	// Need to read the real APIKey from DB since GetChannel hides it
	var full model.Channel
	model.DB.First(&full, id)
	if input.APIKey != nil && *input.APIKey != "" {
		full.APIKey = *input.APIKey
	}
	existing.APIKey = full.APIKey

	if err := service.UpdateChannel(existing); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	existing.ComputeHint()
	c.JSON(http.StatusOK, gin.H{"data": existing})
}

func DeleteChannel(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	if err := service.DeleteChannel(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

func UpdateChannelStatus(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	var input struct {
		Status int `json:"status"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := service.UpdateChannelStatus(uint(id), input.Status); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "updated"})
}

func DiscoverModels(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)

	var ch model.Channel
	if err := model.DB.First(&ch, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "channel not found"})
		return
	}

	newModels, err := service.DiscoverModels(&ch)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message":    "discovery complete",
		"new_models": len(newModels),
		"data":       newModels,
	})
}
