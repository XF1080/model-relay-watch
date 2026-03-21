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
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M18.36 5.64a3 3 0 0 0-4.24 0L12 7.76a1 1 0 1 1-1.41-1.42l2.12-2.12a5 5 0 0 1 7.07 7.07l-2.12 2.12A1 1 0 0 1 16.24 12l2.12-2.12a3 3 0 0 0 0-4.24ZM5.64 18.36a3 3 0 0 0 4.24 0L12 16.24a1 1 0 0 1 1.41 1.42l-2.12 2.12a5 5 0 0 1-7.07-7.07l2.12-2.12A1 1 0 0 1 7.76 12l-2.12 2.12a3 3 0 0 0 0 4.24Zm9.9-8.48a1 1 0 0 0-1.42-1.42l-5.66 5.66a1 1 0 1 0 1.42 1.42l5.66-5.66Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'chain_stroked');
var _default = exports.default = IconComponent;