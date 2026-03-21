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
    d: "M12.94 2.94a5.74 5.74 0 1 1 8.12 8.12l-3.55 3.55-2.12-2.12 3.55-3.55a2.74 2.74 0 1 0-3.88-3.88l-3.55 3.55L9.39 6.5l3.55-3.55Zm-10 10 3.05-3.05L8.11 12l-3.05 3.05a2.74 2.74 0 0 0 3.88 3.88l3.05-3.05L14.11 18l-3.05 3.05a5.74 5.74 0 1 1-8.12-8.12Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: 5.379,
    y: 7.5,
    width: 2,
    height: 3.85,
    transform: "rotate(-45 5.37866 7.5)",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: 13.779,
    y: 15.9,
    width: 2,
    height: 3.84773,
    transform: "rotate(-45 13.7793 15.9005)",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'unlink');
var _default = exports.default = IconComponent;