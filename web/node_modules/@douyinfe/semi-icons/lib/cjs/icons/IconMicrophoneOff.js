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
    d: "M7.5 5.5a4.5 4.5 0 0 1 9 0v.59l3.8-3.8a1 1 0 1 1 1.4 1.42l-18 18a1 1 0 0 1-1.4-1.42l3.6-3.6A7.97 7.97 0 0 1 4 11.5a1 1 0 1 1 2 0c0 1.42.5 2.73 1.32 3.76L8.4 14.2a4.48 4.48 0 0 1-.89-2.69v-6Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12 16 4.5-4.5A4.5 4.5 0 0 1 12 16Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m10.65 17.35-1.6 1.6A8 8 0 0 0 20 11.5a1 1 0 1 0-1.99-.01 6 6 0 0 1-7.35 5.85Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 21a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H8Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'microphone_off');
var _default = exports.default = IconComponent;