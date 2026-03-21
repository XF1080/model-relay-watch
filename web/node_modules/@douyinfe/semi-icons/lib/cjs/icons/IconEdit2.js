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
    d: "m16.43 4.1 3.54 3.54 1.48-1.48c.55-.55.55-1.45 0-2L19.9 2.62a1.42 1.42 0 0 0-2 0L16.43 4.1Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m7.76 15.88 1.19-4.17a.7.7 0 0 1 .18-.3l6.24-6.25 3.54 3.54-6.24 6.24a.7.7 0 0 1-.3.18l-4.17 1.2a.35.35 0 0 1-.44-.44Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.97 9.78c-.28.29-.5.63-.64 1l-.05.17-1.19 4.17A2.35 2.35 0 0 0 9 18.02l4.17-1.18c.44-.13.84-.37 1.17-.7l4.8-4.8a.5.5 0 0 1 .86.36V21a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h9.54a.5.5 0 0 1 .36.85L7.97 9.78Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'edit_2');
var _default = exports.default = IconComponent;