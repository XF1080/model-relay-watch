"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _utils = require("../utils");
var _Icon = require("../components/Icon");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function SvgComponent(props) {
  const {
      fill
    } = props,
    rest = __rest(props, ["fill"]);
  const [primaryColor, secondColor] = (0, _utils.getFillColor)(fill, 2);
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    focusable: false,
    "aria-hidden": true
  }, rest), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.72 1.92a3.99 3.99 0 0 1-1.8 1.8 4.28 4.28 0 0 1-.51.21.6.6 0 0 0 0 1.14 3.99 3.99 0 0 1 .5.2 3.99 3.99 0 0 1 1.81 1.81 4.4 4.4 0 0 1 .21.51.6.6 0 0 0 1.14 0 3.98 3.98 0 0 1 .2-.5 3.99 3.99 0 0 1 1.81-1.81 4.2 4.2 0 0 1 .51-.21.6.6 0 0 0 0-1.14 3.99 3.99 0 0 1-.5-.2 3.99 3.99 0 0 1-1.81-1.81 4.4 4.4 0 0 1-.21-.51.6.6 0 0 0-1.14 0 3.98 3.98 0 0 1-.2.5Zm.78 1.47c-.31.42-.69.8-1.11 1.11.42.31.8.69 1.11 1.11.31-.42.69-.8 1.11-1.11-.42-.31-.8-.69-1.11-1.11Z",
    fill: primaryColor
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 2a1 1 0 0 1 0 2 6 6 0 1 0 6 6 1 1 0 1 1 2 0 8 8 0 0 1-1.68 4.9l5.39 5.4a1 1 0 1 1-1.42 1.4l-5.39-5.38A8 8 0 1 1 10 2Z",
    fill: secondColor
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'ai_search_level_2');
var _default = exports.default = IconComponent;