"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _keyCode = _interopRequireDefault(require("../utils/keyCode"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ContainerFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, ContainerFoundation.defaultAdapter), adapter));
    this.init = () => {};
    this.destroy = () => {
      this.afterHide();
    };
    this.toggleDisplayNone = displayNone => {
      this._adapter.toggleDisplayNone(displayNone);
    };
    this.handleAnimationEnd = () => {
      const {
        visible
      } = this.getProps();
      this.toggleDisplayNone(!visible);
    };
  }
  handleCancel(e) {
    this._adapter.notifyCancel(e);
  }
  beforeShow() {
    this._adapter.setOnKeyDownListener();
  }
  afterHide() {
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
exports.default = ContainerFoundation;