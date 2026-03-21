import { useEffect, useState } from 'react';
import { Form, Button, Toast, Typography } from '@douyinfe/semi-ui';
import { getSettings, updateSettings } from '../api/client';
import type { Settings as SettingsType } from '../types';

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

  useEffect(() => { getSettings().then(setSettings); }, []);

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
