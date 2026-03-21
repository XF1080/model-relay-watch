"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Preview", {
  enumerable: true,
  get: function () {
    return _preview.default;
  }
});
Object.defineProperty(exports, "PreviewInner", {
  enumerable: true,
  get: function () {
    return _previewInner.default;
  }
});
exports.default = void 0;
var _image = _interopRequireDefault(require("./image"));
var _previewInner = _interopRequireDefault(require("./previewInner"));
var _preview = _interopRequireDefault(require("./preview"));
require("@douyinfe/semi-foundation/lib/cjs/image/image.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = _image.default;