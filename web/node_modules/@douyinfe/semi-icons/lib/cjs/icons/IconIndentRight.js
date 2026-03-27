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
    d: "M1 4.5C1 3.67 1.67 3 2.5 3h11a1.5 1.5 0 0 1 0 3h-11A1.5 1.5 0 0 1 1 4.5Zm0 5C1 8.67 1.67 8 2.5 8h11a1.5 1.5 0 0 1 0 3h-11A1.5 1.5 0 0 1 1 9.5ZM2.5 13a1.5 1.5 0 0 0 0 3h11a1.5 1.5 0 0 0 0-3h-11ZM1 19.5c0-.83.67-1.5 1.5-1.5h11a1.5 1.5 0 0 1 0 3h-11A1.5 1.5 0 0 1 1 19.5Zm15.94-9.88a1.5 1.5 0 1 1 2.12-2.12l3.5 3.5a1.5 1.5 0 0 1 0 2.12l-3.5 3.5a1.5 1.5 0 1 1-2.12-2.12l2.44-2.44-2.44-2.44Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'indent_right');
var _default = exports.default = IconComponent;