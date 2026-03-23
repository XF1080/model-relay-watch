package controller

import (
	"model-monitor/internal/model"
	"model-monitor/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /api/v1/pricing - returns official + custom pricing
func ListPricing(c *gin.Context) {
	official := service.ListOfficialPricing()
	var custom []model.ModelPricing
	model.DB.Find(&custom)
	c.JSON(http.StatusOK, gin.H{"official": official, "custom": custom})
}

// PUT /api/v1/pricing - save custom pricing overrides
func SavePricing(c *gin.Context) {
	var items []model.ModelPricing
	if err := c.ShouldBindJSON(&items); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	for _, item := range items {
		if item.ModelKey == "" {
			continue
		}
		model.DB.Save(&item)
	}
	c.JSON(http.StatusOK, gin.H{"message": "saved"})
}

// DELETE /api/v1/pricing/:key - remove custom override
func DeletePricing(c *gin.Context) {
	key := c.Param("key")
	model.DB.Delete(&model.ModelPricing{}, "model_key = ?", key)
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}
