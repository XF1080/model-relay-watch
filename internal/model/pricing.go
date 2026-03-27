package model

type ModelPricing struct {
	ModelKey        string  `gorm:"primaryKey;size:128" json:"model_key"`
	InputPrice      float64 `json:"input_price"`       // $/M input tokens
	OutputPrice     float64 `json:"output_price"`      // $/M output tokens
	CacheReadRatio  float64 `json:"cache_read_ratio"`  // multiplier on input price
	CacheWriteRatio float64 `json:"cache_write_ratio"` // multiplier on input price
}
