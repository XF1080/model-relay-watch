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
/**
 * `Trigger` is a HOC that will cover the inner of components which have popups
 */
class Trigger extends React.PureComponent {
  render() {
    const _a = this.props,
      {
        triggerRender,
        componentName
      } = _a,
      rest = __rest(_a, ["triggerRender", "componentName"]);
    return triggerRender(Object.assign({}, rest));
  }
}
Trigger.propTypes = {
  /**
   * ({ value?: any, className?: string, style?: React.CSSProperties, ... }) => React.ReactNode
   */
  triggerRender: PropTypes.func.isRequired,
  /**
   * e.g. "AutoComplete", "DatePicker", ...
   */
  componentName: PropTypes.string,
  componentProps: PropTypes.object,
  value: PropTypes.any,
  inputValue: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  className: PropTypes.string,
  style: PropTypes.object
};
export default Trigger;