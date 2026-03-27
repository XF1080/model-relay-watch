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
    d: "M16 21a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2h8Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 1a4.5 4.5 0 0 1 4.5 4.3l3.6-3.6a1 1 0 0 1 1.4 1.42L3.13 21.51a1 1 0 1 1-1.41-1.42l3.85-3.85A7.96 7.96 0 0 1 4 11.5a1 1 0 1 1 2 0c0 1.22.37 2.36 1 3.3l1.08-1.09a4.47 4.47 0 0 1-.57-1.98l-.01-.23v-6A4.5 4.5 0 0 1 12 1Zm0 2a2.5 2.5 0 0 0-2.5 2.5v6c0 .24.03.48.1.7l4.9-4.9V5.5A2.5 2.5 0 0 0 12 3Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 10.5a1 1 0 0 1 1 1 8 8 0 0 1-11.87 7L9.62 17A6 6 0 0 0 18 11.5a1 1 0 0 1 1-1Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.5 11.5v.23a4.5 4.5 0 0 1-5.7 4.1l1.94-1.94a2.5 2.5 0 0 0 1.65-1.65l2.11-2.11v1.37Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'microphone_off_stroked');
var _default = exports.default = IconComponent;