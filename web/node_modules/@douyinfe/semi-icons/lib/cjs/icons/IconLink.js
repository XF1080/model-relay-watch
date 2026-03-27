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
    d: "M12.94 2.94a5.74 5.74 0 1 1 8.12 8.12l-2.67 2.67a7.05 7.05 0 0 0-.4-3.85l.95-.94a2.74 2.74 0 1 0-3.88-3.88l-4 4a2.74 2.74 0 0 0 .9 4.48l-2.2 2.2a5.77 5.77 0 0 1-.82-8.8l4-4Zm-10 10 2.67-2.67a7.04 7.04 0 0 0 .4 3.85l-.95.94a2.74 2.74 0 1 0 3.88 3.88l4-4a2.74 2.74 0 0 0-.57-4.31l2.16-2.16a5.74 5.74 0 0 1 .53 8.6l-4 4a5.74 5.74 0 0 1-8.12-8.13Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'link');
var _default = exports.default = IconComponent;