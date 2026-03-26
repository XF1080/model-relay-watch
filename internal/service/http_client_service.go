package service

import (
	"context"
	"fmt"
	"model-monitor/internal/model"
	"net"
	"net/http"
	"net/url"
	"strings"
	"time"

	"golang.org/x/net/proxy"
)

func resolveTestProxyURL(channel *model.Channel) string {
	if channel != nil && strings.TrimSpace(channel.ProxyURL) != "" {
		return strings.TrimSpace(channel.ProxyURL)
	}
	return strings.TrimSpace(GetSetting("test_proxy_url"))
}

func buildHTTPClient(timeout time.Duration, channel *model.Channel) (*http.Client, error) {
	transport := http.DefaultTransport.(*http.Transport).Clone()
	transport.Proxy = nil

	proxyURL := resolveTestProxyURL(channel)
	if proxyURL != "" {
		parsed, err := url.Parse(proxyURL)
		if err != nil {
			return nil, fmt.Errorf("invalid proxy url: %w", err)
		}

		switch strings.ToLower(parsed.Scheme) {
		case "http", "https":
			transport.Proxy = http.ProxyURL(parsed)
		case "socks5", "socks5h":
			dialer, err := proxy.FromURL(parsed, proxy.Direct)
			if err != nil {
				return nil, fmt.Errorf("invalid socks5 proxy: %w", err)
			}
			transport.DialContext = func(ctx context.Context, network, addr string) (net.Conn, error) {
				type dialResult struct {
					conn net.Conn
					err  error
				}
				ch := make(chan dialResult, 1)
				go func() {
					conn, err := dialer.Dial(network, addr)
					ch <- dialResult{conn: conn, err: err}
				}()

				select {
				case <-ctx.Done():
					return nil, ctx.Err()
				case result := <-ch:
					return result.conn, result.err
				}
			}
		default:
			return nil, fmt.Errorf("unsupported proxy scheme: %s", parsed.Scheme)
		}
	}

	return &http.Client{
		Timeout:   timeout,
		Transport: transport,
	}, nil
}
