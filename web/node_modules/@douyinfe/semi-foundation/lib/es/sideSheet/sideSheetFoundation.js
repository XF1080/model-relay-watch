import _noop from "lodash/noop";
import BaseFoundation from '../base/foundation';
import KeyCode from '../utils/keyCode';
export default class SideSheetFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, SideSheetFoundation.defaultAdapter), adapter));
    this.toggleDisplayNone = displayNone => {
      this._adapter.toggleDisplayNone(displayNone);
    };
  }
  get defaultAdapter() {
    return {
      handleCancel: _noop,
      beforeShow: _noop,
      afterHide: _noop
    };
  }
  destroy() {
    this.afterHide();
  }
  handleCancel(e) {
    this._adapter.notifyCancel(e);
  }
  beforeShow() {
    const allowDisable = this.getProp('disableScroll');
    allowDisable && this._adapter.disabledBodyScroll();
    this._adapter.setOnKeyDownListener();
  }
  afterHide() {
    const allowDisable = this.getProp('disableScroll');
    allowDisable && this._adapter.enabledBodyScroll();
    this._adapter.removeKeyDownListener();
  }
  handleKeyDown(e) {
    const {
      closeOnEsc
    } = this.getProps();
    if (closeOnEsc && e.keyCode === KeyCode.ESC) {
      e.stopPropagation();
      this.handleCancel(e);
      return;
    }
  }
  onVisibleChange(visible) {
    this._adapter.notifyVisibleChange(visible);
  }
}