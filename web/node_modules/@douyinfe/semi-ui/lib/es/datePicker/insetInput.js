import _get from "lodash/get";
import React from 'react';
import Input from '../input';
export function InsetDateInput(props) {
  const {
    insetInputValue,
    valuePath,
    onFocus,
    onChange,
    placeholder,
    forwardRef
  } = props;
  const value = _get(insetInputValue, valuePath);
  return /*#__PURE__*/React.createElement(Input, {
    value: value,
    onChange: (value, event) => {
      onChange({
        value,
        event,
        insetInputValue,
        valuePath
      });
    },
    onFocus: onFocus,
    placeholder: placeholder,
    ref: forwardRef
  });
}
export function InsetTimeInput(props) {
  const {
    insetInputValue,
    valuePath,
    type,
    onFocus,
    onChange,
    placeholder,
    disabled
  } = props;
  const _isTimeType = type.includes('Time');
  if (!_isTimeType) {
    return null;
  }
  const value = _get(insetInputValue, valuePath);
  return /*#__PURE__*/React.createElement(Input, {
    value: value,
    onChange: (value, event) => {
      onChange({
        value,
        event,
        insetInputValue,
        valuePath
      });
    },
    onFocus: onFocus,
    placeholder: placeholder,
    disabled: disabled
  });
}