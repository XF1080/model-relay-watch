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
    d: "m22.58 11.02-9.6-9.6a1.42 1.42 0 0 0-2 0l-2 1.99 2.53 2.53a1.69 1.69 0 0 1 2.14 2.14l2.43 2.44a1.68 1.68 0 0 1 1.74 2.79 1.68 1.68 0 0 1-2.75-1.83L12.79 9.2v5.98a1.7 1.7 0 1 1-1.94 2.7 1.68 1.68 0 0 1 .55-2.75V9.1a1.68 1.68 0 0 1-.91-2.2l-2.5-2.5-6.58 6.57a1.43 1.43 0 0 0 0 2l9.6 9.61c.56.56 1.46.56 2.01 0l9.56-9.56c.56-.55.56-1.45 0-2Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'git');
var _default = exports.default = IconComponent;