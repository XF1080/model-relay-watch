import { useEffect, useState } from 'react';
import { Toast } from '@douyinfe/semi-ui';
import { listHistory, listChannels } from '../api/client';
import type { TestResult, Channel } from '../types';

const S = {
  page: { padding: '28px 32px', maxWidth: 1200, margin: '0 auto', fontFamily: "Inter,-apple-system,'Segoe UI',sans-serif" } as React.CSSProperties,
  card: {
    background: '#fff', borderRadius: 14, border: '1px solid #ececf1',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  } as React.CSSProperties,
  label: { fontSize: 11, color: '#9ca3af', fontWeight: 600, marginBottom: 3, letterSpacing: '0.3px', textTransform: 'uppercase' as const } as React.CSSProperties,
};

const selectStyle: React.CSSProperties = {
  height: 34, padding: '0 28px 0 10px', borderRadius: 8, fontSize: 12, fontWeight: 500,
  border: '1px solid #ececf1', background: '#fff', color: '#5a6078',
  outline: 'none', appearance: 'none', cursor: 'pointer',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center',
};

function fmtMs(ms?: number | null) {
  if (!ms) return '-';
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${Math.round(ms)}ms`;
}

export default function History() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [channelFilter, setChannelFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [successFilter, setSuccessFilter] = useState('');

  const PAGE_SIZE = 30;

  useEffect(() => {
    listChannels().then(setChannels);
  }, []);

  const load = (p = page) => {
    setLoading(true);
    const params: Record<string, string | number> = { page: p, page_size: PAGE_SIZE };
    if (channelFilter) params.channel_id = channelFilter;
    if (modelFilter) params.model_name = modelFilter;
    if (successFilter) params.success = successFilter;
    listHistory(params).then(res => {
      setResults(res.data || []);
      setTotal(res.total);
    }).catch(() => Toast.error('加载失败')).finally(() => setLoading(false));
  };

  useEffect(() => { load(1); setPage(1); }, [channelFilter, successFilter, modelFilter]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: '#16192c' }}>测试历史</h1>
          <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 3 }}>
            共 <b style={{ color: '#6366f1' }}>{total}</b> 条记录
          </div>
        </div>
        <button
          onClick={() => load(page)}
          style={{
            height: 36, padding: '0 18px', borderRadius: 10, fontSize: 13, fontWeight: 600,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#fff', border: '1px solid #ececf1', color: '#5a6078', transition: 'all 0.15s',
          }}
        >↻ 刷新</button>
      </div>

      {/* Filters */}
      <div style={{ ...S.card, padding: '12px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>通道</span>
        <select value={channelFilter} onChange={e => setChannelFilter(e.target.value)} style={selectStyle}>
          <option value="">全部通道</option>
          {channels.map(c => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
        </select>

        <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>结果</span>
        <select value={successFilter} onChange={e => setSuccessFilter(e.target.value)} style={selectStyle}>
          <option value="">全部</option>
          <option value="true">成功</option>
          <option value="false">失败</option>
        </select>

        <div style={{ width: 1, height: 20, background: '#ececf1' }} />

        <input
          placeholder="模型名称"
          value={modelFilter}
          onChange={e => setModelFilter(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && load(1)}
          style={{
            height: 34, padding: '0 12px', borderRadius: 8, fontSize: 12,
            border: '1px solid #ececf1', outline: 'none', color: '#16192c', width: 180,
          }}
          onFocus={e => { e.target.style.borderColor = '#6366f1'; }}
          onBlur={e => { e.target.style.borderColor = '#ececf1'; }}
        />
        <button
          onClick={() => { setPage(1); load(1); }}
          style={{
            height: 34, padding: '0 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
            background: '#6366f1', border: 'none', color: '#fff', cursor: 'pointer',
          }}
        >查询</button>
      </div>

      {/* Table */}
      <div style={{ ...S.card, overflow: 'hidden' }}>
        {/* Table head */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '170px minmax(160px, 220px) minmax(160px, 1fr) 80px 80px 70px minmax(220px, 1fr)',
          columnGap: 12, padding: '0 20px', height: 36, alignItems: 'center',
          fontSize: 11, color: '#9ca3af', fontWeight: 700, letterSpacing: '0.3px',
          textTransform: 'uppercase', background: '#fafafc', borderBottom: '1px solid #ececf1',
        }}>
          <div>时间</div><div>通道</div><div>模型</div>
          <div>结果</div><div>延迟</div><div>状态码</div><div>错误信息</div>
        </div>

        {/* Rows */}
        {loading ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af' }}>加载中…</div>
        ) : results.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#bbb' }}>暂无数据</div>
        ) : (
          results.map((r, idx) => (
            <div
              key={r.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '170px minmax(160px, 220px) minmax(160px, 1fr) 80px 80px 70px minmax(220px, 1fr)',
                columnGap: 12, padding: '0 20px', minHeight: 44, alignItems: 'center',
                fontSize: 12, color: '#16192c',
                background: idx % 2 === 0 ? '#fff' : '#fafafc',
                borderBottom: '1px solid #f4f5f8', transition: 'background 0.1s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f5f5ff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#fafafc'; }}
            >
              <div style={{ color: '#5a6078', fontSize: 11 }}>{new Date(r.tested_at).toLocaleString()}</div>
              <div style={{ color: '#5a6078', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.channel_name}>{r.channel_name}</div>
              <div style={{ fontWeight: 600, color: '#16192c' }}>{r.model_name}</div>
              <div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                  background: r.success ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                  color: r.success ? '#22c55e' : '#ef4444',
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: r.success ? '#22c55e' : '#ef4444' }} />
                  {r.success ? '成功' : '失败'}
                </span>
              </div>
              <div style={{ color: r.response_ms && r.response_ms > 5000 ? '#ef4444' : r.response_ms && r.response_ms > 2000 ? '#eab308' : '#22c55e', fontWeight: 600 }}>
                {fmtMs(r.response_ms)}
              </div>
              <div style={{ color: '#9ca3af' }}>{r.status_code || '-'}</div>
              <div style={{ color: '#9ca3af', fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {r.error_message || '-'}
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '12px 0', borderTop: '1px solid #ececf1' }}>
            <button
              onClick={() => { const p = Math.max(1, page - 1); setPage(p); load(p); }}
              disabled={page === 1}
              style={{
                height: 30, padding: '0 12px', borderRadius: 7, fontSize: 12, fontWeight: 600,
                border: '1px solid #ececf1', background: '#fff', color: page === 1 ? '#d1d5db' : '#5a6078',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
              }}
            >‹ 上一页</button>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>第 {page} / {totalPages} 页</span>
            <button
              onClick={() => { const p = Math.min(totalPages, page + 1); setPage(p); load(p); }}
              disabled={page === totalPages}
              style={{
                height: 30, padding: '0 12px', borderRadius: 7, fontSize: 12, fontWeight: 600,
                border: '1px solid #ececf1', background: '#fff', color: page === totalPages ? '#d1d5db' : '#5a6078',
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
              }}
            >下一页 ›</button>
          </div>
        )}
      </div>
    </div>
  );
}
