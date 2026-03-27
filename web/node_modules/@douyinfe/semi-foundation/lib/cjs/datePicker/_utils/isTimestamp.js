"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTimestamp;
var _isValidDate = _interopRequireDefault(require("./isValidDate"));
var _isNumber = _interopRequireDefault(require("../../utils/isNumber"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isTimestamp(ts) {
  return (0, _isNumber.default)(ts) && (0, _isValidDate.default)(new Date(ts));
}