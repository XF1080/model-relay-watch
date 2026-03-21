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
    d: "M9.53 20.14A12.38 12.38 0 0 1 7.9 16h-3.4a8.52 8.52 0 0 0 5.04 4.14Zm-5.9-6.64h3.92a22.12 22.12 0 0 1 0-3H3.63a8.55 8.55 0 0 0 0 3ZM4.5 8h3.39a12.38 12.38 0 0 1 1.64-4.14A8.52 8.52 0 0 0 4.5 8Zm9.97-4.14.23.38c.55.93 1.07 2.16 1.41 3.76h3.4a8.52 8.52 0 0 0-5.04-4.14Zm5.9 6.64h-3.92a22.16 22.16 0 0 1 0 3h3.92a8.55 8.55 0 0 0 0-3ZM19.5 16h-3.39a12.38 12.38 0 0 1-1.64 4.14A8.52 8.52 0 0 0 19.5 16Zm3.5-4a11 11 0 1 1-22 0 11 11 0 0 1 22 0ZM12.55 5.51c-.2-.32-.38-.58-.55-.8-.17.22-.36.48-.55.8-.35.6-.72 1.4-1 2.49h3.1a9.49 9.49 0 0 0-1-2.49ZM10 12c0 .53.02 1.03.06 1.5h3.88a19.4 19.4 0 0 0 0-3h-3.88c-.04.47-.06.97-.06 1.5Zm.46 4a9.5 9.5 0 0 0 1 2.49c.18.32.37.58.54.8.17-.22.36-.48.55-.8a9.5 9.5 0 0 0 1-2.49h-3.1Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'globe_stroke');
var _default = exports.default = IconComponent;