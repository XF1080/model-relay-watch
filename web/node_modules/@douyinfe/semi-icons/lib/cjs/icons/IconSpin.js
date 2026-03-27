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
  }, props), /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#clip_spin)"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.2 3.79A8.5 8.5 0 0 0 5 16.81a1.5 1.5 0 1 1-2.48 1.7 11.5 11.5 0 1 1 20.6-3.53 1.5 1.5 0 0 1-2.91-.78A8.5 8.5 0 0 0 14.2 3.79Z",
    fill: "currentColor"
  })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    cx: 0,
    cy: 0,
    r: 1,
    gradientUnits: "userSpaceOnUse",
    gradientTransform: "translate(12 12) rotate(15) scale(9.5 9.51825)"
  }, /*#__PURE__*/React.createElement("stop", null), /*#__PURE__*/React.createElement("stop", {
    offset: 0.301257,
    stopOpacity: 0,
    stopColor: "currentColor"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 0.466753,
    stopOpacity: 1,
    stopColor: "currentColor"
  })), /*#__PURE__*/React.createElement("clipPath", {
    id: "clip_spin"
  }, /*#__PURE__*/React.createElement("rect", {
    width: 24,
    height: 24,
    fill: "currentColor"
  }))));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'spin');
var _default = exports.default = IconComponent;