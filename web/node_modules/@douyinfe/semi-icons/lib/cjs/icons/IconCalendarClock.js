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
    d: "M2 5v14a3 3 0 0 0 3 3h7.1a7.02 7.02 0 0 1-1.43-2H6a2 2 0 0 1-2-2V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2.67c.75.36 1.43.85 2 1.43V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 10h1c-.54 0-1.06.06-1.57.18A1 1 0 0 1 16 10Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.5 10.94a1 1 0 0 0-1-.94h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 .77.97 7.03 7.03 0 0 1 2.23-2.03Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 10a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H7Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 16a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M22 17a5 5 0 1 1-10 0 5 5 0 0 1 10 0Zm-4-2a1 1 0 1 0-2 0v2c0 .27.1.52.3.7l1.5 1.5a1 1 0 0 0 1.4-1.4L18 16.58V15Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'calendar_clock');
var _default = exports.default = IconComponent;