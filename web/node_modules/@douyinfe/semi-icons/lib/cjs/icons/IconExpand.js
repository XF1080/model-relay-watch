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
    d: "M10 2a1.5 1.5 0 0 1 0 3H7.12l3.94 3.94a1.5 1.5 0 0 1-2.12 2.12L5 7.12V10a1.5 1.5 0 0 1-3 0V3.5C2 2.67 2.67 2 3.5 2H10Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 14a1.5 1.5 0 0 1 3 0v6.5c0 .83-.67 1.5-1.5 1.5H14a1.5 1.5 0 0 1 0-3h2.88l-3.94-3.94a1.5 1.5 0 0 1 2.12-2.12L19 16.88V14Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'expand');
var _default = exports.default = IconComponent;