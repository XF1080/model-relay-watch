"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NavContext = /*#__PURE__*/_react.default.createContext({
  isCollapsed: false,
  selectedKeys: [],
  openKeys: []
});
var _default = exports.default = NavContext;