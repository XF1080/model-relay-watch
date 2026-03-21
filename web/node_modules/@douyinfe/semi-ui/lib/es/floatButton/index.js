/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/floatButton/constants';
import '@douyinfe/semi-foundation/lib/es/floatButton/floatButton.css';
import BaseComponent from '../_base/baseComponent';
import Badge from '../badge';
import cls from 'classnames';
const prefixCls = cssClasses.PREFIX;
export default class FloatButton extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleClick = e => {
      const {
        href,
        target,
        onClick,
        disabled
      } = this.props;
      if (disabled) {
        return;
      }
      // 如果有 href，执行跳转
      if (href) {
        if (target === '_blank') {
          window.open(href, '_blank');
        } else {
          window.location.href = href;
        }
      }
      // 如果有 onClick 回调，执行它
      if (onClick) {
        onClick(e);
      }
    };
  }
  render() {
    const {
      className,
      style,
      colorful,
      size,
      icon,
      badge,
      shape,
      disabled
    } = this.props;
    const body = /*#__PURE__*/React.createElement("div", {
      className: cls(`${prefixCls}-body`, {
        [`${prefixCls}-${shape}`]: shape,
        [`${prefixCls}-colorful`]: colorful,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-${size}`]: size
      })
    }, icon);
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      React.createElement("div", {
        style: style,
        className: cls(prefixCls, className, {
          [`${prefixCls}-${size}`]: size,
          [`${prefixCls}-${shape}`]: shape
        }),
        onClick: this.handleClick
      }, badge ? /*#__PURE__*/React.createElement(Badge, Object.assign({}, badge), body) : body)
    );
  }
}
FloatButton.defaultProps = {
  shape: 'round',
  colorful: false,
  size: 'default'
};