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
    opacity: 0.99
  }, /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.28 7.6c-.59 0-.91-.34-.91-.97V3.54h-.01l-.25.15c-.29.17-.78.35-.95.35-.26 0-.66-.52-.66-.88 0-.27.16-.5.47-.69l1-.62c.38-.23.79-.35 1.15-.35.65 0 1.07.43 1.07 1.1v4.03c0 .63-.32.98-.9.98ZM9.5 3a1.5 1.5 0 1 0 0 3h11a1.5 1.5 0 0 0 0-3h-11ZM8 11.5c0-.83.67-1.5 1.5-1.5h11a1.5 1.5 0 0 1 0 3h-11A1.5 1.5 0 0 1 8 11.5Zm0 7c0-.83.67-1.5 1.5-1.5h11a1.5 1.5 0 0 1 0 3h-11A1.5 1.5 0 0 1 8 18.5Zm-5.84-4.63c0 .44.33.73.81.73h3.06c.52 0 .83-.26.83-.7 0-.45-.32-.72-.83-.72H4.56v-.07l1.04-.93c.7-.62 1.04-1.23 1.04-1.88 0-1.03-.95-1.8-2.23-1.8-1.23 0-2.26.76-2.26 1.61 0 .4.3.68.72.68.3 0 .49-.12.75-.45.24-.3.43-.4.7-.4.33 0 .57.22.57.55 0 .29-.2.57-.66 1L2.9 12.75c-.54.5-.73.8-.73 1.12Zm2.14 7.86c-1.28 0-2.3-.64-2.3-1.44 0-.41.28-.7.68-.7.24 0 .46.1.7.36.3.3.58.44.9.44.47 0 .78-.23.78-.58s-.3-.6-.77-.6h-.24c-.37 0-.63-.27-.63-.67 0-.37.26-.67.63-.67h.24c.38 0 .66-.22.66-.52 0-.3-.27-.51-.66-.51-.3 0-.55.12-.87.42a.96.96 0 0 1-.68.28c-.42 0-.72-.28-.72-.66 0-.75 1.05-1.38 2.3-1.38 1.39 0 2.35.67 2.35 1.63 0 .64-.47 1.18-1.08 1.24v.12c.72.04 1.23.63 1.23 1.4 0 1.08-1.05 1.84-2.52 1.84Z",
    fill: "currentColor"
  })));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'ordered_list');
var _default = exports.default = IconComponent;