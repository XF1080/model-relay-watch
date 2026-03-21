export interface Channel {
  id: number;
  name: string;
  type: string; // openai, anthropic
  base_url: string;
  api_key_hint?: string;
  status: number;
  auto_ban: boolean;
  test_model: string;
  priority: number;
  remark: string;
  model_count?: number;
  healthy_count?: number;
  last_test_time?: string;
  avg_response_time_ms?: number;
  created_at: string;
  updated_at: string;
}

export interface ModelEntry {
  id: number;
  channel_id: number;
  model_name: string;
  endpoint_type: string;
  status: number;
  last_test_time?: string;
  last_response_ms?: number;
  last_error: string;
  test_count: number;
  fail_count: number;
  created_at: string;
  updated_at: string;
  channel?: Channel;
}

export interface TestResult {
  id: number;
  channel_id: number;
  model_entry_id: number;
  model_name: string;
  success: boolean;
  response_ms: number;
  status_code: number;
  error_message: string;
  error_type: string;
  error_code: string;
  tested_at: string;
  channel_name?: string;
}

export interface DashboardData {
  total_models: number;
  healthy_models: number;
  overall_success_rate: number;
  good_models: number;
  total_tests_24h: number;
  avg_ttfb_ms: number;
  avg_tps: number;
}

export interface Settings {
  [key: string]: string;
}

export interface SyncStatus {
  configured: boolean;
  auto_sync: boolean;
  last_sync_time: string;
  last_sync_type: string;
  profile_name: string;
  remote_size?: number;
  remote_modified?: string;
  local_size?: number;
  local_modified?: string;
}

export const StatusEnabled = 1;
export const StatusManuallyDisabled = 2;
export const StatusAutoDisabled = 3;

export function statusText(status: number): string {
  switch (status) {
    case StatusEnabled: return '正常';
    case StatusManuallyDisabled: return '手动禁用';
    case StatusAutoDisabled: return '自动禁用';
    default: return '未知';
  }
}

export function statusColor(status: number): string {
  switch (status) {
    case StatusEnabled: return 'green';
    case StatusManuallyDisabled: return 'grey';
    case StatusAutoDisabled: return 'red';
    default: return 'yellow';
  }
}
