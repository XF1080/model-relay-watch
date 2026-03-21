"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/checkbox/constants");
var _context = require("./context");
var _semiIcons = require("@douyinfe/semi-icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CheckboxInner extends _react.PureComponent {
  blur() {
    this.inputEntity.blur();
  }
  focus() {
    const {
      preventScroll
    } = this.props;
    this.inputEntity.focus({
      preventScroll
    });
  }
  render() {
    const {
      indeterminate,
      checked,
      disabled,
      prefixCls,
      name,
      isPureCardType,
      addonId,
      extraId,
      focusInner,
      onInputFocus,
      onInputBlur
    } = this.props;
    const prefix = prefixCls || _constants.checkboxClasses.PREFIX;
    const wrapper = (0, _classnames.default)({
      [`${prefix}-inner`]: true,
      [`${prefix}-inner-checked`]: Boolean(checked),
      [`${prefix}-inner-pureCardType`]: isPureCardType
    }, _constants.checkboxClasses.WRAPPER);
    const inner = (0, _classnames.default)({
      [`${prefix}-inner-display`]: true,
      [`${prefix}-focus`]: focusInner,
      [`${prefix}-focus-border`]: focusInner && !checked
    });
    const icon = checked ? (/*#__PURE__*/_react.default.createElement(_semiIcons.IconCheckboxTick, null)) : indeterminate ? (/*#__PURE__*/_react.default.createElement(_semiIcons.IconCheckboxIndeterminate, null)) : null;
    const inputProps = {
      type: "checkbox",
      'aria-label': this.props['aria-label'],
      'aria-disabled': disabled,
      'aria-checked': checked,
      'aria-labelledby': addonId,
      'aria-describedby': extraId || this.props['aria-describedby'],
      'aria-invalid': this.props['aria-invalid'],
      'aria-errormessage': this.props['aria-errormessage'],
      'aria-required': this.props['aria-required'],
      className: _constants.checkboxClasses.INPUT,
      onChange: _noop2.default,
      checked: checked,
      disabled: disabled,
      onFocus: onInputFocus,
      onBlur: onInputBlur
    };
    name && (inputProps['name'] = name);
    return /*#__PURE__*/_react.default.createElement("span", {
      className: wrapper
    }, /*#__PURE__*/_react.default.createElement("input", Object.assign({}, inputProps, {
      ref: ref => {
        this.inputEntity = ref;
      }
    })), /*#__PURE__*/_react.default.createElement("span", {
      className: inner
    }, icon));
  }
}
CheckboxInner.contextType = _context.Context;
CheckboxInner.propTypes = {
  'aria-describedby': _propTypes.default.string,
  'aria-errormessage': _propTypes.default.string,
  'aria-invalid': _propTypes.default.bool,
  'aria-labelledby': _propTypes.default.string,
  'aria-required': _propTypes.default.bool,
  checked: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  children: _propTypes.default.node,
  grouped: _propTypes.default.bool,
  value: _propTypes.default.any,
  isPureCardType: _propTypes.default.bool,
  addonId: _propTypes.default.string,
  extraId: _propTypes.default.string,
  focusInner: _propTypes.default.bool,
  onInputFocus: _propTypes.default.func,
  onInputBlur: _propTypes.default.func,
  preventScroll: _propTypes.default.bool
};
CheckboxInner.defaultProps = {
  onChange: _noop2.default
};
var _default = exports.default = CheckboxInner;