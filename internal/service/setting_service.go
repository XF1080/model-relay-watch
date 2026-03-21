package service

import (
	"model-monitor/internal/model"
	"strconv"
)

func GetAllSettings() (map[string]string, error) {
	var settings []model.Setting
	if err := model.DB.Find(&settings).Error; err != nil {
		return nil, err
	}
	result := make(map[string]string)
	for _, s := range settings {
		result[s.Key] = s.Value
	}
	return result, nil
}

func GetSetting(key string) string {
	var s model.Setting
	if err := model.DB.Where("key = ?", key).First(&s).Error; err != nil {
		if def, ok := model.DefaultSettings[key]; ok {
			return def
		}
		return ""
	}
	return s.Value
}

func GetSettingFloat(key string) float64 {
	v, _ := strconv.ParseFloat(GetSetting(key), 64)
	return v
}

func GetSettingInt(key string) int {
	v, _ := strconv.Atoi(GetSetting(key))
	return v
}

func GetSettingBool(key string) bool {
	return GetSetting(key) == "true"
}

func UpdateSettings(settings map[string]string) error {
	for key, value := range settings {
		result := model.DB.Where("key = ?", key).Assign(model.Setting{Value: value}).FirstOrCreate(&model.Setting{Key: key})
		if result.Error != nil {
			return result.Error
		}
	}
	return nil
}
