package main

import (
	"context"
	"embed"
	"flag"
	"fmt"
	"log"
	"model-monitor/internal/model"
	"model-monitor/internal/router"
	"model-monitor/internal/service"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"

	"github.com/gin-gonic/gin"
)

//go:embed web/dist/*
var frontendFS embed.FS

func main() {
	port := flag.Int("port", 8199, "listen port")
	dbPath := flag.String("db", "", "database file path (default: data/model-monitor.db)")
	channelName := flag.String("channel-name", "", "default channel name")
	channelURL := flag.String("channel-url", "", "default channel URL")
	channelKey := flag.String("channel-key", "", "default channel API key")
	flag.Parse()

	// Determine DB path
	if *dbPath == "" {
		exe, _ := os.Executable()
		*dbPath = filepath.Join(filepath.Dir(exe), "data", "model-monitor.db")
	}
	os.MkdirAll(filepath.Dir(*dbPath), 0755)

	log.Printf("Model Monitor starting on :%d", *port)
	log.Printf("Database: %s", *dbPath)

	// Init DB
	model.InitDB(*dbPath)

	// Seed defaults
	model.SeedDefaults(*channelName, *channelURL, *channelKey)

	// Setup router
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	router.Setup(r, &frontendFS)

	// Start background services
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	service.StartMonitor(ctx)
	service.StartCleanupJob(ctx)
	service.StartAutoSync(ctx)

	// Graceful shutdown
	go func() {
		sigCh := make(chan os.Signal, 1)
		signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)
		<-sigCh
		log.Println("shutting down...")
		cancel()
		os.Exit(0)
	}()

	// Start server
	addr := fmt.Sprintf(":%d", *port)
	log.Printf("listening on %s", addr)
	if err := r.Run(addr); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
