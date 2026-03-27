import React from 'react';
import { ToastProps } from '@douyinfe/semi-foundation/lib/es/toast/toastFoundation';
export default function useToast(): (React.JSX.Element | {
    success: (config: ToastProps) => string;
    info: (config: ToastProps) => string;
    error: (config: ToastProps) => string;
    warning: (config: ToastProps) => string;
    open: (config: ToastProps) => string;
    close: (id: string) => void;
})[];
