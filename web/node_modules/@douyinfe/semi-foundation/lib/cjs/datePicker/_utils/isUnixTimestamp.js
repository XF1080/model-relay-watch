"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUnixTimestamp;
var _isNumber = _interopRequireDefault(require("../../utils/isNumber"));
var _isValidDate = _interopRequireDefault(require("./isValidDate"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isUnixTimestamp(ts) {
  return (0, _isNumber.default)(ts) && ts.toString().length === 10 && (0, _isValidDate.default)(new Date(ts * 1000));
}