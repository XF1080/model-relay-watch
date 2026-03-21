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
    d: "m8.06 9.39 3.71-6.96c.13-.24.42-.33.64-.18.58.41 1.42 1.2 1.42 2.13 0 .5-.13 1.4-.27 2.33a23.55 23.55 0 0 0-.31 2.79h7.58c.45 0 1.17.45 1.17 1.5 0 .9-1 5.09-1.7 8.04l-.3 1.3c0 .22-.27.66-1.33.66H8.5a.5.5 0 0 1-.5-.5V9.63a.5.5 0 0 1 .06-.24ZM3.5 9.5a.5.5 0 0 0-.5.5v10.5c0 .28.22.5.5.5h2a.5.5 0 0 0 .5-.5V10a.5.5 0 0 0-.5-.5h-2Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'like_thumb');
var _default = exports.default = IconComponent;