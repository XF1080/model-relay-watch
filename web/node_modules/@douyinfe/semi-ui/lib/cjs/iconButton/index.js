"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/button/constants");
var _constants2 = require("@douyinfe/semi-foundation/lib/cjs/icons/constants");
var _Button = _interopRequireDefault(require("../button/Button"));
var _icon = _interopRequireDefault(require("../spin/icon"));
var _semiIcons = require("@douyinfe/semi-icons");
require("@douyinfe/semi-foundation/lib/cjs/button/iconButton.css");
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
const iconSizes = _constants2.strings.SIZE;
// TODO: add a buttonGroup component
// TODO: icon configuration
class IconButton extends _react.PureComponent {
  render() {
    const _a = this.props,
      {
        children: originChildren,
        iconPosition,
        iconSize,
        iconStyle,
        style: originStyle,
        icon,
        noHorizontalPadding,
        theme,
        className,
        prefixCls,
        loading
      } = _a,
      otherProps = __rest(_a, ["children", "iconPosition", "iconSize", "iconStyle", "style", "icon", "noHorizontalPadding", "theme", "className", "prefixCls", "loading"]);
    const style = Object.assign({}, originStyle);
    const {
      colorful,
      type,
      disabled
    } = otherProps;
    // TODO: review check
    if (Array.isArray(noHorizontalPadding)) {
      noHorizontalPadding.includes('left') && (style.paddingLeft = 0);
      noHorizontalPadding.includes('right') && (style.paddingRight = 0);
    } else if (noHorizontalPadding === true) {
      style.paddingLeft = 0;
      style.paddingRight = 0;
    } else if (typeof noHorizontalPadding === 'string') {
      noHorizontalPadding === 'left' && (style.paddingLeft = 0);
      noHorizontalPadding === 'right' && (style.paddingRight = 0);
    }
    let finalChildren = null;
    let IconElem = null;
    if (loading && !otherProps.disabled) {
      if (colorful && ['light', 'outline', 'borderless'].includes(theme) || theme === 'solid' && type === 'tertiary') {
        IconElem = /*#__PURE__*/_react.default.createElement(_semiIcons.IconAILoading, {
          className: `${prefixCls}-content-loading-icon`
        });
      } else {
        IconElem = /*#__PURE__*/_react.default.createElement(_icon.default, null);
      }
    } else if (/*#__PURE__*/_react.default.isValidElement(icon)) {
      if (colorful) {
        const multipleColor = theme === 'solid' && type === 'tertiary' || type === 'primary' && ['light', 'borderless'].includes(theme);
        const twoColor = type === 'tertiary' && ['light', 'borderless', 'outline'].includes(theme);
        if (multipleColor) {
          let fill;
          if (disabled) {
            fill = new Array(4).fill('var(--semi-color-disabled-text)');
          } else {
            fill = ['var(--semi-button-colorful-multiple-fill-0)', 'var(--semi-button-colorful-multiple-fill-1)', 'var(--semi-button-colorful-multiple-fill-2)', 'var(--semi-button-colorful-multiple-fill-3)'];
          }
          IconElem = /*#__PURE__*/_react.default.cloneElement(icon, {
            fill
          });
        } else if (twoColor) {
          let fill;
          if (disabled) {
            fill = new Array(2).fill('var(--semi-color-disabled-text)');
          } else {
            fill = ['var(--semi-button-colorful-fill-primary)', 'var(--semi-button-colorful-fill-secondary)'];
          }
          IconElem = /*#__PURE__*/_react.default.cloneElement(icon, {
            fill
          });
        } else {
          IconElem = icon;
        }
      } else {
        IconElem = icon;
      }
    }
    const btnTextCls = (0, _classnames.default)({
      [`${prefixCls}-content-left`]: iconPosition === 'right',
      [`${prefixCls}-content-right`]: iconPosition === 'left'
    });
    const xSemiProp = this.props['x-semi-children-alias'] || 'children';
    const children = originChildren != null ? /*#__PURE__*/_react.default.createElement("span", {
      className: btnTextCls,
      "x-semi-prop": xSemiProp
    }, originChildren) : null;
    if (iconPosition === 'left') {
      finalChildren = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, IconElem, children);
    } else {
      finalChildren = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children, IconElem);
    }
    const iconBtnCls = (0, _classnames.default)(className, `${prefixCls}-with-icon`, {
      [`${prefixCls}-with-icon-only`]: children == null || children === '',
      [`${prefixCls}-loading`]: loading
    });
    return /*#__PURE__*/_react.default.createElement(_Button.default, Object.assign({}, otherProps, {
      className: iconBtnCls,
      theme: theme,
      style: style
    }), finalChildren);
  }
}
IconButton.defaultProps = {
  iconPosition: _constants.strings.DEFAULT_ICON_POSITION,
  prefixCls: _constants.cssClasses.PREFIX,
  loading: false,
  noHorizontalPadding: false,
  onMouseEnter: _noop2.default,
  onMouseLeave: _noop2.default
};
IconButton.elementType = "IconButton";
IconButton.propTypes = {
  iconStyle: _propTypes.default.object,
  style: _propTypes.default.object,
  loading: _propTypes.default.bool,
  prefixCls: _propTypes.default.string,
  icon: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string, _propTypes.default.node]),
  iconSize: _propTypes.default.oneOf(iconSizes),
  noHorizontalPadding: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string, _propTypes.default.array]),
  children: _propTypes.default.node,
  theme: _propTypes.default.string,
  iconPosition: _propTypes.default.oneOf(_constants.strings.iconPositions),
  className: _propTypes.default.string,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func
};
var _default = exports.default = IconButton;