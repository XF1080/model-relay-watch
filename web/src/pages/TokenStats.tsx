import { useEffect, useState, useMemo } from 'react';
import { Toast } from '@douyinfe/semi-ui';
import { getTokenStats } from '../api/client';

/* ─── Group colors (matching Channels tag config) ─── */
const groupConfig: Record<string, { label: string; color: string; icon: string }> = {
  claude:   { label: 'Claude',   color: '#d97706', icon: 'C' },
  codex:    { label: 'Codex',    color: '#6e56cf', icon: 'X' },
  gemini:   { label: 'Gemini',   color: '#4285f4', icon: 'G' },
  openai:   { label: 'OpenAI',   color: '#10a37f', icon: 'O' },
  deepseek: { label: 'DeepSeek', color: '#5b6ee1', icon: 'D' },
};
const defaultGroup = { label: '其他', color: '#9ca3af', icon: '?' };

function fmtTokens(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return String(n);
}

function fmtCost(n: number): string {
  if (n === 0) return '$0';
  if (n < 0.01) return '<$0.01';
  return '$' + n.toFixed(2);
}

export default function TokenStats() {
  const [data, setData] = useState<any>(null);
  const [range, setRange] = useState('24h');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = (r: string) => {
    setLoading(true);
    setError('');
    getTokenStats(r)
      .then(setData)
      .catch((e: any) => {
        setError(e.response?.data?.error || '加载失败');
        setData(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(range); }, [range]);

  const summary = data?.summary;
  const groups: any[] = data?.groups || [];
  const timeline: any[] = data?.timeline || [];

  // Timeline max for scaling bars
  const tlMax = useMemo(() => {
    if (!timeline.length) return 1;
    return Math.max(1, ...timeline.map((t: any) => t.input + t.output));
  }, [timeline]);

  const rangeLabel: Record<string, string> = { '24h': '24 小时', '7d': '7 天', '30d': '30 天' };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', fontFamily: "Inter,-apple-system,'Segoe UI',sans-serif" }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: '#16192c' }}>用量统计</h1>
          <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 3 }}>
            基于 Claude Code / Codex 本地会话日志
          </div>
        </div>
        {/* Time range selector */}
        <div style={{ display: 'flex', gap: 0, background: '#f3f4f6', borderRadius: 10, padding: 3 }}>
          {(['24h', '7d', '30d'] as const).map(r => (
            <button key={r} onClick={() => setRange(r)} style={{
              padding: '6px 16px', fontSize: 13, fontWeight: 600, borderRadius: 8,
              border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              background: range === r ? '#fff' : 'transparent',
              color: range === r ? '#6366f1' : '#9ca3af',
              boxShadow: range === r ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            }}>{rangeLabel[r]}</button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div style={{
          padding: '40px 20px', textAlign: 'center', color: '#9ca3af',
          background: '#fff', borderRadius: 14, border: '1px solid #ececf1',
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#ef4444', marginBottom: 8 }}>{error}</div>
          <div style={{ fontSize: 12 }}>请确认 Claude Code 已安装并有会话记录</div>
        </div>
      )}

      {/* Loading */}
      {loading && !data && (
        <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>加载中...</div>
      )}

      {summary && <>
        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          <SummaryCard label="总 Token" value={fmtTokens(summary.total_tokens)} color="#6366f1"
            sub={`${summary.total_requests} 次请求`} />
          <SummaryCard label="输入 Token" value={fmtTokens(summary.total_input_tokens)} color="#3b82f6"
            sub={summary.total_cache_read > 0 ? `缓存读取 ${fmtTokens(summary.total_cache_read)}` : undefined} />
          <SummaryCard label="输出 Token" value={fmtTokens(summary.total_output_tokens)} color="#22c55e"
            sub={summary.total_cache_write > 0 ? `缓存写入 ${fmtTokens(summary.total_cache_write)}` : undefined} />
          <SummaryCard label="估算费用" value={fmtCost(summary.total_cost_usd)} color="#f97316" />
        </div>

        {/* Timeline */}
        {timeline.length > 0 && (
          <div style={{
            background: '#fff', borderRadius: 14, border: '1px solid #ececf1',
            padding: '20px 24px', marginBottom: 20,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#16192c', marginBottom: 16 }}>
              用量趋势
              <span style={{ fontSize: 11, fontWeight: 500, color: '#9ca3af', marginLeft: 8 }}>
                {rangeLabel[range]}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 120 }}>
              {timeline.map((t: any, i: number) => {
                const total = t.input + t.output;
                const h = total > 0 ? Math.max(4, (total / tlMax) * 100) : 0;
                const inH = total > 0 ? (t.input / total) * h : 0;
                const outH = h - inH;
                return (
                  <div key={i} style={{
                    flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    height: '100%', position: 'relative',
                  }} title={`${t.time}\n输入: ${fmtTokens(t.input)}\n输出: ${fmtTokens(t.output)}\n请求: ${t.requests}`}>
                    {h > 0 && <>
                      <div style={{ height: outH + '%', background: '#22c55e', borderRadius: '2px 2px 0 0', minHeight: outH > 0 ? 1 : 0 }} />
                      <div style={{ height: inH + '%', background: '#3b82f6', borderRadius: total === t.input ? '2px 2px 0 0' : 0 }} />
                    </>}
                    {h === 0 && <div style={{ height: 2, background: '#f0f0f0', borderRadius: 1 }} />}
                  </div>
                );
              })}
            </div>
            {/* Timeline labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: '#9ca3af' }}>
              <span>{timeline[0]?.time}</span>
              <span style={{ display: 'flex', gap: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: '#3b82f6', display: 'inline-block' }} />
                  输入
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: '#22c55e', display: 'inline-block' }} />
                  输出
                </span>
              </span>
              <span>{timeline[timeline.length - 1]?.time}</span>
            </div>
          </div>
        )}

        {/* Groups */}
        {groups.length === 0 && !loading && (
          <div style={{
            padding: 40, textAlign: 'center', color: '#9ca3af',
            background: '#fff', borderRadius: 14, border: '1px solid #ececf1',
          }}>该时间范围内无请求数据</div>
        )}

        {groups.map((g: any) => {
          const cfg = groupConfig[g.app_type] || { ...defaultGroup, label: g.label || g.app_type };
          return (
            <div key={g.app_type} style={{ marginBottom: 20 }}>
              {/* Group header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 800, color: '#fff', background: cfg.color,
                }}>{cfg.icon}</div>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#16192c' }}>{cfg.label}</span>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: '#9ca3af', background: '#f3f4f6',
                  padding: '2px 8px', borderRadius: 8,
                }}>{g.requests} 次请求</span>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>
                  {fmtTokens(g.total_in + g.total_out)} tokens
                  {g.total_cost > 0 && <> &middot; {fmtCost(g.total_cost)}</>}
                </span>
              </div>

              {/* Model cards grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 10 }}>
                {(g.models || []).map((m: any) => {
                  const totalGroupTokens = g.total_in + g.total_out;
                  const modelTokens = m.input_tokens + m.output_tokens;
                  const pct = totalGroupTokens > 0 ? (modelTokens / totalGroupTokens) * 100 : 0;

                  return (
                    <div key={m.model} style={{
                      background: '#fff', borderRadius: 12, border: '1px solid #ececf1',
                      padding: '16px 20px', transition: 'box-shadow 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      {/* Model name + badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 8, display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          fontSize: 14, fontWeight: 700, color: cfg.color,
                          background: cfg.color + '12', border: `1px solid ${cfg.color}20`,
                        }}>{cfg.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#16192c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {m.display_name || m.model}
                          </div>
                          {m.display_name && m.display_name !== m.model && (
                            <div style={{ fontSize: 10, color: '#9ca3af', fontFamily: 'monospace' }}>{m.model}</div>
                          )}
                        </div>
                        <div style={{
                          fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6,
                          background: '#f3f4f6', color: '#9ca3af',
                        }}>
                          {m.requests} 次
                        </div>
                      </div>

                      {/* Token stats grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginBottom: 12 }}>
                        <MiniStat label="输入" value={fmtTokens(m.input_tokens)} color="#3b82f6" />
                        <MiniStat label="输出" value={fmtTokens(m.output_tokens)} color="#22c55e" />
                        <MiniStat label="请求次数" value={String(m.requests)} color="#6366f1" />
                        <MiniStat label="平均延迟" value={m.avg_latency_ms > 0 ? m.avg_latency_ms + ' ms' : '-'} color="#f97316" />
                        {m.cache_read_tokens > 0 && (
                          <MiniStat label="缓存读取" value={fmtTokens(m.cache_read_tokens)} color="#8b5cf6" />
                        )}
                        {m.total_cost_usd > 0 && (
                          <MiniStat label="费用" value={fmtCost(m.total_cost_usd)} color="#d97706" />
                        )}
                      </div>

                      {/* Proportion bar */}
                      <div style={{ height: 4, background: '#f3f4f6', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: pct + '%', background: cfg.color, borderRadius: 2, transition: 'width 0.3s' }} />
                      </div>
                      <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 4, textAlign: 'right' }}>
                        占比 {pct.toFixed(1)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </>}
    </div>
  );
}

/* ─── Sub-components ──── */
function SummaryCard({ label, value, color, sub }: { label: string; value: string; color: string; sub?: string }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 12, border: '1px solid #ececf1',
      padding: '16px 20px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: color,
      }} />
      <div style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#16192c' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}
