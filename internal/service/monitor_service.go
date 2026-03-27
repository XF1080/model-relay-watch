package service

import (
	"context"
	"log"
	"model-relay-watch/internal/model"
	"time"
)

func StartMonitor(ctx context.Context) {
	go func() {
		log.Println("[MONITOR] background monitor started")
		for {
			if !GetSettingBool("auto_test_enabled") {
				select {
				case <-ctx.Done():
					log.Println("[MONITOR] stopped")
					return
				case <-time.After(30 * time.Second):
					continue
				}
			}

			interval := GetSettingFloat("auto_test_interval_minutes")
			if interval < 1 {
				interval = 10
			}

			log.Printf("[MONITOR] running auto-test, next in %.0f minutes", interval)
			if err := TestAllModels(0); err != nil {
				log.Printf("[MONITOR] auto-test error: %v", err)
			}

			select {
			case <-ctx.Done():
				log.Println("[MONITOR] stopped")
				return
			case <-time.After(time.Duration(interval) * time.Minute):
			}
		}
	}()
}

// CleanupHistory deletes test results older than the configured retention period.
func CleanupHistory() {
	days := GetSettingInt("history_retention_days")
	if days <= 0 {
		days = 7
	}
	cutoff := time.Now().AddDate(0, 0, -days)
	result := model.DB.Where("tested_at < ?", cutoff).Delete(&model.TestResult{})
	if result.RowsAffected > 0 {
		log.Printf("[CLEANUP] deleted %d old test results", result.RowsAffected)
	}
}

func StartCleanupJob(ctx context.Context) {
	go func() {
		for {
			select {
			case <-ctx.Done():
				return
			case <-time.After(6 * time.Hour):
				CleanupHistory()
			}
		}
	}()
}
