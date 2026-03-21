"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DialogueActionFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.destroy = () => {
      this._adapter.unregisterClickOutsideHandler();
    };
    this.copyMessage = () => {
      this._adapter.notifyMessageCopy();
      this._adapter.copyToClipboardAndToast();
    };
    this.resetMessage = () => {
      this._adapter.notifyResetMessage();
    };
    this.likeMessage = () => {
      this._adapter.notifyLikeMessage();
    };
    this.dislikeMessage = () => {
      this._adapter.notifyDislikeMessage();
    };
    this.shareMessage = () => {
      this._adapter.notifyShareMessage();
    };
    this.editMessage = () => {
      this._adapter.notifyEditMessage();
    };
    this.deleteMessage = () => {
      this._adapter.notifyDeleteMessage();
      this.hideMoreDropdown();
    };
    this.showMoreDropdown = () => {
      this._adapter.setVisible(true);
      this._adapter.setShowAction(true);
      this._adapter.registerClickOutsideHandler(this.hideMoreDropdown);
    };
    this.hideMoreDropdown = () => {
      this._adapter.setVisible(false);
      setTimeout(() => {
        this._adapter.setShowAction(false);
      }, 150);
      this._adapter.unregisterClickOutsideHandler();
    };
  }
}
exports.default = DialogueActionFoundation;