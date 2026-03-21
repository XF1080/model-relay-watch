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
    d: "M4 2a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h4a1 1 0 1 0 0-2H4V4h16v10a1 1 0 1 0 2 0V4a2 2 0 0 0-2-2H4Zm5.5 5.13A1 1 0 0 0 8 8v8a1 1 0 0 0 1.5.87l7-4a1 1 0 0 0 0-1.74l-7-4ZM13.98 12 10 14.28V9.72L13.98 12ZM11 17h1v4h1v-4h1v4.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V17Zm9 0h-1v4.5c0 .28.22.5.5.5H22v-1h-2v-4Zm-4.5 0a.5.5 0 0 0-.5.5V22h1v-2h.17l.83 2h1l-.77-2h.27a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-2Zm1.5 1h-1v1h1v-1Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'video_url_stroked');
var _default = exports.default = IconComponent;