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
    d: "M13.29 20.09 12 17.86l-1.3 2.25C10 21.5 8.42 23 6.5 23a4.5 4.5 0 1 1 2.62-8.16l.57-.98L6 6.46a4 4 0 0 1 .65-4.84c.4-.4 1.03-.2 1.3.29l6.93 12.93A4.5 4.5 0 1 1 17.5 23c-1.93 0-3.5-1.5-4.21-2.91ZM6.5 17a1.5 1.5 0 0 1 1.19 2.42A1.5 1.5 0 1 1 6.5 17Zm9.93 2.55A1.5 1.5 0 0 0 19 18.5a1.5 1.5 0 1 0-2.57 1.05ZM12 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.37 12.03 18 6.46a4 4 0 0 0-.62-4.81c-.4-.41-1.06-.21-1.31.3l-3.01 6.08 2.3 4Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'scissors');
var _default = exports.default = IconComponent;