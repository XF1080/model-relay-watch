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
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    focusable: false,
    "aria-hidden": true
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M12.6.67a1 1 0 0 1 .6.29l4.17 4.17a1 1 0 0 1 .3.7V17.5c0 1.01-.82 1.83-1.84 1.83H4.17a1.83 1.83 0 0 1-1.84-1.83v-15c0-1.01.82-1.83 1.84-1.83h8.43ZM7.92 6.5a1 1 0 0 0-1 1v6.67a1 1 0 0 0 1 1h4.16a1 1 0 0 0 0-2H8.92v-1.34h3.16a1 1 0 0 0 0-2H8.92V8.5h3.16a1 1 0 0 0 0-2H7.92Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'excel');
var _default = exports.default = IconComponent;