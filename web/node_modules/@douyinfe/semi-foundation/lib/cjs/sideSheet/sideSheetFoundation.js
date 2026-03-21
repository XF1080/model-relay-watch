"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _keyCode = _interopRequireDefault(require("../utils/keyCode"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SideSheetFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, SideSheetFoundation.defaultAdapter), adapter));
    this.toggleDisplayNone = displayNone => {
      this._adapter.toggleDisplayNone(displayNone);
    };
  }
  get defaultAdapter() {
    return {
      handleCancel: _noop2.default,
      beforeShow: _noop2.default,
      afterHide: _noop2.default
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
    if (closeOnEsc && e.keyCode === _keyCode.default.ESC) {
      e.stopPropagation();
      this.handleCancel(e);
      return;
    }
  }
  onVisibleChange(visible) {
    this._adapter.notifyVisibleChange(visible);
  }
}
exports.default = SideSheetFoundation;