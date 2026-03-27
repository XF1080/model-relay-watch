@echo off
if not exist dist mkdir dist

set CGO_ENABLED=0

echo Building Windows amd64 executable...
set GOOS=windows
set GOARCH=amd64
go build -o dist\model-relay-watch-windows-amd64.exe .
echo Built: dist\model-relay-watch-windows-amd64.exe

echo Building Windows 386 executable...
set GOOS=windows
set GOARCH=386
go build -o dist\model-relay-watch-windows-386.exe .
echo Built: dist\model-relay-watch-windows-386.exe

echo Building macOS amd64 executable...
set GOOS=darwin
set GOARCH=amd64
go build -o dist\model-relay-watch-darwin-amd64 .
echo Built: dist\model-relay-watch-darwin-amd64

echo Building macOS arm64 executable...
set GOOS=darwin
set GOARCH=arm64
go build -o dist\model-relay-watch-darwin-arm64 .
echo Built: dist\model-relay-watch-darwin-arm64

echo Building Linux amd64 executable...
set GOOS=linux
set GOARCH=amd64
go build -o dist\model-relay-watch-linux-amd64 .
echo Built: dist\model-relay-watch-linux-amd64

echo Building Linux arm64 executable...
set GOOS=linux
set GOARCH=arm64
go build -o dist\model-relay-watch-linux-arm64 .
echo Built: dist\model-relay-watch-linux-arm64

echo Building Linux arm executable...
set GOOS=linux
set GOARCH=arm
set GOARM=7
go build -o dist\model-relay-watch-linux-arm .
echo Built: dist\model-relay-watch-linux-arm

echo Done.
