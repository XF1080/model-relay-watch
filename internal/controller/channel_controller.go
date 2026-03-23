package controller

import (
	"model-monitor/internal/model"
	"model-monitor/internal/service"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// autoDetectTag guesses a channel tag from its name and base_url.
func autoDetectTag(name, baseURL string) string {
	s := strings.ToLower(name + " " + baseURL)
	switch {
	case strings.Contains(s, "claude") || strings.Contains(s, "anthropic"):
		return "claude"
	case strings.Contains(s, "gemini") || strings.Contains(s, "google"):
		return "gemini"
	case strings.Contains(s, "deepseek"):
		return "deepseek"
	case strings.Contains(s, "codex"):
		return "codex"
	case strings.Contains(s, "openai") || strings.Contains(s, "chatgpt"):
		return "openai"
	default:
		return "other"
	}
}

// normalizeBaseURL cleans up user-provided base URL:
// removes trailing slashes and /v1, /v1beta suffixes so we can append them consistently later.
func normalizeBaseURL(u string) string {
	u = strings.TrimSpace(u)
	u = strings.TrimRight(u, "/")
	// Strip common API path suffixes
	for _, suffix := range []string{"/v1", "/v1beta", "/v1beta1"} {
		u = strings.TrimSuffix(u, suffix)
	}
	u = strings.TrimRight(u, "/")
	return u
}

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
	var input struct {
		Name      string `json:"name"`
		Type      string `json:"type"`
		Tag       string `json:"tag"`
		BaseURL   string `json:"base_url"`
		APIKey    string `json:"api_key"`
		AutoBan   *bool  `json:"auto_ban"`
		TestModel string `json:"test_model"`
		Priority  int    `json:"priority"`
		Remark    string `json:"remark"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if input.Name == "" || input.BaseURL == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "name and base_url are required"})
		return
	}
	ch := model.Channel{
		Name:      input.Name,
		Type:      input.Type,
		Tag:       input.Tag,
		BaseURL:   normalizeBaseURL(input.BaseURL),
		APIKey:    input.APIKey,
		TestModel: input.TestModel,
		Priority:  input.Priority,
		Remark:    input.Remark,
		Status:    model.ChannelStatusEnabled,
		AutoBan:   true,
	}
	if input.AutoBan != nil {
		ch.AutoBan = *input.AutoBan
	}
	if ch.Tag == "" {
		ch.Tag = autoDetectTag(ch.Name, ch.BaseURL)
	}
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
		Tag       *string `json:"tag"`
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
	if input.Tag != nil {
		existing.Tag = *input.Tag
	}
	if input.BaseURL != nil {
		existing.BaseURL = normalizeBaseURL(*input.BaseURL)
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
