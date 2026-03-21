package service

import (
	"model-monitor/internal/model"
)

func GetAllChannels() ([]model.Channel, error) {
	var channels []model.Channel
	if err := model.DB.Order("priority desc, id asc").Find(&channels).Error; err != nil {
		return nil, err
	}
	for i := range channels {
		channels[i].ComputeHint()
		enrichChannelStats(&channels[i])
	}
	return channels, nil
}

func GetChannel(id uint) (*model.Channel, error) {
	var ch model.Channel
	if err := model.DB.First(&ch, id).Error; err != nil {
		return nil, err
	}
	ch.ComputeHint()
	enrichChannelStats(&ch)
	return &ch, nil
}

func CreateChannel(ch *model.Channel) error {
	return model.DB.Create(ch).Error
}

func UpdateChannel(ch *model.Channel) error {
	return model.DB.Save(ch).Error
}

func DeleteChannel(id uint) error {
	// Delete related models and test results
	model.DB.Where("channel_id = ?", id).Delete(&model.TestResult{})
	model.DB.Where("channel_id = ?", id).Delete(&model.ModelEntry{})
	return model.DB.Delete(&model.Channel{}, id).Error
}

func UpdateChannelStatus(id uint, status int) error {
	return model.DB.Model(&model.Channel{}).Where("id = ?", id).Update("status", status).Error
}

func enrichChannelStats(ch *model.Channel) {
	var totalCount, healthyCount int64
	model.DB.Model(&model.ModelEntry{}).Where("channel_id = ?", ch.ID).Count(&totalCount)
	model.DB.Model(&model.ModelEntry{}).Where("channel_id = ? AND status = ?", ch.ID, model.ChannelStatusEnabled).Count(&healthyCount)
	ch.ModelCount = int(totalCount)
	ch.HealthyCount = int(healthyCount)

	var entry model.ModelEntry
	if err := model.DB.Where("channel_id = ? AND last_test_time IS NOT NULL", ch.ID).
		Order("last_test_time desc").First(&entry).Error; err == nil {
		ch.LastTestTime = entry.LastTestTime
	}

	var avgMs float64
	row := model.DB.Model(&model.ModelEntry{}).
		Where("channel_id = ? AND last_response_ms IS NOT NULL AND status = ?", ch.ID, model.ChannelStatusEnabled).
		Select("AVG(last_response_ms)").Row()
	if row.Scan(&avgMs) == nil && avgMs > 0 {
		ch.AvgResponseTime = &avgMs
	}
}
