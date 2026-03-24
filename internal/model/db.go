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
func backfillToolSource() {
	var channels []Channel
	DB.Where("tool_source = '' OR tool_source IS NULL").Find(&channels)
	for _, ch := range channels {
		ts := inferToolSource(ch.Name)
		if ts != "" {
			DB.Model(&Channel{}).Where("id = ?", ch.ID).Update("tool_source", ts)
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
