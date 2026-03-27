"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TableRowFoundation extends _foundation.default {
  handleClick(e) {
    const {
      expanded,
      rowKey
    } = this.getProps();
    this._adapter.notifyClick(rowKey, e, expanded);
  }
  handleDoubleClick(e) {
    this._adapter.notifyDoubleClick(this.getProp('record'), e);
  }
  handleMouseEnter(e) {
    const record = this.getProp('record');
    this._adapter.notifyMouseEnter(record, e);
  }
  handleMouseLeave(e) {
    const record = this.getProp('record');
    this._adapter.notifyMouseLeave(record, e);
  }
}
exports.default = TableRowFoundation;