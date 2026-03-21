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
    d: "M.88 5a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v4.8a1 1 0 0 1-.72.96c-.73.22-1.1.76-1.1 1.24s.37 1.02 1.1 1.24c.36.11.62.4.7.76H19.8a3.07 3.07 0 0 1-.74-2c0-1.28.77-2.3 1.82-2.86V6h-18v3.14A3.27 3.27 0 0 1 4.69 12c0 1.28-.77 2.3-1.82 2.86V18h11v2h-12a1 1 0 0 1-1-1v-4.8a1 1 0 0 1 .72-.96c.73-.22 1.1-.76 1.1-1.24 0-.47-.36-1.01-1.09-1.24a1 1 0 0 1-.73-.96V5Zm6 5a1 1 0 0 1 2 0v4a1 1 0 1 1-2 0v-4Zm14.03 5.47a.75.75 0 1 0-1.07 1.06l.22.22h-4.18a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 .53-1.28l-1.5-1.5Zm-4.07 7.06a.75.75 0 1 0 1.07-1.06l-.22-.22h4.18a.75.75 0 0 0 0-1.5h-6a.75.75 0 0 0-.53 1.28l1.5 1.5ZM11.88 9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1Zm3 1a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0v-4Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'ticket_code_exchange_stroked');
var _default = exports.default = IconComponent;