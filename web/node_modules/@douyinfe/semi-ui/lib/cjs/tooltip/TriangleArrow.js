"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const TriangleArrow = props => {
  const {
      className,
      style
    } = props,
    restProps = __rest(props, ["className", "style"]);
  return /*#__PURE__*/_react.default.createElement("svg", Object.assign({
    "aria-hidden": true,
    className: className,
    style: style
  }, restProps, {
    width: "24",
    height: "7",
    viewBox: "0 0 24 7",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M24 0V1C20 1 18.5 2 16.5 4C14.5 6 14 7 12 7C10 7 9.5 6 7.5 4C5.5 2 4 1 0 1V0H24Z"
  }));
};
var _default = exports.default = TriangleArrow;