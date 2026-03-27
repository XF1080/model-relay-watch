import _get from "lodash/get";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { isValidElement, cloneElement } from 'react';
import BaseComponent from '../_base/baseComponent';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/button/constants';
import '@douyinfe/semi-foundation/lib/es/button/button.css';
const prefixCls = cssClasses.PREFIX;
const btnSizes = strings.sizes;
export default class ButtonGroup extends BaseComponent {
  getInnerWithLine(inner) {
    const innerWithLine = [];
    if (inner.length > 1) {
      inner.slice(0, -1).forEach((item, index) => {
        const isButtonType = _get(item, 'type.elementType') === 'Button';
        const buttonProps = _get(item, 'props');
        const {
          type,
          theme,
          disabled
        } = buttonProps !== null && buttonProps !== void 0 ? buttonProps : {};
        if (isButtonType && theme !== 'outline') {
          const lineCls = classNames(`${prefixCls}-group-line`, `${prefixCls}-group-line-${theme !== null && theme !== void 0 ? theme : 'light'}`, `${prefixCls}-group-line-${type !== null && type !== void 0 ? type : 'primary'}`, {
            [`${prefixCls}-group-line-disabled`]: disabled
          });
          innerWithLine.push(item, /*#__PURE__*/React.createElement("span", {
            className: lineCls,
            key: `line-${index}`
          }));
        } else {
          innerWithLine.push(item);
        }
      });
      innerWithLine.push(inner.slice(-1));
      return innerWithLine;
    } else {
      return inner;
    }
  }
  render() {
    const _a = this.props,
      {
        children,
        disabled,
        size,
        type,
        className,
        style,
        'aria-label': ariaLabel
      } = _a,
      rest = __rest(_a, ["children", "disabled", "size", "type", "className", "style", 'aria-label']);
    let inner;
    let innerWithLine = [];
    const cls = classNames(`${prefixCls}-group`, className);
    if (children) {
      inner = (Array.isArray(children) ? children : [children]).map((itm, index) => {
        var _a;
        return /*#__PURE__*/isValidElement(itm) ? /*#__PURE__*/cloneElement(itm, Object.assign(Object.assign(Object.assign({
          disabled,
          size,
          type
        }, itm.props), rest), {
          key: (_a = itm.key) !== null && _a !== void 0 ? _a : index
        })) : itm;
      });
      innerWithLine = this.getInnerWithLine(inner);
    }
    return /*#__PURE__*/React.createElement("div", {
      className: cls,
      style: style,
      role: "group",
      "aria-label": ariaLabel
    }, innerWithLine);
  }
}
ButtonGroup.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.oneOf(btnSizes),
  theme: PropTypes.oneOf(strings.themes),
  'aria-label': PropTypes.string
};
ButtonGroup.defaultProps = {
  // There are default values ​​for type and theme in Button. 
  // In order to allow users to individually customize the type and theme of the Button through the parameters of the Button in the ButtonGroup,
  // the default value of type and theme is not given in the ButtonGroup。
  size: 'default'
};