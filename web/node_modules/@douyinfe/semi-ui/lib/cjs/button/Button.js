"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/button/constants");
require("@douyinfe/semi-foundation/lib/cjs/button/button.css");
var _function = require("@douyinfe/semi-foundation/lib/cjs/utils/function");
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
const btnSizes = _constants.strings.sizes;
const {
  htmlTypes,
  btnTypes
} = _constants.strings;
// TODO: icon configuration
class Button extends _react.PureComponent {
  render() {
    const _a = this.props,
      {
        children,
        block,
        htmlType,
        loading,
        circle,
        className,
        style,
        disabled,
        size,
        theme,
        type,
        colorful,
        prefixCls,
        iconPosition
      } = _a,
      attr = __rest(_a, ["children", "block", "htmlType", "loading", "circle", "className", "style", "disabled", "size", "theme", "type", "colorful", "prefixCls", "iconPosition"]);
    const baseProps = Object.assign(Object.assign({
      disabled
    }, (0, _omit2.default)(attr, ['x-semi-children-alias'])), {
      className: (0, _classnames.default)(prefixCls, {
        [`${prefixCls}-${type}`]: !disabled && type,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-size-large`]: size === 'large',
        [`${prefixCls}-size-small`]: size === 'small',
        // [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-circle`]: circle,
        [`${prefixCls}-${theme}`]: theme,
        [`${prefixCls}-${type}-disabled`]: disabled && type,
        [`${prefixCls}-colorful`]: colorful
      }, className),
      type: htmlType,
      'aria-disabled': disabled
    });
    const xSemiProps = {};
    if (!(className && className.includes('-with-icon'))) {
      xSemiProps['x-semi-prop'] = this.props['x-semi-children-alias'] || 'children';
    }
    return /*#__PURE__*/_react.default.createElement("button", Object.assign({}, baseProps, {
      onClick: this.props.onClick,
      onMouseDown: this.props.onMouseDown,
      style: style
    }), /*#__PURE__*/_react.default.createElement("span", Object.assign({
      className: (0, _classnames.default)(`${prefixCls}-content`, this.props.contentClassName),
      onClick: e => disabled && e.stopPropagation()
    }, xSemiProps), children));
  }
}
exports.default = Button;
Button.defaultProps = {
  disabled: false,
  size: 'default',
  type: 'primary',
  theme: 'light',
  block: false,
  htmlType: 'button',
  onMouseDown: _function.noop,
  onClick: _function.noop,
  onMouseEnter: _function.noop,
  onMouseLeave: _function.noop,
  colorful: false,
  prefixCls: _constants.cssClasses.PREFIX
};
Button.propTypes = {
  children: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  prefixCls: _propTypes.default.string,
  style: _propTypes.default.object,
  size: _propTypes.default.oneOf(btnSizes),
  type: _propTypes.default.oneOf(btnTypes),
  block: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  onMouseDown: _propTypes.default.func,
  circle: _propTypes.default.bool,
  loading: _propTypes.default.bool,
  htmlType: _propTypes.default.oneOf(htmlTypes),
  theme: _propTypes.default.oneOf(_constants.strings.themes),
  className: _propTypes.default.string,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  'aria-label': _propTypes.default.string,
  contentClassName: _propTypes.default.string
};