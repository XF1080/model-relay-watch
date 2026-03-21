"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class BreadcrumbItemFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  handleClick(item, e) {
    // Trigger its own onClick first, then trigger the parent
    this._adapter.notifyClick(item, e);
    this._adapter.notifyParent(item, e);
  }
}
exports.default = BreadcrumbItemFoundation;