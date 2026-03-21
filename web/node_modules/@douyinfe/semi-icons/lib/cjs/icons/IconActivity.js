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
    d: "M12 1a1.5 1.5 0 0 0 0 3 8 8 0 1 1-4.75 14.44 1.5 1.5 0 1 0-1.79 2.4A11 11 0 1 0 12 1ZM7.5 5.2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-3 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 16.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm8.5-9a1.5 1.5 0 0 0-3 0V12c0 .4.16.78.44 1.06l3 3a1.5 1.5 0 0 0 2.12-2.12l-2.56-2.56V7.5Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'activity');
var _default = exports.default = IconComponent;