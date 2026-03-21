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
    d: "M6.14 3.8a28.88 28.88 0 0 1 6.6 7.63l1.7-1.67a8.37 8.37 0 0 1 2.82-1.83 12.23 12.23 0 0 0-2.32-4.28.67.67 0 0 0-.53-.25H6.28c-.21 0-.3.27-.14.4Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m20.57 14.2.01-.02.04-.07-.05.08Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.04 14.56c1.23.52 2.34.97 3.65 1.32a4.75 4.75 0 0 0 5.63-2.4l1.32-2.63c.3-.64.67-1.23 1.12-1.78a6.2 6.2 0 0 0-2.3-.44c-1.9 0-3.7.73-5.06 2.06l-2.02 2c-.72.7-1.5 1.33-2.34 1.87Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20.8 13.78v-.02l.01-.01s0 .02-.02.03Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1.63 9.75a.23.23 0 0 0-.4.16v7.96c0 .23.12.44.3.56a12.95 12.95 0 0 0 14.08.2c.78-.5 1.39-.92 2.04-1.55-1.05.3-2.2.33-3.37.01A28.99 28.99 0 0 1 1.63 9.75Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'feishu_logo');
var _default = exports.default = IconComponent;