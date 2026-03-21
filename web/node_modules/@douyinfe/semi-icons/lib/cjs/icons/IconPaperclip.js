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
    d: "M18.27 4.27a2.64 2.64 0 0 0-3.73 0L6.8 12.02a4.4 4.4 0 1 0 6.23 6.24l5.5-5.5a1.25 1.25 0 1 1 1.77 1.76l-5.5 5.5a6.9 6.9 0 1 1-9.77-9.76l7.75-7.75a5.14 5.14 0 1 1 7.27 7.26l-7.25 7.25a3.37 3.37 0 1 1-4.77-4.76l5.5-5.5a1.25 1.25 0 1 1 1.77 1.76l-5.5 5.5a.87.87 0 1 0 1.23 1.24L18.27 8a2.64 2.64 0 0 0 0-3.74Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'paperclip');
var _default = exports.default = IconComponent;