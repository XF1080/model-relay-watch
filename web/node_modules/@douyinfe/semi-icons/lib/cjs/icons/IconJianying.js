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
    viewBox: "0 0 22 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    focusable: false,
    "aria-hidden": true
  }, props), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0 5.57a2.83 2.83 0 0 1 2.84-2.82h12.23c1.53 0 2.78 1.2 2.84 2.72l3.91-1.92c.08-.04.18.02.18.11v1.77a.2.2 0 0 1-.11.18L11.1 10.9l-.04.02 10.82 5.3c.07.03.11.1.11.18v1.77c0 .1-.1.15-.18.11l-3.91-1.91a2.84 2.84 0 0 1-2.84 2.71H2.85A2.84 2.84 0 0 1 0 16.24v-1.69c0-.21.1-.38.3-.46l6.48-3.18L.3 7.74a.53.53 0 0 1-.3-.46v-1.7Zm8.93 4.29.04-.02 7.05-3.45v-.56c0-.66-.54-1.2-1.21-1.2H3.1c-.67 0-1.22.54-1.22 1.2v.58l7.04 3.45Zm0 2.1L1.9 15.41v.58c0 .66.54 1.2 1.21 1.2h11.7c.67 0 1.21-.54 1.21-1.2v-.56l-7.1-3.47Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'jianying');
var _default = exports.default = IconComponent;