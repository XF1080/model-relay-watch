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
    d: "M14 5.5a3.5 3.5 0 1 1 1 2.45l-5.13 3.11a3.5 3.5 0 0 1 .03 1.79l5.22 3.08A3.49 3.49 0 0 1 21 18.5a3.5 3.5 0 1 1-6.9-.85l-5.22-3.08A3.49 3.49 0 0 1 3 12a3.5 3.5 0 0 1 5.8-2.63l5.27-3.19A3.51 3.51 0 0 1 14 5.5ZM17.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-11 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm9.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'share_stroked');
var _default = exports.default = IconComponent;