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
    d: "M20 18.5a1.5 1.5 0 1 0-2.84.67l.03.05.01.03a1.5 1.5 0 0 0 2.8-.75Zm-16 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Zm18 0a3.5 3.5 0 0 1-6.61 1.6l-1-1.79-2.36-4.08-2.41 4.18-1.04 1.75a3.5 3.5 0 1 1-.19-3.63l2.48-4.3L5.88 3.6a1 1 0 0 1 1.73-1l4.42 7.64 4.35-7.54a1 1 0 0 1 1.74 1l-4.94 8.54 2.46 4.25A3.5 3.5 0 0 1 22 18.5Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'scissors_stroked');
var _default = exports.default = IconComponent;