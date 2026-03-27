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
    d: "M13.5 5.92V3a1.5 1.5 0 0 0-3 0v2.92L9.24 5.2a1.5 1.5 0 0 0-1.48 2.6l3.5 2a1.5 1.5 0 0 0 1.48 0l3.5-2a1.5 1.5 0 1 0-1.48-2.6l-1.26.72Zm-9 7.58a1.5 1.5 0 0 1 0-3h15a1.5 1.5 0 0 1 0 3h-15Zm9 4.58 1.26.72a1.5 1.5 0 1 0 1.48-2.6l-3.5-2a1.5 1.5 0 0 0-1.48 0l-3.5 2a1.5 1.5 0 0 0 1.48 2.6l1.26-.72V21a1.5 1.5 0 0 0 3 0v-2.92Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'align_center_vertical');
var _default = exports.default = IconComponent;