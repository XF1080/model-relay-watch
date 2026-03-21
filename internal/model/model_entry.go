package model

import "time"

type ModelEntry struct {
	ID             uint       `gorm:"primaryKey" json:"id"`
	ChannelID      uint       `gorm:"uniqueIndex:idx_channel_model;not null" json:"channel_id"`
	ModelName      string     `gorm:"size:128;uniqueIndex:idx_channel_model;not null" json:"model_name"`
	EndpointType   string     `gorm:"size:32;default:chat" json:"endpoint_type"`
	Status         int        `gorm:"default:1;index" json:"status"`
	LastTestTime   *time.Time `json:"last_test_time"`
	LastResponseMs *int64     `json:"last_response_ms"`
	LastError      string     `gorm:"size:1024" json:"last_error"`
	TestCount      int        `gorm:"default:0" json:"test_count"`
	FailCount      int        `gorm:"default:0" json:"fail_count"`
	CreatedAt      time.Time  `json:"created_at"`
	UpdatedAt      time.Time  `json:"updated_at"`

	Channel *Channel `gorm:"foreignKey:ChannelID" json:"channel,omitempty"`
}

func (m *ModelEntry) SuccessRate() float64 {
	if m.TestCount == 0 {
		return 0
	}
	return float64(m.TestCount-m.FailCount) / float64(m.TestCount) * 100
}
