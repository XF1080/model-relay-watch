package model

type Setting struct {
	Key   string `gorm:"primaryKey;size:128" json:"key"`
	Value string `gorm:"size:4096;not null" json:"value"`
}

var DefaultSettings = map[string]string{
	"auto_test_enabled":                   "false",
	"auto_test_interval_minutes":          "10",
	"channel_disable_threshold_seconds":   "10",
	"auto_disable_enabled":                "true",
	"auto_enable_enabled":                 "true",
	"test_request_timeout_seconds":        "30",
	"test_max_tokens":                     "16",
	"history_retention_days":              "7",
	"disable_keywords":                    "insufficient_quota,authentication_error,invalid_api_key,billing_not_active,permission_error,account_deactivated",
	"webdav_url":                          "",
	"webdav_username":                     "",
	"webdav_password":                     "",
	"webdav_remote_dir":                   "cc-switch-sync",
	"webdav_profile_name":                 "default",
	"webdav_auto_sync":                    "false",
	"webdav_last_sync_time":               "",
	"webdav_last_sync_type":               "",
	"ccs_db_path":                         "",
}
