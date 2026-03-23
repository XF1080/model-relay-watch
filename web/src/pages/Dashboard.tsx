import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Toast } from '@douyinfe/semi-ui';
import { getDashboard, getModelStats, testAll, testModel, testBatch, getTestStatus } from '../api/client';
import type { DashboardData } from '../types';
import TokenStats from './TokenStats';

/* ─── Types ──────────────────────────────── */
interface ModelStat {
  model_name: string;
  model_id: number;
  channel_name: string;
  channel_type: string;
  total_tests: number;
  success_rate: number;
  timeout_rate: number;
  avg_latency_ms: number;
  p50_latency_ms: number;
  p90_latency_ms: number;
  p99_latency_ms: number;
  avg_ttfb_ms: number;
  avg_tps: number;
  avg_input_tokens: number;
  avg_output_tokens: number;
  avg_dns_ms: number;
  avg_tcp_ms: number;
  avg_tls_ms: number;
  score_reliability: number;
  score_latency: number;
  score_throughput: number;
  score_network: number;
}

interface ModelGroup {
  model: string;
  channels: ModelStat[];
}

/* ─── Helpers ────────────────────────────── */
const CELLS = 10;

function scoreColor(score: number) {
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#eab308';
  if (score >= 40) return '#f97316';
  return '#ef4444';
}

function overallScore(m: ModelStat) {
  return Math.round(m.score_reliability * 0.4 + m.score_latency * 0.25 + m.score_throughput * 0.2 + m.score_network * 0.15);
}

function fmtMs(v: number) {
  if (!v) return '-';
  if (v >= 1000) return `${(v / 1000).toFixed(1)}s`;
  return `${Math.round(v)}ms`;
}

function latencyColor(v: number) {
  if (!v) return '#999';
  if (v < 800) return '#22c55e';
  if (v < 2000) return '#eab308';
  return '#ef4444';
}

/* ─── Styles ─────────────────────────────── */
const S = {
  page: { color: '#16192c' } as React.CSSProperties,
  // Stat cards
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 } as React.CSSProperties,
  statCard: {
    background: '#fff', borderRadius: 12, padding: '16px 18px',
    border: '1px solid #ececf1', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    position: 'relative' as const, overflow: 'hidden',
  } as React.CSSProperties,
  statLabel: {
    fontSize: 11, color: '#9ca3af', textTransform: 'uppercase' as const,
    letterSpacing: '0.5px', fontWeight: 600, marginBottom: 4,
  } as React.CSSProperties,
  statValue: { fontSize: 22, fontWeight: 800, marginTop: 4 } as React.CSSProperties,
  statSub: { fontSize: 11, color: '#9ca3af', marginTop: 2 } as React.CSSProperties,
  // Search hero
  hero: {
    background: '#fff', borderRadius: 16, padding: '24px 28px', marginBottom: 24,
    border: '1px solid #ececf1', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    position: 'relative' as const,
  } as React.CSSProperties,
  heroGradient: {
    position: 'absolute' as const, top: 0, left: 0, right: 0, height: 3,
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
    borderRadius: '16px 16px 0 0',
  } as React.CSSProperties,
  heroTitle: { fontSize: 15, fontWeight: 700, marginBottom: 14, color: '#16192c' } as React.CSSProperties,
  chipWrap: { display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' as const } as React.CSSProperties,
  chip: {
    padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
    border: '1px solid #ececf1', background: '#f5f6fa', color: '#5a6078',
    transition: 'all 0.15s', userSelect: 'none' as const,
  } as React.CSSProperties,
  chipActive: { border: '1px solid #6366f1', background: '#6366f1', color: '#fff' } as React.CSSProperties,
  // Group
  group: {
    background: '#fff', borderRadius: 14, marginBottom: 16,
    border: '1px solid #ececf1', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    overflow: 'hidden', transition: 'box-shadow 0.2s',
  } as React.CSSProperties,
  groupHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 20px', cursor: 'pointer', userSelect: 'none' as const,
    transition: 'border-color 0.2s',
  } as React.CSSProperties,
  // Table grid (9 cols matching prototype)
  gridCols: '56px 160px 70px 110px 72px 52px 64px auto 54px',
  tableHead: {
    display: 'grid', alignItems: 'center', padding: '0 20px', height: 36,
    background: '#fafafc', borderBottom: '1px solid #ececf1',
    fontSize: 11, color: '#9ca3af', fontWeight: 700, letterSpacing: '0.3px',
    textTransform: 'uppercase' as const, columnGap: 12,
  } as React.CSSProperties,
  tableRow: {
    display: 'grid', alignItems: 'center', padding: '0 20px', minHeight: 56,
    borderBottom: '1px solid #f4f5f8', fontSize: 13, transition: 'background 0.15s',
    cursor: 'pointer', columnGap: 12, position: 'relative' as const,
  } as React.CSSProperties,
  // Detail panel
  detailPanel: {
    padding: '16px 20px 16px 52px', background: '#fafafc',
    borderBottom: '1px solid #ececf1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
  } as React.CSSProperties,
  dimRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 } as React.CSSProperties,
  dimLabel: { width: 56, fontSize: 12, fontWeight: 600, color: '#5a6078', textAlign: 'right' as const, flexShrink: 0 } as React.CSSProperties,
  dimTrack: { flex: 1, height: 8, borderRadius: 4, background: '#f0f0f0', overflow: 'hidden' } as React.CSSProperties,
  dimVal: { width: 30, fontSize: 12, fontWeight: 600, textAlign: 'right' as const, flexShrink: 0 } as React.CSSProperties,
  dmItem: { marginBottom: 8 } as React.CSSProperties,
  dmLabel: { fontSize: 11, color: '#9ca3af', display: 'block' } as React.CSSProperties,
  dmValue: { fontSize: 15, fontWeight: 600, color: '#16192c' } as React.CSSProperties,
};

/* ─── Battery Bar Component ──────────────── */
function BatteryBar({ score }: { score: number }) {
  const filled = Math.round((score / 100) * CELLS);
  const color = scoreColor(score);
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: CELLS }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 20, height: 22, borderRadius: 3,
            background: i < filled ? color : '#f0f0f0',
            border: `1px solid ${i < filled ? 'transparent' : '#e8e8e8'}`,
            transition: 'background 0.3s',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Detail Panel Component ─────────────── */
function DetailPanel({ m }: { m: ModelStat }) {
  const dims = [
    { label: '可靠性', value: Math.round(m.score_reliability * 100) / 100, color: '#22c55e' },
    { label: '延迟', value: Math.round(m.score_latency * 100) / 100, color: '#8b5cf6' },
    { label: '吞吐量', value: Math.round(m.score_throughput * 100) / 100, color: '#06b6d4' },
    { label: '网络', value: Math.round(m.score_network * 100) / 100, color: '#f59e0b' },
  ];
  return (
    <div style={S.detailPanel}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: '#333' }}>📊 四维健康评分</div>
        {dims.map(d => (
          <div key={d.label} style={S.dimRow}>
            <span style={S.dimLabel}>{d.label}</span>
            <div style={S.dimTrack}>
              <div style={{ width: `${d.value}%`, height: '100%', borderRadius: 4, background: d.color, transition: 'width 0.3s' }} />
            </div>
            <span style={{ ...S.dimVal, color: scoreColor(d.value) }}>{d.value}</span>
          </div>
        ))}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: '#333' }}>⚡ 性能详情</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 24px' }}>
          {[
            { label: 'P50 延迟', value: fmtMs(m.p50_latency_ms) },
            { label: 'P99 延迟', value: fmtMs(m.p99_latency_ms) },
            { label: '首字节 TTFB', value: fmtMs(m.avg_ttfb_ms) },
            { label: '吞吐量', value: m.avg_tps ? `${m.avg_tps.toFixed(1)} t/s` : '-' },
            { label: 'DNS 查询', value: `${Math.round(m.avg_dns_ms)}ms` },
            { label: 'TCP 连接', value: `${Math.round(m.avg_tcp_ms)}ms` },
            { label: 'TLS 握手', value: `${Math.round(m.avg_tls_ms)}ms` },
            { label: '综合得分', value: String(overallScore(m)) },
          ].map(item => (
            <div key={item.label} style={S.dmItem}>
              <span style={S.dmLabel}>{item.label}</span>
              <span style={S.dmValue}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Channel Row Component ──────────────── */
function ChannelRow({ m, rank, isBest, checked, onCheck }: { m: ModelStat; rank: number; isBest: boolean; checked: boolean; onCheck: (id: number) => void }) {
  const [expanded, setExpanded] = useState(false);
  const score = overallScore(m);
  const sc = scoreColor(score);
  const isOffline = m.success_rate === 0 && m.total_tests > 0;

  return (
    <>
      <div
        style={{
          ...S.tableRow,
          gridTemplateColumns: S.gridCols,
          background: expanded ? '#fafafc' : isBest ? 'rgba(34,197,94,0.04)' : 'transparent',
          boxShadow: isBest ? 'inset 3px 0 0 #22c55e' : 'none',
          opacity: isOffline ? 0.5 : 1,
        }}
        onClick={() => setExpanded(!expanded)}
        onMouseEnter={e => { if (!expanded) e.currentTarget.style.background = '#fafafc'; }}
        onMouseLeave={e => { if (!expanded) e.currentTarget.style.background = isBest ? 'rgba(34,197,94,0.04)' : 'transparent'; }}
      >
        {/* Checkbox + # */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div onClick={e => { e.stopPropagation(); onCheck(m.model_id); }}>
            <input type="checkbox" checked={checked} readOnly
              style={{ width: 15, height: 15, borderRadius: 4, cursor: 'pointer', accentColor: '#6366f1' }} />
          </div>
          <span style={{
            display: 'inline-flex', width: 22, height: 22, borderRadius: 6,
            alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700,
            background: rank === 0 ? 'rgba(34,197,94,0.1)' : rank === 1 ? 'rgba(6,182,212,0.1)' : rank === 2 ? 'rgba(234,179,8,0.1)' : '#f4f5f8',
            color: rank === 0 ? '#22c55e' : rank === 1 ? '#06b6d4' : rank === 2 ? '#b45309' : '#9ca3af',
          }}>{rank + 1}</span>
        </div>
        {/* Channel name */}
        <div>
          <div style={{ fontWeight: 600, color: '#16192c', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {m.channel_name}
            {isBest && <span style={{
              marginLeft: 6, padding: '1px 8px', borderRadius: 4, fontSize: 10,
              background: '#22c55e', color: '#fff', fontWeight: 700,
            }}>推荐</span>}
          </div>
          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{m.channel_type}</div>
        </div>
        {/* Status */}
        <div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
            background: isOffline ? 'rgba(239,68,68,0.1)' : m.success_rate >= 95 ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
            color: isOffline ? '#ef4444' : m.success_rate >= 95 ? '#22c55e' : '#b45309',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: isOffline ? '#ef4444' : m.success_rate >= 95 ? '#22c55e' : '#eab308',
            }} />
            {isOffline ? '不可用' : m.success_rate >= 95 ? '可用' : '降级'}
          </span>
        </div>
        {/* Latency */}
        <div>
          <div style={{ fontWeight: 700, color: latencyColor(m.avg_latency_ms), fontSize: 13 }}>{fmtMs(m.avg_latency_ms)}</div>
          <div style={{ fontSize: 10, color: '#bbb', marginTop: 1 }}>P50 {fmtMs(m.p50_latency_ms)}</div>
        </div>
        {/* TTFB */}
        <div style={{ color: '#555', fontWeight: 600, fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>{fmtMs(m.avg_ttfb_ms)}</div>
        {/* TPS */}
        <div style={{ color: '#555', fontWeight: 600, fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>{m.avg_tps ? m.avg_tps.toFixed(1) : '-'}</div>
        {/* Success rate */}
        <div style={{
          fontWeight: 700, fontSize: 12,
          color: m.success_rate >= 95 ? '#22c55e' : m.success_rate >= 80 ? '#eab308' : '#ef4444',
        }}>{m.success_rate.toFixed(0)}%</div>
        {/* Battery */}
        <div><BatteryBar score={score} /></div>
        {/* Score ring */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: `conic-gradient(${sc} ${score * 3.6}deg, #f1f2f6 0deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 13, color: sc,
            }}>{score}</div>
          </div>
        </div>
      </div>
      {expanded && <DetailPanel m={m} />}
    </>
  );
}

/* ─── Sort types ─────────────────────────── */
type SortKey = 'score' | 'latency' | 'tps' | 'ttfb' | 'success_rate' | 'throughput';
type SortDir = 'asc' | 'desc';

const SORT_OPTIONS: { key: SortKey; label: string; defaultDir: SortDir }[] = [
  { key: 'score', label: '综合评分', defaultDir: 'desc' },
  { key: 'latency', label: '延迟', defaultDir: 'asc' },
  { key: 'tps', label: '吞吐 (TPS)', defaultDir: 'desc' },
  { key: 'ttfb', label: 'TTFB', defaultDir: 'asc' },
  { key: 'success_rate', label: '成功率', defaultDir: 'desc' },
  { key: 'throughput', label: '吞吐评分', defaultDir: 'desc' },
];

function getSortValue(m: ModelStat, key: SortKey): number {
  switch (key) {
    case 'score': return overallScore(m);
    case 'latency': return m.success_rate > 0 ? m.avg_latency_ms : Infinity;
    case 'tps': return m.avg_tps || 0;
    case 'ttfb': return m.success_rate > 0 ? m.avg_ttfb_ms : Infinity;
    case 'success_rate': return m.success_rate;
    case 'throughput': return m.score_throughput;
    default: return overallScore(m);
  }
}

function sortChannels(channels: ModelStat[], sortKey: SortKey, sortDir: SortDir): ModelStat[] {
  return [...channels].sort((a, b) => {
    const va = getSortValue(a, sortKey);
    const vb = getSortValue(b, sortKey);
    return sortDir === 'asc' ? va - vb : vb - va;
  });
}

/* ─── Filter select style ────────────────── */
const selectStyle: React.CSSProperties = {
  height: 36, padding: '0 32px 0 12px', borderRadius: 9, fontSize: 13,
  fontWeight: 600, border: '1px solid #ececf1', background: '#fff', color: '#5a6078',
  cursor: 'pointer', outline: 'none', appearance: 'none', minWidth: 110,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%239ca3af' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
};

/* ─── Sortable Table Header ──────────────── */
function SortableHeader({ label, colKey, sortKey, sortDir, onSort }: {
  label: string; colKey: SortKey | null;
  sortKey: SortKey; sortDir: SortDir;
  onSort: (key: SortKey) => void;
}) {
  if (!colKey) return <div>{label}</div>;
  const active = sortKey === colKey;
  return (
    <div
      onClick={() => onSort(colKey)}
      style={{ cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: 2, color: active ? '#6366f1' : undefined }}
    >
      {label}
      {active && <span style={{ fontSize: 9 }}>{sortDir === 'asc' ? '▲' : '▼'}</span>}
    </div>
  );
}

/* ─── Model Group Component ──────────────── */
function ModelGroupCard({ group, sortKey, sortDir, onSort, selected, onCheck, testing, onTestGroup }: {
  group: ModelGroup;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
  selected: Set<number>;
  onCheck: (id: number) => void;
  testing: boolean;
  onTestGroup: (ids: number[]) => void;
}) {
  const [open, setOpen] = useState(true);
  const sorted = sortChannels(group.channels, sortKey, sortDir);
  const onlineCount = sorted.filter(c => c.success_rate > 0 || c.total_tests === 0).length;
  // best is always the top scorer regardless of current sort
  const bestByScore = [...group.channels].sort((a, b) => overallScore(b) - overallScore(a));
  const best = bestByScore.find(c => c.success_rate > 0 || c.total_tests === 0);

  return (
    <div
      style={S.group}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
    >
      <div style={S.groupHeader} onClick={() => setOpen(!open)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 10, color: '#9ca3af', transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'none' }}>▶</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#16192c' }}>{group.model}</span>
          <span style={{
            fontSize: 11, padding: '3px 10px', borderRadius: 10, fontWeight: 600,
            background: 'rgba(99,102,241,0.08)', color: '#6366f1',
          }}>{onlineCount}/{sorted.length} 可用</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={e => { e.stopPropagation(); onTestGroup(group.channels.map(c => c.model_id)); }}
            disabled={testing}
            style={{
              height: 28, padding: '0 14px', borderRadius: 7, fontSize: 11, fontWeight: 600,
              cursor: testing ? 'not-allowed' : 'pointer', border: '1px solid #ececf1',
              background: '#fff', color: '#6366f1', transition: 'all 0.15s',
              display: 'inline-flex', alignItems: 'center', gap: 4,
              opacity: testing ? 0.6 : 1,
            }}
            onMouseEnter={e => { if (!testing) { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#6366f1'; } }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#6366f1'; e.currentTarget.style.borderColor = '#ececf1'; }}
          >▶ 测试</button>
          {best && (
            <>
              <span style={{ color: '#9ca3af', fontWeight: 500, fontSize: 12 }}>推荐</span>
              <span style={{ color: '#22c55e', fontWeight: 700, fontSize: 12 }}>{best.channel_name}</span>
              <span style={{
                padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                background: 'rgba(34,197,94,0.1)', color: '#22c55e',
              }}>{fmtMs(best.avg_latency_ms)}</span>
            </>
          )}
        </div>
      </div>
      {open && (
        <>
          <div style={{ ...S.tableHead, gridTemplateColumns: S.gridCols }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <input type="checkbox" style={{ width: 15, height: 15, borderRadius: 4, cursor: 'pointer', accentColor: '#6366f1' }}
                checked={sorted.length > 0 && sorted.every(m => selected.has(m.model_id))}
                onChange={() => {
                  const allChecked = sorted.every(m => selected.has(m.model_id));
                  sorted.forEach(m => { if (allChecked === selected.has(m.model_id)) onCheck(m.model_id); });
                }} />
              <span>#</span>
            </div>
            <SortableHeader label="通道" colKey={null} sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
            <SortableHeader label="状态" colKey={null} sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
            <SortableHeader label="延迟" colKey="latency" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
            <SortableHeader label="TTFB" colKey="ttfb" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
            <SortableHeader label="TPS" colKey="tps" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
            <SortableHeader label="成功率" colKey="success_rate" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
            <SortableHeader label="性能" colKey={null} sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
            <SortableHeader label="评分" colKey="score" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
          </div>
          {sorted.map((m, i) => (
            <ChannelRow key={m.model_id} m={m} rank={i} isBest={m === best && (m.success_rate > 0 || m.total_tests === 0)}
              checked={selected.has(m.model_id)} onCheck={onCheck} />
          ))}
        </>
      )}
    </div>
  );
}

/* ─── Searchable Select Component ────────── */
function SearchableSelect({ value, onChange, options, placeholder, width }: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  width?: number | string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = query
    ? options.filter(o => o.toLowerCase().includes(query.toLowerCase()))
    : options;

  const isActive = !!value;

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Trigger button */}
      <div
        onClick={() => { setOpen(!open); setQuery(''); }}
        style={{
          ...selectStyle,
          width: width || 'auto', minWidth: 120,
          display: 'flex', alignItems: 'center', gap: 4,
          ...(isActive ? { borderColor: '#6366f1', color: '#6366f1', background: 'rgba(99,102,241,0.04)' } : {}),
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
          {value || placeholder}
        </span>
        {value && (
          <span
            onClick={e => { e.stopPropagation(); onChange(''); setOpen(false); }}
            style={{ fontSize: 10, color: '#9ca3af', cursor: 'pointer', flexShrink: 0, marginLeft: 2 }}
          >✕</span>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 4,
          width: Math.max(typeof width === 'number' ? width : 240, 240),
          maxHeight: 320, background: '#fff', borderRadius: 10,
          border: '1px solid #ececf1', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          zIndex: 100, overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}>
          {/* Search input */}
          <div style={{ padding: '8px 10px', borderBottom: '1px solid #f0f0f0' }}>
            <input
              autoFocus
              placeholder="输入搜索…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                width: '100%', height: 32, padding: '0 10px', borderRadius: 6,
                border: '1px solid #ececf1', fontSize: 12, outline: 'none',
                color: '#16192c', background: '#f5f6fa', boxSizing: 'border-box',
              }}
              onFocus={e => { e.target.style.borderColor = '#6366f1'; }}
              onBlur={e => { e.target.style.borderColor = '#ececf1'; }}
            />
          </div>
          {/* Options */}
          <div style={{ overflowY: 'auto', maxHeight: 260 }}>
            {/* "All" option */}
            <div
              onClick={() => { onChange(''); setOpen(false); }}
              style={{
                padding: '8px 14px', fontSize: 12, cursor: 'pointer',
                color: !value ? '#6366f1' : '#5a6078', fontWeight: !value ? 600 : 400,
                background: !value ? 'rgba(99,102,241,0.04)' : 'transparent',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f5f5ff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = !value ? 'rgba(99,102,241,0.04)' : 'transparent'; }}
            >{placeholder}</div>
            {filtered.length === 0 ? (
              <div style={{ padding: '12px 14px', fontSize: 11, color: '#9ca3af', textAlign: 'center' }}>无匹配结果</div>
            ) : (
              filtered.map(o => (
                <div
                  key={o}
                  onClick={() => { onChange(o); setOpen(false); }}
                  style={{
                    padding: '8px 14px', fontSize: 12, cursor: 'pointer',
                    color: value === o ? '#6366f1' : '#16192c', fontWeight: value === o ? 600 : 400,
                    background: value === o ? 'rgba(99,102,241,0.04)' : 'transparent',
                    transition: 'background 0.1s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#f5f5ff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = value === o ? 'rgba(99,102,241,0.04)' : 'transparent'; }}
                >{o}</div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Dashboard ─────────────────────── */
export default function Dashboard() {
  const [tab, setTab] = useState<'monitor' | 'usage'>('monitor');

  const tabs = [
    { key: 'monitor' as const, label: '模型监控', icon: '📊' },
    { key: 'usage' as const, label: '用量统计', icon: '💰' },
  ];

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#f3f4f6', borderRadius: 10, padding: 3, width: 'fit-content' }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: '7px 20px', fontSize: 13, fontWeight: 600, borderRadius: 8,
            border: 'none', cursor: 'pointer', transition: 'all .15s',
            background: tab === t.key ? '#fff' : 'transparent',
            color: tab === t.key ? '#6366f1' : '#9ca3af',
            boxShadow: tab === t.key ? '0 1px 4px rgba(0,0,0,.08)' : 'none',
          }}>{t.label}</button>
        ))}
      </div>
      {tab === 'monitor' ? <MonitorPanel /> : <TokenStats />}
    </div>
  );
}

function MonitorPanel() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [models, setModels] = useState<ModelStat[]>([]);
  const [testing, setTesting] = useState(false);
  const [channelFilter, setChannelFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggleCheck = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir(SORT_OPTIONS.find(o => o.key === key)?.defaultDir || 'desc');
    }
  };

  const load = () => {
    getDashboard().then(setData);
    getModelStats().then(setModels);
    getTestStatus().then(setTesting);
  };

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (!testing) return;
    const timer = setInterval(() => {
      getTestStatus().then(running => {
        setTesting(running);
        if (!running) { load(); clearInterval(timer); }
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [testing]);

  // Unique channel names
  const channelNames = useMemo(() => Array.from(new Set(models.map(m => m.channel_name))).sort(), [models]);

  // Model names filtered by channel selection
  const filteredModelNames = useMemo(() => {
    let list = models;
    if (channelFilter) list = list.filter(m => m.channel_name === channelFilter);
    return Array.from(new Set(list.map(m => m.model_name))).sort();
  }, [models, channelFilter]);

  // Clear model filter if it's no longer in the filtered list
  useEffect(() => {
    if (modelFilter && !filteredModelNames.includes(modelFilter)) {
      setModelFilter('');
    }
  }, [filteredModelNames, modelFilter]);

  // Group by model_name with filters applied
  const groups: ModelGroup[] = useMemo(() => {
    let list = models;
    if (channelFilter) list = list.filter(m => m.channel_name === channelFilter);
    if (modelFilter) list = list.filter(m => m.model_name === modelFilter);
    const map = new Map<string, ModelStat[]>();
    list.forEach(m => {
      const arr = map.get(m.model_name) || [];
      arr.push(m);
      map.set(m.model_name, arr);
    });
    return Array.from(map.entries()).map(([model, channels]) => ({ model, channels }));
  }, [models, channelFilter, modelFilter]);

  // Find fastest channel overall
  const fastest = useMemo(() => {
    const online = models.filter(m => m.success_rate > 0);
    if (!online.length) return null;
    return online.reduce((a, b) => a.avg_latency_ms < b.avg_latency_ms ? a : b);
  }, [models]);

  // Active filter count
  const activeFilters = (channelFilter ? 1 : 0) + (modelFilter ? 1 : 0);
  const clearAllFilters = () => { setChannelFilter(''); setModelFilter(''); };

  // Scoped test: selected > filtered > all
  const handleTestAll = async () => {
    setTesting(true);
    try {
      if (selected.size > 0) {
        await testBatch(Array.from(selected));
        Toast.success(`已启动 ${selected.size} 个模型的测试`);
        setSelected(new Set());
      } else if (channelFilter || modelFilter) {
        const visibleModels = groups.flatMap(g => g.channels);
        await testBatch(visibleModels.map(m => m.model_id));
        Toast.success(`已启动 ${visibleModels.length} 个模型的测试`);
      } else {
        testAll();
        Toast.success('已开始全量测试');
      }
    } catch (e: any) {
      Toast.error(e.response?.data?.error || '失败');
    }
  };

  const handleTestGroup = async (ids: number[]) => {
    setTesting(true);
    try {
      await testBatch(ids);
      Toast.success(`已启动 ${ids.length} 个通道的测试`);
    } catch (e: any) {
      Toast.error(e.response?.data?.error || '测试失败');
    }
  };

  // Test button label
  const visibleModelCount = groups.flatMap(g => g.channels).length;
  const testBtnLabel = testing
    ? '测试中...'
    : selected.size > 0
      ? `▶ 测试所选 (${selected.size})`
      : (channelFilter || modelFilter)
        ? `▶ 测试筛选结果 (${visibleModelCount})`
      : '▶ 全量测试';

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>模型监控</h1>
          <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 3 }}>快速找到每个模型最快的中转通道</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={load}
            style={{ height: 36, padding: '0 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid #ececf1', color: '#5a6078', transition: 'all 0.15s' }}>↻ 刷新</button>
          <button onClick={handleTestAll} disabled={testing}
            style={{ height: 36, padding: '0 18px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: testing ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, background: '#6366f1', border: 'none', color: '#fff', boxShadow: '0 3px 12px rgba(99,102,241,0.25)', transition: 'all 0.15s', opacity: testing ? 0.7 : 1 }}>
            {testBtnLabel}
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      {data && (
        <div style={S.statGrid}>
          <div style={S.statCard}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, borderRadius: '3px 0 0 3px', background: '#6366f1' }} />
            <div style={S.statLabel}>接入通道</div>
            <div style={{ ...S.statValue, color: '#6366f1' }}>{new Set(models.map(m => m.channel_name)).size || '-'}</div>
            <div style={S.statSub}>{models.filter(m => m.success_rate > 0).length > 0 ? `${new Set(models.filter(m => m.success_rate > 0).map(m => m.channel_name)).size} 在线` : ''}</div>
          </div>
          <div style={S.statCard}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, borderRadius: '3px 0 0 3px', background: '#22c55e' }} />
            <div style={S.statLabel}>可用模型</div>
            <div style={{ ...S.statValue, color: '#22c55e' }}>{data.total_models}</div>
            <div style={S.statSub}>{data.healthy_models} 健康</div>
          </div>
          <div style={S.statCard}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, borderRadius: '3px 0 0 3px', background: '#06b6d4' }} />
            <div style={S.statLabel}>最快通道</div>
            <div style={{ ...S.statValue, color: '#22c55e', fontSize: 18 }}>{fastest?.channel_name || '-'}</div>
            <div style={S.statSub}>{fastest ? `平均 ${fmtMs(fastest.avg_latency_ms)}` : ''}</div>
          </div>
          <div style={S.statCard}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, borderRadius: '3px 0 0 3px', background: '#8b5cf6' }} />
            <div style={S.statLabel}>上次测试</div>
            <div style={{ ...S.statValue, color: '#8b5cf6' }}>{data.total_tests_24h}</div>
            <div style={S.statSub}>{data.good_models} 优良</div>
          </div>
        </div>
      )}

      {/* Filter & Sort Bar */}
      <div style={S.hero}>
        <div style={S.heroGradient} />
        <div style={S.heroTitle}>🔍 筛选模型，对比各通道表现</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Channel filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>通道</span>
            <select
              value={channelFilter}
              onChange={e => setChannelFilter(e.target.value)}
              style={{ ...selectStyle, ...(channelFilter ? { borderColor: '#6366f1', color: '#6366f1', background: 'rgba(99,102,241,0.04)' } : {}) }}
            >
              <option value="">全部通道</option>
              {channelNames.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>

          {/* Model filter (searchable) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>模型</span>
            <SearchableSelect
              value={modelFilter}
              onChange={setModelFilter}
              options={filteredModelNames}
              placeholder="全部模型"
              width={220}
            />
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: '#ececf1' }} />

          {/* Sort selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600 }}>排序</span>
            <select
              value={sortKey}
              onChange={e => {
                const key = e.target.value as SortKey;
                setSortKey(key);
                setSortDir(SORT_OPTIONS.find(o => o.key === key)?.defaultDir || 'desc');
              }}
              style={{ ...selectStyle, borderColor: sortKey !== 'score' ? '#6366f1' : '#ececf1', color: sortKey !== 'score' ? '#6366f1' : '#5a6078' }}
            >
              {SORT_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
            <button
              onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}
              style={{
                width: 32, height: 32, borderRadius: 8, border: '1px solid #ececf1',
                background: '#fff', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#5a6078',
                fontWeight: 700, transition: 'all 0.15s',
              }}
              title={sortDir === 'asc' ? '升序 (最小优先)' : '降序 (最大优先)'}
            >{sortDir === 'asc' ? '↑' : '↓'}</button>
          </div>

          {/* Clear all */}
          {activeFilters > 0 && (
            <button
              onClick={clearAllFilters}
              style={{
                height: 32, padding: '0 12px', borderRadius: 8, fontSize: 11,
                fontWeight: 600, border: 'none', background: 'rgba(239,68,68,0.08)',
                color: '#ef4444', cursor: 'pointer', display: 'inline-flex',
                alignItems: 'center', gap: 4, transition: 'all 0.15s',
              }}
            >✕ 清除筛选 ({activeFilters})</button>
          )}
        </div>

        {/* Hint text */}
        <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 10 }}>
          选择通道或模型后，展示对应的 <b style={{ color: '#5a6078', fontWeight: 600 }}>延迟</b>、<b style={{ color: '#5a6078', fontWeight: 600 }}>吞吐</b>、<b style={{ color: '#5a6078', fontWeight: 600 }}>可用性</b> 对比，最优通道自动标绿排首位
        </div>
      </div>

      {/* Results summary */}
      {(channelFilter || modelFilter) && (
        <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontWeight: 600, color: '#6366f1' }}>{groups.length}</span> 个模型匹配
          {channelFilter && <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, background: 'rgba(99,102,241,0.08)', color: '#6366f1', fontWeight: 600 }}>通道: {channelFilter}</span>}
          {modelFilter && <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, background: 'rgba(99,102,241,0.08)', color: '#6366f1', fontWeight: 600 }}>模型: {modelFilter}</span>}
        </div>
      )}

      {/* Model Groups */}
      {groups.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#bbb' }}>
          {models.length === 0 ? '暂无数据，请先发现模型并执行测试' : '未找到匹配的模型'}
        </div>
      ) : (
        groups.map(g => <ModelGroupCard key={g.model} group={g} sortKey={sortKey} sortDir={sortDir} onSort={handleSort} selected={selected} onCheck={toggleCheck} testing={testing} onTestGroup={handleTestGroup} />)
      )}
    </div>
  );
}
