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
    d: "m11.42 2.1-.83-.4L6.42 9H3.2C2.54 9 2 9.54 2 10.2v10.6c0 .66.54 1.2 1.2 1.2H17.67c.65 0 1.19-.12 1.6-.4.38-.23.66-.61.72-1.06a251.76 251.76 0 0 0 1.77-7.79c.13-.68.24-1.32.24-1.68 0-.77-.3-1.38-.76-1.79a2.18 2.18 0 0 0-1.4-.53h-6.5l.19-1.16.03-.17c.13-.76.27-1.6.27-2.17 0-.97-.58-1.72-1.05-2.18a5.37 5.37 0 0 0-1.36-.98ZM6 20v-9H4v9h2Zm2 0h9.67c.19 0 .32-.02.4-.04a250.3 250.3 0 0 0 1.73-7.58c.14-.74.2-1.18.2-1.31 0-.13-.02-.2-.04-.22a.14.14 0 0 0-.03-.06.18.18 0 0 0-.06-.03l-.04-.01h-8.58v-1c0-.7.17-1.68.3-2.5v-.02c.16-.89.28-1.6.28-1.98 0-.16-.1-.42-.45-.76a2.85 2.85 0 0 0-.05-.05L8 10.27V20Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'thumb_up_stroked');
var _default = exports.default = IconComponent;