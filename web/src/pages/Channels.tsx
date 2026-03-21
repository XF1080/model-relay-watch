import { useEffect, useState } from 'react';
import { Button, Space, Modal, Form, Toast, Spin, Dropdown } from '@douyinfe/semi-ui';
import { IconPlus, IconSearch, IconRefresh, IconDelete, IconEdit, IconPlayCircle, IconMore, IconLink, IconKey, IconClock } from '@douyinfe/semi-icons';
import { listChannels, createChannel, updateChannel, deleteChannel, discoverModels, updateChannelStatus, testChannel } from '../api/client';
import type { Channel } from '../types';
import { StatusEnabled, StatusManuallyDisabled } from '../types';

const typeMap: Record<string, { label: string; color: string }> = {
  openai: { label: 'Chat Completions', color: '#10a37f' },
  responses: { label: 'Responses API', color: '#6e56cf' },
  anthropic: { label: 'Anthropic', color: '#d97706' },
};

function healthPercent(ch: Channel) {
  if (!ch.model_count) return 0;
  return Math.round((ch.healthy_count || 0) / ch.model_count * 100);
}

function relativeTime(t?: string) {
  if (!t) return '从未';
  const diff = Date.now() - new Date(t).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return '刚刚';
  if (mins < 60) return `${mins} 分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} 小时前`;
  return `${Math.floor(hours / 24)} 天前`;
}

/* ─── Battery Bar for health (5 cells) ──── */
const HEALTH_CELLS = 5;
function HealthBar({ pct }: { pct: number }) {
  const filled = Math.round((pct / 100) * HEALTH_CELLS);
  const color = pct >= 90 ? '#22c55e' : pct >= 60 ? '#eab308' : '#ef4444';
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: HEALTH_CELLS }).map((_, i) => (
        <div key={i} style={{
          width: 14, height: 16, borderRadius: 2,
          background: i < filled ? color : '#f0f0f0',
          border: `1px solid ${i < filled ? 'transparent' : '#e8e8e8'}`,
        }} />
      ))}
      <span style={{ fontSize: 11, fontWeight: 600, color, marginLeft: 4 }}>{pct}%</span>
    </div>
  );
}

export default function Channels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Channel | null>(null);
  const [discovering, setDiscovering] = useState<number>(0);
  const [testingId, setTestingId] = useState<number>(0);
  const [openDropdownId, setOpenDropdownId] = useState<number>(0);

  const load = () => {
    setLoading(true);
    listChannels().then(setChannels).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (editing) {
        await updateChannel(editing.id, values);
        Toast.success('更新成功');
      } else {
        await createChannel(values);
        Toast.success('创建成功');
      }
      setModalVisible(false);
      setEditing(null);
      load();
    } catch (e: any) {
      Toast.error(e.response?.data?.error || '操作失败');
    }
  };

  const handleDiscover = async (id: number) => {
    setDiscovering(id);
    try {
      const res = await discoverModels(id);
      Toast.success(`发现 ${res.new_models} 个新模型`);
      load();
    } catch (e: any) {
      Toast.error(e.response?.data?.error || '模型发现失败');
    } finally {
      setDiscovering(0);
    }
  };

  const handleToggleStatus = async (ch: Channel) => {
    const newStatus = ch.status === StatusEnabled ? StatusManuallyDisabled : StatusEnabled;
    await updateChannelStatus(ch.id, newStatus);
    Toast.success(newStatus === StatusEnabled ? '已启用' : '已禁用');
    load();
  };

  const handleTest = async (id: number) => {
    setTestingId(id);
    try {
      await testChannel(id);
      Toast.success('通道测试已启动');
    } catch (e: any) {
      Toast.error(e.response?.data?.error || '测试启动失败');
    } finally {
      setTimeout(() => setTestingId(0), 2000);
    }
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto', fontFamily: "Inter,-apple-system,'Segoe UI',sans-serif" }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: '#16192c' }}>通道管理</h1>
          <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 3 }}>共 <b style={{ color: '#6366f1' }}>{channels.length}</b> 个通道</div>
        </div>
        <Space>
          <Button icon={<IconRefresh />} onClick={load} loading={loading}
            style={{ height: 36, borderRadius: 10, background: '#fff', border: '1px solid #ececf1', color: '#5a6078', fontWeight: 600 }}>刷新</Button>
          <Button icon={<IconPlus />} onClick={() => { setEditing(null); setModalVisible(true); }}
            style={{ height: 36, borderRadius: 10, background: '#6366f1', border: 'none', color: '#fff', fontWeight: 600, boxShadow: '0 3px 12px rgba(99,102,241,0.25)' }}>
            添加通道
          </Button>
        </Space>
      </div>

      {/* Channel Cards */}
      {loading && channels.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60 }}><Spin size="large" /></div>
      ) : channels.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>暂无通道，点击右上角添加</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {channels.map(ch => {
            const tp = typeMap[ch.type] || typeMap.openai;
            const pct = healthPercent(ch);
            const isEnabled = ch.status === StatusEnabled;

            return (
              <div key={ch.id} style={{
                background: '#fff', borderRadius: 14, border: '1px solid #ececf1',
                padding: '18px 24px', transition: 'box-shadow 0.2s',
                opacity: isEnabled ? 1 : 0.6, boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
              >
                {/* Row 1: Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: isEnabled ? '#22c55e' : '#bbb',
                      boxShadow: isEnabled ? '0 0 8px rgba(34,197,94,0.4)' : 'none',
                    }} />
                    <span style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>{ch.name}</span>
                    <span style={{
                      fontSize: 11, padding: '2px 10px', borderRadius: 10, fontWeight: 600,
                      background: tp.color + '15', color: tp.color, border: `1px solid ${tp.color}30`,
                    }}>{tp.label}</span>
                    {!isEnabled && (
                      <span style={{
                        fontSize: 11, padding: '2px 10px', borderRadius: 10,
                        background: '#f5f5f5', color: '#999', fontWeight: 500,
                      }}>{ch.status === StatusManuallyDisabled ? '手动禁用' : '自动禁用'}</span>
                    )}
                  </div>
                  <Space>
                    <Button size="small" icon={<IconSearch />} loading={discovering === ch.id}
                      onClick={() => handleDiscover(ch.id)}
                      style={{ borderRadius: 8, background: '#fff', border: '1px solid #ececf1', color: '#5a6078', fontWeight: 600 }}>
                      发现模型
                    </Button>
                    <Button size="small" icon={<IconPlayCircle />} loading={testingId === ch.id}
                      onClick={() => handleTest(ch.id)}
                      style={{ borderRadius: 8, background: '#fff', border: '1px solid #ececf1', color: '#5a6078', fontWeight: 600 }}>
                      测试
                    </Button>
                    <Button size="small" icon={<IconEdit />}
                      onClick={() => { setEditing(ch); setModalVisible(true); }}
                      style={{ borderRadius: 8, background: '#fff', border: '1px solid #ececf1', color: '#5a6078', fontWeight: 600 }}>
                      编辑
                    </Button>
                    <Dropdown
                      trigger="click"
                      position="bottomRight"
                      visible={openDropdownId === ch.id}
                      onVisibleChange={v => setOpenDropdownId(v ? ch.id : 0)}
                      render={
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => { setOpenDropdownId(0); handleToggleStatus(ch); }}>{isEnabled ? '禁用通道' : '启用通道'}</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item icon={<IconDelete />} type="danger" onClick={() => {
                            setOpenDropdownId(0);
                            Modal.confirm({
                              title: '确认删除',
                              content: `删除「${ch.name}」及其所有模型和测试数据？此操作不可恢复。`,
                              okText: '删除', cancelText: '取消',
                              okButtonProps: { type: 'danger' } as any,
                              onOk: () => deleteChannel(ch.id).then(load),
                            });
                          }}>删除</Dropdown.Item>
                        </Dropdown.Menu>
                      }>
                      <Button size="small" theme="borderless" icon={<IconMore />} style={{ color: '#999' }} />
                    </Dropdown>
                  </Space>
                </div>

                {/* Row 2: URL + Key */}
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 12, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#666' }}>
                    <IconLink size="small" style={{ color: '#bbb' }} />
                    <span style={{ fontFamily: 'monospace', fontSize: 11 }}>{ch.base_url}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#999' }}>
                    <IconKey size="small" style={{ color: '#bbb' }} />
                    <span>{ch.api_key_hint || '未设置'}</span>
                  </div>
                </div>

                {/* Row 3: Stats */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: 16, paddingTop: 14, borderTop: '1px solid #ececf1',
                }}>
                  <StatItem label="模型健康" value={
                    ch.model_count ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: '#333' }}>{ch.healthy_count}/{ch.model_count}</span>
                        <HealthBar pct={pct} />
                      </div>
                    ) : <span style={{ color: '#ccc' }}>无模型</span>
                  } />
                  <StatItem label="平均延迟" value={
                    ch.avg_response_time_ms ? (
                      <span style={{
                        fontWeight: 700, fontSize: 14,
                        color: ch.avg_response_time_ms > 5000 ? '#ef4444' : ch.avg_response_time_ms > 2000 ? '#eab308' : '#22c55e',
                      }}>{Math.round(ch.avg_response_time_ms)} ms</span>
                    ) : <span style={{ color: '#ccc' }}>-</span>
                  } />
                  <StatItem label="最后测试" value={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#666' }}>
                      <IconClock size="small" style={{ color: '#bbb' }} />
                      <span>{relativeTime(ch.last_test_time)}</span>
                    </div>
                  } />
                  <StatItem label="自动禁用" value={
                    <span style={{ color: ch.auto_ban ? '#22c55e' : '#999', fontWeight: 600 }}>
                      {ch.auto_ban ? '✓ 已开启' : '未开启'}
                    </span>
                  } />
                  {ch.remark && <StatItem label="备注" value={<span style={{ color: '#999' }}>{ch.remark}</span>} />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <Modal
        title={editing ? '编辑通道' : '添加通道'}
        visible={modalVisible}
        onCancel={() => { setModalVisible(false); setEditing(null); }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={() => { setModalVisible(false); setEditing(null); }}
              style={{ borderRadius: 9, background: '#fff', border: '1px solid #ececf1', color: '#5a6078', fontWeight: 600 }}>取消</Button>
            <Button onClick={() => { document.getElementById('channel-form-submit')?.click(); }}
              style={{ borderRadius: 9, background: '#6366f1', border: 'none', color: '#fff', fontWeight: 700, boxShadow: '0 3px 12px rgba(99,102,241,0.25)' }}>{editing ? '保存' : '创建'}</Button>
          </div>
        }
        width={520}
      >
        <Form onSubmit={handleSubmit}
          initValues={editing || { type: 'openai', base_url: 'http://127.0.0.1:8317', auto_ban: true, priority: 0 }}
          labelPosition="top">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Form.Input field="name" label="通道名称" rules={[{ required: true, message: '请输入名称' }]} placeholder="如: Claude 官方" />
            <Form.Select field="type" label="协议类型" style={{ width: '100%' }}>
              <Form.Select.Option value="openai">OpenAI Chat Completions</Form.Select.Option>
              <Form.Select.Option value="responses">OpenAI Responses API</Form.Select.Option>
              <Form.Select.Option value="anthropic">Anthropic Messages</Form.Select.Option>
            </Form.Select>
          </div>
          <Form.Input field="base_url" label="Base URL" rules={[{ required: true, message: '请输入 URL' }]} placeholder="http://127.0.0.1:8317" />
          <Form.Input field="api_key" label="API Key" mode="password" placeholder={editing ? '留空不修改' : '请输入 API Key'} rules={editing ? [] : [{ required: true, message: '请输入 Key' }]} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Form.Input field="test_model" label="测试模型" placeholder="留空使用第一个模型" />
            <Form.InputNumber field="priority" label="优先级" style={{ width: '100%' }} />
          </div>
          <Form.Switch field="auto_ban" label="自动禁用" />
          <p style={{ fontSize: 12, color: '#9ca3af', margin: '-6px 0 12px 0', lineHeight: 1.5 }}>
            开启后，当模型连续响应失败或超时（超过设置阈値）时，系统自动将该模型临时禁用，等导通后自动恢复。
          </p>
          <Form.TextArea field="remark" label="备注" placeholder="可选" autosize={{ minRows: 2 }} />
          <button id="channel-form-submit" type="submit" style={{ display: 'none' }} />
        </Form>
      </Modal>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 700, marginBottom: 4, letterSpacing: '0.3px', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 13, color: '#16192c' }}>{value}</div>
    </div>
  );
}
