"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _function = require("@douyinfe/semi-foundation/lib/cjs/utils/function");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LayoutContext = /*#__PURE__*/_react.default.createContext({
  siderHook: {
    addSider: _function.noop,
    removeSider: _function.noop
  }
});
var _default = exports.default = LayoutContext;