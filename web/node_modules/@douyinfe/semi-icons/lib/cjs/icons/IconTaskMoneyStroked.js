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
    d: "M2 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v6a1 1 0 1 1-2 0V4H4v16h8a1 1 0 1 1 0 2H4a2 2 0 0 1-2-2V4Zm4 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2H7Zm7.97 1.02c.3-.3.77-.3 1.06 0L18 14.99l1.97-1.97a.75.75 0 1 1 1.06 1.06l-1.93 1.93H21a.75.75 0 0 1 0 1.5h-2.25v1H21a.75.75 0 0 1 0 1.5h-2.25v1.24a.75.75 0 0 1-1.5 0v-1.24H15a.75.75 0 1 1 0-1.5h2.25v-1H15a.75.75 0 0 1 0-1.5h1.9l-1.93-1.93a.75.75 0 0 1 0-1.06Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'task_money_stroked');
var _default = exports.default = IconComponent;