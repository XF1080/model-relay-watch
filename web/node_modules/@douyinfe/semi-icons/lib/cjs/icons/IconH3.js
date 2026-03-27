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
    d: "M3.5 2.5C4.33 2.5 5 3.17 5 4v6.5h6V4a1.5 1.5 0 0 1 3 0v16a1.5 1.5 0 0 1-3 0v-6.5H5V20a1.5 1.5 0 0 1-3 0V4c0-.83.67-1.5 1.5-1.5Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.21 18.96c0 1.24 1.6 2.25 3.59 2.25 2.3 0 3.93-1.2 3.93-2.87 0-1.2-.81-2.11-1.92-2.17v-.2a1.91 1.91 0 0 0 1.68-1.92c0-1.5-1.5-2.54-3.67-2.54-1.94 0-3.57.98-3.57 2.14 0 .6.48 1.03 1.13 1.03.4 0 .75-.14 1.06-.43.5-.47.88-.65 1.34-.65.6 0 1.03.33 1.03.8 0 .46-.43.8-1.03.8h-.37c-.57 0-.97.46-.97 1.04 0 .62.4 1.05.97 1.05h.37c.73 0 1.2.37 1.2.92s-.47.91-1.2.91c-.5 0-.95-.21-1.4-.68-.38-.4-.72-.58-1.1-.58-.62 0-1.07.46-1.07 1.1Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'h3');
var _default = exports.default = IconComponent;