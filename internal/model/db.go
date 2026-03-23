package model

import (
	"log"

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
	for _, item := range items {
		DB.Where(ModelPricing{ModelKey: item.ModelKey}).FirstOrCreate(&item)
	}
}
