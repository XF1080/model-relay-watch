import axios from 'axios';
import type { Channel, ModelEntry, TestResult, DashboardData, Settings, SyncStatus } from '../types';

const api = axios.create({ baseURL: '/api/v1' });

// Channels
export const listChannels = () => api.get<{ data: Channel[] }>('/channels').then(r => r.data.data);
export const getChannel = (id: number) => api.get<{ data: Channel }>(`/channels/${id}`).then(r => r.data.data);
export const createChannel = (ch: Partial<Channel> & { api_key?: string }) => api.post('/channels', ch).then(r => r.data.data);
export const updateChannel = (id: number, ch: Record<string, unknown>) => api.put(`/channels/${id}`, ch).then(r => r.data.data);
export const deleteChannel = (id: number) => api.delete(`/channels/${id}`);
export const updateChannelStatus = (id: number, status: number) => api.put(`/channels/${id}/status`, { status });
export const discoverModels = (id: number) => api.post<{ new_models: number; data: ModelEntry[] }>(`/channels/${id}/discover`).then(r => r.data);

// Models
export const listModels = (params?: { channel_id?: number; status?: number }) =>
  api.get<{ data: ModelEntry[] }>('/models', { params }).then(r => r.data.data);
export const getModel = (id: number) => api.get<{ data: ModelEntry }>(`/models/${id}`).then(r => r.data.data);
export const updateModel = (id: number, data: Record<string, unknown>) => api.put(`/models/${id}`, data);
export const deleteModel = (id: number) => api.delete(`/models/${id}`);
export const updateModelStatus = (id: number, status: number) => api.put(`/models/${id}/status`, { status });

// Testing
export const testModel = (id: number) => api.post<{ success: boolean; response_ms: number; message: string; data: TestResult }>(`/test/model/${id}`).then(r => r.data);
export const testChannel = (id: number) => api.post(`/test/channel/${id}`);
export const testAll = () => api.post('/test/all');
export const testBatch = (ids: number[]) => api.post('/test/batch', { ids });
export const getTestStatus = () => api.get<{ running: boolean }>('/test/status').then(r => r.data.running);

// History
export const listHistory = (params?: Record<string, string | number>) =>
  api.get<{ data: TestResult[]; total: number; page: number; page_size: number }>('/history', { params }).then(r => r.data);
export const getHistoryStats = () => api.get<{ data: Array<{ model_name: string; channel_id: number; total_tests: number; success_rate: number; avg_latency_ms: number }> }>('/history/stats').then(r => r.data.data);
export const clearHistory = (days: number) => api.delete('/history', { params: { days } });

// Settings
export const getSettings = () => api.get<{ data: Settings }>('/settings').then(r => r.data.data);
export const updateSettings = (s: Settings) => api.put('/settings', s);

// Dashboard
export const getDashboard = () => api.get<DashboardData>('/dashboard').then(r => r.data);
export const getHeatmap = () => api.get<{ data: any[] }>('/dashboard/heatmap').then(r => r.data.data || []);
export const getModelStats = () => api.get<{ data: any[] }>('/dashboard/model-stats').then(r => r.data.data || []);

// Sync (WebDAV)
export const testSyncConnection = () =>
  api.post<{ success: boolean; error?: string; message?: string }>('/sync/test').then(r => r.data);
export const syncUpload = () =>
  api.post<{ message: string }>('/sync/upload').then(r => r.data);
export const syncDownload = () =>
  api.post<{ message: string }>('/sync/download').then(r => r.data);
export const getSyncStatus = () =>
  api.get<{ data: SyncStatus }>('/sync/status').then(r => r.data.data);

// CC-Switch
export const detectCCSPath = () =>
  api.get<{ found: boolean; path?: string }>('/ccs/detect').then(r => r.data);
export const listCCSProviders = () =>
  api.get<{ data: any[] }>('/ccs/providers').then(r => r.data.data || []);
export const syncCCSProviders = () =>
  api.post<{ message: string; added: number }>('/ccs/sync').then(r => r.data);

// Token Stats (from CCS proxy_request_logs)
export const getTokenStats = (range: string) =>
  api.get<any>('/stats/tokens', { params: { range } }).then(r => r.data);

// Pricing
export const getPricing = () =>
  api.get<{ official: any[]; custom: any[] }>('/pricing').then(r => r.data);
export const savePricing = (items: any[]) =>
  api.put('/pricing', items);
export const deletePricing = (key: string) =>
  api.delete(`/pricing/${encodeURIComponent(key)}`);
