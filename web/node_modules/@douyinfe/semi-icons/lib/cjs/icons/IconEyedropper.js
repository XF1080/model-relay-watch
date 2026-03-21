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
    d: "M1.22 20.77a4.24 4.24 0 0 1 .02-5.98l9.33-9.28-.94-.95a1.41 1.41 0 0 1 0-1.99 1.39 1.39 0 0 1 1.97 0l.95.97L14.9 1.2a4.16 4.16 0 0 1 5.89.02 4.24 4.24 0 0 1-.02 5.98l-2.3 2.28 1.02 1.02c.54.55.54 1.44 0 1.99-.55.55-1.43.55-1.97 0l-1.03-1.03-9.37 9.32a4.16 4.16 0 0 1-5.89-.02ZM12.54 7.49l1.97 1.99-9.35 9.3c-.55.55-1.42.55-1.97 0a1.41 1.41 0 0 1 .01-2l9.34-9.29Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'eyedropper');
var _default = exports.default = IconComponent;