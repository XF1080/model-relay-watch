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
    d: "M21.7 3.7a1 1 0 0 0-1.4-1.4L17.3 5.26A11.59 11.59 0 0 0 12 4C5 4 1 10 1 12c0 1.18 1.38 3.73 3.94 5.64L2.3 20.3a1 1 0 1 0 1.42 1.42l18-18ZM7.84 14.77l1.46-1.47a3 3 0 0 1 4-4l1.47-1.46a5 5 0 0 0-6.93 6.93Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 20c-1.22 0-2.35-.18-3.38-.5l2.57-2.57a5 5 0 0 0 5.75-5.75l3.56-3.56C22.13 9.27 23 11.07 23 12c0 2-4 8-11 8Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'eye_closed_solid');
var _default = exports.default = IconComponent;