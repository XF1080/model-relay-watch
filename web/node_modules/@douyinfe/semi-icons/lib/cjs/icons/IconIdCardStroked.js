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
    d: "M20 3a3 3 0 0 1 3 3v11a3 3 0 0 1-2.85 3H3.85A3 3 0 0 1 1 17.15V6a3 3 0 0 1 3-3h16ZM4 5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4Zm4 8.86c1.67 0 3.13.51 3.85 1.26.37.39 0 .88-.55.88H4.7c-.54 0-.92-.5-.55-.88.72-.75 2.18-1.26 3.85-1.26Zm9-.86a1 1 0 1 1 0 2h-3a1 1 0 1 1 0-2h3ZM8 7c1.6 0 2.35.73 2.39 2.63.4.15.43.64.28 1.18-.11.42-.36.74-.62.84-.42 1.07-1.19 1.78-2.05 1.78-.86 0-1.63-.71-2.05-1.78-.26-.1-.51-.42-.62-.84-.15-.54-.12-1.03.28-1.18C5.65 7.73 6.41 7 8 7Zm11 2a1 1 0 1 1 0 2h-5a1 1 0 1 1 0-2h5Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'id_card_stroked');
var _default = exports.default = IconComponent;