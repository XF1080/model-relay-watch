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
    d: "M11.08.82a1.5 1.5 0 0 1 1.84 0l4.5 3.5a1.5 1.5 0 0 1-1.84 2.36L13.5 5.07V7.5a1.5 1.5 0 0 1-3 0V5.07L8.42 6.68a1.5 1.5 0 0 1-1.84-2.36l4.5-3.5Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 11a3 3 0 0 1 3-3h5.5v6.5a1.5 1.5 0 0 0 3 0V8H19a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'export');
var _default = exports.default = IconComponent;