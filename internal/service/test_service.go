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
	"gorm.io/gorm"
)

var (
	batchMutex   sync.Mutex
	batchRunning bool
	// Progress tracking
	batchTasks []TaskStatus
	progressMu sync.RWMutex
)

func setBatchRunning(running bool) {
	progressMu.Lock()
	batchRunning = running
	progressMu.Unlock()
}

// TaskStatus tracks the state of a single test task
type TaskStatus struct {
	Index       int    `json:"index"`
	ModelName   string `json:"model_name"`
	ChannelName string `json:"channel_name"`
	Status      string `json:"status"` // "pending", "running", "success", "failed"
	LatencyMs   int64  `json:"latency_ms,omitempty"`
	Error       string `json:"error,omitempty"`
}

func IsBatchRunning() bool {
	progressMu.RLock()
	defer progressMu.RUnlock()
	return batchRunning
}

type BatchProgress struct {
	Running   bool         `json:"running"`
	Total     int          `json:"total"`
	Completed int          `json:"completed"`
	Current   string       `json:"current"`
	Tasks     []TaskStatus `json:"tasks"`
}

func GetBatchProgress() BatchProgress {
	progressMu.RLock()
	defer progressMu.RUnlock()
	completed := 0
	current := ""
	for _, t := range batchTasks {
		if t.Status == "success" || t.Status == "failed" {
			completed++
		}
		if t.Status == "running" {
			current = t.ModelName + " @ " + t.ChannelName
		}
	}
	// Return a copy of tasks
	tasks := make([]TaskStatus, len(batchTasks))
	copy(tasks, batchTasks)
	return BatchProgress{
		Running:   batchRunning,
		Total:     len(batchTasks),
		Completed: completed,
		Current:   current,
		Tasks:     tasks,
	}
}

func initTaskList(tasks []testTask) {
	progressMu.Lock()
	batchTasks = make([]TaskStatus, len(tasks))
	for i, t := range tasks {
		batchTasks[i] = TaskStatus{
			Index:       i,
			ModelName:   t.entry.ModelName,
			ChannelName: t.ch.Name,
			Status:      "pending",
		}
	}
	progressMu.Unlock()
}

func updateTaskStatus(index int, status string, latencyMs int64, errMsg string) {
	progressMu.Lock()
	if index >= 0 && index < len(batchTasks) {
		batchTasks[index].Status = status
		batchTasks[index].LatencyMs = latencyMs
		batchTasks[index].Error = errMsg
	}
	progressMu.Unlock()
}

func clearTaskList() {
	progressMu.Lock()
	batchTasks = nil
	progressMu.Unlock()
}

func StartChannelTest(channelID uint) error {
	return startBatch(channelID, nil)
}

func StartAllModelsTest() error {
	return startBatch(0, nil)
}

func StartSelectedModelsTest(ids []uint) error {
	return startBatch(0, ids)
}

func TestAllModels(channelID uint) error {
	return runAllModels(channelID)
}

func TestSelectedModels(ids []uint) error {
	return runSelectedModels(ids)
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

	client, err := buildHTTPClient(timeout, channel)
	if err != nil {
		result.Success = false
		result.ErrorMessage = err.Error()
		result.ErrorType = "proxy_config_error"
		saveTestResult(result, entry)
		return result
	}
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

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		result.Success = false
		result.ErrorMessage = extractErrorMessage(respStr)
		result.ErrorType = extractErrorField(respStr, "error.type")
		result.ErrorCode = extractErrorField(respStr, "error.code")
		saveTestResult(result, entry)
		return result
	}

	if hasAPIError(respStr) {
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
	if text := extractSuccessPreview(body); text != "" {
		return text
	}
	if len(body) > 500 {
		return body[:500]
	}
	return body
}

func extractSuccessPreview(body string) string {
	if text := gjson.Get(body, "output_text").String(); text != "" {
		return text
	}
	if text := gjson.Get(body, "choices.0.message.content").String(); text != "" {
		return text
	}
	if text := gjson.Get(body, "content.0.text").String(); text != "" {
		return text
	}
	if text := gjson.Get(body, "output.0.content.0.text").String(); text != "" {
		return text
	}
	return ""
}

func extractErrorField(body, path string) string {
	return gjson.Get(body, path).String()
}

func hasAPIError(body string) bool {
	errorValue := gjson.Get(body, "error")
	if !errorValue.Exists() {
		return false
	}
	if errorValue.Type == gjson.JSON {
		return true
	}
	return strings.TrimSpace(errorValue.String()) != ""
}

func saveTestResult(result *model.TestResult, entry *model.ModelEntry) {
	model.DB.Create(result)

	updates := map[string]interface{}{
		"last_test_time":   time.Now(),
		"last_response_ms": result.ResponseMs,
		"test_count":       gorm.Expr("test_count + ?", 1),
	}
	if result.Success {
		updates["last_error"] = ""
	} else {
		updates["last_error"] = result.ErrorMessage
		updates["fail_count"] = gorm.Expr("fail_count + ?", 1)
	}
	model.DB.Model(&model.ModelEntry{}).Where("id = ?", entry.ID).Updates(updates)
}

func startBatch(channelID uint, ids []uint) error {
	if !batchMutex.TryLock() {
		return fmt.Errorf("batch test already in progress")
	}
	setBatchRunning(true)
	go func() {
		defer func() {
			setBatchRunning(false)
			batchMutex.Unlock()
		}()
		if len(ids) > 0 {
			_ = runSelectedModels(ids)
			return
		}
		_ = runAllModels(channelID)
	}()
	return nil
}

func runAllModels(channelID uint) error {
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

	// Collect all tasks
	var tasks []testTask
	for i := range channels {
		var models []model.ModelEntry
		model.DB.Where("channel_id = ? AND status != ?", channels[i].ID, model.ChannelStatusManuallyDisabled).Find(&models)
		for j := range models {
			tasks = append(tasks, testTask{entry: &models[j], ch: &channels[i]})
		}
	}

	initTaskList(tasks)
	runTestsConcurrently(tasks, autoDisable, autoEnable, thresholdMs, keywords)
	return nil
}

func runSelectedModels(ids []uint) error {
	autoDisable := GetSettingBool("auto_disable_enabled")
	autoEnable := GetSettingBool("auto_enable_enabled")
	thresholdSec := GetSettingFloat("channel_disable_threshold_seconds")
	thresholdMs := int64(thresholdSec * 1000)
	keywords := parseKeywords(GetSetting("disable_keywords"))

	var tasks []testTask
	for _, id := range ids {
		entry, err := GetModel(id)
		if err != nil {
			continue
		}
		var ch model.Channel
		if err := model.DB.First(&ch, entry.ChannelID).Error; err != nil {
			continue
		}
		chCopy := ch
		tasks = append(tasks, testTask{entry: entry, ch: &chCopy})
	}

	initTaskList(tasks)
	runTestsConcurrently(tasks, autoDisable, autoEnable, thresholdMs, keywords)
	return nil
}

// testTask represents a single model test to run
type testTask struct {
	entry *model.ModelEntry
	ch    *model.Channel
}

// runTestsConcurrently executes test tasks with a worker pool
func runTestsConcurrently(tasks []testTask, autoDisable, autoEnable bool, thresholdMs int64, keywords []string) {
	if len(tasks) == 0 {
		return
	}

	concurrency := 5
	if len(tasks) < concurrency {
		concurrency = len(tasks)
	}

	type indexedTask struct {
		index int
		task  testTask
	}
	taskCh := make(chan indexedTask, len(tasks))
	for i, t := range tasks {
		taskCh <- indexedTask{index: i, task: t}
	}
	close(taskCh)

	var wg sync.WaitGroup
	for w := 0; w < concurrency; w++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for it := range taskCh {
				t := it.task
				updateTaskStatus(it.index, "running", 0, "")

				result := TestSingleModel(t.entry, t.ch)

				if result.Success {
					updateTaskStatus(it.index, "success", result.ResponseMs, "")
				} else {
					errMsg := result.ErrorMessage
					if len(errMsg) > 80 {
						errMsg = errMsg[:80]
					}
					updateTaskStatus(it.index, "failed", result.ResponseMs, errMsg)
				}

				if autoDisable && t.ch.AutoBan {
					if shouldDisable, reason := shouldDisableModel(result, thresholdMs, keywords); shouldDisable {
						update := model.DB.Model(&model.ModelEntry{}).
							Where("id = ? AND status = ?", t.entry.ID, model.ChannelStatusEnabled).
							Update("status", model.ChannelStatusAutoDisabled)
						if update.Error == nil && update.RowsAffected > 0 {
							log.Printf("[AUTO-DISABLE] model=%s channel=%s reason=%s", t.entry.ModelName, t.ch.Name, reason)
						}
					}
				}
				if autoEnable && result.Success {
					update := model.DB.Model(&model.ModelEntry{}).
						Where("id = ? AND status = ?", t.entry.ID, model.ChannelStatusAutoDisabled).
						Update("status", model.ChannelStatusEnabled)
					if update.Error == nil && update.RowsAffected > 0 {
						log.Printf("[AUTO-ENABLE] model=%s channel=%s", t.entry.ModelName, t.ch.Name)
					}
				}
			}
		}()
	}
	wg.Wait()
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
