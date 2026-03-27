"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/**
 * `Trigger` is a HOC that will cover the inner of components which have popups
 */
class Trigger extends _react.default.PureComponent {
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
  triggerRender: _propTypes.default.func.isRequired,
  /**
   * e.g. "AutoComplete", "DatePicker", ...
   */
  componentName: _propTypes.default.string,
  componentProps: _propTypes.default.object,
  value: _propTypes.default.any,
  inputValue: _propTypes.default.string,
  placeholder: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  className: _propTypes.default.string,
  style: _propTypes.default.object
};
var _default = exports.default = Trigger;