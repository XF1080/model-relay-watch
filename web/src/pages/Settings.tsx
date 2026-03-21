import { useEffect, useState } from 'react';
import { Form, Button, Toast, Typography, Modal } from '@douyinfe/semi-ui';
import { getSettings, updateSettings, testSyncConnection, syncUpload, syncDownload, getSyncStatus } from '../api/client';
import type { Settings as SettingsType, SyncStatus } from '../types';

const { Text } = Typography;

const S = {
  page: { padding: '28px 32px', maxWidth: 700, margin: '0 auto', fontFamily: "Inter,-apple-system,'Segoe UI',sans-serif" } as React.CSSProperties,
  card: {
    background: '#fff', borderRadius: 14, padding: '22px 26px',
    border: '1px solid #ececf1', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    marginBottom: 16,
  } as React.CSSProperties,
  cardTitle: {
    fontSize: 15, fontWeight: 700, color: '#16192c', marginBottom: 16,
    paddingBottom: 12, borderBottom: '1px solid #ececf1',
    display: 'flex', alignItems: 'center', gap: 8,
  } as React.CSSProperties,
  hint: {
    fontSize: 12, color: '#9ca3af', display: 'block', marginBottom: 12, marginTop: -4,
  } as React.CSSProperties,
};

export default function Settings() {
  const [settings, setSettings] = useState<SettingsType>({});
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [syncLoading, setSyncLoading] = useState('');

  useEffect(() => { getSettings().then(setSettings); }, []);
  useEffect(() => { getSyncStatus().then(setSyncStatus).catch(() => {}); }, []);

  const handleSave = async (values: Record<string, any>) => {
    setLoading(true);
    try {
      const s: SettingsType = {};
      for (const [k, v] of Object.entries(values)) {
        s[k] = String(v);
      }
      await updateSettings(s);
      Toast.success('设置已保存');
    } catch {
      Toast.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  const loaded = Object.keys(settings).length > 0;

  const handleTestConnection = async () => {
    setSyncLoading('test');
    try {
      const res = await testSyncConnection();
      if (res.success) {
        Toast.success('连接成功');
      } else {
        Toast.error('连接失败: ' + (res.error || '未知错误'));
      }
    } catch {
      Toast.error('连接测试失败');
    } finally {
      setSyncLoading('');
    }
  };

  const handleUpload = async () => {
    setSyncLoading('upload');
    try {
      await syncUpload();
      Toast.success('上传成功');
      getSyncStatus().then(setSyncStatus);
    } catch {
      Toast.error('上传失败');
    } finally {
      setSyncLoading('');
    }
  };

  const handleDownload = () => {
    Modal.confirm({
      title: '确认下载',
      content: '下载将覆盖本地数据库，当前数据将自动备份。确定继续？',
      onOk: async () => {
        setSyncLoading('download');
        try {
          await syncDownload();
          Toast.success('下载成功，页面即将刷新');
          setTimeout(() => window.location.reload(), 1500);
        } catch {
          Toast.error('下载失败');
        } finally {
          setSyncLoading('');
        }
      },
    });
  };

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: '#16192c' }}>监控设置</h1>
        <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 3 }}>配置自动测试、禁用策略和数据维护</div>
      </div>

      <Form onSubmit={handleSave} initValues={settings}>
        {/* Auto test card */}
        <div style={S.card}>
          <div style={S.cardTitle}>
            <span style={{ fontSize: 16 }}>⏱</span> 自动测试
          </div>
          <Form.Switch field="auto_test_enabled" label="启用自动测试"
            initValue={settings.auto_test_enabled === 'true'}
            onChange={(v: boolean) => setSettings(s => ({ ...s, auto_test_enabled: String(v) }))}
          />
          <Text style={S.hint}>启用后将按照设定的间隔自动测试所有启用的通道和模型</Text>
          <Form.InputNumber field="auto_test_interval_minutes" label="测试间隔（分钟）"
            initValue={Number(settings.auto_test_interval_minutes) || 10} min={1} />
        </div>

        {/* Auto disable card */}
        <div style={S.card}>
          <div style={S.cardTitle}>
            <span style={{ fontSize: 16 }}>🛡</span> 自动禁用 / 启用
          </div>
          <Form.Switch field="auto_disable_enabled" label="自动禁用异常模型"
            initValue={settings.auto_disable_enabled === 'true'} />
          <Form.Switch field="auto_enable_enabled" label="自动启用恢复模型"
            initValue={settings.auto_enable_enabled === 'true'} />
          <Form.InputNumber field="channel_disable_threshold_seconds" label="响应超时阈值（秒）"
            initValue={Number(settings.channel_disable_threshold_seconds) || 10} min={1} step={1} />
          <Text style={S.hint}>响应时间超过此阈值的模型将被自动禁用</Text>
        </div>

        {/* Test config card */}
        <div style={S.card}>
          <div style={S.cardTitle}>
            <span style={{ fontSize: 16 }}>⚙</span> 测试配置
          </div>
          <Form.InputNumber field="test_request_timeout_seconds" label="请求超时（秒）"
            initValue={Number(settings.test_request_timeout_seconds) || 30} min={5} />
          <Form.InputNumber field="test_max_tokens" label="Max Tokens"
            initValue={Number(settings.test_max_tokens) || 16} min={1} />
        </div>

        {/* Data maintenance card */}
        <div style={S.card}>
          <div style={S.cardTitle}>
            <span style={{ fontSize: 16 }}>🗄</span> 数据维护
          </div>
          <Form.InputNumber field="history_retention_days" label="历史记录保留天数"
            initValue={Number(settings.history_retention_days) || 7} min={1} />
          <Form.TextArea field="disable_keywords" label="禁用关键词（逗号分隔）"
            initValue={settings.disable_keywords}
            placeholder="insufficient_quota,authentication_error,..."
            autosize={{ minRows: 2 }}
          />
          <Text style={S.hint}>错误信息中包含以上关键词时将触发自动禁用</Text>
        </div>

        {/* Cloud sync card */}
        <div style={S.card}>
          <div style={S.cardTitle}>
            <span style={{ fontSize: 16 }}>&#9729;</span> 云端同步 (WebDAV)
          </div>
          <Text style={S.hint}>通过 WebDAV 同步数据到坚果云等云存储，支持多设备共享配置</Text>
          <Form.Input field="webdav_url" label="WebDAV 地址"
            placeholder="https://dav.jianguoyun.com/dav/"
            initValue={settings.webdav_url} />
          <Form.Input field="webdav_username" label="用户名"
            placeholder="your@email.com"
            initValue={settings.webdav_username} />
          <Form.Input field="webdav_password" label="密码（应用密码）"
            mode="password"
            placeholder="坚果云第三方应用密码"
            initValue={settings.webdav_password} />
          <Form.Input field="webdav_remote_dir" label="远程目录"
            placeholder="model-monitor"
            initValue={settings.webdav_remote_dir || 'model-monitor'} />
          <Form.Input field="webdav_profile_name" label="配置名称"
            placeholder="default"
            initValue={settings.webdav_profile_name || 'default'} />
          <Text style={S.hint}>不同设备使用不同配置名称可区分数据源</Text>
          <Form.Switch field="webdav_auto_sync" label="自动同步"
            initValue={settings.webdav_auto_sync === 'true'} />
          <Text style={S.hint}>启用后，数据变更时自动上传到云端（每 60 秒检查一次）</Text>

          <div style={{ display: 'flex', gap: 8, marginTop: 16, alignItems: 'center' }}>
            <Button htmlType="button" onClick={handleTestConnection}
              loading={syncLoading === 'test'}>
              测试连接
            </Button>
            <Button htmlType="button" onClick={handleUpload}
              loading={syncLoading === 'upload'}
              type="primary" theme="solid">
              上传到云端
            </Button>
            <Button htmlType="button" onClick={handleDownload}
              loading={syncLoading === 'download'}
              type="warning" theme="solid">
              从云端下载
            </Button>
          </div>
          <Text style={{ ...S.hint, marginTop: 8 }}>请先点击下方「保存设置」保存 WebDAV 配置，再执行以上操作</Text>

          {syncStatus && syncStatus.last_sync_time && (
            <div style={{ marginTop: 12, fontSize: 12, color: '#9ca3af' }}>
              上次同步: {syncStatus.last_sync_type === 'upload' ? '上传' : '下载'}
              {' '}于 {new Date(syncStatus.last_sync_time).toLocaleString()}
              {syncStatus.remote_size != null && (
                <span> | 云端: {(syncStatus.remote_size / 1024).toFixed(1)} KB</span>
              )}
            </div>
          )}
        </div>

        <Button
          htmlType="submit"
          loading={loading}
          style={{
            height: 40, padding: '0 32px', background: '#6366f1', border: 'none',
            color: '#fff', fontWeight: 700, fontSize: 14, borderRadius: 10,
            boxShadow: '0 3px 12px rgba(99,102,241,0.25)', cursor: 'pointer',
          }}
        >
          保存设置
        </Button>
      </Form>
    </div>
  );
}
