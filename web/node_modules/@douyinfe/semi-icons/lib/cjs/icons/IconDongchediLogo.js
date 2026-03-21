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
    d: "M12.01 4a10.5 10.5 0 0 1 10.44 11.57v.02l-.05.41v.04c-.07.44-.16.88-.27 1.3l-.03.12-.09.3-.05.13c-.02.1-.06.18-.1.27l-.05.14-.1.26-.06.14-.16.35c0 .01 0 .02-.02.03-.15.32-.32.63-.5.93-.12.2-.39.26-.77.01l-2.02-1.35a.41.41 0 0 1-.13-.56l.1-.2c.12-.22.02-.5-.22-.59a17.41 17.41 0 0 0-11.86 0 .41.41 0 0 0-.22.6c.04.05.07.12.1.19.12.18.06.43-.13.56l-2.2 1.47a.43.43 0 0 1-.6-.13l-.5-.93v-.03l-.16-.35-.06-.14a7.67 7.67 0 0 0-.1-.26l-.06-.14-.1-.27-.04-.13-.09-.3c0-.04-.02-.08-.03-.11a12.66 12.66 0 0 1-.33-1.76v-.02A10.52 10.52 0 0 1 11.98 4h.03Zm-6.07 9.65.2-.03a20.94 20.94 0 0 1 11.76 0c.52.15 1.02-.32.88-.85a7 7 0 0 0-13.52 0 .7.7 0 0 0 .68.89v-.01Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'dongchedi_logo');
var _default = exports.default = IconComponent;