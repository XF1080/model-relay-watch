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
    prefix: 'semi-ai-search-level-3'
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
    d: "M10 2a1 1 0 1 1 0 2 6 6 0 1 0 6 6 1 1 0 0 1 2 0 8 8 0 0 1-1.68 4.9l5.39 5.4a1 1 0 1 1-1.42 1.4l-5.39-5.38A8 8 0 1 1 10 2Zm4.93-.6a.6.6 0 0 1 1.14 0c.05.16.1.3.17.45l.04.07a3.99 3.99 0 0 0 1.8 1.8l.07.04a4 4 0 0 0 .44.17.6.6 0 0 1 0 1.14 4 4 0 0 0-.44.17l-.07.04a4 4 0 0 0-1.8 1.8 3.8 3.8 0 0 0-.21.51.6.6 0 0 1-1.14 0 4 4 0 0 0-.17-.44l-.04-.07a3.95 3.95 0 0 0-2.31-2.01.6.6 0 0 1 0-1.14 4 4 0 0 0 .5-.2 4 4 0 0 0 1.81-1.81l.04-.07a4 4 0 0 0 .17-.44Zm.57 2c-.31.41-.69.79-1.1 1.1.41.31.79.69 1.1 1.1.31-.41.69-.79 1.11-1.1-.42-.31-.8-.69-1.11-1.1Z",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: 22.0001,
    y1: 21.9998,
    x2: -0.410523,
    y2: 18.9983,
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
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'ai_search_level_3');
var _default = exports.default = IconComponent;