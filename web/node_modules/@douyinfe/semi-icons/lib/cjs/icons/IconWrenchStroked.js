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
    d: "M13.92 8.46a5.46 5.46 0 0 0-6.61-5.34l2.13 2.13c.75.76.75 1.97 0 2.72L7.97 9.44c-.75.75-1.96.75-2.72 0L3.12 7.3a5.48 5.48 0 0 0 5.34 6.61c.7 0 1.36-.13 1.97-.37l.61-.23 7.43 7.43c.33.33.87.33 1.2 0l1.08-1.08a.85.85 0 0 0 0-1.2l-7.43-7.43.23-.6c.24-.62.37-1.28.37-1.98Zm2 0c0 .72-.1 1.4-.29 2.06l6.54 6.54a2.85 2.85 0 0 1 0 4.03l-1.09 1.08a2.85 2.85 0 0 1-4.02 0l-6.54-6.54a7.46 7.46 0 0 1-8.99-9.94l.09-.18c.48-.86 1.62-.91 2.25-.28l2.74 2.74L7.97 6.6 5.23 3.87c-.67-.67-.57-1.93.46-2.34l.33-.12a7.45 7.45 0 0 1 9.9 7.05Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'wrench_stroked');
var _default = exports.default = IconComponent;