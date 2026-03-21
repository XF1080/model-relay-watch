import _noop from "lodash/noop";
import _isString from "lodash/isString";
import _isNumber from "lodash/isNumber";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { PureComponent } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import ConfigContext from '../configProvider/context';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/badge/constants';
import '@douyinfe/semi-foundation/lib/es/badge/badge.css';
const prefixCls = cssClasses.PREFIX;
export default class Badge extends PureComponent {
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
    const custom = count && !(_isNumber(count) || _isString(count));
    const showBadge = count !== null && typeof count !== 'undefined';
    const wrapper = cls(countClassName, {
      [`${prefixCls}-${type}`]: !custom,
      [`${prefixCls}-${theme}`]: !custom,
      [`${prefixCls}-${position}`]: Boolean(position) && Boolean(children),
      [`${prefixCls}-block`]: !children,
      [`${prefixCls}-dot`]: dot,
      [`${prefixCls}-count`]: !dot && !custom && showBadge,
      [`${prefixCls}-custom`]: custom
    });
    let content;
    if (_isNumber(count)) {
      content = overflowCount && overflowCount < count ? `${overflowCount}+` : `${count}`;
    } else {
      content = count;
    }
    return /*#__PURE__*/React.createElement("span", Object.assign({
      className: cls(prefixCls, className)
    }, rest), children, /*#__PURE__*/React.createElement("span", {
      className: wrapper,
      style: style || countStyle,
      "x-semi-prop": "count"
    }, dot ? null : content));
  }
}
Badge.contextType = ConfigContext;
Badge.propTypes = {
  count: PropTypes.node,
  dot: PropTypes.bool,
  type: PropTypes.oneOf(strings.TYPE_SET),
  theme: PropTypes.oneOf(strings.THEME_SET),
  position: PropTypes.oneOf(strings.POS_SET),
  overflowCount: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  countClassName: PropTypes.string,
  countStyle: PropTypes.object
};
Badge.defaultProps = {
  dot: false,
  type: 'primary',
  theme: 'solid',
  className: '',
  onClick: () => _noop,
  onMouseEnter: () => _noop,
  onMouseLeave: () => _noop
};