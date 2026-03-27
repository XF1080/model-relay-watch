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
    d: "M20 11.3V11c0-3.9-3.1-7-7-7-2.8 0-5.2 1.7-6.3 4-3.2.2-5.7 2.8-5.7 6 0 3.3 2.7 6 6 6h11.5a4.48 4.48 0 0 0 1.5-8.7ZM18.5 18H7a4.01 4.01 0 0 1-.9-7.9c.3-.1.6-.1.9-.1.31 0 .56 0 .84.1.13.04.28-.04.31-.17.13-.59.39-1.1.65-1.63C9.7 6.9 11.2 6 13 6a4.95 4.95 0 0 1 4.69 6.74.2.2 0 0 0 .19.26h.62c.4 0 .8.1 1.1.3a2.48 2.48 0 0 1-1.1 4.7Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'cloud_stroked');
var _default = exports.default = IconComponent;