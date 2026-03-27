"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/input/constants");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _label = _interopRequireDefault(require("../form/label"));
var _function = require("@douyinfe/semi-foundation/lib/cjs/utils/function");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const prefixCls = _constants.cssClasses.PREFIX;
const sizeSet = _constants.strings.SIZE;
class inputGroup extends _baseComponent.default {
  renderGroupWithLabel(inner) {
    const _a = this.props,
      {
        size,
        className,
        label,
        labelPosition
      } = _a,
      rest = __rest(_a, ["size", "className", "label", "labelPosition"]);
    const groupWrapperCls = (0, _classnames.default)({
      [`${prefixCls}-group-wrapper`]: true,
      [`${prefixCls}-group-wrapper-with-top-label`]: labelPosition === 'top',
      [`${prefixCls}-group-wrapper-with-left-label`]: labelPosition === 'left'
    });
    const groupCls = (0, _classnames.default)(`${prefixCls}-group`, className, {
      [`${prefixCls}-${size}`]: size !== 'default'
    });
    // const labelCls = cls(label.className, '');
    const defaultName = 'input-group';
    return /*#__PURE__*/_react.default.createElement("div", {
      className: groupWrapperCls
    }, label && label.text ? /*#__PURE__*/_react.default.createElement(_label.default, Object.assign({
      name: defaultName
    }, label)) : null, /*#__PURE__*/_react.default.createElement("span", {
      role: "group",
      "aria-disabled": this.props.disabled,
      id: label && label.name || defaultName,
      className: groupCls,
      style: this.props.style,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur
    }, inner));
  }
  render() {
    const _a = this.props,
      {
        size,
        style,
        className,
        children,
        label,
        onBlur: groupOnBlur,
        onFocus: groupOnFocus,
        disabled: groupDisabled
      } = _a,
      rest = __rest(_a, ["size", "style", "className", "children", "label", "onBlur", "onFocus", "disabled"]);
    const groupCls = (0, _classnames.default)(`${prefixCls}-group`, {
      [`${prefixCls}-${size}`]: size !== 'default'
    }, className);
    let inner;
    if (children) {
      inner = (Array.isArray(children) ? children : [children]).map((item, index) => {
        if (item) {
          const {
            onBlur: itemOnBlur,
            onFocus: itemOnFocus,
            disabled: itemDisabled
          } = item.props;
          const onBlur = (0, _isFunction2.default)(itemOnBlur) && (0, _get2.default)(itemOnBlur, 'name') !== 'noop' ? itemOnBlur : groupOnBlur;
          const onFocus = (0, _isFunction2.default)(itemOnFocus) && (0, _get2.default)(itemOnFocus, 'name') !== 'noop' ? itemOnFocus : groupOnFocus;
          const disabled = typeof itemDisabled === 'boolean' ? itemDisabled : groupDisabled;
          return /*#__PURE__*/_react.default.cloneElement(item, Object.assign(Object.assign({
            key: index
          }, rest), {
            size,
            onBlur,
            onFocus,
            disabled
          }));
        }
        return null;
      });
    }
    if (label && label.text) {
      return this.renderGroupWithLabel(inner);
    }
    return /*#__PURE__*/_react.default.createElement("span", {
      role: "group",
      "aria-label": "Input group",
      "aria-disabled": this.props.disabled,
      className: groupCls,
      style: style,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur
    }, inner);
  }
}
exports.default = inputGroup;
inputGroup.propTypes = {
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  size: _propTypes.default.oneOf(sizeSet),
  style: _propTypes.default.object,
  onBlur: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  label: _propTypes.default.object,
  labelPosition: _propTypes.default.string
};
inputGroup.defaultProps = {
  size: 'default',
  className: '',
  onBlur: _function.noop,
  onFocus: _function.noop
};