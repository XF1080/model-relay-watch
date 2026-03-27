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
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/timeline/constants';
import getDataAttr from '@douyinfe/semi-foundation/lib/es/utils/getDataAttr';
import '@douyinfe/semi-foundation/lib/es/timeline/timeline.css';
const prefixCls = cssClasses.ITEM;
export default class Item extends PureComponent {
  render() {
    const _a = this.props,
      {
        className,
        color,
        children,
        dot,
        type,
        style,
        time,
        extra,
        onClick
      } = _a,
      rest = __rest(_a, ["className", "color", "children", "dot", "type", "style", "time", "extra", "onClick"]);
    const itemCls = cls(prefixCls, className);
    const dotCls = cls({
      [`${prefixCls}-head`]: true,
      [`${prefixCls}-head-custom`]: dot,
      [`${prefixCls}-head-${type}`]: type
    });
    const dotStyle = color ? {
      style: {
        backgroundColor: color
      }
    } : null;
    return /*#__PURE__*/React.createElement("li", Object.assign({
      className: itemCls,
      style: style,
      onClick: onClick
    }, getDataAttr(rest)), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-tail`,
      "aria-hidden": true
    }), /*#__PURE__*/React.createElement("div", Object.assign({
      className: dotCls,
      "aria-hidden": true
    }, dotStyle), dot), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-content`
    }, children, extra && /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-content-extra`
    }, extra), time && /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-content-time`
    }, time)));
  }
}
Item.propTypes = {
  color: PropTypes.string,
  time: PropTypes.node,
  type: PropTypes.oneOf(strings.ITEM_TYPE),
  dot: PropTypes.node,
  extra: PropTypes.node,
  position: PropTypes.oneOf(strings.ITEM_POS),
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
};
Item.defaultProps = {
  type: 'default',
  time: '',
  onClick: _noop
};