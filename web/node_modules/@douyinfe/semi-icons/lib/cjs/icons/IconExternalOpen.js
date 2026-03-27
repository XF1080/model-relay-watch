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
    d: "M12 3.5c0-.83.67-1.5 1.5-1.5h6A2.5 2.5 0 0 1 22 4.5v6a1.5 1.5 0 0 1-3 0V7l-7.94 7.94a1.5 1.5 0 0 1-2.12-2.12L16.76 5H13.5A1.5 1.5 0 0 1 12 3.5Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 8.5v10c0 .28.22.5.5.5h10a.5.5 0 0 0 .5-.5v-3a1.5 1.5 0 0 1 3 0v3a3.5 3.5 0 0 1-3.5 3.5h-10A3.5 3.5 0 0 1 2 18.5v-10A3.5 3.5 0 0 1 5.5 5h3a1.5 1.5 0 1 1 0 3h-3a.5.5 0 0 0-.5.5Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'external_open');
var _default = exports.default = IconComponent;