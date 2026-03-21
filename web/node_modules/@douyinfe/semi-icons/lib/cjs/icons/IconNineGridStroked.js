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
    d: "M5 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM2 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-3-1a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm2 7a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm1-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm7-10a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM9 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm2 7a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm1-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-3-1a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm7-14a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm2 7a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm1-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-3-1a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'nine_grid_stroked');
var _default = exports.default = IconComponent;