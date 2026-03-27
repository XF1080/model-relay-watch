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
    d: "M7 2.5c-.68 0-1.43.21-1.95.88a2.82 2.82 0 0 0-.53 1.7c-.01.46.04.96.1 1.37l.02.2c.05.38.09.72.11 1.07.06.86-.03 1.41-.27 1.8-.2.3-.71.78-2.2 1a1.5 1.5 0 0 0 0 2.96c1.49.22 2 .7 2.2 1 .24.39.33.94.27 1.8-.02.35-.06.7-.11 1.07l-.03.2c-.05.41-.1.91-.1 1.38.02.43.09 1.1.54 1.69.52.67 1.27.88 1.95.88h2a1.5 1.5 0 1 0 0-3H7.53l.06-.58.02-.19c.05-.37.1-.8.14-1.26.06-1.02.03-2.4-.76-3.61-.2-.32-.44-.6-.72-.86.28-.26.52-.54.72-.86.79-1.21.82-2.59.76-3.61-.03-.45-.09-.9-.14-1.26l-.02-.19-.06-.58H9a1.5 1.5 0 1 0 0-3H7Zm10 0c.68 0 1.43.21 1.95.88.45.58.52 1.26.53 1.7.01.46-.04.96-.1 1.37l-.02.2c-.05.38-.09.72-.11 1.07-.06.86.03 1.41.27 1.8.2.3.71.78 2.2 1a1.5 1.5 0 0 1 0 2.96c-1.49.22-2 .7-2.2 1-.24.39-.33.94-.27 1.8.02.35.06.7.11 1.07l.03.2c.05.41.1.91.1 1.38a2.82 2.82 0 0 1-.54 1.69c-.52.67-1.27.88-1.95.88h-2a1.5 1.5 0 1 1 0-3h1.47l-.06-.58-.02-.19c-.05-.37-.1-.8-.14-1.26a5.82 5.82 0 0 1 .76-3.61c.2-.32.44-.6.72-.86a4.38 4.38 0 0 1-.72-.86 5.82 5.82 0 0 1-.76-3.61c.03-.45.09-.9.14-1.26l.02-.19.06-.58H15a1.5 1.5 0 1 1 0-3h2Z",
    fill: "currentColor"
  }));
}
const IconComponent = (0, _Icon.convertIcon)(SvgComponent, 'brackets');
var _default = exports.default = IconComponent;