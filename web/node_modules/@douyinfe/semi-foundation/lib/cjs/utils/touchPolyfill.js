"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _warning = _interopRequireDefault(require("./warning"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const touchEventPolyfill = (touch, touchEvent) => {
  /* Touch is the first point of multi-touch. In order to minimize the change of slider code to support touch,
  some methods that will be used on touchEvent are mounted on the multi-touch Touch object.*/
  // polyfill for firefox
  if (!globalThis.Touch || !(touch instanceof Touch)) {
    return touch;
  }
  const keysNeedPolyfill = ['stopPropagation', 'preventDefault'];
  keysNeedPolyfill.forEach(key => {
    let value = touchEvent[key];
    if (value) {
      if (typeof value === 'function') {
        // bind 'this' for function of touchEvent running in Touch Point Object
        value = function () {
          return touchEvent[key](...arguments);
        };
      }
      if (touch[key]) {
        (0, _warning.default)(true, `"The key ${key}" exist in Touch.`);
      } else {
        touch[key] = value;
      }
    }
  });
  return touch;
};
var _default = exports.default = touchEventPolyfill;