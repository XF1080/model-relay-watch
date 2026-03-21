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
    d: "M20 11v.3a4.48 4.48 0 0 1-1.5 8.7H17s-1 0-1-1 1-1 1-1h1.5a2.48 2.48 0 0 0 1.1-4.7c-.3-.2-.7-.3-1.1-.3h-.62a.2.2 0 0 1-.2-.26A4.95 4.95 0 0 0 13 6c-1.79 0-3.29.9-4.19 2.3a7.06 7.06 0 0 0-.65 1.63c-.03.13-.18.2-.3.16C7.55 10 7.3 10 7 10c-.3 0-.6 0-.9.1A4.01 4.01 0 0 0 7 18s1 0 1 1-1 1-1 1c-3.3 0-6-2.7-6-6 0-3.2 2.5-5.8 5.7-6 1.1-2.3 3.5-4 6.3-4 3.9 0 7 3.1 7 7Zm-4.3 3.7a1 1 0 0 1-1.4 0L13 13.42V19a1 1 0 1 1-2 0v-5.59l-1.3 1.3a1 1 0 0 1-1.4-1.42l3-3a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.42Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'cloud_upload_stroked');
var _default = exports.default = IconComponent;