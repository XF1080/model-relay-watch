var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/card/constants';
import cls from 'classnames';
import Space from '../space';
const prefixcls = cssClasses.PREFIX;
class CardGroup extends PureComponent {
  render() {
    const _a = this.props,
      {
        children,
        className,
        spacing,
        style,
        type
      } = _a,
      others = __rest(_a, ["children", "className", "spacing", "style", "type"]);
    const isGrid = type === 'grid';
    const cardGroupCls = cls(`${prefixcls}-group`, className, {
      [`${prefixcls}-group-grid`]: isGrid
    });
    return /*#__PURE__*/React.createElement(Space, Object.assign({
      spacing: isGrid ? 0 : spacing,
      wrap: true,
      className: cardGroupCls,
      style: style
    }, others), children);
  }
}
CardGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  style: PropTypes.object,
  type: PropTypes.oneOf(strings.TYPE)
};
CardGroup.defaultProps = {
  spacing: 16
};
export default CardGroup;