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
    d: "m16.94 13.79-3.71 6.96c-.13.24-.42.33-.64.17-.58-.4-1.42-1.2-1.42-2.12 0-.5.13-1.4.27-2.34.15-1.03.31-2.12.31-2.78H4.17c-.45 0-1.17-.46-1.17-1.5 0-.9 1-5.1 1.7-8.05l.3-1.3c0-.22.27-.65 1.33-.65H16.5c.28 0 .5.22.5.5v10.87a.5.5 0 0 1-.06.24Zm4.56-.11a.5.5 0 0 0 .5-.5V2.68a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v10.5c0 .27.22.5.5.5h2Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'dislike_thumb');
var _default = exports.default = IconComponent;