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
    d: "M10.5 1.5a1.5 1.5 0 0 1 3 0v1a1.5 1.5 0 0 1-3 0v-1Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.5 21.5a1.5 1.5 0 0 1 3 0v1a1.5 1.5 0 0 1-3 0v-1Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M24 12c0-.83-.67-1.5-1.5-1.5h-1a1.5 1.5 0 0 0 0 3h1c.83 0 1.5-.67 1.5-1.5Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2.5 10.5a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 1 0-3h1Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20.49 3.51a1.5 1.5 0 0 0-2.13 0l-.7.71a1.5 1.5 0 1 0 2.12 2.12l.7-.7a1.5 1.5 0 0 0 0-2.13Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4.22 17.66a1.5 1.5 0 1 1 2.12 2.12l-.7.7a1.5 1.5 0 1 1-2.13-2.12l.71-.7Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.51 3.51a1.5 1.5 0 0 0 0 2.13l.71.7a1.5 1.5 0 0 0 2.12-2.12l-.7-.7a1.5 1.5 0 0 0-2.13 0Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17.66 19.78a1.5 1.5 0 1 1 2.12-2.12l.7.7a1.5 1.5 0 1 1-2.12 2.13l-.7-.71Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'sun');
var _default = exports.default = IconComponent;