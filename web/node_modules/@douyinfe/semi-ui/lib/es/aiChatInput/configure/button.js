var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { useCallback } from 'react';
import { Button } from '../../index';
import getConfigureItem from './getConfigureItem';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/aiChatInput/constants';
const ConfigureButton = props => {
  const {
      value,
      onChange,
      className,
      onClick
    } = props,
    rest = __rest(props, ["value", "onChange", "className", "onClick"]);
  const onButtonClick = useCallback(() => {
    const newValue = !value;
    onChange(newValue);
    onClick === null || onClick === void 0 ? void 0 : onClick(newValue);
  }, [value, onChange, onClick]);
  return /*#__PURE__*/React.createElement(Button, Object.assign({
    className: cls(`${cssClasses.PREFIX}-footer-configure-button`, {
      [className]: className,
      [`${cssClasses.PREFIX}-footer-configure-button-active`]: value
    }),
    onClick: onButtonClick,
    theme: 'outline',
    type: 'tertiary'
  }, rest));
};
export default getConfigureItem(ConfigureButton);