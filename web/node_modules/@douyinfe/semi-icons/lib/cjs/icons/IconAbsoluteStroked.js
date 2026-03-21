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
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M13.62 5.04a1 1 0 1 0 1.42-1.42L12.7 1.3a1 1 0 0 0-1.42 0L8.96 3.62a1 1 0 0 0 1.42 1.42L11 4.4V11H4.41l.63-.62a1 1 0 1 0-1.42-1.42L1.3 11.3a1 1 0 0 0 0 1.42l2.33 2.33a1 1 0 0 0 1.42-1.42L4.4 13H11v6.59l-.62-.63a1 1 0 0 0-1.42 1.42l2.33 2.33a1 1 0 0 0 1.42 0l2.33-2.33a1 1 0 0 0-1.42-1.42l-.62.63V13h6.59l-.63.62a1 1 0 0 0 1.42 1.42l2.33-2.33a1 1 0 0 0 0-1.42l-2.33-2.33a1 1 0 1 0-1.42 1.42l.63.62H13V4.41l.62.63Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'absolute_stroked');
var _default = exports.default = IconComponent;