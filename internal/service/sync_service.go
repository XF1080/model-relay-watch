package service

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"path"
	"sync"
	"time"

	"model-monitor/internal/model"

	"github.com/studio-b12/gowebdav"
)

var syncMutex sync.Mutex

const snapshotFileName = "model-monitor.db.snapshot"

func newWebDAVClient() (*gowebdav.Client, error) {
	url := GetSetting("webdav_url")
	user := GetSetting("webdav_username")
	pass := GetSetting("webdav_password")
	if url == "" || user == "" || pass == "" {
		return nil, fmt.Errorf("WebDAV 未配置完整")
	}
	c := gowebdav.NewClient(url, user, pass)
	c.SetTimeout(30 * time.Second)
	return c, nil
}

func getRemotePath() string {
	dir := GetSetting("webdav_remote_dir")
	profile := GetSetting("webdav_profile_name")
	if dir == "" {
		dir = "model-monitor"
	}
	if profile == "" {
		profile = "default"
	}
	return path.Join(dir, profile, snapshotFileName)
}

func getRemoteDir() string {
	dir := GetSetting("webdav_remote_dir")
	profile := GetSetting("webdav_profile_name")
	if dir == "" {
		dir = "model-monitor"
	}
	if profile == "" {
		profile = "default"
	}
	return path.Join(dir, profile)
}

func TestWebDAVConnection() error {
	c, err := newWebDAVClient()
	if err != nil {
		return err
	}
	if err := c.Connect(); err != nil {
		return fmt.Errorf("连接失败: %w", err)
	}
	return c.MkdirAll(getRemoteDir(), 0755)
}

func UploadSnapshot() error {
	syncMutex.Lock()
	defer syncMutex.Unlock()

	dbPath := model.DBPath
	tmpPath := dbPath + ".uploading"

	// Flush WAL to main DB file
	model.DB.Exec("PRAGMA wal_checkpoint(FULL)")

	// Copy DB to temp file
	if err := copyFile(dbPath, tmpPath); err != nil {
		return fmt.Errorf("复制数据库失败: %w", err)
	}
	defer os.Remove(tmpPath)

	// Read temp file
	data, err := os.ReadFile(tmpPath)
	if err != nil {
		return fmt.Errorf("读取临时文件失败: %w", err)
	}

	// Upload
	c, err := newWebDAVClient()
	if err != nil {
		return err
	}

	remoteDir := getRemoteDir()
	if err := c.MkdirAll(remoteDir, 0755); err != nil {
		return fmt.Errorf("创建远程目录失败: %w", err)
	}

	remotePath := getRemotePath()
	if err := c.Write(remotePath, data, 0644); err != nil {
		return fmt.Errorf("上传失败: %w", err)
	}

	// Record sync time
	now := time.Now().Format(time.RFC3339)
	UpdateSettings(map[string]string{
		"webdav_last_sync_time": now,
		"webdav_last_sync_type": "upload",
	})
	log.Printf("[SYNC] uploaded snapshot (%d bytes) to %s", len(data), remotePath)
	return nil
}

func DownloadSnapshot() error {
	syncMutex.Lock()
	defer syncMutex.Unlock()

	c, err := newWebDAVClient()
	if err != nil {
		return err
	}

	remotePath := getRemotePath()
	data, err := c.Read(remotePath)
	if err != nil {
		return fmt.Errorf("下载失败: %w", err)
	}

	dbPath := model.DBPath
	backupPath := dbPath + ".backup"
	tmpPath := dbPath + ".downloading"

	// Backup current DB
	if err := copyFile(dbPath, backupPath); err != nil {
		return fmt.Errorf("备份失败: %w", err)
	}

	// Write downloaded data to temp file
	if err := os.WriteFile(tmpPath, data, 0644); err != nil {
		return fmt.Errorf("写入临时文件失败: %w", err)
	}

	// Close current DB connection
	sqlDB, _ := model.DB.DB()
	if sqlDB != nil {
		sqlDB.Close()
	}

	// Replace DB file
	if err := os.Rename(tmpPath, dbPath); err != nil {
		model.InitDB(dbPath)
		return fmt.Errorf("替换数据库失败: %w", err)
	}

	// Reinitialize DB
	model.InitDB(dbPath)

	now := time.Now().Format(time.RFC3339)
	UpdateSettings(map[string]string{
		"webdav_last_sync_time": now,
		"webdav_last_sync_type": "download",
	})
	log.Printf("[SYNC] downloaded snapshot (%d bytes) from %s", len(data), remotePath)
	return nil
}

func GetSyncStatus() map[string]any {
	result := map[string]any{
		"configured":     GetSetting("webdav_url") != "" && GetSetting("webdav_username") != "",
		"auto_sync":      GetSettingBool("webdav_auto_sync"),
		"last_sync_time": GetSetting("webdav_last_sync_time"),
		"last_sync_type": GetSetting("webdav_last_sync_type"),
		"profile_name":   GetSetting("webdav_profile_name"),
	}

	// Local DB info
	if fi, err := os.Stat(model.DBPath); err == nil {
		result["local_size"] = fi.Size()
		result["local_modified"] = fi.ModTime().Format(time.RFC3339)
	}

	// Remote file info (best effort)
	c, err := newWebDAVClient()
	if err == nil {
		info, err := c.Stat(getRemotePath())
		if err == nil {
			result["remote_size"] = info.Size()
			result["remote_modified"] = info.ModTime().Format(time.RFC3339)
		}
	}

	return result
}

func StartAutoSync(ctx context.Context) {
	go func() {
		log.Println("[AUTO-SYNC] watcher started")
		var lastMod time.Time
		if fi, err := os.Stat(model.DBPath); err == nil {
			lastMod = fi.ModTime()
		}

		for {
			select {
			case <-ctx.Done():
				log.Println("[AUTO-SYNC] stopped")
				return
			case <-time.After(60 * time.Second):
			}

			if !GetSettingBool("webdav_auto_sync") {
				continue
			}
			if GetSetting("webdav_url") == "" {
				continue
			}

			fi, err := os.Stat(model.DBPath)
			if err != nil {
				continue
			}

			if fi.ModTime().After(lastMod) {
				log.Println("[AUTO-SYNC] DB changed, uploading...")
				if err := UploadSnapshot(); err != nil {
					log.Printf("[AUTO-SYNC] upload error: %v", err)
				} else {
					lastMod = fi.ModTime()
				}
			}
		}
	}()
}

func copyFile(src, dst string) error {
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer in.Close()

	out, err := os.Create(dst)
	if err != nil {
		return err
	}

	_, err = io.Copy(out, in)
	if closeErr := out.Close(); err == nil {
		err = closeErr
	}
	return err
}
