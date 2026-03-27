"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TableCellFoundation extends _foundation.default {
  handleClick(e) {
    this._adapter.notifyClick(this.getProp('record'), e);
  }
}
exports.default = TableCellFoundation;