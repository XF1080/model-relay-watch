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
    d: "M6.9 2a3 3 0 0 1 1.66.5l2 1.33a1 1 0 0 0 .55.17h5.75a3 3 0 0 1 3 3v.83h.74a2 2 0 0 1 1.94 2.6l-3.16 9.98a2 2 0 0 1-1.91 1.4H2a1 1 0 0 1-1-1V5a3 3 0 0 1 3-3h2.9ZM13 9.92h-.82l-3.52.05-1.45.02-1.07 2.95-2.47 6.86h13.8l3.16-9.98-7.62.1ZM4 4a1 1 0 0 0-1 1v10.76l1.26-3.5 1.06-2.95A2 2 0 0 1 7.18 8l4.98-.06 5.7-.07V7a1 1 0 0 0-1-1H11.1a3 3 0 0 1-1.67-.5l-2-1.33A1 1 0 0 0 6.9 4H4Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'folder_open_stroked');
var _default = exports.default = IconComponent;