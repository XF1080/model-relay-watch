"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatten = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const REACT_FRAGMENT_TYPE = 'Symbol(react.fragment)';
/**
 * Flatten the children and return the processed data
 */
const flatten = children => {
  let res = [];
  _react.default.Children.forEach(children, child => {
    if (child === undefined || child === null) {
      return;
    }
    if (Array.isArray(child)) {
      res = res.concat(flatten(child));
    } else if (/*#__PURE__*/(0, _react.isValidElement)(child) && child.type && child.type.toString() === REACT_FRAGMENT_TYPE && child.props) {
      res = res.concat(flatten(child.props.children));
    } else {
      res.push(child);
    }
  });
  return res;
};
exports.flatten = flatten;