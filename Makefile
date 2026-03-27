APP_NAME = model-relay-watch
OUTPUT_DIR = dist

.PHONY: all build-windows-amd64 build-windows-386 build-darwin-amd64 build-darwin-arm64 build-linux-amd64 build-linux-arm64 build-linux-arm clean

all: build-windows-amd64 build-windows-386 build-darwin-amd64 build-darwin-arm64 build-linux-amd64 build-linux-arm64 build-linux-arm

build-windows-amd64:
	@mkdir -p $(OUTPUT_DIR)
	GOOS=windows GOARCH=amd64 CGO_ENABLED=0 go build -o $(OUTPUT_DIR)/$(APP_NAME)-windows-amd64.exe .
	@echo "Built: $(OUTPUT_DIR)/$(APP_NAME)-windows-amd64.exe"

build-windows-386:
	@mkdir -p $(OUTPUT_DIR)
	GOOS=windows GOARCH=386 CGO_ENABLED=0 go build -o $(OUTPUT_DIR)/$(APP_NAME)-windows-386.exe .
	@echo "Built: $(OUTPUT_DIR)/$(APP_NAME)-windows-386.exe"

build-darwin-amd64:
	@mkdir -p $(OUTPUT_DIR)
	GOOS=darwin GOARCH=amd64 CGO_ENABLED=0 go build -o $(OUTPUT_DIR)/$(APP_NAME)-darwin-amd64 .
	@echo "Built: $(OUTPUT_DIR)/$(APP_NAME)-darwin-amd64"

build-darwin-arm64:
	@mkdir -p $(OUTPUT_DIR)
	GOOS=darwin GOARCH=arm64 CGO_ENABLED=0 go build -o $(OUTPUT_DIR)/$(APP_NAME)-darwin-arm64 .
	@echo "Built: $(OUTPUT_DIR)/$(APP_NAME)-darwin-arm64"

build-linux-amd64:
	@mkdir -p $(OUTPUT_DIR)
	GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o $(OUTPUT_DIR)/$(APP_NAME)-linux-amd64 .
	@echo "Built: $(OUTPUT_DIR)/$(APP_NAME)-linux-amd64"

build-linux-arm64:
	@mkdir -p $(OUTPUT_DIR)
	GOOS=linux GOARCH=arm64 CGO_ENABLED=0 go build -o $(OUTPUT_DIR)/$(APP_NAME)-linux-arm64 .
	@echo "Built: $(OUTPUT_DIR)/$(APP_NAME)-linux-arm64"

build-linux-arm:
	@mkdir -p $(OUTPUT_DIR)
	GOOS=linux GOARCH=arm GOARM=7 CGO_ENABLED=0 go build -o $(OUTPUT_DIR)/$(APP_NAME)-linux-arm .
	@echo "Built: $(OUTPUT_DIR)/$(APP_NAME)-linux-arm"

clean:
	rm -rf $(OUTPUT_DIR)
