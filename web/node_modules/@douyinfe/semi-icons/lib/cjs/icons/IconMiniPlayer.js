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
    d: "M15.5 22a1.5 1.5 0 0 1-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5h-5Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.5 22A3.5 3.5 0 0 1 2 18.5v-13A3.5 3.5 0 0 1 5.5 2h13A3.5 3.5 0 0 1 22 5.5v4.25a1.5 1.5 0 0 1-3 0V5.5a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v13c0 .28.22.5.5.5h4.25a1.5 1.5 0 0 1 0 3H5.5Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.52 7.19a1 1 0 0 0 0 1.41l2.95 2.95h-.83a1 1 0 1 0 0 2h3.24a1 1 0 0 0 1-1V9.31a1 1 0 1 0-2 0v.83L8.93 7.19a1 1 0 0 0-1.41 0Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'mini_player');
var _default = exports.default = IconComponent;