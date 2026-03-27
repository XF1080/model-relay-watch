package service

import (
	"encoding/json"
	"fmt"
	"log"
	"strings"

	"model-relay-watch/internal/model"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type CCSProvider struct {
	ID             string `json:"id"`
	AppType        string `json:"app_type"`
	Name           string `json:"name"`
	SettingsConfig string `json:"-"`
	Category       string `json:"category"`
	ProviderType   string `json:"provider_type"`
	IsCurrent      bool   `json:"is_current"`

	BaseURL  string `json:"base_url"`
	APIKey   string `json:"api_key"`
	Model    string `json:"model"`
	AuthType string `json:"auth_type"`
	APIFormat string `json:"api_format"`
	WireAPI  string `json:"wire_api"`
	Type     string `json:"channel_type"`
}

func normalizeCCSBaseURL(u string) string {
	u = strings.TrimSpace(u)
	u = strings.TrimRight(u, "/")
	for _, suffix := range []string{"/v1", "/v1beta", "/v1beta1"} {
		u = strings.TrimSuffix(u, suffix)
	}
	return strings.TrimRight(u, "/")
}

func normalizeCCSWireAPI(wireAPI string) string {
	s := strings.ToLower(strings.TrimSpace(wireAPI))
	s = strings.Trim(s, "\"")
	return strings.ReplaceAll(s, "-", "_")
}

func inferChannelTypeFromWireAPI(wireAPI string) string {
	switch normalizeCCSWireAPI(wireAPI) {
	case "responses":
		return model.ChannelTypeResponses
	case "chat_completions", "openai", "chat":
		return model.ChannelTypeOpenAI
	default:
		return ""
	}
}

func normalizeCCSAPIFormat(apiFormat string) string {
	s := strings.ToLower(strings.TrimSpace(apiFormat))
	s = strings.Trim(s, "\"")
	return strings.ReplaceAll(s, "-", "_")
}

func inferChannelTypeFromAPIFormat(apiFormat string) string {
	switch normalizeCCSAPIFormat(apiFormat) {
	case "anthropic":
		return model.ChannelTypeAnthropic
	case "openai_chat", "openai_chat_completions", "chat_completions":
		return model.ChannelTypeOpenAI
	case "openai_responses", "responses":
		return model.ChannelTypeResponses
	default:
		return ""
	}
}

func providerMatchKey(p CCSProvider) string {
	baseURL := normalizeCCSBaseURL(p.BaseURL)
	apiKey := strings.TrimSpace(p.APIKey)
	if baseURL == "" || apiKey == "" {
		return ""
	}
	return baseURL + "\n" + apiKey
}

func explicitProviderType(p CCSProvider) string {
	if t := inferChannelTypeFromAPIFormat(p.APIFormat); t != "" {
		return t
	}
	if t := inferChannelTypeFromWireAPI(p.WireAPI); t != "" {
		return t
	}
	if p.AuthType == "openai" {
		return model.ChannelTypeOpenAI
	}
	return ""
}

func providerPreferenceScore(p CCSProvider) int {
	score := 0
	if p.IsCurrent {
		score += 100
	}
	appType := strings.ToLower(strings.TrimSpace(p.AppType))
	switch {
	case strings.Contains(appType, "codex"):
		score += 30
	case strings.Contains(appType, "gemini"):
		score += 20
	case strings.Contains(appType, "claude"):
		score += 10
	}
	if p.APIFormat != "" {
		score += 5
	}
	if p.WireAPI != "" {
		score += 5
	}
	return score
}

func collapseCCSProviders(providers []CCSProvider) []CCSProvider {
	byKey := make(map[string]CCSProvider)
	var orderedKeys []string

	for _, p := range providers {
		key := providerMatchKey(p)
		if key == "" {
			key = p.AppType + "\n" + p.Name + "\n" + p.BaseURL
		}
		existing, ok := byKey[key]
		if !ok {
			byKey[key] = p
			orderedKeys = append(orderedKeys, key)
			continue
		}
		if providerPreferenceScore(p) > providerPreferenceScore(existing) {
			byKey[key] = p
		}
	}

	result := make([]CCSProvider, 0, len(orderedKeys))
	for _, key := range orderedKeys {
		result = append(result, byKey[key])
	}
	return result
}

func resolveCCSProviderTypes(providers []CCSProvider) {
	explicitByKey := make(map[string]string)

	for _, p := range providers {
		key := providerMatchKey(p)
		if key == "" {
			continue
		}
		if t := explicitProviderType(p); t != "" {
			explicitByKey[key] = t
		}
	}

	for i := range providers {
		if t := explicitProviderType(providers[i]); t != "" {
			providers[i].Type = t
			continue
		}

		if key := providerMatchKey(providers[i]); key != "" {
			if t := explicitByKey[key]; t != "" {
				providers[i].Type = t
				continue
			}
		}

		if providers[i].AuthType == "anthropic" {
			providers[i].Type = model.ChannelTypeAnthropic
		} else {
			providers[i].Type = model.ChannelTypeOpenAI
		}
	}
}

func ReadCCSProviders() ([]CCSProvider, error) {
	dbPath := GetSetting("ccs_db_path")
	if dbPath == "" {
		return nil, fmt.Errorf("鏈厤缃?CC-Switch 鏁版嵁搴撹矾寰?")
	}

	dbPath = strings.ReplaceAll(dbPath, "\\", "/")

	dsn := dbPath + "?_pragma=query_only(1)"
	ccsDB, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	if err != nil {
		return nil, fmt.Errorf("鎵撳紑 CC-Switch 鏁版嵁搴撳け璐? %w", err)
	}
	sqlDB, _ := ccsDB.DB()
	defer sqlDB.Close()

	type RawProvider struct {
		ID             string `gorm:"column:id"`
		AppType        string `gorm:"column:app_type"`
		Name           string `gorm:"column:name"`
		SettingsConfig string `gorm:"column:settings_config"`
		Meta           string `gorm:"column:meta"`
		Category       string `gorm:"column:category"`
		ProviderType   string `gorm:"column:provider_type"`
		IsCurrent      bool   `gorm:"column:is_current"`
	}

	var raws []RawProvider
	if err := ccsDB.Raw("SELECT id, app_type, name, settings_config, meta, category, provider_type, is_current FROM providers").Scan(&raws).Error; err != nil {
		return nil, fmt.Errorf("鏌ヨ providers 澶辫触: %w", err)
	}

	log.Printf("[CCS] 浠?%s 璇诲彇鍒?%d 鏉?provider 璁板綍", dbPath, len(raws))

	var result []CCSProvider
	for _, r := range raws {
		p := CCSProvider{
			ID:           r.ID,
			AppType:      r.AppType,
			Name:         r.Name,
			Category:     r.Category,
			ProviderType: r.ProviderType,
			IsCurrent:    r.IsCurrent,
		}

		var cfg map[string]any
		if err := json.Unmarshal([]byte(r.SettingsConfig), &cfg); err != nil {
			continue
		}

		var meta map[string]any
		if r.Meta != "" {
			if err := json.Unmarshal([]byte(r.Meta), &meta); err == nil {
				if v, ok := meta["apiFormat"].(string); ok {
					p.APIFormat = v
				}
			}
		}

		if env, ok := cfg["env"].(map[string]any); ok {
			if v, ok := env["ANTHROPIC_BASE_URL"].(string); ok {
				p.BaseURL = v
			}
			if v, ok := env["ANTHROPIC_AUTH_TOKEN"].(string); ok && v != "" {
				p.APIKey = v
				p.AuthType = "anthropic"
			}
			if v, ok := env["ANTHROPIC_API_KEY"].(string); ok && v != "" && p.APIKey == "" {
				p.APIKey = v
				p.AuthType = "anthropic"
			}
			if v, ok := env["ANTHROPIC_MODEL"].(string); ok {
				p.Model = v
			}
		}

		if v, ok := cfg["model"].(string); ok && p.Model == "" {
			p.Model = v
		}

		if auth, ok := cfg["auth"].(map[string]any); ok {
			if v, ok := auth["OPENAI_API_KEY"].(string); ok && v != "" {
				p.APIKey = v
				p.AuthType = "openai"
			}
		}

		if cfgStr, ok := cfg["config"].(string); ok {
			for _, line := range strings.Split(cfgStr, "\n") {
				line = strings.TrimSpace(line)

				if strings.HasPrefix(line, "base_url") && p.BaseURL == "" {
					parts := strings.SplitN(line, "=", 2)
					if len(parts) == 2 {
						p.BaseURL = strings.Trim(strings.TrimSpace(parts[1]), "\"")
					}
				}

				if (strings.HasPrefix(line, "model =") || strings.HasPrefix(line, "model=")) && p.Model == "" {
					parts := strings.SplitN(line, "=", 2)
					if len(parts) == 2 {
						p.Model = strings.Trim(strings.TrimSpace(parts[1]), "\"")
					}
				}

				if strings.HasPrefix(line, "wire_api =") || strings.HasPrefix(line, "wire_api=") {
					parts := strings.SplitN(line, "=", 2)
					if len(parts) == 2 {
						p.WireAPI = strings.Trim(strings.TrimSpace(parts[1]), "\"")
					}
				}
			}
		}

		p.BaseURL = normalizeCCSBaseURL(p.BaseURL)
		if p.BaseURL != "" && p.APIKey != "" {
			result = append(result, p)
		}
	}

	resolveCCSProviderTypes(result)
	result = collapseCCSProviders(result)
	return result, nil
}

type SyncResult struct {
	Added   int `json:"added"`
	Updated int `json:"updated"`
	Removed int `json:"removed"`
}

func SyncCCSProviders(cleanup bool) (*SyncResult, error) {
	providers, err := ReadCCSProviders()
	if err != nil {
		return nil, err
	}

	res := &SyncResult{}
	matchedIDs := make(map[uint]bool)

	for _, p := range providers {
		toolSource := ""
		switch {
		case p.AppType == "claude":
			toolSource = "claude_code"
		case strings.Contains(strings.ToLower(p.AppType), "codex"):
			toolSource = "codex"
		case strings.Contains(strings.ToLower(p.AppType), "gemini"):
			toolSource = "gemini_cli"
		}

		chType := p.Type
		if chType == "" {
			chType = model.ChannelTypeOpenAI
		}

		chTag := "other"
		nameLower := strings.ToLower(p.Name + p.BaseURL)
		switch {
		case strings.Contains(nameLower, "claude") || strings.Contains(nameLower, "anthropic"):
			chTag = "claude"
		case strings.Contains(nameLower, "gemini") || strings.Contains(nameLower, "google"):
			chTag = "gemini"
		case strings.Contains(nameLower, "deepseek"):
			chTag = "deepseek"
		case strings.Contains(nameLower, "codex"):
			chTag = "codex"
		case strings.Contains(nameLower, "openai") || strings.Contains(nameLower, "chatgpt"):
			chTag = "openai"
		}

		var existing model.Channel
		result := model.DB.Where("base_url = ? AND api_key = ? AND source = ?", p.BaseURL, p.APIKey, model.ChannelSourceCCS).First(&existing)
		if result.RowsAffected > 0 {
			matchedIDs[existing.ID] = true
			model.DB.Model(&existing).Updates(map[string]any{
				"name":        p.Name,
				"source":      model.ChannelSourceCCS,
				"type":        chType,
				"tag":         chTag,
				"tool_source": toolSource,
			})
			res.Updated++
			continue
		}

		ch := model.Channel{
			Name:       p.Name,
			Source:     model.ChannelSourceCCS,
			Type:       chType,
			Tag:        chTag,
			ToolSource: toolSource,
			BaseURL:    p.BaseURL,
			APIKey:     p.APIKey,
			Status:     model.ChannelStatusEnabled,
			AutoBan:    true,
		}
		if err := model.DB.Create(&ch).Error; err != nil {
			log.Printf("[CCS-SYNC] create channel failed: %v", err)
			continue
		}
		matchedIDs[ch.ID] = true
		res.Added++
		log.Printf("[CCS-SYNC] added channel: %s -> %s", ch.Name, ch.BaseURL)
	}

	if cleanup {
		var locals []model.Channel
		model.DB.Where("source = ?", model.ChannelSourceCCS).Find(&locals)
		for _, ch := range locals {
			if !matchedIDs[ch.ID] {
				DeleteChannel(ch.ID)
				res.Removed++
				log.Printf("[CCS-SYNC] removed stale channel: %s (id=%d)", ch.Name, ch.ID)
			}
		}
	}

	return res, nil
}
