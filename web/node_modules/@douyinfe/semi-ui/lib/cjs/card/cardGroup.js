"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/card/constants");
var _classnames = _interopRequireDefault(require("classnames"));
var _space = _interopRequireDefault(require("../space"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
const prefixcls = _constants.cssClasses.PREFIX;
class CardGroup extends _react.PureComponent {
  render() {
    const _a = this.props,
      {
        children,
        className,
        spacing,
        style,
        type
      } = _a,
      others = __rest(_a, ["children", "className", "spacing", "style", "type"]);
    const isGrid = type === 'grid';
    const cardGroupCls = (0, _classnames.default)(`${prefixcls}-group`, className, {
      [`${prefixcls}-group-grid`]: isGrid
    });
    return /*#__PURE__*/_react.default.createElement(_space.default, Object.assign({
      spacing: isGrid ? 0 : spacing,
      wrap: true,
      className: cardGroupCls,
      style: style
    }, others), children);
  }
}
CardGroup.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  spacing: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.array]),
  style: _propTypes.default.object,
  type: _propTypes.default.oneOf(_constants.strings.TYPE)
};
CardGroup.defaultProps = {
  spacing: 16
};
var _default = exports.default = CardGroup;