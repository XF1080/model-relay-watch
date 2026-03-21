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
  const id = (0, _utils.getUuidShort)({
    prefix: 'semi-ai-image-level-3'
  });
  const [stop1, stop2, stop3, stop4] = (0, _utils.getFillColor)(fill, 4);
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    focusable: false,
    "aria-hidden": true
  }, rest), /*#__PURE__*/React.createElement("path", {
    d: "M12 2a1 1 0 1 1 0 2H4v11.23l3.67-3.37.15-.12a2 2 0 0 1 2.5.08l3.2 2.74 2.16-2.15a2 2 0 0 1 2.61-.19L20 13.5V12a1 1 0 1 1 2 0v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h8ZM4 17.94V20h16v-4l-2.9-2.18-2.05 2.05 1.6 1.37a1 1 0 0 1-1.3 1.52l-6.33-5.42L4 17.94ZM17.93 2.4a.6.6 0 0 1 1.14 0c.05.15.1.3.17.44l.04.07a3.99 3.99 0 0 0 1.8 1.8l.07.04a4 4 0 0 0 .44.17.6.6 0 0 1 0 1.14 4 4 0 0 0-.44.17l-.07.04a3.99 3.99 0 0 0-1.8 1.8l-.04.07a4 4 0 0 0-.17.44.6.6 0 0 1-1.14 0 4 4 0 0 0-.17-.44l-.04-.07a3.99 3.99 0 0 0-1.8-1.8l-.07-.04a4 4 0 0 0-.44-.17.6.6 0 0 1 0-1.14 4 4 0 0 0 .44-.17l.07-.04a3.99 3.99 0 0 0 1.8-1.8l.04-.07a4 4 0 0 0 .17-.44Zm.57 1.98c-.31.42-.69.8-1.1 1.11.41.31.79.69 1.1 1.1.31-.41.69-.79 1.1-1.1-.41-.31-.79-.69-1.1-1.1Z",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: 22,
    y1: 22,
    x2: -0.370122,
    y2: 18.8542,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: stop1
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 0.3,
    stopColor: stop2
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 0.6,
    stopColor: stop3
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 1,
    stopColor: stop4
  }))));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'ai_image_level_3');
var _default = exports.default = IconComponent;