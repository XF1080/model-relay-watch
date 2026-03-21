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
    d: "M19 1a2 2 0 0 1 2 2v10a1 1 0 1 1-2 0V3H5v18h7a1 1 0 1 1 0 2H5a2 2 0 0 1-2-2V3c0-1.1.9-2 2-2h14Zm-1.07 15.4a.6.6 0 0 1 1.14 0c.05.16.1.3.17.45l.04.07a3.99 3.99 0 0 0 1.8 1.8l.07.04a4 4 0 0 0 .44.17.6.6 0 0 1 0 1.14 4 4 0 0 0-.44.17l-.07.04a3.99 3.99 0 0 0-1.8 1.8l-.04.07a4 4 0 0 0-.17.44.6.6 0 0 1-1.14 0 4 4 0 0 0-.17-.44l-.04-.07a3.99 3.99 0 0 0-1.8-1.8l-.07-.04a4 4 0 0 0-.44-.17.6.6 0 0 1 0-1.14 4 4 0 0 0 .44-.17l.07-.04a3.99 3.99 0 0 0 1.8-1.8l.04-.07a4 4 0 0 0 .17-.44Zm.57 2c-.31.41-.69.79-1.1 1.1.41.31.79.69 1.1 1.1.31-.41.69-.79 1.1-1.1-.41-.31-.79-.69-1.1-1.1Zm-4.4-8.1a.43.43 0 0 1 .8 0 2.85 2.85 0 0 0 .57.98l.05.05.15.15.05.05a2.85 2.85 0 0 0 .99.56c.39.13.39.69 0 .82a2.85 2.85 0 0 0-.99.56l-.05.05-.15.15-.05.05a2.85 2.85 0 0 0-.56.99.43.43 0 0 1-.82 0 2.85 2.85 0 0 0-.56-.99l-.05-.05-.15-.15-.05-.05a2.85 2.85 0 0 0-.99-.56.43.43 0 0 1 0-.82 2.85 2.85 0 0 0 .99-.56l.05-.05.15-.15.05-.05a2.85 2.85 0 0 0 .56-.99Zm-4.6 1.2a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h1.5ZM16 6a1 1 0 1 1 0 2H8a1 1 0 0 1 0-2h8Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'ai_file_level_1');
var _default = exports.default = IconComponent;