package controller

import (
	"model-relay-watch/internal/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /api/v1/pricing - returns all pricing from DB
func ListPricing(c *gin.Context) {
	var items []model.ModelPricing
	model.DB.Order("model_key").Find(&items)
	c.JSON(http.StatusOK, gin.H{"data": items})
}

// PUT /api/v1/pricing - save pricing entries (upsert)
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

// DELETE /api/v1/pricing/:key - delete a pricing entry
func DeletePricing(c *gin.Context) {
	key := c.Param("key")
	model.DB.Delete(&model.ModelPricing{}, "model_key = ?", key)
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}
