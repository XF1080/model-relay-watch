import BaseFoundation, { DefaultAdapter, noopFunction } from '../base/foundation';
export interface BasicTargetObject {
    [x: string]: any;
    checked?: boolean;
}
export interface BasicCheckboxEvent {
    target: BasicTargetObject;
    stopPropagation: () => void;
    preventDefault: () => void;
    [x: string]: any;
}
export interface CheckboxAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getIsInGroup: () => boolean;
    getGroupValue: () => any[];
    notifyGroupChange: (e: any) => void;
    getGroupDisabled: () => boolean;
    setNativeControlChecked: (checked: boolean) => void;
    getState: noopFunction;
    notifyChange: (e: any) => void;
    setAddonId: () => void;
    setExtraId: () => void;
    setFocusVisible: (focusVisible: boolean) => void;
    focusCheckboxEntity: () => void;
    generateEvent: (checked: boolean, e: any) => any;
}
declare class CheckboxFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<CheckboxAdapter<P, S>, P, S> {
    constructor(adapter: CheckboxAdapter<P, S>);
    clickState: boolean;
    init(): void;
    notifyChange(checked: boolean, e: any): void;
    handleChange(e: any): void;
    handleChangeInGroup(e: any): void;
    handleEnterPress(e: any): void;
    setChecked(checked: boolean): void;
    handleFocusVisible: (event: any) => void;
    handleBlur: () => void;
    destroy(): void;
}
export interface BaseCheckboxProps {
    id?: string;
    autoFocus?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    onChange?: (e: any) => any;
    value?: any;
    style?: Record<string, any>;
    className?: string;
    prefixCls?: string;
    onMouseEnter?: (e: any) => void;
    onMouseLeave?: (e: any) => void;
    extra?: any;
    addonId?: string;
    extraId?: string;
    preventScroll?: boolean;
}
export default CheckboxFoundation;
