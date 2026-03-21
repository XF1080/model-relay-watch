"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;
/**
 *
 * @param {Function} func
 * @param {number} delay
 */
function debounce(func) {
  let delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  let timeoutId;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
}