package controller

import (
	"model-monitor/internal/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ListModels(c *gin.Context) {
	channelID, _ := strconv.ParseUint(c.Query("channel_id"), 10, 32)
	status, _ := strconv.Atoi(c.Query("status"))
	models, err := service.GetAllModels(uint(channelID), status)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": models})
}

func GetModel(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	m, err := service.GetModel(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "model not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": m})
}

func UpdateModel(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	m, err := service.GetModel(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "model not found"})
		return
	}

	var input struct {
		EndpointType *string `json:"endpoint_type"`
		Status       *int    `json:"status"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if input.EndpointType != nil {
		m.EndpointType = *input.EndpointType
	}
	if input.Status != nil {
		m.Status = *input.Status
	}
	if err := service.UpdateModel(m); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": m})
}

func DeleteModel(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	if err := service.DeleteModel(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

func UpdateModelStatus(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	var input struct {
		Status int `json:"status"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := service.UpdateModelStatus(uint(id), input.Status); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "updated"})
}
