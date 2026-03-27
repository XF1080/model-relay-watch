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
    d: "M5 4.5V9h.5c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1c0-.28.22-.5.5-.5H3V5h-.5a.5.5 0 0 1-.5-.5v-1c0-.28.22-.5.5-.5h2c.28 0 .5.22.5.5v1Zm3 0c0-.28.22-.5.5-.5h12c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5h-12a.5.5 0 0 1-.5-.5v-1Zm0 10c0-.28.22-.5.5-.5h12c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5h-12a.5.5 0 0 1-.5-.5v-1ZM8.5 8a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h7a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-7ZM8 18.5c0-.28.22-.5.5-.5h7c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1Zm-6-5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v4a.5.5 0 0 1-.5.5H4v1h1.5c.28 0 .5.22.5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4c0-.28.22-.5.5-.5H4v-1H2.5a.5.5 0 0 1-.5-.5v-1Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'ordered_list_stroked');
var _default = exports.default = IconComponent;