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
    d: "m3.88 12 5.68 5.98V16.5a3 3 0 0 1 3.01-3c2.3 0 4.44.06 6.26.85.45.2.86.42 1.24.69a7.63 7.63 0 0 0-1.64-2.9c-1.3-1.43-3.27-2.43-6-2.6A3.05 3.05 0 0 1 9.56 6.5v-.48L3.88 12Zm16.6 6.25c-1.81-2.53-3.94-2.73-7.92-2.75a1 1 0 0 0-1 1v4a1 1 0 0 1-1.71.69l-8.07-8.5a1 1 0 0 1 0-1.38l8.07-8.5a1 1 0 0 1 1.71.7v3c0 .55.45.99 1 1.02 6.22.4 9.8 4.6 9.94 10.14a13.2 13.2 0 0 1-.03.77c-.04.35-.1.8-.2 1.18-.1.35-.2.64-.33.7-.13.05-.28-.02-.43-.33a14.18 14.18 0 0 0-1.03-1.74Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'reply_stroked');
var _default = exports.default = IconComponent;