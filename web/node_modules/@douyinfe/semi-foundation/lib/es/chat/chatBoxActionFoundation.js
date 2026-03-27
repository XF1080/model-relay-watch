import BaseFoundation from "../base/foundation";
export default class ChatBoxActionFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.showDeletePopup = () => {
      this._adapter.setVisible(true);
      this._adapter.setShowAction(true);
      this._adapter.registerClickOutsideHandler(this.hideDeletePopup);
    };
    this.hideDeletePopup = () => {
      /** visible 控制 popConfirm 的显隐
       * showAction 控制在 popConfirm 显示时候，保证操作区显示
       * 需要有时间间隔，用 visible 直接控制的话，在 popconfirm 通过取消按钮关闭时会导致操作区显示闪动
      */
      this._adapter.setVisible(false);
      setTimeout(() => {
        this._adapter.setShowAction(false);
      }, 150);
      this._adapter.unregisterClickOutsideHandler();
    };
    this.destroy = () => {
      this._adapter.unregisterClickOutsideHandler();
    };
    this.deleteMessage = () => {
      this._adapter.notifyDeleteMessage();
    };
    this.copyMessage = () => {
      this._adapter.notifyMessageCopy();
      this._adapter.copyToClipboardAndToast();
    };
    this.likeMessage = () => {
      this._adapter.notifyLikeMessage();
    };
    this.dislikeMessage = () => {
      this._adapter.notifyDislikeMessage();
    };
    this.resetMessage = () => {
      this._adapter.notifyResetMessage();
    };
  }
}