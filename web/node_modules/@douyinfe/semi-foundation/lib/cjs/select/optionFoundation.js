"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class OptionFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {}
  destroy() {}
  onOptionClick(option) {
    const isDisabled = this._isDisabled();
    if (!isDisabled) {
      this._adapter.notifyClick(option);
    }
  }
  _isDisabled() {
    return this.getProp('disabled');
  }
}
exports.default = OptionFoundation;