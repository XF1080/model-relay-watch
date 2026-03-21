"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _Icon = require("../components/Icon");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function SvgComponent(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    focusable: false,
    "aria-hidden": true
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M6.55 23a4.32 4.32 0 0 1-4.32-4.31v-3.51a4.3 4.3 0 0 1 6.56-3.67l5.59 3.42 3.07-1.88a1.24 1.24 0 0 0 .6-.99 1.22 1.22 0 0 0-.57-1.1L7.5 4.86a1.21 1.21 0 0 0-1.85 1.03v2.64a6.18 6.18 0 0 0-3.42 1.58v-4.8A4.3 4.3 0 0 1 8.8 1.64l10.92 6.69a4.3 4.3 0 0 1 0 7.34l-2.06 1.26 2.47 1.51a1.7 1.7 0 0 1 .53 2.41 1.73 1.73 0 0 1-2.32.51l-3.95-2.42-5.59 3.42c-.67.42-1.45.64-2.24.64ZM7 14.62a1.22 1.22 0 0 0-1.21 1.2v2.35a1.21 1.21 0 0 0 1.84 1.04l3.6-2.2-3.6-2.21A1.2 1.2 0 0 0 7 14.6Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'resso');
var _default = exports.default = IconComponent;