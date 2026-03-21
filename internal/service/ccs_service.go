package service

import (
	"encoding/json"
	"fmt"
	"log"
	"strings"

	"model-monitor/internal/model"

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
	// Parsed fields
	BaseURL string `json:"base_url"`
	APIKey  string `json:"api_key"`
	Model   string `json:"model"`
}

func ReadCCSProviders() ([]CCSProvider, error) {
	dbPath := GetSetting("ccs_db_path")
	if dbPath == "" {
		return nil, fmt.Errorf("未配置 CC-Switch 数据库路径")
	}

	// Normalize path separators
	dbPath = strings.ReplaceAll(dbPath, "\\", "/")

	// Open read-only with query params
	dsn := dbPath + "?_pragma=query_only(1)"
	ccsDB, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	if err != nil {
		return nil, fmt.Errorf("打开 CC-Switch 数据库失败: %w", err)
	}
	sqlDB, _ := ccsDB.DB()
	defer sqlDB.Close()

	type RawProvider struct {
		ID             string `gorm:"column:id"`
		AppType        string `gorm:"column:app_type"`
		Name           string `gorm:"column:name"`
		SettingsConfig string `gorm:"column:settings_config"`
		Category       string `gorm:"column:category"`
		ProviderType   string `gorm:"column:provider_type"`
		IsCurrent      bool   `gorm:"column:is_current"`
	}

	var raws []RawProvider
	if err := ccsDB.Raw("SELECT id, app_type, name, settings_config, category, provider_type, is_current FROM providers").Scan(&raws).Error; err != nil {
		return nil, fmt.Errorf("查询 providers 失败: %w", err)
	}

	log.Printf("[CCS] 从 %s 读取到 %d 条 provider 记录", dbPath, len(raws))

	var result []CCSProvider
	for _, r := range raws {
		p := CCSProvider{
			ID:       r.ID,
			AppType:  r.AppType,
			Name:     r.Name,
			Category: r.Category,
			ProviderType: r.ProviderType,
			IsCurrent: r.IsCurrent,
		}

		// Parse settings_config JSON to extract base_url and api_key
		var cfg map[string]any
		if err := json.Unmarshal([]byte(r.SettingsConfig), &cfg); err != nil {
			continue
		}

		// Claude providers: env.ANTHROPIC_BASE_URL / env.ANTHROPIC_AUTH_TOKEN
		if env, ok := cfg["env"].(map[string]any); ok {
			if v, ok := env["ANTHROPIC_BASE_URL"].(string); ok {
				p.BaseURL = v
			}
			if v, ok := env["ANTHROPIC_AUTH_TOKEN"].(string); ok {
				p.APIKey = v
			}
			if v, ok := env["ANTHROPIC_MODEL"].(string); ok {
				p.Model = v
			}
		}

		// Codex providers: auth.OPENAI_API_KEY + parse config TOML for base_url
		if auth, ok := cfg["auth"].(map[string]any); ok {
			if v, ok := auth["OPENAI_API_KEY"].(string); ok {
				p.APIKey = v
			}
		}
		if cfgStr, ok := cfg["config"].(string); ok && p.BaseURL == "" {
			// Simple TOML parsing for base_url
			for _, line := range strings.Split(cfgStr, "\n") {
				line = strings.TrimSpace(line)
				if strings.HasPrefix(line, "base_url") {
					parts := strings.SplitN(line, "=", 2)
					if len(parts) == 2 {
						p.BaseURL = strings.Trim(strings.TrimSpace(parts[1]), "\"")
					}
				}
				if strings.HasPrefix(line, "model =") || strings.HasPrefix(line, "model=") {
					parts := strings.SplitN(line, "=", 2)
					if len(parts) == 2 && p.Model == "" {
						p.Model = strings.Trim(strings.TrimSpace(parts[1]), "\"")
					}
				}
			}
		}

		if p.BaseURL != "" && p.APIKey != "" {
			result = append(result, p)
		}
	}

	return result, nil
}

func SyncCCSProviders() (int, error) {
	providers, err := ReadCCSProviders()
	if err != nil {
		return 0, err
	}

	added := 0
	for _, p := range providers {
		// Check if channel with same base_url and api_key already exists
		var count int64
		model.DB.Model(&model.Channel{}).
			Where("base_url = ? AND api_key = ?", p.BaseURL, p.APIKey).
			Count(&count)
		if count > 0 {
			continue
		}

		// Determine channel type and tag
		chType := model.ChannelTypeOpenAI
		chTag := "other"
		switch {
		case p.AppType == "claude":
			chType = model.ChannelTypeAnthropic
			chTag = "claude"
		case strings.Contains(strings.ToLower(p.AppType), "codex"):
			chTag = "codex"
		case strings.Contains(strings.ToLower(p.Name+p.BaseURL), "gemini") || strings.Contains(strings.ToLower(p.Name+p.BaseURL), "google"):
			chTag = "gemini"
		case strings.Contains(strings.ToLower(p.Name+p.BaseURL), "deepseek"):
			chTag = "deepseek"
		case strings.Contains(strings.ToLower(p.Name+p.BaseURL), "openai") || strings.Contains(strings.ToLower(p.Name+p.BaseURL), "chatgpt"):
			chTag = "openai"
		}

		ch := model.Channel{
			Name:    fmt.Sprintf("%s (%s)", p.Name, p.AppType),
			Type:    chType,
			Tag:     chTag,
			BaseURL: p.BaseURL,
			APIKey:  p.APIKey,
			Status:  model.ChannelStatusEnabled,
			AutoBan: true,
		}
		if err := model.DB.Create(&ch).Error; err != nil {
			log.Printf("[CCS-SYNC] create channel failed: %v", err)
			continue
		}
		added++
		log.Printf("[CCS-SYNC] added channel: %s -> %s", ch.Name, ch.BaseURL)
	}

	return added, nil
}
