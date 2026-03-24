package model

import "time"

const (
	ChannelStatusEnabled          = 1
	ChannelStatusManuallyDisabled = 2
	ChannelStatusAutoDisabled     = 3
)

const (
	ChannelTypeOpenAI     = "openai"     // OpenAI Chat Completions (/v1/chat/completions)
	ChannelTypeResponses  = "responses"  // OpenAI Responses API (/v1/responses)
	ChannelTypeAnthropic  = "anthropic"  // Anthropic Messages API (/v1/messages)
)

type Channel struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `gorm:"size:128;not null;index" json:"name"`
	Type      string    `gorm:"size:32;default:openai" json:"type"` // openai, anthropic
	Tag        string    `gorm:"size:32;default:other;index" json:"tag"`    // claude, openai, gemini, deepseek, codex, other
	ToolSource string    `gorm:"size:32;default:''" json:"tool_source"`     // claude_code, codex, gemini_cli, or empty for auto
	BaseURL   string    `gorm:"size:512;not null" json:"base_url"`
	APIKey    string    `gorm:"size:512;not null" json:"-"`
	Status    int       `gorm:"default:1;index" json:"status"`
	AutoBan   bool      `gorm:"default:true" json:"auto_ban"`
	TestModel string    `gorm:"size:128" json:"test_model"`
	Priority  int       `gorm:"default:0" json:"priority"`
	Remark    string    `gorm:"size:512" json:"remark"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	// Computed fields
	APIKeyHint      string     `gorm:"-" json:"api_key_hint,omitempty"`
	ModelCount      int        `gorm:"-" json:"model_count,omitempty"`
	HealthyCount    int        `gorm:"-" json:"healthy_count,omitempty"`
	LastTestTime    *time.Time `gorm:"-" json:"last_test_time,omitempty"`
	AvgResponseTime *float64   `gorm:"-" json:"avg_response_time_ms,omitempty"`
}

func (c *Channel) ComputeHint() {
	if len(c.APIKey) > 4 {
		c.APIKeyHint = "****" + c.APIKey[len(c.APIKey)-4:]
	} else if len(c.APIKey) > 0 {
		c.APIKeyHint = "****"
	}
}
