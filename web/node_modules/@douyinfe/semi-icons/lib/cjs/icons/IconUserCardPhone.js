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
    d: "M9.78 12.97c-.58-.59-1.15-1.19-1.7-1.8a1.1 1.1 0 0 1 .3-1.69l1.68-.97c.58-.33.77-1.08.44-1.66L7.47 1.61a1.21 1.21 0 0 0-1.66-.45L1.61 3.6a1.21 1.21 0 0 0-.6.88c-.05.31.05.89.15 1.22 1.17 3.6 3.2 7 6.05 9.85a24.73 24.73 0 0 0 11.76 6.6c.5.09 1.01-.14 1.28-.6l2.42-4.2c.33-.57.14-1.31-.44-1.65l-5.25-3.03a1.21 1.21 0 0 0-1.66.45l-1.17 2.03a1.1 1.1 0 0 1-1.66.3c-.93-.77-1.83-1.6-2.7-2.47Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'user_card_phone');
var _default = exports.default = IconComponent;