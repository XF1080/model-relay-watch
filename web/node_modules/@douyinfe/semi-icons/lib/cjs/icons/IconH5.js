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
    d: "M15.16 19.06c0 1.18 1.6 2.15 3.52 2.15 2.45 0 3.98-1.34 3.98-3.48 0-1.86-1.21-3.07-3.06-3.07-.81 0-1.52.25-1.86.66h-.15l.1-1.44h3.29c.8 0 1.24-.39 1.24-1.09 0-.71-.44-1.12-1.24-1.12h-3.92c-1 0-1.55.44-1.6 1.3L15.28 16c-.05.78.61 1.35 1.45 1.35.3 0 .6-.08.85-.23.42-.26.86-.41 1.22-.41.67 0 1.16.43 1.16 1.1 0 .69-.51 1.15-1.22 1.15-.5 0-.92-.22-1.45-.7-.3-.3-.61-.41-1-.41-.7 0-1.13.56-1.13 1.2Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'h5');
var _default = exports.default = IconComponent;