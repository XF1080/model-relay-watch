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
    d: "M21.14 4.41 19.73 3a2 2 0 0 0-2.83 0l-1.41 1.41-.71.71L8.3 11.6a1 1 0 0 0-.28.53l-.6 3.43a1 1 0 0 0 1.16 1.16l3.43-.6a1 1 0 0 0 .53-.28l6.47-6.47.7-.7 1.42-1.42a2 2 0 0 0 0-2.83Zm-2.12 2.13.7-.71-1.4-1.42-.71.71 1.41 1.42Zm-1.41 1.41-1.42-1.41-6.24 6.24-.3 1.72 1.71-.3 6.25-6.25ZM2 5a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2H4v14h14v-6a1 1 0 1 1 2 0v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'edit_2_stroked');
var _default = exports.default = IconComponent;