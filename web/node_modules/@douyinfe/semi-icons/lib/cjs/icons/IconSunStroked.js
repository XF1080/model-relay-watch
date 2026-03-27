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
  }, props), /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#clip0_2342_331)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 20c.83 0 1.5.67 1.5 1.5v1a1.5 1.5 0 0 1-3 0v-1c0-.83.67-1.5 1.5-1.5Zm-7.78-2.34a1.5 1.5 0 1 1 2.12 2.12l-.7.7a1.5 1.5 0 0 1-2.13-2.12l.71-.7Zm13.44 0a1.5 1.5 0 0 1 2.12 0l.7.7a1.5 1.5 0 0 1-2.12 2.13l-.7-.71a1.5 1.5 0 0 1 0-2.12ZM12 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9.5 3.5a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 1 0-3h1Zm20 0a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 1 0-3h1ZM3.51 3.51a1.5 1.5 0 0 1 2.13 0l.7.71a1.5 1.5 0 1 1-2.12 2.12l-.7-.7a1.5 1.5 0 0 1 0-2.13Zm14.85 0a1.5 1.5 0 0 1 2.13 2.13l-.71.7a1.5 1.5 0 1 1-2.12-2.12l.7-.7ZM12 0c.83 0 1.5.67 1.5 1.5v1a1.5 1.5 0 0 1-3 0v-1c0-.83.67-1.5 1.5-1.5Z",
    fill: "currentColor"
  })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "clip0_2342_331"
  }, /*#__PURE__*/React.createElement("rect", {
    width: 24,
    height: 24,
    fill: "currentColor"
  }))));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'sun_stroked');
var _default = exports.default = IconComponent;