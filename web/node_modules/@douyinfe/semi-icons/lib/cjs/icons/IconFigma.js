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
    d: "M6.23 15.69a4.08 4.08 0 0 1-1.52-3.21c0-1.3.53-2.36 1.5-3.18-.17-.18-.35-.35-.5-.54a4.1 4.1 0 0 1 3.1-6.8h6.44a4.1 4.1 0 0 1 4.05 3.5 4.03 4.03 0 0 1-1.4 3.75l-.07.07a4.1 4.1 0 0 1 .64 5.74 4 4 0 0 1-2.58 1.52 4.09 4.09 0 0 1-2.95-.63V18.8c0 .81-.18 1.58-.62 2.27a4 4 0 0 1-3.14 1.92 4.07 4.07 0 0 1-4.41-3.41 4.01 4.01 0 0 1 1.38-3.81l.08-.07Zm6.72-7.33h2.21l.33-.01a2.29 2.29 0 0 0-.24-4.56H12.95v4.57Zm-1.84 6.4V10.2H8.8a2.29 2.29 0 0 0 .01 4.57h2.29Zm0-10.97H8.86c-.1 0-.22 0-.33.02a2.29 2.29 0 0 0 .38 4.56H11l.1-.01V3.79Zm0 12.81h-.08c-.74 0-1.49-.01-2.24 0a2.28 2.28 0 0 0-2.25 2.12c-.05.87.28 1.57 1 2.06.73.49 1.5.54 2.28.16a2.23 2.23 0 0 0 1.3-2.14v-2.2Zm1.83-4.12a2.28 2.28 0 0 0 4.58.03 2.3 2.3 0 0 0-2.26-2.32 2.3 2.3 0 0 0-2.32 2.3Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'figma');
var _default = exports.default = IconComponent;