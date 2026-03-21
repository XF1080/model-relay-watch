import { useEffect, useState } from 'react';
import { Toast, Popconfirm } from '@douyinfe/semi-ui';
import { listModels, listChannels, testModel, deleteModel, updateModelStatus } from '../api/client';
import type { ModelEntry, Channel } from '../types';
import { StatusEnabled, StatusManuallyDisabled, StatusAutoDisabled } from '../types';

const S = {
  page: { padding: '28px 32px', maxWidth: 1200, margin: '0 auto', fontFamily: "Inter,-apple-system,'Segoe UI',sans-serif" } as React.CSSProperties,
  card: {
    background: '#fff', borderRadius: 14, border: '1px solid #ececf1',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  } as React.CSSProperties,
};

const selectStyle: React.CSSProperties = {
  height: 34, padding: '0 28px 0 10px', borderRadius: 8, fontSize: 12, fontWeight: 500,
  border: '1px solid #ececf1', background: '#fff', color: '#5a6078',
  outline: 'none', appearance: 'none', cursor: 'pointer',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center',
};

const GRID = '1fr 120px 80px 100px 70px 80px 150px 170px';

function statusInfo(status: number) {
  if (status === StatusEnabled) return { label: '正常', bg: 'rgba(34,197,94,0.08)', color: '#22c55e', dot: '#22c55e' };
  if (status === StatusManuallyDisabled) return { label: '手动禁用', bg: 'rgba(156,163,175,0.1)', color: '#9ca3af', dot: '#bbb' };
  if (status === StatusAutoDisabled) return { label: '自动禁用', bg: 'rgba(239,68,68,0.08)', color: '#ef4444', dot: '#ef4444' };
  return { label: '未知', bg: 'rgba(156,163,175,0.1)', color: '#9ca3af', dot: '#bbb' };
}

export default function Models() {
  const [models, setModels] = useState<ModelEntry[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(false);
  const [channelFilter, setChannelFilter] = useState<number>(0);
  const [statusFilter, setStatusFilter] = useState<number>(0);
  const [testingId, setTestingId] = useState<number>(0);

  const load = () => {
    setLoading(true);
    const params: Record<string, number> = {};
    if (channelFilter) params.channel_id = channelFilter;
    if (statusFilter) params.status = statusFilter;
    listModels(params).then(setModels).finally(() => setLoading(false));
  };

  useEffect(() => { listChannels().then(setChannels); }, []);
  useEffect(() => { load(); }, [channelFilter, statusFilter]);

  const handleTest = async (id: number) => {
    setTestingId(id);
    try {
      const res = await testModel(id);
      if (res.success) Toast.success(`测试成功: ${res.response_ms}ms`);
      else Toast.warning(`测试失败: ${res.message}`);
      load();
    } catch (e: any) {
      Toast.error(e.response?.data?.error || '测试失败');
    } finally {
      setTestingId(0);
    }
  };

  const handleToggle = async (m: ModelEntry) => {
    const newStatus = m.status === StatusEnabled ? StatusManuallyDisabled : StatusEnabled;
    await updateModelStatus(m.id, newStatus);
    load();
  };

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: '#16192c' }}>全部模型</h1>
          <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 3 }}>
            共 <b style={{ color: '#6366f1' }}>{models.length}</b> 个模型
          </div>
        </div>
        <button
          onClick={load}
          disabled={loading}
          style={{
            height: 36, padding: '0 18px', borderRadius: 10, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#fff', border: '1px solid #ececf1', color: '#5a6078', transition: 'all 0.15s',
          }}
        >{loading ? '…' : '↻ 刷新'}</button>
      </div>

      {/* Filters */}
      <div style={{ ...S.card, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>通道</span>
        <select value={channelFilter} onChange={e => setChannelFilter(Number(e.target.value))} style={selectStyle}>
          <option value={0}>全部通道</option>
          {channels.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>状态</span>
        <select value={statusFilter} onChange={e => setStatusFilter(Number(e.target.value))} style={selectStyle}>
          <option value={0}>全部状态</option>
          <option value={StatusEnabled}>正常</option>
          <option value={StatusAutoDisabled}>自动禁用</option>
          <option value={StatusManuallyDisabled}>手动禁用</option>
        </select>
      </div>

      {/* Model Table */}
      {models.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#bbb' }}>
          {loading ? '加载中…' : '暂无数据'}
        </div>
      ) : (
        <div style={{ ...S.card, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: GRID, columnGap: 12,
            padding: '0 20px', height: 36, alignItems: 'center',
            fontSize: 11, color: '#9ca3af', fontWeight: 700, letterSpacing: '0.3px',
            textTransform: 'uppercase', background: '#fafafc', borderBottom: '1px solid #ececf1',
          }}>
            <div>模型名称</div><div>通道</div><div>类型</div><div>状态</div>
            <div>成功率</div><div>延迟</div><div>最后测试</div><div>操作</div>
          </div>

          {/* Rows */}
          {models.map((m, idx) => {
            const sp = statusInfo(m.status);
            const successRate = m.test_count > 0 ? ((m.test_count - m.fail_count) / m.test_count * 100) : -1;

            return (
              <div
                key={m.id}
                style={{
                  display: 'grid', gridTemplateColumns: GRID, columnGap: 12,
                  padding: '0 20px', minHeight: 50, alignItems: 'center',
                  fontSize: 12, background: idx % 2 === 0 ? '#fff' : '#fafafc',
                  borderBottom: '1px solid #f4f5f8', transition: 'background 0.1s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f5f5ff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#fafafc'; }}
              >
                {/* Name */}
                <div style={{ fontWeight: 600, color: '#16192c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {m.model_name}
                </div>
                {/* Channel */}
                <div style={{ color: '#5a6078', fontSize: 12 }}>{m.channel?.name || '-'}</div>
                {/* Type */}
                <div>
                  <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 5, background: '#f4f5f8', color: '#9ca3af', fontWeight: 600 }}>
                    {m.endpoint_type}
                  </span>
                </div>
                {/* Status */}
                <div>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                    background: sp.bg, color: sp.color,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: sp.dot }} />
                    {sp.label}
                  </span>
                </div>
                {/* Success rate */}
                <div style={{
                  fontWeight: 700, fontSize: 12,
                  color: successRate < 0 ? '#bbb' : successRate >= 95 ? '#22c55e' : successRate >= 80 ? '#eab308' : '#ef4444',
                }}>
                  {successRate >= 0 ? `${successRate.toFixed(0)}%` : '-'}
                </div>
                {/* Latency */}
                <div style={{
                  fontWeight: 600, fontSize: 12,
                  color: m.last_response_ms ? (m.last_response_ms > 5000 ? '#ef4444' : m.last_response_ms > 2000 ? '#eab308' : '#22c55e') : '#bbb',
                }}>
                  {m.last_response_ms ? `${m.last_response_ms}ms` : '-'}
                </div>
                {/* Last test */}
                <div style={{ fontSize: 11, color: '#9ca3af' }}>
                  {m.last_test_time ? new Date(m.last_test_time).toLocaleString() : '-'}
                </div>
                {/* Actions */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => handleTest(m.id)}
                    disabled={testingId === m.id}
                    style={{
                      height: 28, padding: '0 10px', borderRadius: 7, fontSize: 11, fontWeight: 600,
                      border: '1px solid #ececf1', background: '#fff', color: '#5a6078',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >{testingId === m.id ? '…' : '▶ 测试'}</button>
                  <button
                    onClick={() => handleToggle(m)}
                    style={{
                      height: 28, padding: '0 10px', borderRadius: 7, fontSize: 11, fontWeight: 600,
                      border: `1px solid ${m.status === StatusEnabled ? '#ececf1' : 'rgba(99,102,241,0.2)'}`,
                      background: m.status === StatusEnabled ? '#fff' : 'rgba(99,102,241,0.05)',
                      color: m.status === StatusEnabled ? '#9ca3af' : '#6366f1',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}
                  >{m.status === StatusEnabled ? '禁用' : '启用'}</button>
                  <Popconfirm title="确认删除？" onConfirm={() => deleteModel(m.id).then(load)}>
                    <button style={{
                      height: 28, width: 28, borderRadius: 7, fontSize: 12, fontWeight: 700,
                      border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.05)',
                      color: '#ef4444', cursor: 'pointer',
                    }}>×</button>
                  </Popconfirm>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
