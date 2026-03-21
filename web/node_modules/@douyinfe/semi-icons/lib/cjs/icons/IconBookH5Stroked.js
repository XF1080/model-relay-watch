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
    d: "M19 3H7a2 2 0 0 0-2 2v12.17A3 3 0 0 1 6 17h13V3ZM6 21a1 1 0 0 1-1-1v-.01A1 1 0 0 1 6 19h13v2H6ZM3 5v15a3 3 0 0 0 3 3h14a1 1 0 0 0 1-1V3a2 2 0 0 0-2-2H7a4 4 0 0 0-4 4Zm4.25 3.5c0-.28.22-.5.5-.5h.5c.28 0 .5.22.5.5v1.25c0 .28.22.5.5.5h.5a.5.5 0 0 0 .5-.5V8.5c0-.28.22-.5.5-.5h.5c.28 0 .5.22.5.5v5a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1-.5-.5v-1.25a.5.5 0 0 0-.5-.5h-.5a.5.5 0 0 0-.5.5v1.25a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1-.5-.5v-5Zm5.75 1v1.75c0 .28.22.5.5.5h1.63a.38.38 0 0 1 0 .75H13.5a.5.5 0 0 0-.5.5v.5c0 .28.22.5.5.5h3a.5.5 0 0 0 .5-.5v-2.75a.5.5 0 0 0-.5-.5h-1.63a.38.38 0 0 1 0-.75h1.63A.5.5 0 0 0 17 9v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'book_h5_stroked');
var _default = exports.default = IconComponent;