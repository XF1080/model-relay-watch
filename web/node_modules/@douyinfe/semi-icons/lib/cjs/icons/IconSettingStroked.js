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
    d: "M10.59 1.38c-.83 0-1.5.67-1.5 1.5v1.63L6.98 5.73l-1.4-.8a1.5 1.5 0 0 0-2.04.54L2.1 7.94A1.5 1.5 0 0 0 2.66 10l1.4.8v2.43l-1.42.82a1.5 1.5 0 0 0-.55 2.05l1.43 2.46a1.5 1.5 0 0 0 2.05.55l1.42-.82 2.1 1.2v1.64c0 .83.67 1.5 1.5 1.5h2.84c.83 0 1.5-.67 1.5-1.5v-1.64l2.08-1.2 1.45.83a1.5 1.5 0 0 0 2.04-.55l1.43-2.47a1.5 1.5 0 0 0-.55-2.05l-1.44-.83v-2.4l1.42-.83a1.5 1.5 0 0 0 .55-2.04l-1.42-2.47a1.5 1.5 0 0 0-2.05-.55l-1.41.81-2.1-1.2V2.87c0-.83-.67-1.5-1.5-1.5H10.6Zm.5 3.42V3.38h1.84v1.43c0 .54.29 1.03.75 1.3l2.6 1.5a1.5 1.5 0 0 0 1.5 0L19 6.9l.93 1.6-1.24.7a1.5 1.5 0 0 0-.75 1.3v3c0 .53.29 1.02.75 1.3l1.26.72-.93 1.6-1.26-.73a1.5 1.5 0 0 0-1.5 0l-2.58 1.49a1.5 1.5 0 0 0-.75 1.3v1.43H11.1V19.2a1.5 1.5 0 0 0-.75-1.3l-2.6-1.5a1.5 1.5 0 0 0-1.5 0L5 17.12l-.93-1.6 1.24-.71c.46-.27.75-.76.75-1.3v-3a1.5 1.5 0 0 0-.75-1.3l-1.22-.7.93-1.6 1.2.7a1.5 1.5 0 0 0 1.5 0l2.62-1.51c.46-.27.75-.76.75-1.3ZM12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.5-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'setting_stroked');
var _default = exports.default = IconComponent;