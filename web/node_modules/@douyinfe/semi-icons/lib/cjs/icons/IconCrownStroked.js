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
    d: "M11.09 2a1 1 0 0 1 1.82 0l2.44 5.36a3 3 0 0 0 4.54 1.16l.14-.12 1.85-1.59c.61-.52 1.53.08 1.29.85L19.44 20.6a2 2 0 0 1-1.75 1.4H6.31a2 2 0 0 1-1.75-1.4L.83 7.66c-.24-.77.68-1.37 1.29-.85l1.85 1.6a3 3 0 0 0 4.6-.88l.08-.17L11.1 2Zm-.62 6.2a5 5 0 0 1-6.7 2.44L6.47 20h11.06l2.7-9.36a5 5 0 0 1-6.7-2.45L12 4.83 10.47 8.2Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'crown_stroked');
var _default = exports.default = IconComponent;