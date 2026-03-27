package model

import "time"

type TestResult struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	ChannelID    uint      `gorm:"index;not null" json:"channel_id"`
	ModelEntryID uint      `gorm:"index;not null" json:"model_entry_id"`
	ModelName    string    `gorm:"size:128;index" json:"model_name"`
	Success      bool      `json:"success"`
	ResponseMs   int64     `json:"response_ms"`
	StatusCode   int       `json:"status_code"`
	ErrorMessage string    `gorm:"size:1024" json:"error_message"`
	ErrorType    string    `gorm:"size:128" json:"error_type"`
	ErrorCode    string    `gorm:"size:128" json:"error_code"`
	TestedAt     time.Time `gorm:"index" json:"tested_at"`

	// Network timing (httptrace)
	DnsMs  int64 `json:"dns_ms"`
	TcpMs  int64 `json:"tcp_ms"`
	TlsMs  int64 `json:"tls_ms"`
	TtfbMs int64 `json:"ttfb_ms"` // time to first byte

	// Token metrics (parsed from response)
	InputTokens  int     `json:"input_tokens"`
	OutputTokens int     `json:"output_tokens"`
	TokensPerSec float64 `json:"tokens_per_sec"`

	// Response quality
	FinishReason string `gorm:"size:64" json:"finish_reason"`

	ChannelName string `gorm:"-" json:"channel_name,omitempty"`
}
