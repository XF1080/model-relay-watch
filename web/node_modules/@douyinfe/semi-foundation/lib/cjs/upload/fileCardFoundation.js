"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FileCardFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  handleImageError(error) {
    this._adapter.updateFallbackPreview(true);
  }
}
var _default = exports.default = FileCardFoundation;