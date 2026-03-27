import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface ContainerProps {
    title?: any;
    resizable?: boolean;
    style?: Record<string, any>;
    className?: string;
    defaultSize?: {
        width?: number | string;
        height?: number | string;
    };
    onCancel?: (e: any) => void;
    children?: any;
    visible?: boolean;
    motion?: boolean;
    afterVisibleChange?: (isVisible: boolean) => void;
    minWidth?: string | number;
    maxWidth?: string | number;
    showClose?: boolean;
}
export interface ContainerState {
    displayNone: boolean;
    onCancelReturnPromiseStatus?: "pending" | "fulfilled" | "rejected";
}
export interface ContainerAdapter extends DefaultAdapter<ContainerProps, ContainerState> {
    notifyCancel: (e: any) => void;
    notifyVisibleChange: (visible: boolean) => void;
    setOnKeyDownListener: () => void;
    removeKeyDownListener: () => void;
    toggleDisplayNone: (displayNone: boolean) => void;
}
export default class ContainerFoundation extends BaseFoundation<ContainerAdapter> {
    constructor(adapter: ContainerAdapter);
    init: () => void;
    destroy: () => void;
    handleCancel(e: any): void;
    beforeShow(): void;
    afterHide(): void;
    handleKeyDown(e: any): void;
    onVisibleChange(visible: boolean): void;
    toggleDisplayNone: (displayNone: boolean) => void;
    handleAnimationEnd: () => void;
}
