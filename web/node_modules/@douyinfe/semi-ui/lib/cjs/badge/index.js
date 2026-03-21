"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _isString2 = _interopRequireDefault(require("lodash/isString"));
var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _context = _interopRequireDefault(require("../configProvider/context"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/badge/constants");
require("@douyinfe/semi-foundation/lib/cjs/badge/badge.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const prefixCls = _constants.cssClasses.PREFIX;
class Badge extends _react.PureComponent {
  render() {
    const {
      direction
    } = this.context;
    // DefaultPosition here, static can't get this
    const defaultPosition = direction === 'rtl' ? 'leftTop' : 'rightTop';
    const _a = this.props,
      {
        count,
        dot,
        type,
        countClassName,
        countStyle,
        theme,
        position = defaultPosition,
        overflowCount,
        style,
        children,
        className
      } = _a,
      rest = __rest(_a, ["count", "dot", "type", "countClassName", "countStyle", "theme", "position", "overflowCount", "style", "children", "className"]);
    const custom = count && !((0, _isNumber2.default)(count) || (0, _isString2.default)(count));
    const showBadge = count !== null && typeof count !== 'undefined';
    const wrapper = (0, _classnames.default)(countClassName, {
      [`${prefixCls}-${type}`]: !custom,
      [`${prefixCls}-${theme}`]: !custom,
      [`${prefixCls}-${position}`]: Boolean(position) && Boolean(children),
      [`${prefixCls}-block`]: !children,
      [`${prefixCls}-dot`]: dot,
      [`${prefixCls}-count`]: !dot && !custom && showBadge,
      [`${prefixCls}-custom`]: custom
    });
    let content;
    if ((0, _isNumber2.default)(count)) {
      content = overflowCount && overflowCount < count ? `${overflowCount}+` : `${count}`;
    } else {
      content = count;
    }
    return /*#__PURE__*/_react.default.createElement("span", Object.assign({
      className: (0, _classnames.default)(prefixCls, className)
    }, rest), children, /*#__PURE__*/_react.default.createElement("span", {
      className: wrapper,
      style: style || countStyle,
      "x-semi-prop": "count"
    }, dot ? null : content));
  }
}
exports.default = Badge;
Badge.contextType = _context.default;
Badge.propTypes = {
  count: _propTypes.default.node,
  dot: _propTypes.default.bool,
  type: _propTypes.default.oneOf(_constants.strings.TYPE_SET),
  theme: _propTypes.default.oneOf(_constants.strings.THEME_SET),
  position: _propTypes.default.oneOf(_constants.strings.POS_SET),
  overflowCount: _propTypes.default.number,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  onClick: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  countClassName: _propTypes.default.string,
  countStyle: _propTypes.default.object
};
Badge.defaultProps = {
  dot: false,
  type: 'primary',
  theme: 'solid',
  className: '',
  onClick: () => _noop2.default,
  onMouseEnter: () => _noop2.default,
  onMouseLeave: () => _noop2.default
};