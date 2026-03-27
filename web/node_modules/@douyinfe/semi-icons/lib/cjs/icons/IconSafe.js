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
    d: "m2.72 3.72 8.72-2.64c.37-.1.77-.1 1.15 0l8.7 2.64c.42.12.7.5.7.93.03 2.65-.03 11.79-2 14.36-1.97 2.57-6.36 3.68-7.63 3.95a1.6 1.6 0 0 1-.7 0c-1.24-.28-5.5-1.39-7.62-3.95C1.9 16.44 1.96 7.27 2.02 4.64c0-.43.3-.8.7-.92Zm4.3 9.26 3.24 3.26a1 1 0 0 0 1.46-.05l5.42-6.25a1.4 1.4 0 0 0-.06-1.91 1.38 1.38 0 0 0-2.05.1l-4.01 4.85-2-2.01a1.4 1.4 0 0 0-2 0 1.43 1.43 0 0 0 0 2Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'safe');
var _default = exports.default = IconComponent;