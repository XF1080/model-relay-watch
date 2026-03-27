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
    d: "m5.1 18-.6 2.17a1.45 1.45 0 0 0 2.8.77L8.1 18h4l-.6 2.17a1.45 1.45 0 0 0 2.8.77l.8-2.94h4.4a1.5 1.5 0 0 0 0-3h-3.57l1.64-6h2.93a1.5 1.5 0 0 0 0-3h-2.1l.6-2.17a1.45 1.45 0 1 0-2.8-.77L15.4 6h-4l.6-2.17a1.45 1.45 0 1 0-2.8-.77L8.4 6H4.5a1.5 1.5 0 1 0 0 3h3.08l-1.66 6H3.5a1.5 1.5 0 0 0 0 3h1.6Zm3.83-3 1.64-6h4l-1.64 6h-4Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'hash');
var _default = exports.default = IconComponent;