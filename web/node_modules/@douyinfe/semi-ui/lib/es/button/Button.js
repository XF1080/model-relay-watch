import _omit from "lodash/omit";
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
import '@douyinfe/semi-foundation/lib/es/button/button.css';
import { noop } from '@douyinfe/semi-foundation/lib/es/utils/function';
import cls from "classnames";
const btnSizes = strings.sizes;
const {
  htmlTypes,
  btnTypes
} = strings;
// TODO: icon configuration
export default class Button extends PureComponent {
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
    }, _omit(attr, ['x-semi-children-alias'])), {
      className: classNames(prefixCls, {
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
    return /*#__PURE__*/React.createElement("button", Object.assign({}, baseProps, {
      onClick: this.props.onClick,
      onMouseDown: this.props.onMouseDown,
      style: style
    }), /*#__PURE__*/React.createElement("span", Object.assign({
      className: cls(`${prefixCls}-content`, this.props.contentClassName),
      onClick: e => disabled && e.stopPropagation()
    }, xSemiProps), children));
  }
}
Button.defaultProps = {
  disabled: false,
  size: 'default',
  type: 'primary',
  theme: 'light',
  block: false,
  htmlType: 'button',
  onMouseDown: noop,
  onClick: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  colorful: false,
  prefixCls: cssClasses.PREFIX
};
Button.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  prefixCls: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(btnSizes),
  type: PropTypes.oneOf(btnTypes),
  block: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  circle: PropTypes.bool,
  loading: PropTypes.bool,
  htmlType: PropTypes.oneOf(htmlTypes),
  theme: PropTypes.oneOf(strings.themes),
  className: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  'aria-label': PropTypes.string,
  contentClassName: PropTypes.string
};