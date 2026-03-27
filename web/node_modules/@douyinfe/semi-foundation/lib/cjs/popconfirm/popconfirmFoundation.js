"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _isPromise = _interopRequireDefault(require("../utils/isPromise"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PopConfirmFoundation extends _foundation.default {
  init() {}
  destroy() {}
  handleCancel(e) {
    const maybePromise = this._adapter.notifyCancel(e);
    if ((0, _isPromise.default)(maybePromise)) {
      this._adapter.updateCancelLoading(true);
      maybePromise.then(result => {
        this.handleVisibleChange(false);
        this._adapter.updateCancelLoading(false);
      }, errors => {
        this._adapter.updateCancelLoading(false);
      });
    } else {
      this.handleVisibleChange(false);
    }
  }
  handleConfirm(e) {
    const maybePromise = this._adapter.notifyConfirm(e);
    if ((0, _isPromise.default)(maybePromise)) {
      this._adapter.updateConfirmLoading(true);
      maybePromise.then(result => {
        this._adapter.updateConfirmLoading(false);
        this.handleVisibleChange(false);
      }, errors => {
        this._adapter.updateConfirmLoading(false);
      });
    } else {
      this.handleVisibleChange(false);
    }
  }
  handleClickOutSide(e) {
    this._adapter.notifyClickOutSide(e);
  }
  handleVisibleChange(visible) {
    if (!this._isControlledComponent('visible')) {
      this._adapter.setVisible(visible);
    }
    if (visible) {
      this.handleFocusOperateButton();
    } else {
      this._adapter.focusPrevFocusElement();
    }
    this._adapter.notifyVisibleChange(visible);
  }
  handleFocusOperateButton() {
    const {
      cancelButtonProps,
      okButtonProps
    } = this._adapter.getProps();
    if ((0, _get2.default)(cancelButtonProps, 'autoFocus') && !(0, _get2.default)(cancelButtonProps, 'disabled')) {
      this._adapter.focusCancelButton();
    } else if ((0, _get2.default)(okButtonProps, 'autoFocus') && !(0, _get2.default)(okButtonProps, 'disabled')) {
      this._adapter.focusOkButton();
    }
  }
}
exports.default = PopConfirmFoundation;