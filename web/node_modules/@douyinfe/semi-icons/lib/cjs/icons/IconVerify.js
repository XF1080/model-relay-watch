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
    d: "M1.41 10.59 3.5 8.5v-3c0-1.1.9-2 2-2h3l2.09-2.09a2 2 0 0 1 2.82 0L15.5 3.5h3a2 2 0 0 1 2 2v3l2.09 2.09a2 2 0 0 1 0 2.82L20.5 15.5v3a2 2 0 0 1-2 2h-3l-2.09 2.09a2 2 0 0 1-2.82 0L8.5 20.5h-3a2 2 0 0 1-2-2v-3l-2.09-2.09a2 2 0 0 1 0-2.82ZM7 13l3.24 3.24a1 1 0 0 0 1.46-.04l5.44-6.22a1.4 1.4 0 1 0-2.12-1.8L11 13l-2-2a1.41 1.41 0 1 0-2 2Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'verify');
var _default = exports.default = IconComponent;