import BaseFoundation, { DefaultAdapter } from '../base/foundation';
import { ToastInstance, ToastProps } from '../toast/toastFoundation';
export interface ToastListProps {
}
export interface ToastListState {
    list: ToastInstance[];
    removedItems: ToastInstance[];
    updatedItems: ToastInstance[];
    mouseInSide: boolean;
}
export interface ToastListAdapter extends DefaultAdapter<ToastListProps, ToastListState> {
    updateToast: (list: ToastListState['list'], removedItems: ToastListState['removedItems'], updatedItems: ToastListState['updatedItems']) => void;
    handleMouseInSideChange: (mouseInSideChange: boolean) => void;
    getInputWrapperRect: () => DOMRect | null;
}
export default class ToastListFoundation extends BaseFoundation<ToastListAdapter> {
    constructor(adapter: ToastListAdapter);
    hasToast(id: string): boolean;
    handleMouseInSideChange: (mouseInSideChange: boolean) => void;
    getInputWrapperRect: () => DOMRect;
    addToast(toastOpts: ToastProps): void;
    updateToast(id: string, toastOpts: ToastProps): void;
    removeToast(id: string): void;
    destroyAll(): void;
}
