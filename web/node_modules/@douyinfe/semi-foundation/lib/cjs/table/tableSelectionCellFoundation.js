"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TableSelectionCellFoundation extends _foundation.default {
  handleChange(e) {
    const value = e.target.checked;
    this._adapter.notifyChange(value, e);
  }
}
exports.default = TableSelectionCellFoundation;