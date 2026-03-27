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
    d: "M7.42 2.17a1 1 0 0 1 1.41 0l9.43 9.44a1 1 0 0 1 0 1.41l-.02.02-6.7 6.7a2.5 2.5 0 0 1-3.53 0l-5.66-5.66a2.5 2.5 0 0 1 0-3.53l6.01-6.01-.94-.95a1 1 0 0 1 0-1.42Zm2.36 3.78 6.36 6.36-2.18 2.19H5.6l-1.83-1.83a.5.5 0 0 1 0-.71l6-6.01ZM21 19c0 1.1-.67 2-1.5 2s-1.5-.9-1.5-2c0-1.08.66-2.49 1.1-3.31a.44.44 0 0 1 .8 0c.44.82 1.1 2.23 1.1 3.31Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'fill_stroked');
var _default = exports.default = IconComponent;