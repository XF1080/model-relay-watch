import BaseFoundation, { DefaultAdapter } from "../base/foundation";
export interface ChatBoxActionAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    notifyDeleteMessage: () => void;
    notifyMessageCopy: () => void;
    copyToClipboardAndToast: () => void;
    notifyLikeMessage: () => void;
    notifyDislikeMessage: () => void;
    notifyResetMessage: () => void;
    setVisible: (visible: boolean) => void;
    setShowAction: (showAction: boolean) => void;
    registerClickOutsideHandler(...args: any[]): void;
    unregisterClickOutsideHandler(...args: any[]): void;
}
export default class ChatBoxActionFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<ChatBoxActionAdapter<P, S>, P, S> {
    constructor(adapter: ChatBoxActionAdapter<P, S>);
    showDeletePopup: () => void;
    hideDeletePopup: () => void;
    destroy: () => void;
    deleteMessage: () => void;
    copyMessage: () => void;
    likeMessage: () => void;
    dislikeMessage: () => void;
    resetMessage: () => void;
}
