package service

import (
	"bytes"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"model-monitor/internal/model"
	"net/http"
	"net/http/httptrace"
	"strings"
	"sync"
	"time"

	"github.com/tidwall/gjson"
)

var (
	batchMutex   sync.Mutex
	batchRunning bool
)

func IsBatchRunning() bool {
	return batchRunning
}

type netTimings struct {
	dnsStart, dnsDone     time.Time
	connectStart, connectDone time.Time
	tlsStart, tlsDone     time.Time
	gotFirstByte          time.Time
}

func TestSingleModel(entry *model.ModelEntry, channel *model.Channel) *model.TestResult {
	result := &model.TestResult{
		ChannelID:    channel.ID,
		ModelEntryID: entry.ID,
		ModelName:    entry.ModelName,
		TestedAt:     time.Now(),
	}

	timeout := time.Duration(GetSettingInt("test_request_timeout_seconds")) * time.Second
	if timeout == 0 {
		timeout = 30 * time.Second
	}
	maxTokens := GetSettingInt("test_max_tokens")
	if maxTokens == 0 {
		maxTokens = 16
	}

	url, payload := buildTestRequest(channel.Type, channel.BaseURL, entry.ModelName, entry.EndpointType, maxTokens)

	client := &http.Client{Timeout: timeout}
	body, _ := json.Marshal(payload)
	req, err := http.NewRequest("POST", url, bytes.NewReader(body))
	if err != nil {
		result.Success = false
		result.ErrorMessage = err.Error()
		result.ErrorType = "request_build_error"
		saveTestResult(result, entry)
		return result
	}
	req.Header.Set("Content-Type", "application/json")

	switch channel.Type {
	case model.ChannelTypeAnthropic:
		req.Header.Set("x-api-key", channel.APIKey)
		req.Header.Set("anthropic-version", "2023-06-01")
	default:
		req.Header.Set("Authorization", "Bearer "+channel.APIKey)
	}

	// Setup httptrace for network timing
	var nt netTimings
	trace := &httptrace.ClientTrace{
		DNSStart:             func(_ httptrace.DNSStartInfo) { nt.dnsStart = time.Now() },
		DNSDone:              func(_ httptrace.DNSDoneInfo) { nt.dnsDone = time.Now() },
		ConnectStart:         func(_, _ string) { nt.connectStart = time.Now() },
		ConnectDone:          func(_, _ string, _ error) { nt.connectDone = time.Now() },
		TLSHandshakeStart:    func() { nt.tlsStart = time.Now() },
		TLSHandshakeDone:     func(_ tls.ConnectionState, _ error) { nt.tlsDone = time.Now() },
		GotFirstResponseByte: func() { nt.gotFirstByte = time.Now() },
	}
	req = req.WithContext(httptrace.WithClientTrace(req.Context(), trace))

	start := time.Now()
	resp, err := client.Do(req)
	elapsed := time.Since(start)
	result.ResponseMs = elapsed.Milliseconds()

	// Record network timings
	if !nt.dnsStart.IsZero() && !nt.dnsDone.IsZero() {
		result.DnsMs = nt.dnsDone.Sub(nt.dnsStart).Milliseconds()
	}
	if !nt.connectStart.IsZero() && !nt.connectDone.IsZero() {
		result.TcpMs = nt.connectDone.Sub(nt.connectStart).Milliseconds()
	}
	if !nt.tlsStart.IsZero() && !nt.tlsDone.IsZero() {
		result.TlsMs = nt.tlsDone.Sub(nt.tlsStart).Milliseconds()
	}
	if !nt.gotFirstByte.IsZero() {
		result.TtfbMs = nt.gotFirstByte.Sub(start).Milliseconds()
	}

	if err != nil {
		result.Success = false
		result.ErrorMessage = err.Error()
		result.ErrorType = "connection_error"
		saveTestResult(result, entry)
		return result
	}
	defer resp.Body.Close()

	result.StatusCode = resp.StatusCode
	respBody, _ := io.ReadAll(resp.Body)
	respStr := string(respBody)

	if resp.StatusCode != 200 {
		result.Success = false
		result.ErrorMessage = extractErrorMessage(respStr)
		result.ErrorType = extractErrorField(respStr, "error.type")
		result.ErrorCode = extractErrorField(respStr, "error.code")
		saveTestResult(result, entry)
		return result
	}

	if gjson.Get(respStr, "error").Exists() {
		result.Success = false
		result.ErrorMessage = extractErrorMessage(respStr)
		result.ErrorType = extractErrorField(respStr, "error.type")
		result.ErrorCode = extractErrorField(respStr, "error.code")
		saveTestResult(result, entry)
		return result
	}

	// Parse token usage and finish reason
	parseResponseMetrics(respStr, channel.Type, result)

	// Calculate tokens per second
	if result.OutputTokens > 0 && result.ResponseMs > 0 {
		result.TokensPerSec = float64(result.OutputTokens) / (float64(result.ResponseMs) / 1000.0)
	}

	result.Success = true
	saveTestResult(result, entry)
	return result
}

func parseResponseMetrics(body, channelType string, result *model.TestResult) {
	switch channelType {
	case model.ChannelTypeAnthropic:
		// Anthropic: {"usage": {"input_tokens": X, "output_tokens": Y}, "stop_reason": "end_turn"}
		result.InputTokens = int(gjson.Get(body, "usage.input_tokens").Int())
		result.OutputTokens = int(gjson.Get(body, "usage.output_tokens").Int())
		result.FinishReason = gjson.Get(body, "stop_reason").String()
	default:
		// OpenAI: {"usage": {"prompt_tokens": X, "completion_tokens": Y}, "choices": [{"finish_reason": "stop"}]}
		result.InputTokens = int(gjson.Get(body, "usage.prompt_tokens").Int())
		result.OutputTokens = int(gjson.Get(body, "usage.completion_tokens").Int())
		result.FinishReason = gjson.Get(body, "choices.0.finish_reason").String()
		// Responses API
		if result.InputTokens == 0 {
			result.InputTokens = int(gjson.Get(body, "usage.input_tokens").Int())
			result.OutputTokens = int(gjson.Get(body, "usage.output_tokens").Int())
		}
		if result.FinishReason == "" {
			result.FinishReason = gjson.Get(body, "status").String()
		}
	}
}

func buildTestRequest(channelType, baseURL, modelName, endpointType string, maxTokens int) (string, map[string]interface{}) {
	base := strings.TrimRight(baseURL, "/")
	base = strings.TrimSuffix(base, "/v1")
	base = strings.TrimSuffix(base, "/v1beta")
	base = strings.TrimRight(base, "/")

	switch channelType {
	case model.ChannelTypeAnthropic:
		return base + "/v1/messages", map[string]interface{}{
			"model":      modelName,
			"messages":   []map[string]string{{"role": "user", "content": "hi"}},
			"max_tokens": maxTokens,
		}
	case model.ChannelTypeResponses:
		return base + "/v1/responses", map[string]interface{}{
			"model":             modelName,
			"input":             "hi",
			"max_output_tokens": maxTokens,
			"stream":            false,
		}
	default:
		switch endpointType {
		case "embedding":
			return base + "/v1/embeddings", map[string]interface{}{
				"model": modelName,
				"input": "hello",
			}
		default:
			return base + "/v1/chat/completions", map[string]interface{}{
				"model":      modelName,
				"messages":   []map[string]string{{"role": "user", "content": "hi"}},
				"max_tokens": maxTokens,
				"stream":     false,
			}
		}
	}
}

func extractErrorMessage(body string) string {
	msg := gjson.Get(body, "error.message").String()
	if msg != "" {
		return msg
	}
	msg = gjson.Get(body, "message").String()
	if msg != "" {
		return msg
	}
	if len(body) > 500 {
		return body[:500]
	}
	return body
}

func extractErrorField(body, path string) string {
	return gjson.Get(body, path).String()
}

func saveTestResult(result *model.TestResult, entry *model.ModelEntry) {
	model.DB.Create(result)

	now := time.Now()
	updates := map[string]interface{}{
		"last_test_time":   now,
		"last_response_ms": result.ResponseMs,
		"test_count":       entry.TestCount + 1,
	}
	if result.Success {
		updates["last_error"] = ""
	} else {
		updates["last_error"] = result.ErrorMessage
		updates["fail_count"] = entry.FailCount + 1
	}
	model.DB.Model(&model.ModelEntry{}).Where("id = ?", entry.ID).Updates(updates)
}

func TestAllModels(channelID uint) error {
	if !batchMutex.TryLock() {
		return fmt.Errorf("batch test already in progress")
	}
	batchRunning = true
	defer func() {
		batchRunning = false
		batchMutex.Unlock()
	}()

	var channels []model.Channel
	q := model.DB.Where("status != ?", model.ChannelStatusManuallyDisabled)
	if channelID > 0 {
		q = q.Where("id = ?", channelID)
	}
	if err := q.Find(&channels).Error; err != nil {
		return err
	}

	autoDisable := GetSettingBool("auto_disable_enabled")
	autoEnable := GetSettingBool("auto_enable_enabled")
	thresholdSec := GetSettingFloat("channel_disable_threshold_seconds")
	thresholdMs := int64(thresholdSec * 1000)
	keywords := parseKeywords(GetSetting("disable_keywords"))

	for _, ch := range channels {
		var models []model.ModelEntry
		model.DB.Where("channel_id = ? AND status != ?", ch.ID, model.ChannelStatusManuallyDisabled).Find(&models)

		for i := range models {
			entry := &models[i]
			result := TestSingleModel(entry, &ch)

			if autoDisable && ch.AutoBan && entry.Status == model.ChannelStatusEnabled {
				if shouldDisable, reason := shouldDisableModel(result, thresholdMs, keywords); shouldDisable {
					UpdateModelStatus(entry.ID, model.ChannelStatusAutoDisabled)
					log.Printf("[AUTO-DISABLE] model=%s channel=%s reason=%s", entry.ModelName, ch.Name, reason)
				}
			}

			if autoEnable && result.Success && entry.Status == model.ChannelStatusAutoDisabled {
				UpdateModelStatus(entry.ID, model.ChannelStatusEnabled)
				log.Printf("[AUTO-ENABLE] model=%s channel=%s", entry.ModelName, ch.Name)
			}

			time.Sleep(500 * time.Millisecond)
		}
	}
	return nil
}

func shouldDisableModel(result *model.TestResult, thresholdMs int64, keywords []string) (bool, string) {
	if result.Success {
		if thresholdMs > 0 && result.ResponseMs > thresholdMs {
			return true, fmt.Sprintf("response time %dms exceeds threshold %dms", result.ResponseMs, thresholdMs)
		}
		return false, ""
	}
	if result.ErrorType == "connection_error" {
		return true, "connection error: " + result.ErrorMessage
	}
	disableStatuses := map[int]bool{401: true, 403: true}
	if disableStatuses[result.StatusCode] {
		return true, fmt.Sprintf("HTTP %d: %s", result.StatusCode, result.ErrorMessage)
	}
	disableCodes := map[string]bool{"invalid_api_key": true, "account_deactivated": true, "billing_not_active": true}
	if disableCodes[result.ErrorCode] {
		return true, result.ErrorMessage
	}
	disableTypes := map[string]bool{"insufficient_quota": true, "authentication_error": true, "permission_error": true, "forbidden": true}
	if disableTypes[result.ErrorType] {
		return true, result.ErrorMessage
	}
	lowerMsg := strings.ToLower(result.ErrorMessage)
	for _, kw := range keywords {
		if strings.Contains(lowerMsg, kw) {
			return true, fmt.Sprintf("matched keyword '%s'", kw)
		}
	}
	return false, ""
}

func parseKeywords(s string) []string {
	parts := strings.Split(s, ",")
	var result []string
	for _, p := range parts {
		p = strings.TrimSpace(strings.ToLower(p))
		if p != "" {
			result = append(result, p)
		}
	}
	return result
}

func TestSelectedModels(ids []uint) error {
	if !batchMutex.TryLock() {
		return fmt.Errorf("batch test already in progress")
	}
	batchRunning = true
	defer func() {
		batchRunning = false
		batchMutex.Unlock()
	}()

	autoDisable := GetSettingBool("auto_disable_enabled")
	autoEnable := GetSettingBool("auto_enable_enabled")
	thresholdSec := GetSettingFloat("channel_disable_threshold_seconds")
	thresholdMs := int64(thresholdSec * 1000)
	keywords := parseKeywords(GetSetting("disable_keywords"))

	for _, id := range ids {
		entry, err := GetModel(id)
		if err != nil {
			continue
		}
		var ch model.Channel
		if err := model.DB.First(&ch, entry.ChannelID).Error; err != nil {
			continue
		}

		result := TestSingleModel(entry, &ch)

		if autoDisable && ch.AutoBan && entry.Status == model.ChannelStatusEnabled {
			if shouldDisable, reason := shouldDisableModel(result, thresholdMs, keywords); shouldDisable {
				UpdateModelStatus(entry.ID, model.ChannelStatusAutoDisabled)
				log.Printf("[AUTO-DISABLE] model=%s channel=%s reason=%s", entry.ModelName, ch.Name, reason)
			}
		}
		if autoEnable && result.Success && entry.Status == model.ChannelStatusAutoDisabled {
			UpdateModelStatus(entry.ID, model.ChannelStatusEnabled)
			log.Printf("[AUTO-ENABLE] model=%s channel=%s", entry.ModelName, ch.Name)
		}

		time.Sleep(500 * time.Millisecond)
	}
	return nil
}
