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
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/typography/constants';
import '@douyinfe/semi-foundation/lib/es/typography/typography.css';
const prefixCls = cssClasses.PREFIX;
class Typography extends PureComponent {
  render() {
    const _a = this.props,
      {
        component,
        className,
        children,
        forwardRef
      } = _a,
      rest = __rest(_a, ["component", "className", "children", "forwardRef"]);
    const Component = component;
    const classNames = cls(prefixCls, className);
    return /*#__PURE__*/React.createElement(Component, Object.assign({
      className: classNames,
      ref: forwardRef
    }, _omit(rest, 'tooltipRef')), children);
  }
}
Typography.defaultProps = {
  component: 'article',
  style: {},
  className: ''
};
Typography.propTypes = {
  component: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string
};
export default Typography;