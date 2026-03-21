import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export type ToastType = 'success' | 'warning' | 'error' | 'info' | 'default';
export type ToastTheme = 'light' | 'normal';
export type Directions = 'ltr' | 'rtl';
export interface ConfigProps {
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
    duration?: number;
    zIndex?: number;
    theme?: ToastTheme;
    getPopupContainer?: () => HTMLElement | null;
}
export interface ToastProps extends ConfigProps {
    onClose?: () => void;
    content: any;
    type?: ToastType;
    textMaxWidth?: string | number;
    style?: Record<string, any>;
    className?: string;
    showClose?: boolean;
    icon?: any;
    direction?: Directions;
    close?: (id: string) => void;
    stack?: boolean;
}
export interface ToastInstance extends ToastProps {
    id?: string;
    motion?: boolean;
}
export interface ToastState {
}
export interface ToastAdapter extends DefaultAdapter<ToastProps, ToastState> {
    notifyWrapperToRemove: (id: string) => void;
    notifyClose: () => void;
}
export default class ToastFoundation extends BaseFoundation<ToastAdapter> {
    _timer: ReturnType<typeof setTimeout>;
    _id: string | null;
    constructor(adapter: ToastAdapter);
    init(): void;
    destroy(): void;
    startCloseTimer_(): void;
    close(e?: any): void;
    clearCloseTimer_(): void;
    restartCloseTimer(): void;
}
