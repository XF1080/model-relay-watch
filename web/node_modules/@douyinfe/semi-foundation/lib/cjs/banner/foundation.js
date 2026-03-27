"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class BannerFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, BannerFoundation.defaultAdapter), adapter));
  }
  removeBanner(e) {
    this._adapter.notifyClose(e);
    this._adapter.setVisible();
  }
}
exports.default = BannerFoundation;