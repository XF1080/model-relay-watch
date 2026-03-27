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
    d: "M7 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM2.5 4.5a4.5 4.5 0 1 1 6 4.24v4.23a19.2 19.2 0 0 1 3.87-.51l.28-.02a13.8 13.8 0 0 0 3.6-.54 4.5 4.5 0 1 1 3.54.41c-.14.42-.35.8-.63 1.14a4.49 4.49 0 0 1-1.94 1.3c-1.32.48-3 .6-4.37.68l-.11.01c-1.3.09-2.37.16-3.19.35a4.5 4.5 0 1 1-4.05-.53V8.74a4.5 4.5 0 0 1-3-4.24Zm16 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM7 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'source_control');
var _default = exports.default = IconComponent;