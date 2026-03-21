import _get from "lodash/get";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { useCallback, useEffect } from 'react';
import { Context } from './context';
import cls from 'classnames';
function getConfigureItem(Component) {
  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const ConfigureItem = props => {
    const {
        field,
        onChange: onOriginChange,
        className
      } = props,
      rest = __rest(props, ["field", "onChange", "className"]);
    const {
      valueKey = 'value',
      onKeyChangeFnName = 'onChange',
      valuePath,
      className: optsCls,
      defaultProps = {}
    } = opts;
    const {
      value = {},
      onChange,
      onRemove
    } = React.useContext(Context);
    const onItemChange = useCallback(value => {
      const valueResult = valuePath ? _get(value, valuePath) : value;
      onChange({
        [field]: valueResult
      });
      onOriginChange === null || onOriginChange === void 0 ? void 0 : onOriginChange(valueResult);
    }, [field, onChange, onOriginChange, valuePath]);
    // 用于处理初始值的注册
    // Registration for handling initial values
    useEffect(() => {
      const {
        initValue
      } = props;
      initValue !== undefined && onChange({
        [field]: props.initValue
      }, true);
      return () => {
        onRemove(field);
      };
    }, []);
    const valueProps = {
      [valueKey]: value[field],
      [onKeyChangeFnName]: onItemChange
    };
    return /*#__PURE__*/React.createElement(Component, Object.assign({
      className: cls({
        [className]: className,
        [optsCls]: optsCls
      })
    }, defaultProps, rest, valueProps));
  };
  return ConfigureItem;
}
export default getConfigureItem;