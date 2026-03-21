"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPromise;
var _isObject = _interopRequireDefault(require("./isObject"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isPromise(value) {
  return (0, _isObject.default)(value) && typeof value.then === 'function';
}