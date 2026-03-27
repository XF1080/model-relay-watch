"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _keyCode = require("./keyCode");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* istanbul ignore next */
function isEscPress(e) {
  return (0, _get2.default)(e, 'key') === _keyCode.ESC_KEY ? true : false;
}
var _default = exports.default = isEscPress;