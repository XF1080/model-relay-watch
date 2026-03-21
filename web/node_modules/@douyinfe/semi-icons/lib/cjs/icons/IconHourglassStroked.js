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
    d: "M4 1a1 1 0 0 0 0 2h1v5c0 .27.1.52.3.7L8.58 12l-3.3 3.3A1 1 0 0 0 5 16v5H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2h-1v-5a1 1 0 0 0-.3-.7L15.42 12l3.3-3.3A1 1 0 0 0 19 8V3h1a1 1 0 1 0 0-2H4Zm9.3 10.3L17 7.58V3H7v4.59l3.7 3.7a1 1 0 0 1 0 1.42L7 16.4V21h10v-4.59l-3.7-3.7a1 1 0 0 1 0-1.42ZM9 7a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Zm0 11a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'hourglass_stroked');
var _default = exports.default = IconComponent;