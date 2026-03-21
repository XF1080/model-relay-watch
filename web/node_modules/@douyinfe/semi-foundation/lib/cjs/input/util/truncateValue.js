"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = truncateValue;
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function truncateValue(options) {
  const {
    value,
    maxLength,
    getValueLength
  } = options;
  if ((0, _isFunction2.default)(getValueLength)) {
    let left = 0;
    let right = value.length;
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      const currentValue = value.slice(0, mid + 1);
      if (getValueLength(currentValue) > maxLength) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return value.slice(0, left);
  } else {
    return value.slice(0, maxLength);
  }
}