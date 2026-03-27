package controller

import (
	"model-relay-watch/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetSettings(c *gin.Context) {
	settings, err := service.GetAllSettings()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// Mask WebDAV password
	if pwd, ok := settings["webdav_password"]; ok && pwd != "" {
		settings["webdav_password"] = "********"
	}
	c.JSON(http.StatusOK, gin.H{"data": settings})
}

func UpdateSettings(c *gin.Context) {
	var input map[string]string
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Don't overwrite password with mask
	if pwd, ok := input["webdav_password"]; ok && pwd == "********" {
		delete(input, "webdav_password")
	}
	if err := service.UpdateSettings(input); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "updated"})
}
