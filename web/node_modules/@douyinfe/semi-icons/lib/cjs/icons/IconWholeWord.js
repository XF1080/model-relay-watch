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
    d: "M7.5 5c.63 0 1.2.4 1.41.99l4 11A1.5 1.5 0 1 1 10.09 18l-.55-1.51H5.46l-.55 1.51A1.5 1.5 0 1 1 2.09 17l4-11c.22-.6.78-.99 1.41-.99Zm-.95 8.5h1.9l-.95-2.61-.95 2.61Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2 3a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.99 21a1 1 0 0 1 1-1H21a1 1 0 1 1 0 2H2.99a1 1 0 0 1-1-1Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.5 5c.83 0 1.5.67 1.5 1.5V10c1.23 0 2.46.34 3.41 1.1 1 .8 1.59 1.98 1.59 3.4s-.6 2.6-1.59 3.4A5.43 5.43 0 0 1 17 19h-2a1 1 0 0 1-1-1V6.5c0-.83.67-1.5 1.5-1.5Zm1.5 8v3c.7 0 1.23-.2 1.54-.45.27-.21.46-.53.46-1.05s-.19-.84-.46-1.06A2.46 2.46 0 0 0 17 13Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'whole_word');
var _default = exports.default = IconComponent;