import { useEffect, useState, useMemo } from 'react';
import { getTokenStats } from '../api/client';

/* ─── Group config ─── */
const groupConfig: Record<string, { label: string; color: string; icon: string }> = {
  claude:   { label: 'Claude Code', color: '#d97706', icon: 'C' },
  codex:    { label: 'Codex',       color: '#6e56cf', icon: 'X' },
  gemini:   { label: 'Gemini CLI',  color: '#4285f4', icon: 'G' },
  opencode: { label: 'OpenCode',    color: '#10a37f', icon: 'O' },
  openclaw: { label: 'OpenClaw',    color: '#ef4444', icon: 'W' },
};
const defaultGroup = { label: '其他', color: '#9ca3af', icon: '?' };

function fmt(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return String(n);
}
function fmtCost(n: number): string {
  if (!n) return '-';
  if (n < 0.01) return '<$0.01';
  return '$' + n.toFixed(2);
}

export default function TokenStats() {
  const [data, setData] = useState<any>(null);
  const [range, setRange] = useState('24h');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = (r: string) => {
    setLoading(true); setError('');
    getTokenStats(r)
      .then(setData)
      .catch((e: any) => { setError(e.response?.data?.error || '加载失败'); setData(null); })
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(range); }, [range]);

  const summary = data?.summary;
  const groups: any[] = data?.groups || [];
  const timeline: any[] = data?.timeline || [];
  const tlMax = useMemo(() => Math.max(1, ...timeline.map((t: any) => (t.input || 0) + (t.output || 0))), [timeline]);

  const ranges = [
    { key: '24h', label: '24 小时' },
    { key: '7d',  label: '7 天' },
    { key: '30d', label: '30 天' },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', fontFamily: "Inter,-apple-system,'Segoe UI',sans-serif" }}>
      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: '#16192c' }}>用量统计</h1>
          <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 2 }}>基于本地会话日志，定价来源官方 API</div>
        </div>
        <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 10, padding: 3 }}>
          {ranges.map(r => (
            <button key={r.key} onClick={() => setRange(r.key)} style={{
              padding: '6px 16px', fontSize: 13, fontWeight: 600, borderRadius: 8,
              border: 'none', cursor: 'pointer', transition: 'all .15s',
              background: range === r.key ? '#fff' : 'transparent',
              color: range === r.key ? '#6366f1' : '#9ca3af',
              boxShadow: range === r.key ? '0 1px 4px rgba(0,0,0,.08)' : 'none',
            }}>{r.label}</button>
          ))}
        </div>
      </div>

      {error && (
        <div style={{ padding: '40px 20px', textAlign: 'center', background: '#fff', borderRadius: 14, border: '1px solid #ececf1' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#ef4444', marginBottom: 6 }}>{error}</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>请确认 Claude Code / Codex 已安装并有会话记录</div>
        </div>
      )}

      {loading && !data && <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>加载中...</div>}

      {summary && <>
        {/* ── Summary row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          <StatCard color="#6366f1" label="总 Token" value={fmt(summary.total_tokens)} sub={`${summary.total_requests.toLocaleString()} 次请求`} />
          <StatCard color="#3b82f6" label="输入 Token" value={fmt(summary.total_input_tokens)}
            sub={summary.total_cache_read > 0 ? `缓存读取 ${fmt(summary.total_cache_read)}` : undefined} />
          <StatCard color="#22c55e" label="输出 Token" value={fmt(summary.total_output_tokens)}
            sub={summary.total_cache_write > 0 ? `缓存写入 ${fmt(summary.total_cache_write)}` : undefined} />
          <StatCard color="#f97316" label="估算费用" value={fmtCost(summary.total_cost_usd)} />
        </div>

        {/* ── Timeline chart ── */}
        {timeline.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #ececf1', padding: '20px 24px', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#16192c' }}>用量趋势</span>
              <span style={{ display: 'flex', gap: 14, fontSize: 11, color: '#9ca3af' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: '#3b82f6', display: 'inline-block' }} />输入
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: '#22c55e', display: 'inline-block' }} />输出
                </span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 100 }}>
              {timeline.map((t: any, i: number) => {
                const total = (t.input || 0) + (t.output || 0);
                const h = total > 0 ? Math.max(3, (total / tlMax) * 100) : 0;
                const inH = total > 0 ? (t.input / total) * h : 0;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}
                    title={`${t.time}\n输入: ${fmt(t.input)}\n输出: ${fmt(t.output)}\n费用: ${fmtCost(t.cost)}\n请求: ${t.requests}`}>
                    {h > 0 ? <>
                      <div style={{ height: (h - inH) + '%', background: '#22c55e', borderRadius: '2px 2px 0 0', minHeight: (h - inH) > 0 ? 1 : 0 }} />
                      <div style={{ height: inH + '%', background: '#3b82f6' }} />
                    </> : <div style={{ height: 2, background: '#f0f0f0', borderRadius: 1 }} />}
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: '#bbb' }}>
              <span>{timeline[0]?.time}</span>
              <span>{timeline[timeline.length - 1]?.time}</span>
            </div>
          </div>
        )}

        {/* ── Groups ── */}
        {groups.length === 0 && !loading && (
          <div style={{ padding: 40, textAlign: 'center', color: '#9ca3af', background: '#fff', borderRadius: 14, border: '1px solid #ececf1' }}>
            该时间范围内无请求数据
          </div>
        )}

        {groups.map((g: any) => {
          const cfg = groupConfig[g.app_type] || { ...defaultGroup, label: g.label || g.app_type };
          const allTokens = (g.models || []).reduce((s: number, m: any) => s + m.input_tokens + m.output_tokens + (m.cache_read_tokens || 0) + (m.cache_write_tokens || 0), 0);
          return (
            <div key={g.app_type} style={{ background: '#fff', borderRadius: 14, border: '1px solid #ececf1', marginBottom: 16, overflow: 'hidden' }}>
              {/* Group header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px',
                borderBottom: '1px solid #ececf1', background: '#fafafa',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800, color: '#fff', background: cfg.color,
                }}>{cfg.icon}</div>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#16192c', flex: 1 }}>{cfg.label}</span>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>
                  {g.requests.toLocaleString()} 次 &middot; {fmt(g.total_in + g.total_out)} tokens &middot; {fmtCost(g.total_cost)}
                </span>
              </div>

              {/* Table header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 80px 3fr',
                padding: '8px 20px', fontSize: 10, fontWeight: 700, color: '#9ca3af',
                textTransform: 'uppercase', letterSpacing: 0.5, borderBottom: '1px solid #f3f4f6',
              }}>
                <span>模型</span><span style={{ textAlign: 'right' }}>输入</span>
                <span style={{ textAlign: 'right' }}>输出</span><span style={{ textAlign: 'right' }}>缓存</span>
                <span style={{ textAlign: 'right' }}>费用</span><span style={{ textAlign: 'right' }}>单价</span>
                <span style={{ paddingLeft: 16 }}>占比</span>
              </div>

              {/* Model rows */}
              {(g.models || []).map((m: any, idx: number) => {
                const mTotal = m.input_tokens + m.output_tokens + (m.cache_read_tokens || 0) + (m.cache_write_tokens || 0);
                const pct = allTokens > 0 ? (mTotal / allTokens) * 100 : 0;
                return (
                  <div key={m.model} style={{
                    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 80px 3fr',
                    padding: '10px 20px', alignItems: 'center', fontSize: 13,
                    borderBottom: idx < (g.models || []).length - 1 ? '1px solid #f9fafb' : 'none',
                    transition: 'background .1s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fafbfc'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = ''; }}
                  >
                    {/* Model name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                      <span style={{ fontWeight: 600, color: '#16192c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {m.display_name || m.model}
                      </span>
                      <span style={{ fontSize: 10, color: '#bbb', flexShrink: 0 }}>{m.requests.toLocaleString()}次</span>
                    </div>
                    {/* Input */}
                    <span style={{ textAlign: 'right', color: '#3b82f6', fontWeight: 600, fontFamily: 'monospace', fontSize: 12 }}>{fmt(m.input_tokens)}</span>
                    {/* Output */}
                    <span style={{ textAlign: 'right', color: '#22c55e', fontWeight: 600, fontFamily: 'monospace', fontSize: 12 }}>{fmt(m.output_tokens)}</span>
                    {/* Cache */}
                    <span style={{ textAlign: 'right', color: '#8b5cf6', fontFamily: 'monospace', fontSize: 12 }}>
                      {(m.cache_read_tokens || 0) > 0 ? fmt(m.cache_read_tokens) : '-'}
                    </span>
                    {/* Cost */}
                    <span style={{ textAlign: 'right', fontWeight: 700, color: '#16192c', fontSize: 12 }}>{fmtCost(m.total_cost_usd)}</span>
                    {/* Unit price */}
                    <span style={{ textAlign: 'right', fontSize: 10, color: '#bbb' }}>
                      {m.price_in > 0 ? `$${m.price_in}/$${m.price_out}` : '-'}
                    </span>
                    {/* Proportion bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 16 }}>
                      <div style={{ flex: 1, height: 6, background: '#f3f4f6', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: Math.min(pct, 100) + '%', background: cfg.color, borderRadius: 3, transition: 'width .3s' }} />
                      </div>
                      <span style={{ fontSize: 10, color: '#9ca3af', width: 36, textAlign: 'right', flexShrink: 0 }}>{pct.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </>}
    </div>
  );
}

function StatCard({ color, label, value, sub }: { color: string; label: string; value: string; sub?: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #ececf1', padding: '16px 20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: color }} />
      <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: .3, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#16192c' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
