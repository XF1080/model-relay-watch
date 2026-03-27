import _isNumber from "lodash/isNumber";
import _isArray from "lodash/isArray";
import _isString from "lodash/isString";
import React, { PureComponent } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { strings, cssClasses } from '@douyinfe/semi-foundation/lib/es/space/constants';
import '@douyinfe/semi-foundation/lib/es/space/space.css';
import { flatten } from './utils';
import getDataAttr from '@douyinfe/semi-foundation/lib/es/utils/getDataAttr';
const prefixCls = cssClasses.PREFIX;
class Space extends PureComponent {
  render() {
    const {
      children = null,
      style,
      className,
      spacing,
      wrap,
      align,
      vertical
    } = this.props;
    const isWrap = wrap && vertical ? false : wrap;
    const realStyle = Object.assign({}, style);
    let spacingHorizontalType = '';
    let spacingVerticalType = '';
    if (_isString(spacing)) {
      spacingHorizontalType = spacing;
      spacingVerticalType = spacing;
    } else if (_isNumber(spacing)) {
      realStyle.rowGap = spacing;
      realStyle.columnGap = spacing;
    } else if (_isArray(spacing)) {
      if (_isString(spacing[0])) {
        spacingHorizontalType = spacing[0];
      } else if (_isNumber(spacing[0])) {
        realStyle.columnGap = `${spacing[0]}px`;
      }
      if (_isString(spacing[1])) {
        spacingVerticalType = spacing[1];
      } else if (_isNumber(spacing[1])) {
        realStyle.rowGap = `${spacing[1]}px`;
      }
    }
    const classNames = cls(prefixCls, className, {
      [`${prefixCls}-align-${align}`]: align,
      [`${prefixCls}-vertical`]: vertical,
      [`${prefixCls}-horizontal`]: !vertical,
      [`${prefixCls}-wrap`]: isWrap,
      [`${prefixCls}-tight-horizontal`]: spacingHorizontalType === strings.SPACING_TIGHT,
      [`${prefixCls}-tight-vertical`]: spacingVerticalType === strings.SPACING_TIGHT,
      [`${prefixCls}-medium-horizontal`]: spacingHorizontalType === strings.SPACING_MEDIUM,
      [`${prefixCls}-medium-vertical`]: spacingVerticalType === strings.SPACING_MEDIUM,
      [`${prefixCls}-loose-horizontal`]: spacingHorizontalType === strings.SPACING_LOOSE,
      [`${prefixCls}-loose-vertical`]: spacingVerticalType === strings.SPACING_LOOSE
    });
    const childrenNodes = flatten(children);
    const dataAttributes = getDataAttr(this.props);
    return /*#__PURE__*/React.createElement("div", Object.assign({}, dataAttributes, {
      className: classNames,
      style: realStyle,
      "x-semi-prop": "children"
    }), childrenNodes);
  }
}
Space.propTypes = {
  wrap: PropTypes.bool,
  align: PropTypes.oneOf(strings.ALIGN_SET),
  vertical: PropTypes.bool,
  spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};
Space.defaultProps = {
  vertical: false,
  wrap: false,
  spacing: 'tight',
  align: 'center'
};
export default Space;