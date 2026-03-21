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
    d: "M17 2a3.5 3.5 0 0 0-3.43 4.18L8.3 9.37a3.5 3.5 0 1 0 .07 5.2L13 17.3v-2.33l-3.6-2.12a3.5 3.5 0 0 0-.03-1.79l5.13-3.1a3.49 3.49 0 0 0 6-2.46A3.5 3.5 0 0 0 17 2Zm-1.5 3.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm11.53 1.02L18 14.99l1.97-1.97a.75.75 0 1 1 1.06 1.06l-1.93 1.93H21a.75.75 0 0 1 0 1.5h-2.25v1H21a.75.75 0 0 1 0 1.5h-2.25v1.24a.75.75 0 0 1-1.5 0v-1.24H15a.75.75 0 1 1 0-1.5h2.25v-1H15a.75.75 0 0 1 0-1.5h1.9l-1.93-1.93a.75.75 0 1 1 1.06-1.06Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'share_money_stroked');
var _default = exports.default = IconComponent;