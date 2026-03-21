"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = _propTypes.default.shape({
  offsetX: _propTypes.default.number,
  offsetY: _propTypes.default.number,
  width: _propTypes.default.number,
  height: _propTypes.default.number
});