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
const TriangleArrowVertical = props => {
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
    width: "7",
    height: "24",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M0 0L1 0C1 4, 2 5.5, 4 7.5S7,10 7,12S6 14.5, 4 16.5S1,20 1,24L0 24L0 0z"
  }));
};
var _default = exports.default = TriangleArrowVertical;