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
import '@douyinfe/semi-foundation/lib/es/timeline/timeline.css';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/timeline/constants';
import getDataAttr from '@douyinfe/semi-foundation/lib/es/utils/getDataAttr';
import ConfigContext from '../configProvider/context';
import Item from './item';
const prefixCls = cssClasses.PREFIX;
class Timeline extends PureComponent {
  constructor() {
    super(...arguments);
    this.getPosCls = (ele, idx) => {
      const {
        mode
      } = this.props;
      if (mode === 'alternate') {
        if (ele.props.position) {
          return `${prefixCls}-item-${ele.props.position}`;
        }
        return idx % 2 === 0 ? `${prefixCls}-item-left` : `${prefixCls}-item-right`;
      }
      if (mode === 'center') {
        if (ele.props.position) {
          return `${prefixCls}-item-${ele.props.position}`;
        }
        return `${prefixCls}-item-left`;
      }
      if (mode === 'left' || mode === 'right') {
        return `${prefixCls}-item-${mode}`;
      }
      if (ele.props.position) {
        return `${prefixCls}-item-${ele.props.position}`;
      }
      return '';
    };
    this.addClassName = items => React.Children.map(items, (ele, idx) => {
      if (/*#__PURE__*/React.isValidElement(ele)) {
        return /*#__PURE__*/React.cloneElement(ele, {
          // @ts-ignore
          className: cls(ele.props.className, this.getPosCls(ele, idx))
        });
      }
      return ele;
    });
  }
  render() {
    const _a = this.props,
      {
        children,
        className,
        style,
        mode,
        dataSource
      } = _a,
      rest = __rest(_a, ["children", "className", "style", "mode", "dataSource"]);
    const classString = cls(prefixCls, className, {
      [`${prefixCls}-${mode}`]: mode
    });
    let childrenList;
    if (dataSource && dataSource.length) {
      const items = dataSource.map((item, index) => /*#__PURE__*/React.createElement(Item, Object.assign({
        key: `timeline-item-${index}`
      }, item), item.content));
      childrenList = this.addClassName(items);
    }
    const items = childrenList || this.addClassName(children);
    return /*#__PURE__*/React.createElement("ul", Object.assign({
      "aria-label": this.props['aria-label'],
      style: style,
      className: classString
    }, getDataAttr(rest)), items);
  }
}
Timeline.contextType = ConfigContext;
Timeline.Item = Item;
Timeline.propTypes = {
  mode: PropTypes.oneOf(strings.MODE),
  className: PropTypes.string,
  style: PropTypes.object,
  dataSource: PropTypes.array
};
Timeline.defaultProps = {
  mode: 'left'
};
export default Timeline;