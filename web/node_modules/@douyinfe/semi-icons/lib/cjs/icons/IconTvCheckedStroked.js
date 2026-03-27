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
    d: "M19.5 4.87a1 1 0 1 0-1-1.74L11.76 7 5.52 3.15a1 1 0 0 0-1.04 1.7L7.97 7H3.95C2.89 7 2 7.84 2 8.93v11.14C2 21.16 2.9 22 3.95 22h16.1c1.06 0 1.95-.84 1.95-1.93V8.93C22 7.84 21.1 7 20.05 7h-4.28l3.73-2.13ZM11.52 9a1 1 0 0 1-.04 0H4v11h16V9h-7.98a1 1 0 0 1-.04 0h-.46Zm4.73 3.66a1 1 0 0 0-1.5-1.32l-3.3 3.7-2.24-2.25a1 1 0 0 0-1.42 1.42l3 3a1 1 0 0 0 1.46-.05l4-4.5Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'tv_checked_stroked');
var _default = exports.default = IconComponent;