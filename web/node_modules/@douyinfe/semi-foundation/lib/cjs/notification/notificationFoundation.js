"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class NotificationFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, NotificationFoundation.defaultAdapter), adapter));
    this._timer = null;
    this._id = null; // cache id
  }
  init() {
    this._startCloseTimer();
    this._id = this.getProp('id');
  }
  destroy() {
    this._clearCloseTimer();
  }
  _startCloseTimer() {
    // unit: s
    const duration = this.getProp('duration');
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
  _clearCloseTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
  restartCloseTimer() {
    this._clearCloseTimer();
    this._startCloseTimer();
  }
}
exports.default = NotificationFoundation;