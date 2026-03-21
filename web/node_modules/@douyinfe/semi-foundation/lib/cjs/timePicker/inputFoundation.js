"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _isNullOrUndefined = _interopRequireDefault(require("../utils/isNullOrUndefined"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TimePickerFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {}
  destroy() {}
  handleFocus(e) {
    this.storeCursor();
    this._adapter.notifyFocus(e);
  }
  handleChange(v) {
    this.storeCursor();
    this._adapter.notifyChange(v);
  }
  handleBlur(e) {
    this.clearCursor();
    this._adapter.notifyBlur(e);
  }
  storeCursor() {
    const inputNode = this.getCache('inputNode');
    if (inputNode) {
      const {
        selectionStart: start
      } = inputNode;
      // const beforeStr = typeof value === 'string' ? value.substr(0, start) : null;
      // const afterStr = typeof value === 'string' ? value.substr(start, value.length - start + 1) : null;
      // console.log(start, beforeStr, afterStr);
      this.setCache('cursorIndex', start);
    }
  }
  restoreCursor() {
    const inputNode = this.getCache('inputNode');
    const cursorIndex = this.getCache('cursorIndex');
    if (inputNode && !(0, _isNullOrUndefined.default)(cursorIndex)) {
      inputNode.selectionStart = cursorIndex;
      inputNode.selectionEnd = cursorIndex;
    }
  }
  clearCursor() {
    this.setCache('cursorIndex', null);
    this.setCache('beforeStr', null);
    this.setCache('afterStr', null);
  }
}
var _default = exports.default = TimePickerFoundation;