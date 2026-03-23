import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { getTokenStats, getPricing, savePricing, deletePricing } from '../api/client';

/* --- Group config --- */
const groupConfig: Record<string, { label: string; color: string; icon: string }> = {
  claude:   { label: 'Claude Code', color: '#d97706', icon: 'C' },
  codex:    { label: 'Codex',       color: '#6e56cf', icon: 'X' },
  gemini:   { label: 'Gemini CLI',  color: '#4285f4', icon: 'G' },
  opencode: { label: 'OpenCode',    color: '#10a37f', icon: 'O' },
  openclaw: { label: 'OpenClaw',    color: '#ef4444', icon: 'W' },
};

/* --- Provider config --- */
const providerConfig: Record<string, { label: string; color: string }> = {
  anthropic: { label: 'Anthropic', color: '#d97706' },
  openai:    { label: 'OpenAI',    color: '#10a37f' },
  google:    { label: 'Google',    color: '#4285f4' },
  deepseek:  { label: 'DeepSeek',  color: '#6366f1' },
  zhipu:     { label: '智谱 AI',   color: '#2563eb' },
  minimax:   { label: 'MiniMax',   color: '#8b5cf6' },
  moonshot:  { label: 'Moonshot',  color: '#f59e0b' },
  alibaba:   { label: '阿里云',    color: '#ff6a00' },
  other:     { label: '其他',      color: '#9ca3af' },
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

/* --- Chart Tooltip --- */
function ChartTooltip({ data, barRef }: { data: any; barRef: HTMLDivElement }) {
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rect = barRef.getBoundingClientRect();
    const parentRect = barRef.closest('[data-chart-container]')?.getBoundingClientRect();
    if (!parentRect) return;
    const left = rect.left - parentRect.left + rect.width / 2;
    const top = rect.top - parentRect.top - 8;
    setPos({ left, top });
  }, [barRef]);

  return (
    <div ref={tipRef} style={{
      position: 'absolute', zIndex: 50, pointerEvents: 'none',
      left: pos.left, top: pos.top, transform: 'translate(-50%, -100%)',
    }}>
      <div style={{
        background: '#1f2937', color: '#fff', borderRadius: 8, padding: '8px 12px',
        fontSize: 11, lineHeight: 1.6, whiteSpace: 'nowrap',
        boxShadow: '0 4px 12px rgba(0,0,0,.2)',
      }}>
        <div style={{ fontWeight: 700, marginBottom: 2 }}>{data.time}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: 1, background: '#3b82f6', display: 'inline-block' }} />
          输入: <span style={{ fontWeight: 600 }}>{fmt(data.input || 0)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: 1, background: '#22c55e', display: 'inline-block' }} />
          输出: <span style={{ fontWeight: 600 }}>{fmt(data.output || 0)}</span>
        </div>
        <div style={{ color: '#9ca3af' }}>请求: {data.requests}  费用: {fmtCost(data.cost)}</div>
      </div>
      <div style={{
        width: 0, height: 0, margin: '0 auto',
        borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
        borderTop: '5px solid #1f2937',
      }} />
    </div>
  );
}

/* --- Pricing Modal --- */
function PricingModal({ onClose }: { onClose: () => void }) {
  const [official, setOfficial] = useState<any[]>([]);
  const [custom, setCustom] = useState<Record<string, any>>({});
  const [edits, setEdits] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [newKey, setNewKey] = useState('');

  const reload = () => {
    getPricing().then(d => {
      setOfficial(d.official || []);
      const m: Record<string, any> = {};
      for (const c of (d.custom || [])) m[c.model_key] = c;
      setCustom(m);
      setEdits({});
    }).catch(() => setMsg('加载定价失败'));
  };

  useEffect(() => { reload(); }, []);

  // Merged list: official + custom-only entries
  const merged = useMemo(() => {
    const map = new Map<string, any>();
    for (const o of official) {
      const c = custom[o.model_key];
      map.set(o.model_key, c
        ? { ...c, isCustom: true, officialIn: o.input_price, officialOut: o.output_price }
        : { ...o, isCustom: false });
    }
    // Custom entries not in official list
    for (const [key, c] of Object.entries(custom)) {
      if (!map.has(key)) map.set(key, { ...c, isCustom: true });
    }
    return Array.from(map.values()).sort((a, b) => a.model_key.localeCompare(b.model_key));
  }, [official, custom]);

  const getVal = (key: string, field: string, fallback: number) => {
    if (edits[key] && edits[key][field] !== undefined) return edits[key][field];
    return fallback;
  };

  const setField = (key: string, field: string, val: string) => {
    const num = parseFloat(val);
    if (isNaN(num) && val !== '') return;
    // Build base from: existing edit > custom > official
    const base = edits[key]
      || custom[key]
      || official.find(o => o.model_key === key)
      || { input_price: 0, output_price: 0, cache_read_ratio: 0.1, cache_write_ratio: 0 };
    setEdits(prev => ({
      ...prev,
      [key]: { ...base, model_key: key, [field]: val === '' ? '' : num },
    }));
  };

  const handleSave = async () => {
    const items = Object.values(edits).filter(e => e.model_key);
    if (items.length === 0) { setMsg('没有修改'); return; }
    // Replace empty string values with 0
    const cleaned = items.map(item => {
      const out: any = { ...item };
      for (const f of ['input_price', 'output_price', 'cache_read_ratio', 'cache_write_ratio']) {
        if (out[f] === '' || out[f] === undefined) out[f] = 0;
      }
      delete out.isCustom;
      delete out.officialIn;
      delete out.officialOut;
      return out;
    });
    setSaving(true);
    setMsg('');
    try {
      await savePricing(cleaned);
      setMsg('已保存');
      reload();
    } catch (e: any) {
      setMsg('保存失败: ' + (e.response?.data?.error || e.message));
    }
    setSaving(false);
  };

  const handleDelete = async (key: string) => {
    try {
      await deletePricing(key);
      setMsg(`已恢复 ${key} 默认定价`);
      reload();
    } catch (e: any) {
      setMsg('删除失败: ' + (e.response?.data?.error || e.message));
    }
  };

  const handleAdd = () => {
    const key = newKey.trim().toLowerCase();
    if (!key) return;
    if (merged.some(m => m.model_key === key) || edits[key]) {
      setMsg(`${key} 已存在`);
      return;
    }
    setEdits(prev => ({
      ...prev,
      [key]: { model_key: key, input_price: 0, output_price: 0, cache_read_ratio: 0.1, cache_write_ratio: 0 },
    }));
    setNewKey('');
  };

  const inputStyle: React.CSSProperties = {
    width: 80, height: 28, padding: '0 6px', borderRadius: 6, border: '1px solid #e5e7eb',
    fontSize: 12, textAlign: 'right', outline: 'none', fontFamily: 'monospace',
    boxSizing: 'border-box',
  };

  const allRows = useMemo(() => {
    // Merge official+custom list with new edits not yet in list
    const keys = new Set(merged.map(m => m.model_key));
    const extra = Object.values(edits).filter(e => !keys.has(e.model_key));
    return [...merged, ...extra.map(e => ({ ...e, isCustom: false, isNew: true }))];
  }, [merged, edits]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(2px)',
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 16, width: 780, maxHeight: '85vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,.15)',
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '18px 24px', borderBottom: '1px solid #f0f0f0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#16192c' }}>定价设置</div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>单位: $/百万 tokens，自定义定价优先于官方默认</div>
          </div>
          <button onClick={onClose} style={{
            width: 30, height: 30, borderRadius: 8, border: 'none', background: '#f3f4f6',
            fontSize: 14, cursor: 'pointer', color: '#6b7280',
          }}>x</button>
        </div>

        {/* Add new row */}
        <div style={{ padding: '10px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            placeholder="输入模型名称，如 deepseek-v3"
            value={newKey}
            onChange={e => setNewKey(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
            style={{
              flex: 1, height: 32, padding: '0 10px', borderRadius: 6, border: '1px solid #e5e7eb',
              fontSize: 12, outline: 'none', color: '#16192c',
            }}
          />
          <button onClick={handleAdd} style={{
            height: 32, padding: '0 14px', borderRadius: 6, fontSize: 12, fontWeight: 600,
            border: 'none', background: '#6366f1', color: '#fff', cursor: 'pointer',
          }}>+ 新增</button>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflow: 'auto', padding: '0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
                {['模型', '输入 ($/M)', '输出 ($/M)', '缓存读取比', '缓存写入比', '操作'].map((h, i) => (
                  <th key={i} style={{
                    padding: '10px 8px', textAlign: i === 0 ? 'left' : i === 5 ? 'center' : 'right',
                    fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase',
                    borderBottom: '2px solid #f0f0f0', letterSpacing: .3,
                    paddingLeft: i === 0 ? 24 : undefined,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allRows.map(item => {
                const key = item.model_key;
                const hasEdit = !!edits[key];
                return (
                  <tr key={key} style={{
                    borderBottom: '1px solid #f5f5f5',
                    background: hasEdit ? '#fefce8' : 'transparent',
                  }}>
                    <td style={{ padding: '8px 8px 8px 24px', fontWeight: 600, color: hasEdit ? '#6366f1' : '#16192c', whiteSpace: 'nowrap' }}>
                      {key}
                      {item.isCustom && !hasEdit && (
                        <span style={{ marginLeft: 6, fontSize: 9, color: '#6366f1', background: 'rgba(99,102,241,.08)', padding: '1px 6px', borderRadius: 4 }}>自定义</span>
                      )}
                      {hasEdit && (
                        <span style={{ marginLeft: 6, fontSize: 9, color: '#f59e0b', background: 'rgba(245,158,11,.08)', padding: '1px 6px', borderRadius: 4 }}>未保存</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right', padding: '4px 8px' }}>
                      <input style={{ ...inputStyle, borderColor: hasEdit ? '#fbbf24' : '#e5e7eb' }}
                        value={getVal(key, 'input_price', item.input_price)}
                        onChange={e => setField(key, 'input_price', e.target.value)} />
                    </td>
                    <td style={{ textAlign: 'right', padding: '4px 8px' }}>
                      <input style={{ ...inputStyle, borderColor: hasEdit ? '#fbbf24' : '#e5e7eb' }}
                        value={getVal(key, 'output_price', item.output_price)}
                        onChange={e => setField(key, 'output_price', e.target.value)} />
                    </td>
                    <td style={{ textAlign: 'right', padding: '4px 8px' }}>
                      <input style={{ ...inputStyle, borderColor: hasEdit ? '#fbbf24' : '#e5e7eb' }}
                        value={getVal(key, 'cache_read_ratio', item.cache_read_ratio)}
                        onChange={e => setField(key, 'cache_read_ratio', e.target.value)} />
                    </td>
                    <td style={{ textAlign: 'right', padding: '4px 8px' }}>
                      <input style={{ ...inputStyle, borderColor: hasEdit ? '#fbbf24' : '#e5e7eb' }}
                        value={getVal(key, 'cache_write_ratio', item.cache_write_ratio)}
                        onChange={e => setField(key, 'cache_write_ratio', e.target.value)} />
                    </td>
                    <td style={{ textAlign: 'center', padding: '4px 8px' }}>
                      {item.isCustom && (
                        <button onClick={() => handleDelete(key)} style={{
                          fontSize: 11, color: '#ef4444', background: 'rgba(239,68,68,.06)', border: 'none',
                          cursor: 'pointer', padding: '3px 8px', borderRadius: 4, fontWeight: 600,
                        }}>恢复默认</button>
                      )}
                      {hasEdit && (
                        <button onClick={() => setEdits(prev => { const n = { ...prev }; delete n[key]; return n; })} style={{
                          fontSize: 11, color: '#6b7280', background: 'rgba(107,114,128,.06)', border: 'none',
                          cursor: 'pointer', padding: '3px 8px', borderRadius: 4, fontWeight: 600, marginLeft: 4,
                        }}>撤销</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 24px', borderTop: '1px solid #f0f0f0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ fontSize: 12, color: msg.includes('失败') || msg.includes('存在') ? '#ef4444' : '#22c55e', fontWeight: 600 }}>
            {msg}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onClose} style={{
              height: 34, padding: '0 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              border: '1px solid #e5e7eb', background: '#fff', color: '#6b7280', cursor: 'pointer',
            }}>关闭</button>
            <button onClick={handleSave} disabled={saving || Object.keys(edits).length === 0} style={{
              height: 34, padding: '0 18px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              border: 'none', background: '#6366f1', color: '#fff', cursor: 'pointer',
              opacity: saving || Object.keys(edits).length === 0 ? .5 : 1,
            }}>{saving ? '保存中...' : `保存 (${Object.keys(edits).length})`}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TokenStats() {
  const [data, setData] = useState<any>(null);
  const [range, setRange] = useState('24h');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoverBar, setHoverBar] = useState<{ idx: number; el: HTMLDivElement } | null>(null);
  const [showPricing, setShowPricing] = useState(false);

  const load = useCallback(() => {
    setLoading(true); setError('');
    const start = range === 'custom' ? customStart : undefined;
    const end = range === 'custom' ? customEnd : undefined;
    getTokenStats(range, start, end)
      .then(setData)
      .catch((e: any) => { setError(e.response?.data?.error || '加载失败'); setData(null); })
      .finally(() => setLoading(false));
  }, [range, customStart, customEnd]);
  useEffect(() => {
    if (range === 'custom' && !customStart) return; // wait for date selection
    load();
  }, [range, customStart, customEnd, load]);

  const allGroups: any[] = data?.groups || [];

  const tabs = useMemo(() => {
    const items: { key: string; label: string; color: string; icon: string }[] = [
      { key: 'all', label: '全部', color: '#6366f1', icon: '\u2211' },
    ];
    for (const g of allGroups) {
      const cfg = groupConfig[g.app_type];
      if (cfg) items.push({ key: g.app_type, label: cfg.label, color: cfg.color, icon: cfg.icon });
      else items.push({ key: g.app_type, label: g.label || g.app_type, color: defaultGroup.color, icon: defaultGroup.icon });
    }
    return items;
  }, [allGroups]);

  const groups = useMemo(() =>
    activeTab === 'all' ? allGroups : allGroups.filter(g => g.app_type === activeTab),
    [allGroups, activeTab],
  );

  const summary = useMemo(() => {
    if (!data?.summary) return null;
    if (activeTab === 'all') return data.summary;
    const filtered = groups;
    if (filtered.length === 0) return null;
    return {
      total_input_tokens: filtered.reduce((s: number, g: any) => s + g.total_in, 0),
      total_output_tokens: filtered.reduce((s: number, g: any) => s + g.total_out, 0),
      total_cache_read: filtered.reduce((s: number, g: any) =>
        s + (g.models || []).reduce((ms: number, m: any) => ms + (m.cache_read_tokens || 0), 0), 0),
      total_cache_write: filtered.reduce((s: number, g: any) =>
        s + (g.models || []).reduce((ms: number, m: any) => ms + (m.cache_write_tokens || 0), 0), 0),
      total_tokens: filtered.reduce((s: number, g: any) => s + g.total_in + g.total_out, 0),
      total_requests: filtered.reduce((s: number, g: any) => s + g.requests, 0),
      total_cost_usd: filtered.reduce((s: number, g: any) => s + g.total_cost, 0),
    };
  }, [data, groups, activeTab]);

  const timeline: any[] = data?.timeline || [];
  const tlMax = useMemo(() => Math.max(1, ...timeline.map((t: any) => (t.input || 0) + (t.output || 0))), [timeline]);

  const ranges = [
    { key: '24h', label: '24 小时' },
    { key: '7d',  label: '7 天' },
    { key: '30d', label: '30 天' },
    { key: 'all', label: '全部' },
  ];

  const gridCols = '2fr 70px 1fr 1fr 1fr 1fr 80px 3fr';

  return (
    <div style={{ fontFamily: "Inter,-apple-system,'Segoe UI',sans-serif" }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, color: '#9ca3af' }}>基于本地会话日志</span>
          <button onClick={() => setShowPricing(true)} style={{
            height: 28, padding: '0 12px', borderRadius: 7, fontSize: 11, fontWeight: 600,
            border: '1px solid #ececf1', background: '#fff', color: '#6b7280', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'all .15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.color = '#6366f1'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#ececf1'; e.currentTarget.style.color = '#6b7280'; }}
          >&#9881; 定价设置</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 10, padding: 3 }}>
            {ranges.map(r => (
              <button key={r.key} onClick={() => { setRange(r.key); }} style={{
                padding: '6px 16px', fontSize: 13, fontWeight: 600, borderRadius: 8,
                border: 'none', cursor: 'pointer', transition: 'all .15s',
                background: range === r.key ? '#fff' : 'transparent',
                color: range === r.key ? '#6366f1' : '#9ca3af',
                boxShadow: range === r.key ? '0 1px 4px rgba(0,0,0,.08)' : 'none',
              }}>{r.label}</button>
            ))}
            <button onClick={() => setRange('custom')} style={{
              padding: '6px 16px', fontSize: 13, fontWeight: 600, borderRadius: 8,
              border: 'none', cursor: 'pointer', transition: 'all .15s',
              background: range === 'custom' ? '#fff' : 'transparent',
              color: range === 'custom' ? '#6366f1' : '#9ca3af',
              boxShadow: range === 'custom' ? '0 1px 4px rgba(0,0,0,.08)' : 'none',
            }}>自定义</button>
          </div>
          {range === 'custom' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)}
                style={{
                  height: 32, padding: '0 8px', borderRadius: 6, border: '1px solid #e5e7eb',
                  fontSize: 12, color: '#16192c', outline: 'none',
                }} />
              <span style={{ color: '#9ca3af', fontSize: 12 }}>至</span>
              <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)}
                style={{
                  height: 32, padding: '0 8px', borderRadius: 6, border: '1px solid #e5e7eb',
                  fontSize: 12, color: '#16192c', outline: 'none',
                }} />
            </div>
          )}
        </div>
      </div>

      {/* Group Tabs */}
      {tabs.length > 1 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>
          {tabs.map(t => {
            const active = activeTab === t.key;
            return (
              <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', fontSize: 13, fontWeight: 600, borderRadius: 8,
                border: active ? `1.5px solid ${t.color}` : '1.5px solid #ececf1',
                cursor: 'pointer', transition: 'all .15s',
                background: active ? t.color + '10' : '#fff',
                color: active ? t.color : '#6b7280',
              }}>
                <span style={{
                  width: 20, height: 20, borderRadius: 5, display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 800, color: active ? '#fff' : t.color,
                  background: active ? t.color : t.color + '18',
                }}>{t.icon}</span>
                {t.label}
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <div style={{ padding: '40px 20px', textAlign: 'center', background: '#fff', borderRadius: 14, border: '1px solid #ececf1' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#ef4444', marginBottom: 6 }}>{error}</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>请确认 Claude Code / Codex 已安装并有会话记录</div>
        </div>
      )}

      {loading && !data && <div style={{ textAlign: 'center', padding: 60, color: '#9ca3af' }}>加载中...</div>}

      {summary && <>
        {/* Summary row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          <StatCard color="#6366f1" label="总 Token" value={fmt(summary.total_tokens)} sub={`${summary.total_requests.toLocaleString()} 次请求`} />
          <StatCard color="#3b82f6" label="输入 Token" value={fmt(summary.total_input_tokens)}
            sub={summary.total_cache_read > 0 ? `缓存读取 ${fmt(summary.total_cache_read)}` : undefined} />
          <StatCard color="#22c55e" label="输出 Token" value={fmt(summary.total_output_tokens)}
            sub={summary.total_cache_write > 0 ? `缓存写入 ${fmt(summary.total_cache_write)}` : undefined} />
          <StatCard color="#f97316" label="估算费用" value={fmtCost(summary.total_cost_usd)} />
        </div>

        {/* Timeline chart */}
        {timeline.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #ececf1', padding: '20px 24px', marginBottom: 20, position: 'relative' }}
            data-chart-container>
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
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 100, position: 'relative' }}>
              {timeline.map((t: any, i: number) => {
                const total = (t.input || 0) + (t.output || 0);
                const h = total > 0 ? Math.max(3, (total / tlMax) * 100) : 0;
                const inH = total > 0 ? (t.input / total) * h : 0;
                const isHovered = hoverBar?.idx === i;
                return (
                  <div key={i} style={{
                    flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%',
                    cursor: 'pointer', opacity: hoverBar && !isHovered ? 0.4 : 1, transition: 'opacity .15s',
                  }}
                    onMouseEnter={e => setHoverBar({ idx: i, el: e.currentTarget as HTMLDivElement })}
                    onMouseLeave={() => setHoverBar(null)}>
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
            {hoverBar && <ChartTooltip data={timeline[hoverBar.idx]} barRef={hoverBar.el} />}
          </div>
        )}

        {/* Groups */}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#16192c' }}>{cfg.label}</span>
                </div>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>
                  {g.requests.toLocaleString()} 次 &middot; {fmt(g.total_in + g.total_out)} tokens &middot; {fmtCost(g.total_cost)}
                </span>
              </div>

              {/* Table header */}
              <div style={{
                display: 'grid', gridTemplateColumns: gridCols,
                padding: '8px 20px', fontSize: 10, fontWeight: 700, color: '#9ca3af',
                textTransform: 'uppercase', letterSpacing: 0.5, borderBottom: '1px solid #f3f4f6',
              }}>
                <span>模型</span>
                <span style={{ textAlign: 'right' }}>次数</span>
                <span style={{ textAlign: 'right' }}>输入</span>
                <span style={{ textAlign: 'right' }}>输出</span>
                <span style={{ textAlign: 'right' }}>缓存</span>
                <span style={{ textAlign: 'right' }}>费用</span>
                <span style={{ textAlign: 'right' }}>单价</span>
                <span style={{ paddingLeft: 16 }}>占比</span>
              </div>

              {/* Model rows with provider sub-groups */}
              {(() => {
                const models = g.models || [];
                const providerGroups: { provider: string; models: any[] }[] = [];
                let lastProvider = '';
                for (const m of models) {
                  const p = m.provider || 'other';
                  if (p !== lastProvider) {
                    providerGroups.push({ provider: p, models: [] });
                    lastProvider = p;
                  }
                  providerGroups[providerGroups.length - 1].models.push(m);
                }
                const showProviderHeaders = providerGroups.length > 1;

                return providerGroups.map((pg) => {
                  const pcfg = providerConfig[pg.provider] || { label: pg.provider, color: '#9ca3af' };
                  const pgTotal = pg.models.reduce((s: number, m: any) =>
                    s + m.input_tokens + m.output_tokens + (m.cache_read_tokens || 0) + (m.cache_write_tokens || 0), 0);
                  const pgCost = pg.models.reduce((s: number, m: any) => s + (m.total_cost_usd || 0), 0);
                  const pgReqs = pg.models.reduce((s: number, m: any) => s + m.requests, 0);

                  return (
                    <div key={pg.provider}>
                      {showProviderHeaders && (
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px',
                          background: '#f8f9fa', borderBottom: '1px solid #f3f4f6',
                        }}>
                          <span style={{
                            width: 6, height: 6, borderRadius: '50%', background: pcfg.color,
                            display: 'inline-block', flexShrink: 0,
                          }} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: pcfg.color }}>{pcfg.label}</span>
                          <span style={{ fontSize: 10, color: '#9ca3af' }}>
                            {pgReqs.toLocaleString()} 次 · {fmt(pgTotal)} tokens · {fmtCost(pgCost)}
                          </span>
                        </div>
                      )}
                      {pg.models.map((m: any, idx: number) => {
                        const mTotal = m.input_tokens + m.output_tokens + (m.cache_read_tokens || 0) + (m.cache_write_tokens || 0);
                        const pct = allTokens > 0 ? (mTotal / allTokens) * 100 : 0;
                        return (
                          <div key={m.model + m.display_name} style={{
                            display: 'grid', gridTemplateColumns: gridCols,
                            padding: '10px 20px', alignItems: 'center', fontSize: 13,
                            borderBottom: idx < pg.models.length - 1 ? '1px solid #f9fafb' : '1px solid #f3f4f6',
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
                            </div>
                            {/* Requests */}
                            <span style={{ textAlign: 'right', color: '#6b7280', fontWeight: 600, fontFamily: 'monospace', fontSize: 12 }}>
                              {m.requests.toLocaleString()}
                            </span>
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
                });
              })()}
            </div>
          );
        })}
      </>}

      {showPricing && <PricingModal onClose={() => { setShowPricing(false); load(); }} />}
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
