package service

import (
	"encoding/json"
	"fmt"
	"io"
	"model-monitor/internal/model"
	"net/http"
	"strings"
	"time"
)

type openAIModelList struct {
	Data []struct {
		ID string `json:"id"`
	} `json:"data"`
}

func GetModelsByChannel(channelID uint) ([]model.ModelEntry, error) {
	var models []model.ModelEntry
	if err := model.DB.Where("channel_id = ?", channelID).Order("model_name asc").Find(&models).Error; err != nil {
		return nil, err
	}
	return models, nil
}

func GetAllModels(channelID uint, status int) ([]model.ModelEntry, error) {
	q := model.DB.Preload("Channel").Order("channel_id asc, model_name asc")
	if channelID > 0 {
		q = q.Where("channel_id = ?", channelID)
	}
	if status > 0 {
		q = q.Where("status = ?", status)
	}
	var models []model.ModelEntry
	return models, q.Find(&models).Error
}

func GetModel(id uint) (*model.ModelEntry, error) {
	var m model.ModelEntry
	if err := model.DB.Preload("Channel").First(&m, id).Error; err != nil {
		return nil, err
	}
	return &m, nil
}

func UpdateModel(m *model.ModelEntry) error {
	return model.DB.Save(m).Error
}

func DeleteModel(id uint) error {
	model.DB.Where("model_entry_id = ?", id).Delete(&model.TestResult{})
	return model.DB.Delete(&model.ModelEntry{}, id).Error
}

func UpdateModelStatus(id uint, status int) error {
	return model.DB.Model(&model.ModelEntry{}).Where("id = ?", id).Update("status", status).Error
}

func DiscoverModels(channel *model.Channel) ([]model.ModelEntry, error) {
	client := &http.Client{Timeout: 15 * time.Second}

	// Normalize: strip trailing / and /v1 to avoid /v1/v1/models
	base := strings.TrimRight(channel.BaseURL, "/")
	base = strings.TrimSuffix(base, "/v1")
	base = strings.TrimSuffix(base, "/v1beta")
	base = strings.TrimRight(base, "/")
	modelsURL := base + "/v1/models"
	req, err := http.NewRequest("GET", modelsURL, nil)
	if err != nil {
		return nil, err
	}

	switch channel.Type {
	case model.ChannelTypeAnthropic:
		req.Header.Set("x-api-key", channel.APIKey)
		req.Header.Set("anthropic-version", "2023-06-01")
	default:
		req.Header.Set("Authorization", "Bearer "+channel.APIKey)
	}

	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("connection failed: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("HTTP %d: %s", resp.StatusCode, string(body))
	}

	var result openAIModelList
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("failed to parse response: %v", err)
	}

	// Get existing models for this channel
	existing := make(map[string]bool)
	var existingModels []model.ModelEntry
	model.DB.Where("channel_id = ?", channel.ID).Find(&existingModels)
	for _, m := range existingModels {
		existing[m.ModelName] = true
	}

	var newModels []model.ModelEntry
	for _, item := range result.Data {
		if existing[item.ID] {
			continue
		}
		entry := model.ModelEntry{
			ChannelID:    channel.ID,
			ModelName:    item.ID,
			EndpointType: inferEndpointType(item.ID),
			Status:       model.ChannelStatusEnabled,
		}
		if err := model.DB.Create(&entry).Error; err != nil {
			continue
		}
		newModels = append(newModels, entry)
	}
	return newModels, nil
}

func inferEndpointType(name string) string {
	lower := strings.ToLower(name)
	if strings.Contains(lower, "embedding") || strings.Contains(lower, "bge-") || strings.Contains(lower, "m3e") || strings.Contains(lower, "embed") {
		return "embedding"
	}
	return "chat"
}
