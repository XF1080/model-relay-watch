import { useEffect, useState } from 'react';
import { Button, Modal, Toast } from '@douyinfe/semi-ui';
import {
  detectCCSPath,
  detectTokenStatsSources,
  getSettings,
  getSyncStatus,
  listCCSProviders,
  syncCCSProviders,
  syncDownload,
  syncUpload,
  testSyncConnection,
  updateSettings,
} from '../api/client';
import type { Settings as SettingsType, SyncStatus } from '../types';

const S = {
  page: {
    padding: '32px 36px',
    maxWidth: 740,
    margin: '0 auto',
    fontFamily: "Inter,-apple-system,'Segoe UI',sans-serif",
  } as React.CSSProperties,
  header: {
    marginBottom: 24,
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    columnGap: 16,
    rowGap: 3,
    alignItems: 'start',
  } as React.CSSProperties,
  h1: {
    fontSize: 22,
    fontWeight: 800,
    margin: 0,
    color: '#1a1a2e',
    gridColumn: '1',
    gridRow: '1',
  } as React.CSSProperties,
  sub: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 0,
    gridColumn: '1',
    gridRow: '2',
  } as React.CSSProperties,
  tabBar: {
    display: 'flex',
    gap: 0,
    borderBottom: '1px solid #ececf1',
    marginBottom: 24,
  } as React.CSSProperties,
  tab: (active: boolean) => ({
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 600,
    color: active ? '#6366f1' : '#9ca3af',
    background: 'none',
    border: 'none',
    borderBottom: `2px solid ${active ? '#6366f1' : 'transparent'}`,
    cursor: 'pointer',
    transition: 'all 0.15s',
  }) as React.CSSProperties,
  section: {
    background: '#fff',
    borderRadius: 14,
    border: '1px solid #ececf1',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    marginBottom: 16,
    overflow: 'hidden',
  } as React.CSSProperties,
  sectionHeader: {
    padding: '16px 20px',
    fontSize: 14,
    fontWeight: 700,
    color: '#1a1a2e',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    borderBottom: '1px solid #ececf1',
  } as React.CSSProperties,
  icon: (bg: string, fg: string) => ({
    width: 28,
    height: 28,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    background: bg,
    color: fg,
  }) as React.CSSProperties,
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 20px',
    borderBottom: '1px solid #f3f4f6',
  } as React.CSSProperties,
  rowLabel: { fontSize: 13, fontWeight: 500, color: '#1a1a2e' } as React.CSSProperties,
  rowHint: { fontSize: 11, color: '#9ca3af', marginTop: 2 } as React.CSSProperties,
  formGroup: { padding: '12px 20px', borderBottom: '1px solid #f3f4f6' } as React.CSSProperties,
  formLabel: { display: 'block', fontSize: 13, fontWeight: 500, color: '#1a1a2e', marginBottom: 6 } as React.CSSProperties,
  formHint: { fontSize: 11, color: '#9ca3af', marginTop: 4, lineHeight: 1.5 } as React.CSSProperties,
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 } as React.CSSProperties,
  input: {
    width: '100%',
    height: 36,
    border: '1px solid #ececf1',
    borderRadius: 8,
    padding: '0 12px',
    fontSize: 13,
    outline: 'none',
    fontFamily: 'inherit',
  } as React.CSSProperties,
  numInput: {
    width: 80,
    height: 32,
    border: '1px solid #ececf1',
    borderRadius: 8,
    padding: '0 10px',
    fontSize: 13,
    textAlign: 'center' as const,
    outline: 'none',
    fontFamily: 'inherit',
  } as React.CSSProperties,
  textarea: {
    width: '100%',
    minHeight: 60,
    border: '1px solid #ececf1',
    borderRadius: 8,
    padding: '8px 12px',
    fontSize: 13,
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical' as const,
  } as React.CSSProperties,
  toggle: (on: boolean) => ({
    width: 40,
    height: 22,
    borderRadius: 11,
    cursor: 'pointer',
    background: on ? '#6366f1' : '#d1d5db',
    position: 'relative' as const,
    transition: 'background 0.2s',
    flexShrink: 0,
  }) as React.CSSProperties,
  toggleDot: (on: boolean) => ({
    width: 18,
    height: 18,
    borderRadius: '50%',
    background: '#fff',
    position: 'absolute' as const,
    top: 2,
    left: on ? 20 : 2,
    transition: 'left 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
  }) as React.CSSProperties,
  btn: {
    height: 34,
    padding: '0 16px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    border: '1px solid #ececf1',
    background: '#fff',
    color: '#1a1a2e',
    transition: 'all 0.15s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  } as React.CSSProperties,
  btnPrimary: {
    height: 34,
    padding: '0 16px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    border: '1px solid #6366f1',
    background: '#6366f1',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(99,102,241,0.25)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  } as React.CSSProperties,
  btnWarn: {
    height: 34,
    padding: '0 16px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    border: '1px solid #f97316',
    background: '#f97316',
    color: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  } as React.CSSProperties,
  syncStatus: {
    padding: '10px 20px',
    fontSize: 12,
    color: '#9ca3af',
    background: '#f9fafb',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  } as React.CSSProperties,
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#22c55e',
    display: 'inline-block',
  } as React.CSSProperties,
  actionBar: {
    display: 'flex',
    gap: 8,
    padding: '16px 20px',
    borderTop: '1px solid #ececf1',
  } as React.CSSProperties,
};

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={S.toggle(value)} onClick={() => onChange(!value)}>
      <div style={S.toggleDot(value)} />
    </div>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsType>({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [activeTab, setActiveTab] = useState('monitor');
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null);
  const [syncLoading, setSyncLoading] = useState('');
  const [ccsProviders, setCcsProviders] = useState<any[]>([]);
  const [ccsLoading, setCcsLoading] = useState('');

  useEffect(() => {
    setInitialLoading(true);
    setLoadError('');
    getSettings()
      .then(setSettings)
      .catch((e: any) => {
        setSettings({});
        setLoadError(e.response?.data?.error || '加载设置失败');
      })
      .finally(() => setInitialLoading(false));
  }, []);
  useEffect(() => { getSyncStatus().then(setSyncStatus).catch(() => {}); }, []);

  const set = (key: string, val: string) => setSettings(s => ({ ...s, [key]: val }));

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateSettings(settings);
      Toast.success('设置已保存');
    } catch {
      Toast.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setSyncLoading('test');
    try {
      const res = await testSyncConnection();
      res.success ? Toast.success('连接成功') : Toast.error('连接失败: ' + (res.error || '未知错误'));
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
      content: '下载将覆盖本地数据库，当前数据会自动备份。确定继续？',
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

  if (initialLoading) {
    return <div style={{ ...S.page, color: '#9ca3af', textAlign: 'center', paddingTop: 80 }}>加载中...</div>;
  }

  if (loadError) {
    return <div style={{ ...S.page, color: '#ef4444', textAlign: 'center', paddingTop: 80 }}>{loadError}</div>;
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <h1 style={S.h1}>设置</h1>
        <div style={S.sub}>监控策略、测试参数、云端同步和数据源</div>
        <Button
          onClick={handleSave}
          loading={loading}
          style={{
            height: 40,
            padding: '0 20px',
            background: '#6366f1',
            border: 'none',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            borderRadius: 10,
            boxShadow: '0 3px 12px rgba(99,102,241,0.25)',
            cursor: 'pointer',
            gridColumn: '2',
            gridRow: '1 / span 2',
            alignSelf: 'start',
          }}
        >
          保存设置
        </Button>
      </div>

      <div style={S.tabBar}>
        <button style={S.tab(activeTab === 'monitor')} onClick={() => setActiveTab('monitor')}>监控策略</button>
        <button style={S.tab(activeTab === 'sync')} onClick={() => setActiveTab('sync')}>云端同步</button>
        <button style={S.tab(activeTab === 'ccs')} onClick={() => setActiveTab('ccs')}>数据源</button>
      </div>

      {activeTab === 'monitor' && <>
        <div style={S.section}>
          <div style={S.sectionHeader}>
            <div style={S.icon('#eef2ff', '#6366f1')}>⟳</div> 自动测试
          </div>
          <div style={S.row}>
            <div>
              <div style={S.rowLabel}>启用自动测试</div>
              <div style={S.rowHint}>按设定间隔自动测试所有启用的通道和模型</div>
            </div>
            <Toggle value={settings.auto_test_enabled === 'true'} onChange={v => set('auto_test_enabled', String(v))} />
          </div>
          <div style={S.formGrid}>
            <div style={S.formGroup}>
              <label style={S.formLabel}>测试间隔（分钟）</label>
              <input type="number" style={S.numInput} value={settings.auto_test_interval_minutes || '10'} min={1} onChange={e => set('auto_test_interval_minutes', e.target.value)} />
            </div>
            <div style={S.formGroup}>
              <label style={S.formLabel}>请求超时（秒）</label>
              <input type="number" style={S.numInput} value={settings.test_request_timeout_seconds || '30'} min={5} onChange={e => set('test_request_timeout_seconds', e.target.value)} />
            </div>
          </div>
          <div style={{ ...S.formGroup, borderBottom: 'none' }}>
            <label style={S.formLabel}>Max Tokens</label>
            <input type="number" style={S.numInput} value={settings.test_max_tokens || '16'} min={1} onChange={e => set('test_max_tokens', e.target.value)} />
          </div>
        </div>

        <div style={S.section}>
          <div style={S.sectionHeader}>
            <div style={S.icon('#eff6ff', '#2563eb')}>⇄</div> 测试代理
          </div>
          <div style={{ ...S.formGroup, borderBottom: 'none' }}>
            <label style={S.formLabel}>全局测试代理</label>
            <input
              type="text"
              style={S.input}
              placeholder="留空表示不使用代理，例如 http://127.0.0.1:7890 或 socks5://127.0.0.1:1080"
              value={settings.test_proxy_url || ''}
              onChange={e => set('test_proxy_url', e.target.value)}
            />
            <div style={S.formHint}>用于通道测试和模型发现。单个通道如果配置了代理，会优先覆盖这里的全局代理。</div>
          </div>
        </div>

        <div style={S.section}>
          <div style={S.sectionHeader}>
            <div style={S.icon('#ecfdf5', '#22c55e')}>🛡</div> 自动禁用 / 启用
          </div>
          <div style={S.row}>
            <div style={S.rowLabel}>自动禁用异常模型</div>
            <Toggle value={settings.auto_disable_enabled === 'true'} onChange={v => set('auto_disable_enabled', String(v))} />
          </div>
          <div style={S.row}>
            <div style={S.rowLabel}>自动启用恢复模型</div>
            <Toggle value={settings.auto_enable_enabled === 'true'} onChange={v => set('auto_enable_enabled', String(v))} />
          </div>
          <div style={{ ...S.formGroup, borderBottom: 'none' }}>
            <label style={S.formLabel}>响应超时阈值（秒）</label>
            <input type="number" style={S.numInput} value={settings.channel_disable_threshold_seconds || '10'} min={1} onChange={e => set('channel_disable_threshold_seconds', e.target.value)} />
            <div style={S.formHint}>响应时间超过此阈值的模型会被自动禁用</div>
          </div>
        </div>

        <div style={S.section}>
          <div style={S.sectionHeader}>
            <div style={S.icon('#fff7ed', '#f97316')}>🗂</div> 数据维护
          </div>
          <div style={S.formGroup}>
            <label style={S.formLabel}>历史记录保留天数</label>
            <input type="number" style={S.numInput} value={settings.history_retention_days || '7'} min={1} onChange={e => set('history_retention_days', e.target.value)} />
          </div>
          <div style={{ ...S.formGroup, borderBottom: 'none' }}>
            <label style={S.formLabel}>禁用关键词（逗号分隔）</label>
            <textarea style={S.textarea} value={settings.disable_keywords || ''} onChange={e => set('disable_keywords', e.target.value)} />
            <div style={S.formHint}>错误信息中包含以上关键词时会触发自动禁用</div>
          </div>
        </div>
      </>}

      {activeTab === 'sync' && <>
        <div style={S.section}>
          <div style={S.sectionHeader}>
            <div style={S.icon('#f5f3ff', '#8b5cf6')}>☁</div> WebDAV 连接
          </div>
          <div style={S.formGroup}>
            <label style={S.formLabel}>服务器地址</label>
            <input type="text" style={S.input} placeholder="https://dav.jianguoyun.com/dav/" value={settings.webdav_url || ''} onChange={e => set('webdav_url', e.target.value)} />
          </div>
          <div style={S.formGrid}>
            <div style={{ ...S.formGroup, borderRight: '1px solid #f3f4f6' }}>
              <label style={S.formLabel}>WebDAV 账户</label>
              <input type="text" style={S.input} placeholder="第三方应用账号" autoComplete="off" name="webdav_user_nofill" value={settings.webdav_username || ''} onChange={e => set('webdav_username', e.target.value)} />
            </div>
            <div style={S.formGroup}>
              <label style={S.formLabel}>WebDAV 密码</label>
              <input type="password" style={S.input} placeholder="第三方应用密码" autoComplete="new-password" name="webdav_pass_nofill" value={settings.webdav_password || ''} onChange={e => set('webdav_password', e.target.value)} />
            </div>
          </div>
          <div style={S.formGrid}>
            <div style={{ ...S.formGroup, borderRight: '1px solid #f3f4f6' }}>
              <label style={S.formLabel}>远程目录</label>
              <input type="text" style={S.input} placeholder="cc-switch-sync" value={settings.webdav_remote_dir || ''} onChange={e => set('webdav_remote_dir', e.target.value)} />
            </div>
            <div style={S.formGroup}>
              <label style={S.formLabel}>配置名称</label>
              <input type="text" style={S.input} placeholder="default" value={settings.webdav_profile_name || ''} onChange={e => set('webdav_profile_name', e.target.value)} />
              <div style={S.formHint}>不同设备使用不同名称以区分数据源</div>
            </div>
          </div>
          <div style={{ ...S.row, borderBottom: 'none' }}>
            <div>
              <div style={S.rowLabel}>自动同步</div>
              <div style={S.rowHint}>数据变更时自动上传到云端（每 60 秒检查一次）</div>
            </div>
            <Toggle value={settings.webdav_auto_sync === 'true'} onChange={v => set('webdav_auto_sync', String(v))} />
          </div>
        </div>

        <div style={S.section}>
          <div style={S.sectionHeader}>
            <div style={S.icon('#eef2ff', '#6366f1')}>⚡</div> 同步操作
          </div>
          {syncStatus && syncStatus.last_sync_time && (
            <div style={S.syncStatus}>
              <span style={S.syncDot} />
              上次同步: {syncStatus.last_sync_type === 'upload' ? '上传' : '下载'} 于 {new Date(syncStatus.last_sync_time).toLocaleString()}
              {syncStatus.remote_size != null && <span>&nbsp;|&nbsp;云端: {(syncStatus.remote_size / 1024).toFixed(1)} KB</span>}
              {syncStatus.local_size != null && <span>&nbsp;|&nbsp;本地: {(syncStatus.local_size / 1024).toFixed(1)} KB</span>}
            </div>
          )}
          <div style={S.actionBar}>
            <button style={S.btn} onClick={handleTestConnection} disabled={syncLoading === 'test'}>{syncLoading === 'test' ? '测试中...' : '测试连接'}</button>
            <button style={S.btnPrimary} onClick={handleUpload} disabled={syncLoading === 'upload'}>{syncLoading === 'upload' ? '上传中...' : '上传到云端'}</button>
            <button style={S.btnWarn} onClick={handleDownload} disabled={syncLoading === 'download'}>{syncLoading === 'download' ? '下载中...' : '从云端下载'}</button>
          </div>
          <div style={{ padding: '0 20px 12px', fontSize: 11, color: '#9ca3af' }}>请先保存 WebDAV 配置，再执行以上操作</div>
        </div>
      </>}

      {activeTab === 'ccs' && <>
        <div style={S.section}>
          <div style={S.sectionHeader}>
            <div style={S.icon('#f5f3ff', '#8b5cf6')}>🔗</div> CC-Switch 数据源
          </div>
          <div style={S.formGroup}>
            <label style={S.formLabel}>CC-Switch 数据库路径</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" style={{ ...S.input, flex: 1 }} placeholder="C:/Users/你的用户名/.cc-switch/cc-switch.db" value={settings.ccs_db_path || ''} onChange={e => set('ccs_db_path', e.target.value)} />
              <button
                style={S.btn}
                onClick={async () => {
                  try {
                    const res = await detectCCSPath();
                    if (res.found && res.path) {
                      set('ccs_db_path', res.path);
                      Toast.success('已检测到: ' + res.path);
                    } else {
                      Toast.warning('未找到 CC-Switch 数据库');
                    }
                  } catch {
                    Toast.error('自动检测失败');
                  }
                }}
              >
                自动检测
              </button>
            </div>
            <div style={S.formHint}>只读取 CC-Switch 的 Provider 数据，不会写入。保存后可直接在本卡片中执行预览和同步。</div>
          </div>
          <div style={{ ...S.sectionHeader, borderTop: '1px solid #ececf1' }}>
            <div style={S.icon('#eef2ff', '#6366f1')}>⚡</div> 同步操作
          </div>
          <div style={S.actionBar}>
            <button
              style={S.btn}
              disabled={ccsLoading === 'preview'}
              onClick={async () => {
                if (!settings.ccs_db_path) {
                  Toast.warning('请先填写数据库路径');
                  return;
                }
                setCcsLoading('preview');
                try {
                  await updateSettings({ ccs_db_path: settings.ccs_db_path });
                  const data = await listCCSProviders();
                  setCcsProviders(data);
                  if (data.length === 0) Toast.warning('未读取到 Provider');
                } catch (e: any) {
                  Toast.error(e.response?.data?.error || '读取失败');
                } finally {
                  setCcsLoading('');
                }
              }}
            >
              {ccsLoading === 'preview' ? '读取中...' : '预览 Providers'}
            </button>
            <button
              style={S.btnPrimary}
              disabled={ccsLoading === 'sync'}
              onClick={async () => {
                if (!settings.ccs_db_path) {
                  Toast.warning('请先填写数据库路径');
                  return;
                }
                setCcsLoading('sync');
                try {
                  await updateSettings({ ccs_db_path: settings.ccs_db_path });
                  const res = await syncCCSProviders();
                  Toast.success(`同步完成，新增 ${res.added} 个通道`);
                  setCcsProviders([]);
                } catch (e: any) {
                  Toast.error(e.response?.data?.error || '同步失败');
                } finally {
                  setCcsLoading('');
                }
              }}
            >
              {ccsLoading === 'sync' ? '同步中...' : '同步到通道'}
            </button>
          </div>
          <div style={{ padding: '0 20px 12px', fontSize: 11, color: '#9ca3af' }}>
            请先保存数据库路径，再执行以上操作。已存在的通道（URL+Key 相同）不会重复添加。
          </div>
          {ccsProviders.length > 0 && (
            <div style={{ padding: '0 20px 16px' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#16192c', marginBottom: 8 }}>
                读取到 {ccsProviders.length} 个 Provider:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {ccsProviders.map((p: any) => (
                  <div
                    key={p.id + p.app_type}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      background: '#f9fafb',
                      border: '1px solid #f3f4f6',
                      fontSize: 12,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <span style={{ fontWeight: 600, color: '#16192c' }}>{p.name}</span>
                      <span style={{ marginLeft: 8, padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: p.app_type === 'claude' ? '#fff7ed' : '#eef2ff', color: p.app_type === 'claude' ? '#d97706' : '#6366f1' }}>
                        {p.app_type}
                      </span>
                      {p.is_current && <span style={{ marginLeft: 4, padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 600, background: '#ecfdf5', color: '#22c55e' }}>当前</span>}
                    </div>
                    <div style={{ fontSize: 11, color: '#9ca3af', fontFamily: 'monospace' }}>{p.base_url}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={S.section}>
          <div style={S.sectionHeader}>
            <div style={S.icon('#ecfeff', '#0891b2')}>📊</div> 用量统计数据源
          </div>
          <div style={S.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <label style={{ ...S.formLabel, marginBottom: 0 }}>Claude Code 日志目录</label>
              <button
                style={S.btn}
                onClick={async () => {
                  try {
                    const res = await detectTokenStatsSources();
                    if (res.claude_found && res.claude_path) set('usage_claude_path', res.claude_path);
                    if (res.codex_found && res.codex_path) set('usage_codex_path', res.codex_path);
                    if (res.gemini_found && res.gemini_path) set('usage_gemini_path', res.gemini_path);
                    if (res.claude_found || res.codex_found || res.gemini_found) {
                      Toast.success('已检测到用量日志路径，保存设置后生效。');
                    } else {
                      Toast.warning('未检测到用量日志目录。');
                    }
                  } catch {
                    Toast.error('检测用量日志路径失败');
                  }
                }}
              >
                自动检测
              </button>
            </div>
            <input type="text" style={S.input} placeholder="留空则自动检测 ~/.claude/projects" value={settings.usage_claude_path || ''} onChange={e => set('usage_claude_path', e.target.value)} />
            <div style={S.formHint}>支持手动指定目录。如果你填写的是 Claude 根目录，系统会自动尝试其 `projects` 子目录。</div>
          </div>
          <div style={S.formGroup}>
            <label style={S.formLabel}>Codex 日志目录</label>
            <input type="text" style={S.input} placeholder="留空则自动检测 ~/.codex/sessions" value={settings.usage_codex_path || ''} onChange={e => set('usage_codex_path', e.target.value)} />
            <div style={S.formHint}>支持手动指定目录。如果你填写的是 Codex 根目录，系统会自动尝试其 `sessions` 子目录。</div>
          </div>
          <div style={{ ...S.formGroup, borderBottom: 'none' }}>
            <label style={S.formLabel}>Gemini CLI 日志目录</label>
            <input type="text" style={S.input} placeholder="留空则自动检测 ~/.gemini/antigravity/conversations" value={settings.usage_gemini_path || ''} onChange={e => set('usage_gemini_path', e.target.value)} />
            <div style={S.formHint}>已加入自动检测与手动设置入口。你本机当前检测到的是 `.gemini/antigravity/conversations`，但 Gemini 目前主要是 `.pb` 会话文件，真正的 token 用量统计还需要补 protobuf 解析。</div>
          </div>
        </div>
      </>}
    </div>
  );
}
