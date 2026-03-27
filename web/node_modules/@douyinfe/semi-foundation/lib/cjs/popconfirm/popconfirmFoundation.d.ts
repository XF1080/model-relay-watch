import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface PopconfirmAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    setVisible: (visible: boolean) => void;
    updateConfirmLoading: (loading: boolean) => void;
    updateCancelLoading: (loading: boolean) => void;
    notifyConfirm: (e: any) => Promise<any> | void;
    notifyCancel: (e: any) => Promise<any> | void;
    notifyVisibleChange: (visible: boolean) => void;
    notifyClickOutSide: (e: any) => void;
    focusCancelButton: () => void;
    focusOkButton: () => void;
    focusPrevFocusElement: () => void;
}
export default class PopConfirmFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<PopconfirmAdapter<P, S>, P, S> {
    init(): void;
    destroy(): void;
    handleCancel(e: any): void;
    handleConfirm(e: any): void;
    handleClickOutSide(e: any): void;
    handleVisibleChange(visible: boolean): void;
    handleFocusOperateButton(): void;
}
