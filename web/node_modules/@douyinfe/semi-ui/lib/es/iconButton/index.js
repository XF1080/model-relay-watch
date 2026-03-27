import _noop from "lodash/noop";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/button/constants';
import { strings as iconStrings } from '@douyinfe/semi-foundation/lib/es/icons/constants';
import Button from '../button/Button';
import SpinIcon from '../spin/icon';
import { IconAILoading } from '@douyinfe/semi-icons';
import '@douyinfe/semi-foundation/lib/es/button/iconButton.css';
const iconSizes = iconStrings.SIZE;
// TODO: add a buttonGroup component
// TODO: icon configuration
class IconButton extends PureComponent {
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
        IconElem = /*#__PURE__*/React.createElement(IconAILoading, {
          className: `${prefixCls}-content-loading-icon`
        });
      } else {
        IconElem = /*#__PURE__*/React.createElement(SpinIcon, null);
      }
    } else if (/*#__PURE__*/React.isValidElement(icon)) {
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
          IconElem = /*#__PURE__*/React.cloneElement(icon, {
            fill
          });
        } else if (twoColor) {
          let fill;
          if (disabled) {
            fill = new Array(2).fill('var(--semi-color-disabled-text)');
          } else {
            fill = ['var(--semi-button-colorful-fill-primary)', 'var(--semi-button-colorful-fill-secondary)'];
          }
          IconElem = /*#__PURE__*/React.cloneElement(icon, {
            fill
          });
        } else {
          IconElem = icon;
        }
      } else {
        IconElem = icon;
      }
    }
    const btnTextCls = classNames({
      [`${prefixCls}-content-left`]: iconPosition === 'right',
      [`${prefixCls}-content-right`]: iconPosition === 'left'
    });
    const xSemiProp = this.props['x-semi-children-alias'] || 'children';
    const children = originChildren != null ? /*#__PURE__*/React.createElement("span", {
      className: btnTextCls,
      "x-semi-prop": xSemiProp
    }, originChildren) : null;
    if (iconPosition === 'left') {
      finalChildren = /*#__PURE__*/React.createElement(React.Fragment, null, IconElem, children);
    } else {
      finalChildren = /*#__PURE__*/React.createElement(React.Fragment, null, children, IconElem);
    }
    const iconBtnCls = classNames(className, `${prefixCls}-with-icon`, {
      [`${prefixCls}-with-icon-only`]: children == null || children === '',
      [`${prefixCls}-loading`]: loading
    });
    return /*#__PURE__*/React.createElement(Button, Object.assign({}, otherProps, {
      className: iconBtnCls,
      theme: theme,
      style: style
    }), finalChildren);
  }
}
IconButton.defaultProps = {
  iconPosition: strings.DEFAULT_ICON_POSITION,
  prefixCls: cssClasses.PREFIX,
  loading: false,
  noHorizontalPadding: false,
  onMouseEnter: _noop,
  onMouseLeave: _noop
};
IconButton.elementType = "IconButton";
IconButton.propTypes = {
  iconStyle: PropTypes.object,
  style: PropTypes.object,
  loading: PropTypes.bool,
  prefixCls: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
  iconSize: PropTypes.oneOf(iconSizes),
  noHorizontalPadding: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.array]),
  children: PropTypes.node,
  theme: PropTypes.string,
  iconPosition: PropTypes.oneOf(strings.iconPositions),
  className: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};
export default IconButton;