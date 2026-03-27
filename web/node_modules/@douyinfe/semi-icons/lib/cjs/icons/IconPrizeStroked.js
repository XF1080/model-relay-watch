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
    d: "M4 1a1 1 0 0 0-1 1v5a1 1 0 0 0 .4.8L7 10.5v.6a7 7 0 1 0 10 0v-.6l3.6-2.7A1 1 0 0 0 21 7V2a1 1 0 0 0-1-1H4Zm3 2v5L5 6.5V3h2Zm0 13a4.98 4.98 0 0 1 8.33-3.73A4.99 4.99 0 0 1 12 21a5 5 0 0 1-5-5Zm12-9.5L17 8V3h2v3.5ZM9 9.67a6.97 6.97 0 0 1 6 0V3H9v6.67ZM13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm2 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'prize_stroked');
var _default = exports.default = IconComponent;