import React from 'react';
import classnames from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/dropdown/constants';
const prefixCls = cssClasses.PREFIX;
const DropdownDivider = function () {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    style,
    className
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: classnames(`${prefixCls}-divider`, className),
    style: style
  });
};
export default DropdownDivider;