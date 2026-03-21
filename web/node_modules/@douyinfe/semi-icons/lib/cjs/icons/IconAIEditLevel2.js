"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _Icon = require("../components/Icon");
var _utils = require("../utils");
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
    d: "M16.28 5.04a2 2 0 0 1 2.83 0l2.15 2.14a2 2 0 0 1 0 2.84L11.24 20.04c-.7.7-1.6 1.18-2.56 1.37l-2.97.6a1.2 1.2 0 0 1-1.42-1.42l.6-2.97c.19-.97.67-1.86 1.37-2.56L16.28 5.04Zm-8.6 11.43c-.43.42-.71.96-.83 1.54l-.36 1.8 1.8-.37c.58-.11 1.11-.4 1.53-.82l7.29-7.29-2.15-2.15-7.29 7.3Zm8.7-8.7 2.15 2.14 1.31-1.3-2.15-2.15-1.3 1.3Z",
    fill: secondColor
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.33 3.08a4.52 4.52 0 0 1-2.65 2.3.69.69 0 0 0 0 1.3 4.58 4.58 0 0 1 .58.25 4.57 4.57 0 0 1 2.3 2.65c.22.63 1.1.63 1.3 0a4.57 4.57 0 0 1 2.32-2.65 4.52 4.52 0 0 1 .58-.24.69.69 0 0 0 0-1.3 4.57 4.57 0 0 1-.58-.24A4.57 4.57 0 0 1 6.87 2.5a.69.69 0 0 0-1.3 0 4.57 4.57 0 0 1-.24.58Zm.89 1.69c-.36.48-.79.9-1.27 1.27.48.36.9.79 1.27 1.27.36-.48.79-.91 1.27-1.27a6.22 6.22 0 0 1-1.27-1.27Z",
    fill: primaryColor
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'ai_edit_level_2');
var _default = exports.default = IconComponent;