import { Tag } from '@douyinfe/semi-ui';
import { statusText, statusColor } from '../types';

export default function StatusBadge({ status }: { status: number }) {
  return <Tag color={statusColor(status) as any}>{statusText(status)}</Tag>;
}
