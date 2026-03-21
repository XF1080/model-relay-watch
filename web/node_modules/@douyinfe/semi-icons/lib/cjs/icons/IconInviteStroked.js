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
    d: "M22 8.8c0-.1 0-.2-.1-.2 0-.1-.1-.1-.1-.2 0 0 0-.1-.1-.1 0 0-.1-.1-.2-.1L19 6.5V4c0-.5-.5-1-1-1h-4.2l-1.2-.8c-.3-.2-.8-.2-1.1 0l-1.3.8H6c-.5 0-1 .5-1 1v2.5L2.5 8.1s-.1.1-.2.1c0 0 0 .1-.1.1 0 0-.1.1-.1.2s-.1.2-.1.3V21c0 .5.5 1 1 1h18c.5 0 1-.5 1-1V8.8ZM7 5h10v5.1l-5 2.8-5-2.8V5Zm13 15H4v-9.3l1 .6 2 1.1 4.5 2.5c.3.2.7.2 1 0l4.5-2.5 2-1.1 1-.6V20Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 9c0 .5-.5 1-1 1h-1v1c0 .5-.5 1-1 1a1 1 0 0 1-1-1v-1h-1a1 1 0 0 1-1-1c0-.6.5-1 1-1h1V7c0-.5.5-1 1-1s1 .5 1 1v1h1c.5 0 1 .5 1 1Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'invite_stroked');
var _default = exports.default = IconComponent;