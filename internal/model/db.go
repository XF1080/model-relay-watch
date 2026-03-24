package model

import (
	"log"
	"strings"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB
var DBPath string

func InitDB(dbPath string) {
	DBPath = dbPath
	var err error
	DB, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Warn),
	})
	if err != nil {
		log.Fatalf("failed to open database: %v", err)
	}

	err = DB.AutoMigrate(&Channel{}, &ModelEntry{}, &TestResult{}, &Setting{}, &ModelPricing{})
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	backfillToolSource()
}

func SeedDefaults(channelName, channelURL, channelKey string) {
	// Seed default settings
	for key, value := range DefaultSettings {
		DB.Where(Setting{Key: key}).FirstOrCreate(&Setting{Key: key, Value: value})
	}

	// Seed default channel if none exists
	var count int64
	DB.Model(&Channel{}).Count(&count)
	if count == 0 && channelURL != "" {
		ch := Channel{
			Name:    channelName,
			BaseURL: channelURL,
			APIKey:  channelKey,
			Status:  ChannelStatusEnabled,
			AutoBan: true,
		}
		DB.Create(&ch)
		log.Printf("created default channel: %s (%s)", channelName, channelURL)
	}
}

// SeedOfficialPricing inserts official pricing entries that don't exist yet.
// Existing custom entries are preserved.
func SeedOfficialPricing(items []ModelPricing) {
	for i := range items {
		var existing ModelPricing
		result := DB.Where("model_key = ?", items[i].ModelKey).First(&existing)
		if result.RowsAffected == 0 {
			DB.Create(&items[i])
		}
	}
}

// backfillToolSource sets tool_source for existing channels that were synced
// from CCS before the tool_source field was added.
// Channel names from CCS have the format "Name (AppType)".
// Also fixes channel type based on API key format.
func backfillToolSource() {
	var channels []Channel
	DB.Find(&channels)
	for _, ch := range channels {
		updates := map[string]any{}

		// Backfill tool_source if empty
		if ch.ToolSource == "" {
			if ts := inferToolSource(ch.Name); ts != "" {
				updates["tool_source"] = ts
			}
		}

		// Fix channel type based on API key prefix
		correctType := inferChannelType(ch.APIKey)
		if correctType != "" && correctType != ch.Type {
			updates["type"] = correctType
		}

		if len(updates) > 0 {
			DB.Model(&Channel{}).Where("id = ?", ch.ID).Updates(updates)
		}
	}
}

func inferToolSource(name string) string {
	lower := strings.ToLower(name)
	// CCS sync names: "ProviderName (app_type)"
	if idx := strings.LastIndex(lower, "("); idx >= 0 {
		appType := strings.TrimSuffix(strings.TrimSpace(lower[idx+1:]), ")")
		switch {
		case appType == "claude" || strings.Contains(appType, "claude"):
			return "claude_code"
		case strings.Contains(appType, "codex"):
			return "codex"
		case strings.Contains(appType, "gemini"):
			return "gemini_cli"
		}
	}
	return ""
}

// inferChannelType guesses the API protocol from the API key format.
func inferChannelType(apiKey string) string {
	if strings.HasPrefix(apiKey, "sk-ant-") {
		return ChannelTypeAnthropic
	}
	if strings.HasPrefix(apiKey, "sk-") || strings.HasPrefix(apiKey, "key-") {
		return ChannelTypeOpenAI
	}
	return ""
}
