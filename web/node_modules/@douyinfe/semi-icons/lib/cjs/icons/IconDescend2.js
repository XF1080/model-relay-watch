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
  }, props), /*#__PURE__*/React.createElement("g", {
    opacity: 0.99
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8 4.5a1.5 1.5 0 1 0-3 0v11.38l-1.44-1.44a1.5 1.5 0 0 0-2.12 2.12l4 4a1.5 1.5 0 0 0 2.12 0l4-4a1.5 1.5 0 0 0-2.12-2.12L8 15.88V4.5ZM13.5 3a1.5 1.5 0 0 0 0 3h8a1.5 1.5 0 0 0 0-3h-8ZM12 12c0-.83.67-1.5 1.5-1.5h8a1.5 1.5 0 0 1 0 3h-8A1.5 1.5 0 0 1 12 12Zm0 7.5c0-.83.67-1.5 1.5-1.5h8a1.5 1.5 0 0 1 0 3h-8a1.5 1.5 0 0 1-1.5-1.5Z",
    fill: "currentColor"
  })));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'descend2');
var _default = exports.default = IconComponent;