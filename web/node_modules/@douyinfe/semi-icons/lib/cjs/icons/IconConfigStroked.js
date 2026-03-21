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
    clipPath: "url(#clip0_1478_52)"
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16.95 4.24c0-.63.5-1.13 1.13-1.13h3.31a1.13 1.13 0 0 1 0 2.25h-3.31c-.62 0-1.13-.5-1.13-1.12Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M13.66.9c.62 0 1.12.5 1.12 1.13v4.42a1.13 1.13 0 0 1-2.25 0V2.03c0-.63.5-1.13 1.13-1.13Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M.38 4.24c0-.63.5-1.13 1.12-1.13h12.16a1.13 1.13 0 0 1 0 2.25H1.5c-.62 0-1.13-.5-1.13-1.12Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M.38 11.97c0-.62.5-1.12 1.12-1.12h4.42a1.13 1.13 0 0 1 0 2.25H1.5c-.62 0-1.13-.5-1.13-1.13Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.34 8.64c.62 0 1.13.5 1.13 1.12v4.42a1.13 1.13 0 0 1-2.25 0V9.76c0-.62.5-1.12 1.12-1.12Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.22 11.97c0-.62.5-1.12 1.12-1.12H22.5a1.13 1.13 0 0 1 0 2.25H10.34c-.62 0-1.12-.5-1.12-1.13Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16.95 19.71c0-.62.5-1.13 1.13-1.13h3.31a1.13 1.13 0 0 1 0 2.25h-3.31c-.62 0-1.13-.5-1.13-1.12Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M13.66 16.37c.62 0 1.12.5 1.12 1.13v4.42a1.13 1.13 0 0 1-2.25 0V17.5c0-.62.5-1.13 1.13-1.13Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M.38 19.71c0-.62.5-1.13 1.12-1.13h12.16a1.13 1.13 0 0 1 0 2.25H1.5c-.62 0-1.13-.5-1.13-1.12Z",
    fill: "currentColor"
  })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "clip0_1478_52"
  }, /*#__PURE__*/React.createElement("rect", {
    width: 24,
    height: 24,
    fill: "currentColor"
  }))));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'config_stroked');
var _default = exports.default = IconComponent;