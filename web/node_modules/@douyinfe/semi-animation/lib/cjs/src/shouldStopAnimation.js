"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shouldStopAnimation;
var _shouldUseBezier = _interopRequireDefault(require("./shouldUseBezier"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * usage assumption: currentStyle values have already been rendered but it says
 * nothing of whether currentStyle is stale (see unreadPropStyle)
 *
 * @param {object} currentStyle
 * @param {object} style
 * @param {object} currentVelocity
 * @param {number} startTime
 * @param {number} nowTime
 *
 * @returns {boolean}
 */
function shouldStopAnimation(currentStyle, style, currentVelocity, startTime, nowTime) {
  for (const key of Object.keys(style)) {
    const styleValue = style[key];
    const value = typeof styleValue === 'number' ? styleValue : styleValue.val;
    if (typeof styleValue === 'object' && styleValue.done) {
      continue;
    }
    if ((0, _shouldUseBezier.default)(styleValue) && startTime && nowTime && styleValue.duration) {
      if (styleValue.duration + startTime <= nowTime || value !== currentStyle[key]) {
        return false;
      }
    } else if (typeof currentVelocity[key] === 'number' && currentVelocity[key] !== 0) {
      return false;
    }
    // stepper will have already taken care of rounding precision errors, so
    // won't have such thing as 0.9999 !=== 1
    if (currentStyle[key] !== value) {
      return false;
    }
  }
  return true;
}