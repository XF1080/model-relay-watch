import React from 'react';
import Button from '../button';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/sidebar/constants';
import cls from 'classnames';
const prefixCls = cssClasses.OPTIONS;
const Option = /*#__PURE__*/React.memo(props => {
  const {
    renderOptionItem,
    options,
    onChange,
    activeKey
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: prefixCls
  }, options === null || options === void 0 ? void 0 : options.map(option => {
    const {
      icon,
      name,
      key
    } = option;
    if (typeof renderOptionItem === 'function') {
      return renderOptionItem(option, onChange);
    }
    return /*#__PURE__*/React.createElement(Button, {
      className: cls(`${prefixCls}-button`, {
        [`${prefixCls}-normal`]: activeKey !== key
      }),
      key: key,
      icon: icon,
      onClick: e => onChange === null || onChange === void 0 ? void 0 : onChange(e, option.key)
    }, name);
  }));
});
export default Option;