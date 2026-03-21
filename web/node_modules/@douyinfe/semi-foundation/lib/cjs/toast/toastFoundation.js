"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ToastFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, ToastFoundation.defaultAdapter), adapter));
    this._timer = null;
    this._id = null; // cache id
  }
  init() {
    this.startCloseTimer_();
    this._id = this._adapter.getProp('id');
  }
  destroy() {
    this.clearCloseTimer_();
  }
  startCloseTimer_() {
    // unit: s
    const duration = this._adapter.getProp('duration');
    if (duration && (0, _isNumber2.default)(duration)) {
      this._timer = setTimeout(() => {
        this.close(); // call parent to remove itself
      }, duration * 1000);
    }
  }
  close(e) {
    if (e) {
      e.stopPropagation();
    }
    this._adapter.notifyWrapperToRemove(this._id);
    this._adapter.notifyClose();
  }
  clearCloseTimer_() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
  restartCloseTimer() {
    this.clearCloseTimer_();
    this.startCloseTimer_();
  }
}
exports.default = ToastFoundation;