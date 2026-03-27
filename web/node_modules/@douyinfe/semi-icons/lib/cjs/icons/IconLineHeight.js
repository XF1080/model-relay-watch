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
  }, props), /*#__PURE__*/React.createElement("g", {
    opacity: 0.99
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "m19.13 3.18-3.38 3.75a.5.5 0 0 0 .37.83H18v8.65h-1.88a.5.5 0 0 0-.37.84L19.13 21c.2.22.54.22.74 0l3.38-3.75a.5.5 0 0 0-.37-.84H21V7.76h1.88a.5.5 0 0 0 .37-.83l-3.38-3.75a.5.5 0 0 0-.74 0ZM2.29 4C1.58 4 1 4.67 1 5.5S1.58 7 2.29 7H13.7C14.42 7 15 6.33 15 5.5S14.42 4 13.71 4H2.3ZM1 12c0-.83.58-1.5 1.29-1.5H13.7c.71 0 1.29.67 1.29 1.5s-.58 1.5-1.29 1.5H2.3C1.58 13.5 1 12.83 1 12Zm0 6.5c0-.83.58-1.5 1.29-1.5H13.7c.71 0 1.29.67 1.29 1.5s-.58 1.5-1.29 1.5H2.3C1.58 20 1 19.33 1 18.5Z",
    fill: "currentColor"
  })));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'line_height');
var _default = exports.default = IconComponent;