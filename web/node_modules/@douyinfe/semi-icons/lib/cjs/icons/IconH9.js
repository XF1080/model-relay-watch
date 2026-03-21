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
    d: "M3.5 2.5C4.33 2.5 5 3.17 5 4v6.5h6V4a1.5 1.5 0 0 1 3 0v16a1.5 1.5 0 0 1-3 0v-6.5H5V20a1.5 1.5 0 0 1-3 0V4c0-.83.67-1.5 1.5-1.5Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.7 14.75c0 .64-.44 1.12-1.03 1.12-.59 0-1.02-.48-1.02-1.13 0-.64.43-1.1 1.02-1.1.6 0 1.04.47 1.04 1.1Zm-4.42 4.65c0 .52.34.97.91 1.3.57.31 1.35.5 2.22.5 2.69 0 4.28-1.78 4.28-4.87 0-2.99-1.54-4.82-4.03-4.82-2.19 0-3.66 1.35-3.66 3.34 0 1.77 1.17 3 2.85 3 .95 0 1.8-.5 2.13-1.28h.06c0 1.57-.58 2.49-1.63 2.49-.56 0-.88-.19-1.27-.43-.31-.2-.54-.26-.83-.26a1 1 0 0 0-1.03 1.03Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'h9');
var _default = exports.default = IconComponent;