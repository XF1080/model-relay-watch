import React from 'react';
import { cssClassesGroup } from '@douyinfe/semi-foundation/lib/es/floatButton/constants';
import '@douyinfe/semi-foundation/lib/es/floatButton/floatButton.css';
import BaseComponent from '../_base/baseComponent';
import Badge from '../badge';
import cls from 'classnames';
const prefixCls = cssClassesGroup.PREFIX;
export default class FloatButtonGroup extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleClick = e => {
      var _a, _b;
      const value = e.target.dataset.value;
      (_b = (_a = this.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, value, e);
    };
  }
  render() {
    const {
      className,
      style,
      disabled,
      items
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: cls(prefixCls, className, {
        [`${prefixCls}-disabled`]: disabled
      }),
      style: style,
      onClick: this.handleClick
    }, items.map((item, index) => {
      if (item.badge) {
        return /*#__PURE__*/React.createElement(Badge, Object.assign({
          key: index
        }, item.badge), /*#__PURE__*/React.createElement("div", {
          className: cls(`${prefixCls}-item`),
          "data-value": item.value
        }, item.icon, item.content));
      }
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: cls(`${prefixCls}-item`),
        "data-value": item.value
      }, item.icon, item.content);
    }));
  }
}
FloatButtonGroup.defaultProps = {
  shape: 'round',
  type: 'default',
  size: 'medium'
};