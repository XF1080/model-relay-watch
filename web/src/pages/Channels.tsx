import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Form, Modal, Space, Spin, Toast } from '@douyinfe/semi-ui';
import { IconChevronDown, IconChevronRight, IconDelete, IconEdit, IconKey, IconLink, IconClock, IconPlus, IconRefresh, IconSearch } from '@douyinfe/semi-icons';
import { batchDeleteChannels, createChannel, deleteChannel, discoverModels, listChannels, syncCCSProviders, updateChannel, updateChannelStatus } from '../api/client';
import type { Channel, ModelEntry } from '../types';
import { StatusEnabled, StatusManuallyDisabled } from '../types';

type SourceTab = 'manual' | 'ccs';
type DiscoverTask = { channelId: number; channelName: string; status: 'pending' | 'running' | 'success' | 'failed'; newModels: number; error: string; models: { modelName: string; endpointType: string }[] };

const sourceLabels: Record<SourceTab, string> = { manual: '自定义', ccs: 'CCSwitch' };
const typeMap: Record<string, { label: string; color: string }> = {
  openai: { label: 'OpenAI Chat Completions', color: '#10a37f' },
  responses: { label: 'OpenAI Responses API', color: '#6e56cf' },
  anthropic: { label: 'Anthropic Messages', color: '#d97706' },
};
const getTypeBadge = (type: string) => typeMap[type] || { label: type ? `未知类型 · ${type}` : '未知类型', color: '#64748b' };
const tagOptions = [
  { value: '', label: '自动识别' }, { value: 'claude', label: 'Claude' }, { value: 'openai', label: 'OpenAI' },
  { value: 'gemini', label: 'Gemini' }, { value: 'deepseek', label: 'DeepSeek' }, { value: 'codex', label: 'Codex' }, { value: 'other', label: '其他' },
];
const toolGroups: Record<string, { label: string; color: string }> = {
  claude_code: { label: 'Claude Code', color: '#d97706' },
  codex: { label: 'Codex', color: '#6e56cf' },
  gemini_cli: { label: 'Gemini CLI', color: '#4285f4' },
  other: { label: '其他', color: '#64748b' },
};
const toolOrder = ['claude_code', 'codex', 'gemini_cli', 'other'] as const;
const toolbarBtn = { height: 36, borderRadius: 10, background: '#fff', border: '1px solid #ececf1', color: '#5a6078', fontWeight: 600 } as const;
const rowBtn = { borderRadius: 8, background: '#fff', border: '1px solid #ececf1', color: '#5a6078', fontWeight: 600 } as const;

const isCCS = (ch: Channel) => ch.source === 'ccs';
const groupKey = (ch: Channel) => !isCCS(ch) ? '' : (ch.tool_source && ch.tool_source in toolGroups ? ch.tool_source : 'other');
const healthPercent = (ch: Channel) => !ch.model_count ? 0 : Math.round(((ch.healthy_count || 0) / ch.model_count) * 100);
const discoveredModels = (models: ModelEntry[]) => models.map(m => ({ modelName: m.model_name, endpointType: m.endpoint_type || 'chat' }));
function relativeTime(t?: string) { if (!t) return '从未'; const diff = Date.now() - new Date(t).getTime(); const mins = Math.floor(diff / 60000); if (mins < 1) return '刚刚'; if (mins < 60) return `${mins} 分钟前`; const hours = Math.floor(mins / 60); if (hours < 24) return `${hours} 小时前`; return `${Math.floor(hours / 24)} 天前`; }

function Badge({ label, color, subtle }: { label: string; color: string; subtle?: boolean }) {
  return <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 10, fontWeight: 600, background: subtle ? '#f8fafc' : `${color}15`, color, border: `1px solid ${color}30` }}>{label}</span>;
}

function HealthBar({ pct }: { pct: number }) {
  const filled = Math.round((pct / 100) * 5);
  const color = pct >= 90 ? '#22c55e' : pct >= 60 ? '#eab308' : '#ef4444';
  return <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>{Array.from({ length: 5 }).map((_, i) => <div key={i} style={{ width: 14, height: 16, borderRadius: 2, background: i < filled ? color : '#f0f0f0', border: `1px solid ${i < filled ? 'transparent' : '#e8e8e8'}` }} />)}<span style={{ fontSize: 11, fontWeight: 600, color, marginLeft: 4 }}>{pct}%</span></div>;
}

function StatItem({ label, value }: { label: string; value: React.ReactNode }) {
  return <div><div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 700, marginBottom: 4, letterSpacing: '0.3px', textTransform: 'uppercase' }}>{label}</div><div style={{ fontSize: 13, color: '#16192c' }}>{value}</div></div>;
}

function DiscoverTaskDrawer({ tasks, running, visible, onClose, onClear }: { tasks: DiscoverTask[]; running: boolean; visible: boolean; onClose: () => void; onClear: () => void }) {
  if (!visible) return null;
  const completed = tasks.filter(t => t.status === 'success' || t.status === 'failed').length;
  const successCount = tasks.filter(t => t.status === 'success').length;
  const failedCount = tasks.filter(t => t.status === 'failed').length;
  const totalNewModels = tasks.reduce((sum, t) => sum + t.newModels, 0);
  const pct = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.18)', zIndex: 1190 }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 420, zIndex: 1200, background: '#fff', boxShadow: '-8px 0 28px rgba(0,0,0,.12)', display: 'flex', flexDirection: 'column', animation: 'slideInRight .2s ease-out' }}>
        {/* Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#16192c' }}>{running ? '发现模型中' : '发现完成'}</div>
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>
              {running ? `${completed}/${tasks.length} 已完成` : `${successCount}/${tasks.length} 成功，新增 ${totalNewModels} 个模型`}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {!running && <button onClick={onClear} style={{ height: 28, padding: '0 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, border: '1px solid #e5e7eb', background: '#fff', color: '#6b7280', cursor: 'pointer' }}>清除</button>}
            <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #e5e7eb', background: '#fff', color: '#6b7280', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>x</button>
          </div>
        </div>
        {/* Progress bar */}
        {tasks.length > 0 && (
          <div style={{ padding: '0 20px', paddingTop: 12, paddingBottom: 8, flexShrink: 0 }}>
            <div style={{ height: 4, background: '#f3f4f6', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 2, transition: 'width .3s', width: `${pct}%`, background: running ? 'linear-gradient(90deg, #6366f1, #8b5cf6)' : '#22c55e' }} />
            </div>
            {running && tasks.find(t => t.status === 'running') && (
              <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                正在发现: {tasks.find(t => t.status === 'running')?.channelName}
              </div>
            )}
          </div>
        )}
        {/* Task list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {tasks.map((t, i) => (
            <div key={t.channelId}>
              <div onClick={() => t.models.length > 0 ? setExpandedIdx(expandedIdx === i ? null : i) : undefined} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 20px', fontSize: 12, borderBottom: '1px solid #f9fafb', background: t.status === 'running' ? 'rgba(99,102,241,0.04)' : 'transparent', cursor: t.models.length > 0 ? 'pointer' : 'default' }}>
                <span style={{ width: 16, textAlign: 'center', flexShrink: 0, fontSize: 12 }}>
                  {t.status === 'pending' && <span style={{ color: '#d1d5db' }}>○</span>}
                  {t.status === 'running' && <span style={{ color: '#6366f1' }}>◌</span>}
                  {t.status === 'success' && <span style={{ color: '#22c55e' }}>✓</span>}
                  {t.status === 'failed' && <span style={{ color: '#ef4444' }}>✕</span>}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: '#16192c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.channelName}</div>
                  {t.error && <div style={{ fontSize: 10, color: '#ef4444', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={t.error}>{t.error}</div>}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {t.status === 'success' && <span style={{ fontSize: 11, fontWeight: 600, color: '#22c55e' }}>+{t.newModels}</span>}
                  {t.status === 'running' && <span style={{ fontSize: 11, color: '#6366f1' }}>...</span>}
                </div>
                {t.models.length > 0 && <span style={{ fontSize: 10, color: '#bbb', flexShrink: 0 }}>{expandedIdx === i ? '▾' : '▸'}</span>}
              </div>
              {expandedIdx === i && t.models.length > 0 && (
                <div style={{ background: '#fafbfc' }}>
                  {t.models.map((m, mi) => (
                    <div key={mi} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 20px 5px 46px', fontSize: 11, borderBottom: '1px solid #f5f5f5' }}>
                      <span style={{ color: '#22c55e', fontWeight: 700 }}>+</span>
                      <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#374151' }}>{m.modelName}</div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#6366f1', background: 'rgba(99,102,241,0.08)', borderRadius: 999, padding: '2px 6px' }}>{m.endpointType}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Footer */}
        {!running && tasks.length > 0 && (
          <div style={{ padding: '10px 20px', borderTop: '1px solid #f0f0f0', flexShrink: 0, display: 'flex', gap: 16, fontSize: 11, color: '#6b7280' }}>
            <span style={{ color: '#22c55e', fontWeight: 600 }}>✓ {successCount} 成功</span>
            {failedCount > 0 && <span style={{ color: '#ef4444', fontWeight: 600 }}>✕ {failedCount} 失败</span>}
            <span style={{ color: '#6366f1', fontWeight: 600 }}>+ {totalNewModels} 新模型</span>
          </div>
        )}
      </div>
    </>
  );
}

function SyncMenu({ syncing, onSelect }: { syncing: boolean; onSelect: (cleanup: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<'incremental' | 'full' | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleSelect = (cleanup: boolean) => {
    setOpen(false);
    onSelect(cleanup);
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <Button
        icon={<IconRefresh />}
        onClick={() => setOpen(v => !v)}
        loading={syncing}
        disabled={syncing}
        style={{
          ...toolbarBtn,
          padding: '0 12px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: open ? '#4650dd' : toolbarBtn.color,
          borderColor: open ? 'rgba(99,102,241,0.45)' : toolbarBtn.border,
          boxShadow: open ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
        }}
      >
        <span>CCS 同步</span>
        <IconChevronDown size="small" style={{ color: open ? '#6366f1' : '#94a3b8', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .18s ease' }} />
      </Button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: 220, background: '#fff', border: '1px solid #dfe3f0', borderRadius: 10, boxShadow: '0 12px 32px rgba(15,23,42,0.14)', padding: 6, zIndex: 20 }}>
          <div style={{ padding: '6px 10px 8px', fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.3px' }}>同步方式</div>
          <button
            type="button"
            onClick={() => handleSelect(false)}
            onMouseEnter={() => setHovered('incremental')}
            onMouseLeave={() => setHovered(null)}
            style={{ width: '100%', border: 'none', background: hovered === 'incremental' ? '#f4f6ff' : 'transparent', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', textAlign: 'left', color: '#16192c', fontSize: 13, fontWeight: 600, transition: 'background .15s ease' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span>增量同步</span>
              <span style={{ fontSize: 10, color: '#6366f1', background: 'rgba(99,102,241,0.08)', borderRadius: 999, padding: '2px 6px', fontWeight: 700 }}>推荐</span>
            </div>
            <div style={{ marginTop: 4, color: '#9ca3af', fontSize: 11, fontWeight: 500, lineHeight: 1.45 }}>仅同步新增和变更项，适合日常更新。</div>
          </button>
          <div style={{ height: 1, background: '#f1f5f9', margin: '4px 6px' }} />
          <button
            type="button"
            onClick={() => handleSelect(true)}
            onMouseEnter={() => setHovered('full')}
            onMouseLeave={() => setHovered(null)}
            style={{ width: '100%', border: 'none', background: hovered === 'full' ? '#f8fafc' : 'transparent', borderRadius: 8, padding: '10px 12px', cursor: 'pointer', textAlign: 'left', color: '#16192c', fontSize: 13, fontWeight: 600, transition: 'background .15s ease' }}
          >
            <div>全量同步</div>
            <div style={{ marginTop: 4, color: '#9ca3af', fontSize: 11, fontWeight: 500, lineHeight: 1.45 }}>按 CCS 当前数据重新完整同步，适合大范围校准。</div>
          </button>
        </div>
      )}
    </div>
  );
}

function ChannelCard({ ch, selected, discovering, onToggleSelect, onDiscover, onEdit, onToggleStatus, onDelete }: {
  ch: Channel; selected: boolean; discovering: number; onToggleSelect: () => void;
  onDiscover: (ch: Channel) => void; onEdit: (ch: Channel) => void; onToggleStatus: (ch: Channel) => void; onDelete: (id: number) => void;
}) {
  const tp = getTypeBadge(ch.type);
  const toolKey = groupKey(ch);
  const toolLabel = toolKey ? toolGroups[toolKey].label : '';
  const toolColor = toolKey ? toolGroups[toolKey].color : '#64748b';
  const pct = healthPercent(ch);
  const enabled = ch.status === StatusEnabled;
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: selected ? '2px solid #6366f1' : '1px solid #ececf1', padding: selected ? '17px 23px' : '18px 24px', opacity: enabled ? 1 : 0.6, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <input type="checkbox" checked={selected} onChange={onToggleSelect} style={{ width: 16, height: 16, cursor: 'pointer', accentColor: '#6366f1' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: enabled ? '#22c55e' : '#bbb' }} />
          <span style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>{ch.name}</span>
          <Badge label={tp.label} color={tp.color} />
          {toolLabel && <Badge label={toolLabel} color={toolColor} subtle />}
          {!enabled && <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 10, background: '#f5f5f5', color: '#999', fontWeight: 500 }}>{ch.status === StatusManuallyDisabled ? '手动禁用' : '自动禁用'}</span>}
        </div>
        <Space>
          <Button size="small" icon={<IconSearch />} loading={discovering === ch.id} onClick={() => onDiscover(ch)} style={rowBtn}>发现模型</Button>
          <Button size="small" icon={<IconEdit />} onClick={() => onEdit(ch)} style={rowBtn}>编辑</Button>
          <Button size="small" onClick={() => onToggleStatus(ch)} style={rowBtn}>{enabled ? '禁用' : '启用'}</Button>
          <Button size="small" icon={<IconDelete />} onClick={() => onDelete(ch.id)} style={{ ...rowBtn, color: '#ef4444', borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.04)' }}>删除</Button>
        </Space>
      </div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 12, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#666' }}><IconLink size="small" style={{ color: '#bbb' }} /><span style={{ fontFamily: 'monospace', fontSize: 11 }}>{ch.base_url}</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#999' }}><IconKey size="small" style={{ color: '#bbb' }} /><span>{ch.api_key_hint || '未设置'}</span></div>
        {ch.proxy_url && <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b' }}><span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: '#eff6ff', color: '#2563eb' }}>通道代理</span><span style={{ fontFamily: 'monospace', fontSize: 11 }}>{ch.proxy_url}</span></div>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, paddingTop: 14, borderTop: '1px solid #ececf1' }}>
        <StatItem label="模型健康" value={ch.model_count ? <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontWeight: 700, fontSize: 14, color: '#333' }}>{ch.healthy_count}/{ch.model_count}</span><HealthBar pct={pct} /></div> : <span style={{ color: '#ccc' }}>无模型</span>} />
        <StatItem label="平均延迟" value={ch.avg_response_time_ms ? <span style={{ fontWeight: 700, fontSize: 14, color: ch.avg_response_time_ms > 5000 ? '#ef4444' : ch.avg_response_time_ms > 2000 ? '#eab308' : '#22c55e' }}>{Math.round(ch.avg_response_time_ms)} ms</span> : <span style={{ color: '#ccc' }}>-</span>} />
        <StatItem label="最后测试" value={<div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#666' }}><IconClock size="small" style={{ color: '#bbb' }} /><span>{relativeTime(ch.last_test_time)}</span></div>} />
        <StatItem label="自动禁用" value={<span style={{ color: ch.auto_ban ? '#22c55e' : '#999', fontWeight: 600 }}>{ch.auto_ban ? '已开启' : '未开启'}</span>} />
      </div>
    </div>
  );
}

export default function Channels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Channel | null>(null);
  const [discovering, setDiscovering] = useState(0);
  const [sourceTab, setSourceTab] = useState<SourceTab>('manual');
  const [sourceTabInitialized, setSourceTabInitialized] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [syncing, setSyncing] = useState(false);
  const [batchDiscovering, setBatchDiscovering] = useState(false);
  const [discoverTasks, setDiscoverTasks] = useState<DiscoverTask[]>([]);
  const [showDiscoverDrawer, setShowDiscoverDrawer] = useState(false);
  const discoverRunning = discoverTasks.some(t => t.status === 'pending' || t.status === 'running');

  const visibleChannels = useMemo(() => channels.filter(ch => sourceTab === 'ccs' ? isCCS(ch) : !isCCS(ch)), [channels, sourceTab]);
  const grouped = useMemo(() => {
    if (sourceTab !== 'ccs') return [];
    const map: Record<string, Channel[]> = {};
    visibleChannels.forEach(ch => { const key = groupKey(ch) || 'other'; (map[key] ||= []).push(ch); });
    const orderedKeys = [...toolOrder.filter(key => map[key]?.length)];
    Object.keys(map).sort().forEach(key => {
      if (!orderedKeys.includes(key as typeof toolOrder[number])) {
        orderedKeys.push(key as typeof toolOrder[number]);
      }
    });
    return orderedKeys.map(key => ({
      key,
      label: toolGroups[key]?.label || `未知分组 · ${key}`,
      color: toolGroups[key]?.color || '#64748b',
      channels: map[key],
    }));
  }, [visibleChannels, sourceTab]);
  const visibleIds = useMemo(() => visibleChannels.map(ch => ch.id), [visibleChannels]);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every(id => selected.has(id));
  const selectedVisibleCount = visibleIds.filter(id => selected.has(id)).length;
  const hasSelection = selected.size > 0;

  const load = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await listChannels();
      setChannels(data);
    } catch (e: any) {
      setChannels([]);
      setLoadError(e.response?.data?.error || '加载通道失败');
    } finally {
      setLoading(false);
      setInitialLoadDone(true);
    }
  };

  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (sourceTabInitialized || !initialLoadDone) return;
    const hasManual = channels.some(ch => !isCCS(ch));
    const hasCCS = channels.some(ch => isCCS(ch));
    setSourceTab(hasManual ? 'manual' : hasCCS ? 'ccs' : 'manual');
    setSourceTabInitialized(true);
  }, [channels, initialLoadDone, sourceTabInitialized]);
  useEffect(() => { setSelected(new Set()); setCollapsedGroups({}); }, [sourceTab]);

  const toggleSelect = (id: number) => setSelected(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  const toggleSelectAllVisible = () => setSelected(prev => { const next = new Set(prev); (allVisibleSelected ? visibleIds : visibleIds).forEach(id => allVisibleSelected ? next.delete(id) : next.add(id)); return next; });
  const toggleGroupCollapse = (key: string) => setCollapsedGroups(prev => ({ ...prev, [key]: !prev[key] }));

  const handleBatchDelete = () => {
    if (!hasSelection) return;
    Modal.confirm({
      title: '批量删除',
      content: `确认删除选中的 ${selected.size} 个通道及其所有模型和测试数据？此操作不可恢复。`,
      okText: '删除',
      cancelText: '取消',
      okButtonProps: { type: 'danger' } as any,
      onOk: async () => {
        try {
          const res = await batchDeleteChannels([...selected]);
          Toast.success(`已删除 ${res.deleted} 个通道`);
          setSelected(new Set());
          load();
        } catch (e: any) {
          Toast.error(e.response?.data?.error || '批量删除失败');
        }
      },
    });
  };

  const handleBatchDiscover = async () => {
    if (!hasSelection || batchDiscovering) return;
    setBatchDiscovering(true);
    const ids = [...selected];
    const tasks: DiscoverTask[] = ids.map(id => {
      const ch = channels.find(c => c.id === id);
      return { channelId: id, channelName: ch?.name || `Channel #${id}`, status: 'pending' as const, newModels: 0, error: '', models: [] };
    });
    setDiscoverTasks(tasks);
    setShowDiscoverDrawer(true);
    try {
      for (let i = 0; i < tasks.length; i++) {
        setDiscoverTasks(prev => prev.map((t, j) => j === i ? { ...t, status: 'running' } : t));
        try {
          const res = await discoverModels(tasks[i].channelId);
          const models = discoveredModels(res.data || []);
          setDiscoverTasks(prev => prev.map((t, j) => j === i ? { ...t, status: 'success', newModels: res.new_models || 0, models } : t));
        } catch (e: any) {
          setDiscoverTasks(prev => prev.map((t, j) => j === i ? { ...t, status: 'failed', error: e.response?.data?.error || '发现失败' } : t));
        }
      }
      load();
    } finally { setBatchDiscovering(false); }
  };

  const doSync = async (cleanup: boolean) => {
    setSyncing(true);
    try {
      const res = await syncCCSProviders(cleanup);
      const parts: string[] = [];
      if (res.added) parts.push(`新增 ${res.added}`);
      if (res.updated) parts.push(`更新 ${res.updated}`);
      if (res.removed) parts.push(`删除 ${res.removed}`);
      Toast.success(parts.length ? parts.join('，') : '无变更');
      load();
    } catch (e: any) { Toast.error(e.response?.data?.error || '同步失败'); }
    finally { setSyncing(false); }
  };

  const handleDiscover = async (channel: Channel) => {
    setDiscovering(channel.id);
    const task: DiscoverTask = { channelId: channel.id, channelName: channel.name, status: 'running', newModels: 0, error: '', models: [] };
    setDiscoverTasks([task]);
    setShowDiscoverDrawer(true);
    try {
      const res = await discoverModels(channel.id);
      const models = discoveredModels(res.data || []);
      setDiscoverTasks([{ ...task, status: 'success', newModels: res.new_models || 0, models }]);
      Toast.success(`发现 ${res.new_models} 个新模型`);
      load();
    } catch (e: any) {
      setDiscoverTasks([{ ...task, status: 'failed', error: e.response?.data?.error || '模型发现失败' }]);
      Toast.error(e.response?.data?.error || '模型发现失败');
    } finally { setDiscovering(0); }
  };

  const handleToggleStatus = async (ch: Channel) => {
    const next = ch.status === StatusEnabled ? StatusManuallyDisabled : StatusEnabled;
    try { await updateChannelStatus(ch.id, next); Toast.success(next === StatusEnabled ? '已启用' : '已禁用'); load(); }
    catch (e: any) { Toast.error(e.response?.data?.error || '状态更新失败'); }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editing) { await updateChannel(editing.id, values); Toast.success('更新成功'); }
      else { await createChannel(values); Toast.success('创建成功'); }
      setModalVisible(false); setEditing(null); load();
    } catch (e: any) { Toast.error(e.response?.data?.error || '操作失败'); }
  };

  const confirmDelete = (ch: Channel) => {
    Modal.confirm({
      title: '确认删除',
      content: `删除“${ch.name}”及其所有模型和测试数据？此操作不可恢复。`,
      okText: '删除',
      cancelText: '取消',
      okButtonProps: { type: 'danger' } as any,
      onOk: () => deleteChannel(ch.id).then(load),
    });
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto', fontFamily: "Inter,-apple-system,'Segoe UI',sans-serif" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: '#16192c' }}>通道管理</h1>
          <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 3 }}>当前 <b style={{ color: '#6366f1' }}>{visibleChannels.length}</b> 个{sourceLabels[sourceTab]}通道</div>
        </div>
        <Space>
          {visibleChannels.length > 0 && <Button onClick={toggleSelectAllVisible} style={toolbarBtn}>{allVisibleSelected ? '取消全选' : '全选'}</Button>}
          {sourceTab === 'ccs' && <SyncMenu syncing={syncing} onSelect={doSync} />}
          <Button icon={<IconSearch />} onClick={handleBatchDiscover} loading={batchDiscovering} disabled={!hasSelection} style={{ ...toolbarBtn, background: hasSelection ? '#fff' : '#f8fafc', color: hasSelection ? '#5a6078' : '#cbd5e1' }}>批量发现模型</Button>
          <Button icon={<IconDelete />} onClick={handleBatchDelete} disabled={!hasSelection} style={{ height: 36, borderRadius: 10, background: hasSelection ? '#ef4444' : '#f8fafc', border: hasSelection ? 'none' : '1px solid #ececf1', color: hasSelection ? '#fff' : '#cbd5e1', fontWeight: 600 }}>批量删除</Button>
          <Button icon={<IconRefresh />} onClick={load} loading={loading} style={toolbarBtn}>刷新</Button>
          {sourceTab === 'manual' && <Button icon={<IconPlus />} onClick={() => { setEditing(null); setModalVisible(true); }} style={{ height: 36, borderRadius: 10, background: '#6366f1', border: 'none', color: '#fff', fontWeight: 600, boxShadow: '0 3px 12px rgba(99,102,241,0.25)' }}>添加通道</Button>}
        </Space>
      </div>

      {visibleChannels.length > 0 && <div style={{ marginBottom: 16, fontSize: 12, color: '#9ca3af' }}>已选 {selectedVisibleCount}/{visibleChannels.length}</div>}

      <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: '2px solid #f0f0f0', width: 'fit-content' }}>
        {(Object.entries(sourceLabels) as Array<[SourceTab, string]>).map(([key, label]) => (
          <button key={key} onClick={() => setSourceTab(key)} style={{ padding: '8px 20px', fontSize: 13, fontWeight: 600, borderRadius: 0, border: 'none', cursor: 'pointer', background: 'transparent', color: sourceTab === key ? '#6366f1' : '#6b7280', borderBottom: sourceTab === key ? '2px solid #6366f1' : '2px solid transparent', marginBottom: -2 }}>{label}</button>
        ))}
      </div>

      {loadError && (
        <div style={{ marginBottom: 16, padding: '12px 16px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)', color: '#b91c1c', fontSize: 13, fontWeight: 600 }}>
          {loadError}
        </div>
      )}

      {loading && visibleChannels.length === 0 ? <div style={{ textAlign: 'center', padding: 60 }}><Spin size="large" /></div> : visibleChannels.length === 0 ? <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>{sourceTab === 'ccs' ? '暂无 CCSwitch 通道，点击上方 CCS 同步导入' : '暂无自定义通道，点击右上角添加'}</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {sourceTab === 'ccs'
            ? grouped.map(group => (
                <div key={group.key} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button type="button" onClick={() => toggleGroupCollapse(group.key)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 2px 0', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: group.color }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#16192c' }}>{group.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', background: '#f3f4f6', padding: '2px 8px', borderRadius: 8 }}>{group.channels.length}</span>
                    {collapsedGroups[group.key] ? <IconChevronRight size="small" style={{ color: '#94a3b8' }} /> : <IconChevronDown size="small" style={{ color: '#94a3b8' }} />}
                  </button>
                  {!collapsedGroups[group.key] && group.channels.map(ch => <ChannelCard key={ch.id} ch={ch} selected={selected.has(ch.id)} discovering={discovering} onToggleSelect={() => toggleSelect(ch.id)} onDiscover={handleDiscover} onEdit={setEditingAndOpen(setEditing, setModalVisible)} onToggleStatus={handleToggleStatus} onDelete={() => confirmDelete(ch)} />)}
                </div>
              ))
            : visibleChannels.map(ch => <ChannelCard key={ch.id} ch={ch} selected={selected.has(ch.id)} discovering={discovering} onToggleSelect={() => toggleSelect(ch.id)} onDiscover={handleDiscover} onEdit={setEditingAndOpen(setEditing, setModalVisible)} onToggleStatus={handleToggleStatus} onDelete={() => confirmDelete(ch)} />)}
        </div>
      )}

      {/* Floating discover task badge + drawer */}
      {discoverTasks.length > 0 && !showDiscoverDrawer && (
        <div onClick={() => setShowDiscoverDrawer(true)} style={{
          position: 'fixed', right: 24, bottom: 24, zIndex: 900,
          width: 52, height: 52, borderRadius: '50%', cursor: 'pointer',
          background: discoverRunning ? '#6366f1' : '#22c55e', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,.18)', transition: 'transform .15s',
          fontSize: 13, fontWeight: 800,
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          {discoverRunning ? `${discoverTasks.filter(t => t.status === 'success' || t.status === 'failed').length}/${discoverTasks.length}` : '✓'}
        </div>
      )}
      <DiscoverTaskDrawer tasks={discoverTasks} running={discoverRunning} visible={showDiscoverDrawer} onClose={() => setShowDiscoverDrawer(false)} onClear={() => { setShowDiscoverDrawer(false); setDiscoverTasks([]); }} />

      <Modal title={editing ? '编辑通道' : '添加通道'} visible={modalVisible} onCancel={() => { setModalVisible(false); setEditing(null); }} footer={<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><Button onClick={() => { setModalVisible(false); setEditing(null); }} style={{ borderRadius: 9, background: '#fff', border: '1px solid #ececf1', color: '#5a6078', fontWeight: 600 }}>取消</Button><Button onClick={() => document.getElementById('channel-form-submit')?.click()} style={{ borderRadius: 9, background: '#6366f1', border: 'none', color: '#fff', fontWeight: 700, boxShadow: '0 3px 12px rgba(99,102,241,0.25)' }}>{editing ? '保存' : '创建'}</Button></div>} width={520}>
        <Form onSubmit={handleSubmit} initValues={editing || { type: 'openai', tag: '', base_url: 'http://127.0.0.1:8317', proxy_url: '', auto_ban: true, priority: 0 }} labelPosition="top">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Form.Input field="name" label="通道名称" rules={[{ required: true, message: '请输入名称' }]} placeholder="例如：Claude 官方" />
            <Form.Select field="tag" label="分组" style={{ width: '100%' }}>
              {tagOptions.map(option => <Form.Select.Option key={option.value || 'auto'} value={option.value}>{option.label}</Form.Select.Option>)}
            </Form.Select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Form.Select field="type" label="协议类型" style={{ width: '100%' }}>
              <Form.Select.Option value="openai">OpenAI Chat Completions</Form.Select.Option>
              <Form.Select.Option value="responses">OpenAI Responses API</Form.Select.Option>
              <Form.Select.Option value="anthropic">Anthropic Messages</Form.Select.Option>
            </Form.Select>
            <Form.InputNumber field="priority" label="优先级" style={{ width: '100%' }} />
          </div>
          <Form.Input field="base_url" label="Base URL" rules={[{ required: true, message: '请输入 URL' }]} placeholder="http://127.0.0.1:8317" />
          <Form.Input field="api_key" label="API Key" mode="password" placeholder={editing ? '留空不修改' : '请输入 API Key'} rules={editing ? [] : [{ required: true, message: '请输入 Key' }]} />
          <Form.Input field="proxy_url" label="测试代理" placeholder="留空使用全局测试代理，例如 http://127.0.0.1:7890 或 socks5://127.0.0.1:1080" />
          <Form.Input field="test_model" label="测试模型" placeholder="留空使用第一个模型" />
          <Form.Switch field="auto_ban" label="自动禁用" />
          <p style={{ fontSize: 12, color: '#9ca3af', margin: '-6px 0 12px 0', lineHeight: 1.5 }}>开启后，当模型连续响应失败或超时（超过设置阈值）时，系统会临时禁用该模型，恢复后可自动重新启用。</p>
          <Form.TextArea field="remark" label="备注" placeholder="可选" autosize={{ minRows: 2 }} />
          <button id="channel-form-submit" type="submit" style={{ display: 'none' }} />
        </Form>
      </Modal>
    </div>
  );
}

function setEditingAndOpen(setEditing: (value: Channel) => void, setModalVisible: (value: boolean) => void) {
  return (channel: Channel) => {
    setEditing(channel);
    setModalVisible(true);
  };
}
