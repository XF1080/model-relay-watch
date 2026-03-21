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
    d: "M20 2a2 2 0 0 1 2 2v8.53a6 6 0 0 0-2-1.19V8a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h7.8c.47.8 1.11 1.49 1.88 2H4a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h16ZM4.5 4a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-15Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12.34 15a5.99 5.99 0 0 0-.25 3h-.59a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h.84Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12.5 10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h1Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17.5 10a1 1 0 0 1 1 1v.02a6.08 6.08 0 0 0-3 .52V11a1 1 0 0 1 1-1h1Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 12a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 .27c.41 0 .75.34.75.75v1.25l1.3 1.3a.75.75 0 1 1-1.06 1.06l-1.5-1.5a.75.75 0 0 1-.1-.12.75.75 0 0 1-.14-.44v-1.55c0-.41.34-.75.75-.75Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'calendar_clock_stroked');
var _default = exports.default = IconComponent;