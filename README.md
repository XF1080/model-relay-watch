# Model Relay Watch

> AI 模型中转服务监控平台，用于监控公益站、中转站的模型通道健康状态、可用性与响应质量。

---

## 功能特性

- **通道管理**：支持手动添加和从 CCS 同步 AI 模型通道，支持 OpenAI、Anthropic、Responses API 等多种接口类型
- **自动监控**：定时对所有通道的模型进行可用性测试，自动标记异常通道
- **历史记录**：保存每次测试的响应时间、状态、错误信息，支持按时间范围查询
- **统计看板**：展示各通道、各模型的成功率、平均响应时间、Token 用量等统计数据
- **WebDAV 同步**：支持通过 WebDAV 将数据库快照同步到远程存储，实现多端数据共享
- **自动清理**：定期清理过期历史记录，默认保留 7 天
- **前端 UI**：内置 Web 界面，支持仪表盘、通道管理、历史记录、统计等页面

---

## 技术栈

- **后端**：Go 1.21 + Gin + GORM + SQLite
- **前端**：React + TypeScript（构建产物内嵌到二进制）
- **数据库**：SQLite（单文件，无需额外部署）

---

## 快速开始

### 1. 下载或编译

**直接编译：**

```bash
git clone https://github.com/XF1080/model-relay-watch.git
cd model-relay-watch
go build -o model-relay-watch .
```

### 2. 启动服务

```bash
./model-relay-watch
```

默认监听端口 `8199`，启动后访问：

```
http://localhost:8199
```

### 3. 启动参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `-port` | `8199` | 监听端口 |
| `-db` | `data/model-monitor.db` | 数据库文件路径 |
| `-channel-name` | 空 | 初始通道名称 |
| `-channel-url` | 空 | 初始通道地址 |
| `-channel-key` | 空 | 初始通道 API Key |

**示例：**

```bash
./model-relay-watch -port 9000 -db /data/mrw.db
```

或者在启动时直接初始化一个通道：

```bash
./model-relay-watch \
  -channel-name "我的中转站" \
  -channel-url "https://api.example.com" \
  -channel-key "sk-xxxx"
```

---

## 界面说明

| 页面 | 说明 |
|------|------|
| 仪表盘 | 总览各通道健康状态、成功率、响应时间 |
| 通道管理 | 添加、编辑、删除、手动测试通道 |
| 历史记录 | 查看每次测试的详细结果 |
| Token 统计 | 按通道和模型统计 Token 用量 |
| 模型列表 | 查看各通道支持的模型 |
| 设置 | 配置自动测试间隔、WebDAV 同步、历史保留天数等 |

---

## 通道类型说明

| 类型 | 接口格式 | 适用场景 |
|------|----------|----------|
| `openai` | OpenAI Chat Completions `/v1/chat/completions` | 大多数中转站 |
| `anthropic` | Anthropic Messages API `/v1/messages` | 原生 Claude 接口 |
| `responses` | OpenAI Responses API `/v1/responses` | 支持 Responses API 的服务 |

---

## WebDAV 同步

支持将本地数据库快照同步到 WebDAV 远程存储，适合多机共享数据或备份。

在「设置」页面配置以下参数：

- **WebDAV 地址**：如 `https://dav.example.com`
- **用户名 / 密码**
- **远程目录**：默认 `cc-switch-sync`
- **配置名称**：默认 `default`，多端共用同一配置时保持一致

---

## 数据存储

所有数据存储在单个 SQLite 文件中，默认路径为：

```
data/model-monitor.db
```

可通过 `-db` 参数自定义路径。

---

## License

[MIT](LICENSE)
