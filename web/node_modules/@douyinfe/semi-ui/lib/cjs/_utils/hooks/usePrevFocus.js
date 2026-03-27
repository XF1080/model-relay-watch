"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePrevFocus = usePrevFocus;
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = require("react");
var _index = require("../index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* istanbul ignore next */
function usePrevFocus() {
  const [prevFocusElement, setPrevFocus] = (0, _react.useState)((0, _index.getActiveElement)());
  (0, _react.useEffect)(() => {
    return function cleanup() {
      const blur = (0, _get2.default)(prevFocusElement, 'blur');
      (0, _isFunction2.default)(blur) && blur();
    };
  }, [prevFocusElement]);
  return [prevFocusElement, setPrevFocus];
}