package service

import (
	"encoding/json"
	"fmt"
	"io"
	"model-relay-watch/internal/model"
	"net/http"
	"net/url"
	"strings"
	"time"
)

type openAIModelList struct {
	Data []struct {
		ID string `json:"id"`
	} `json:"data"`
}

type anthropicModelList struct {
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
	client, err := buildHTTPClient(15*time.Second, channel)
	if err != nil {
		return nil, err
	}

	modelsURL, err := buildModelsURL(channel)
	if err != nil {
		return nil, err
	}
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

	modelIDs, err := parseDiscoveredModelIDs(resp.Body, channel.Type)
	if err != nil {
		return nil, err
	}

	// Get existing models for this channel
	existing := make(map[string]bool)
	var existingModels []model.ModelEntry
	model.DB.Where("channel_id = ?", channel.ID).Find(&existingModels)
	for _, m := range existingModels {
		existing[m.ModelName] = true
	}

	var newModels []model.ModelEntry
	for _, modelID := range modelIDs {
		if existing[modelID] {
			continue
		}
		entry := model.ModelEntry{
			ChannelID:    channel.ID,
			ModelName:    modelID,
			EndpointType: inferEndpointType(modelID),
			Status:       model.ChannelStatusEnabled,
		}
		if err := model.DB.Create(&entry).Error; err != nil {
			continue
		}
		newModels = append(newModels, entry)
	}
	return newModels, nil
}

func parseDiscoveredModelIDs(body io.Reader, channelType string) ([]string, error) {
	switch channelType {
	case model.ChannelTypeAnthropic:
		var result anthropicModelList
		if err := json.NewDecoder(body).Decode(&result); err != nil {
			return nil, fmt.Errorf("failed to parse response: %v", err)
		}
		ids := make([]string, 0, len(result.Data))
		for _, item := range result.Data {
			if item.ID != "" {
				ids = append(ids, item.ID)
			}
		}
		return ids, nil
	default:
		var result openAIModelList
		if err := json.NewDecoder(body).Decode(&result); err != nil {
			return nil, fmt.Errorf("failed to parse response: %v", err)
		}
		ids := make([]string, 0, len(result.Data))
		for _, item := range result.Data {
			if item.ID != "" {
				ids = append(ids, item.ID)
			}
		}
		return ids, nil
	}
}

func buildModelsURL(channel *model.Channel) (string, error) {
	base := strings.TrimRight(strings.TrimSpace(channel.BaseURL), "/")
	if base == "" {
		return "", fmt.Errorf("base_url is required")
	}

	suffix := "/v1/models"
	if hasVersionSegment(base) {
		suffix = "/models"
	}

	u, err := url.Parse(base + suffix)
	if err != nil {
		return "", err
	}
	return u.String(), nil
}

func hasVersionSegment(base string) bool {
	lower := strings.ToLower(strings.TrimRight(base, "/"))
	for _, suffix := range []string{"/v1", "/v1beta", "/v1beta1", "/v2", "/v3", "/api/v1", "/api/v2", "/api/v3"} {
		if strings.HasSuffix(lower, suffix) {
			return true
		}
	}
	return false
}

func inferEndpointType(name string) string {
	lower := strings.ToLower(name)
	if strings.Contains(lower, "embedding") || strings.Contains(lower, "bge-") || strings.Contains(lower, "m3e") || strings.Contains(lower, "embed") {
		return "embedding"
	}
	return "chat"
}
