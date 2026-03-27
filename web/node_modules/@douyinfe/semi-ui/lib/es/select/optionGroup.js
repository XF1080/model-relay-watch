var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/select/constants';
import BaseComponent from '../_base/baseComponent';
const prefixCls = cssClasses.PREFIX_GROUP;
class OptionGroup extends BaseComponent {
  render() {
    const _a = this.props,
      {
        label,
        className,
        style
      } = _a,
      rest = __rest(_a, ["label", "className", "style"]);
    const groupCls = cls(className, {
      [prefixCls]: true
    });
    if (!label && typeof label !== 'number') {
      return null;
    }
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: groupCls,
      style: style
    }, this.getDataAttr(rest)), label);
  }
}
OptionGroup.isSelectOptionGroup = true;
OptionGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  label: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};
export default OptionGroup;