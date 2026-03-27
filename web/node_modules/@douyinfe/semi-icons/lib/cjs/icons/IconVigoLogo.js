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
    d: "M10.76 1a5.95 5.95 0 0 1-3.84 5.23A5.89 5.89 0 0 1 6.7 4.4a13.56 13.56 0 0 0-4.2 9.33A9.3 9.3 0 0 0 11.85 23a9.3 9.3 0 0 0 9.35-9.26c0-3.1-1.53-6.69-3.9-9.04a5.92 5.92 0 0 1-2.43 4 5.95 5.95 0 0 0-4.1-7.7ZM9.28 9.45a5.9 5.9 0 0 0 0 0Zm-.3 1.65v6.23c0 .65.7 1.05 1.26.72l5.35-3.12a.83.83 0 0 0 0-1.43l-5.35-3.12a.84.84 0 0 0-1.27.72Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'vigo_logo');
var _default = exports.default = IconComponent;