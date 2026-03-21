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
    d: "M5 2a1 1 0 0 1 1 1v6h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6v2a1 1 0 1 1-2 0v-2H3a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h1V3a1 1 0 0 1 1-1Zm0 15h1v-6H4v6h1Zm11-9a1 1 0 0 1 1-1h1V3a1 1 0 1 1 2 0v4h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v4a1 1 0 1 1-2 0v-4h-1a1 1 0 0 1-1-1V8Zm4 7h-2V9h2v6ZM10 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v6a1 1 0 1 0 2 0v-6h1a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1V3a1 1 0 1 0-2 0v2h-1Zm2 8h-1V7h2v6h-1Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'candlestick_chart_stroked');
var _default = exports.default = IconComponent;