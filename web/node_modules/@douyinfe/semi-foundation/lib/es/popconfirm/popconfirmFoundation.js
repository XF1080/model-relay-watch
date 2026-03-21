import _get from "lodash/get";
import BaseFoundation from '../base/foundation';
import isPromise from '../utils/isPromise';
export default class PopConfirmFoundation extends BaseFoundation {
  init() {}
  destroy() {}
  handleCancel(e) {
    const maybePromise = this._adapter.notifyCancel(e);
    if (isPromise(maybePromise)) {
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
    if (isPromise(maybePromise)) {
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
    if (_get(cancelButtonProps, 'autoFocus') && !_get(cancelButtonProps, 'disabled')) {
      this._adapter.focusCancelButton();
    } else if (_get(okButtonProps, 'autoFocus') && !_get(okButtonProps, 'disabled')) {
      this._adapter.focusOkButton();
    }
  }
}