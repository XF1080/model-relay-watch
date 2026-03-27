"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _keyCode = _interopRequireDefault(require("../utils/keyCode"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ModalContentFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, ModalContentFoundation.defaultAdapter), adapter));
    this.handleKeyDown = e => {
      const {
        closeOnEsc
      } = this.getProps();
      if (closeOnEsc && e.keyCode === _keyCode.default.ESC) {
        e.stopPropagation();
        this.close(e);
        return;
      }
    };
  }
  destroy() {
    this.handleKeyDownEventListenerUnmount();
    this.modalDialogBlur();
    this.prevFocusElementReFocus();
  }
  handleDialogMouseDown() {
    this._adapter.notifyDialogMouseDown();
  }
  handleMaskMouseUp() {
    this._adapter.notifyDialogMouseUp();
  }
  handleKeyDownEventListenerMount() {
    this._adapter.addKeyDownEventListener();
  }
  handleKeyDownEventListenerUnmount() {
    this._adapter.removeKeyDownEventListener();
  }
  getMouseState() {
    this._adapter.getMouseState();
  }
  handleMaskClick(e) {
    const {
      dialogMouseDown
    } = this.getStates();
    if (e.target === e.currentTarget && !dialogMouseDown) {
      this.close(e);
    }
  }
  close(e) {
    this._adapter.notifyClose(e);
  }
  modalDialogFocus() {
    this._adapter.modalDialogFocus();
  }
  modalDialogBlur() {
    this._adapter.modalDialogBlur();
  }
  prevFocusElementReFocus() {
    this._adapter.prevFocusElementReFocus();
  }
}
exports.default = ModalContentFoundation;