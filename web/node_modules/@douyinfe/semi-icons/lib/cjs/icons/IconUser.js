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
    d: "M12 16c1.98 0 3.75-1.66 4.71-4.14.6-.25 1.18-1 1.44-1.97.34-1.27.27-2.4-.65-2.76C17.4 2.71 15.66 1 12 1S6.6 2.71 6.5 7.13c-.93.35-1 1.49-.65 2.76.26.98.83 1.72 1.44 1.97C8.26 14.34 10.02 16 12 16Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.6 22c1.24 0 2.12-1.15 1.27-2.05C19.2 18.2 15.85 17 12 17c-3.85 0-7.2 1.2-8.87 2.95-.85.9.03 2.05 1.27 2.05h15.2Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'user');
var _default = exports.default = IconComponent;