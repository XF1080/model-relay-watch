import BaseFoundation, { DefaultAdapter } from "../base/foundation";
export interface DialogueActionAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    notifyDeleteMessage: () => void;
    notifyMessageCopy: () => void;
    copyToClipboardAndToast: () => void;
    notifyLikeMessage: () => void;
    notifyDislikeMessage: () => void;
    notifyResetMessage: () => void;
    notifyShareMessage: () => void;
    notifyEditMessage: () => void;
    setVisible: (visible: boolean) => void;
    setShowAction: (showAction: boolean) => void;
    registerClickOutsideHandler(...args: any[]): void;
    unregisterClickOutsideHandler(...args: any[]): void;
}
export default class DialogueActionFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<DialogueActionAdapter<P, S>, P, S> {
    constructor(adapter: DialogueActionAdapter<P, S>);
    destroy: () => void;
    copyMessage: () => void;
    resetMessage: () => void;
    likeMessage: () => void;
    dislikeMessage: () => void;
    shareMessage: () => void;
    editMessage: () => void;
    deleteMessage: () => void;
    showMoreDropdown: () => void;
    hideMoreDropdown: () => void;
}
