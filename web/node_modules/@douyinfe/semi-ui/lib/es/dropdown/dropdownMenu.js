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
import classnames from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/dropdown/constants';
import Foundation from '@douyinfe/semi-foundation/lib/es/dropdown/menuFoundation';
import DropdownContext from './context';
import BaseComponent from '../_base/baseComponent';
const prefixCls = cssClasses.PREFIX;
class DropdownMenu extends BaseComponent {
  constructor(props) {
    super(props);
    this.foundation = new Foundation(this.adapter);
  }
  get adapter() {
    return Object.assign({}, super.adapter);
  }
  render() {
    const _a = this.props,
      {
        children,
        className,
        style
      } = _a,
      rest = __rest(_a, ["children", "className", "style"]);
    return /*#__PURE__*/React.createElement("ul", Object.assign({
      role: "menu",
      "aria-orientation": "vertical"
    }, rest, {
      className: classnames(`${prefixCls}-menu`, className),
      style: style,
      onKeyDown: e => this.foundation.onMenuKeydown(e)
    }), children);
  }
}
DropdownMenu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};
DropdownMenu.contextType = DropdownContext;
export default DropdownMenu;