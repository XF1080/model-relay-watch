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
    d: "M4 4.5C4 2.6 5.42 1 7.5 1c.96 0 1.78.48 2.41 1.03a9.26 9.26 0 0 1 1.62 1.93c.17.26.33.52.47.78.14-.26.3-.52.47-.78.44-.67.98-1.38 1.62-1.93A3.73 3.73 0 0 1 16.5 1C18.58 1 20 2.6 20 4.5c0 .98-.4 1.86-1.05 2.5H21a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-8V6h-2v5H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2.05A3.49 3.49 0 0 1 4 4.5Zm7 7.5H4v8c0 1.1.9 2 2 2h5V12Zm2 10h5a2 2 0 0 0 2-2v-8h-7v10ZM10.41 6c-.16-.3-.35-.63-.56-.96a7.3 7.3 0 0 0-1.25-1.5C8.15 3.14 7.8 3 7.5 3 6.58 3 6 3.64 6 4.5 6 5.33 6.67 6 7.5 6h2.91Zm3.74-.96c-.21.33-.4.66-.56.96h2.91c.83 0 1.5-.67 1.5-1.5 0-.86-.58-1.5-1.5-1.5-.29 0-.65.15-1.1.54a7.3 7.3 0 0 0-1.25 1.5Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'gift');
var _default = exports.default = IconComponent;