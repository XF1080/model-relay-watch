"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));
var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/checkbox/constants");
var _checkboxFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/checkbox/checkboxFoundation"));
var _checkboxInner = _interopRequireDefault(require("./checkboxInner"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
require("@douyinfe/semi-foundation/lib/cjs/checkbox/checkbox.css");
var _context = require("./context");
var _uuid = require("@douyinfe/semi-foundation/lib/cjs/utils/uuid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Checkbox extends _baseComponent.default {
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setNativeControlChecked: checked => {
        this.setState({
          checked
        });
      },
      notifyChange: cbContent => {
        const {
          onChange
        } = this.props;
        onChange && onChange(cbContent);
      },
      generateEvent: (checked, e) => {
        const {
          props
        } = this;
        const cbValue = {
          target: Object.assign(Object.assign({}, props), {
            checked
          }),
          stopPropagation: () => {
            e.stopPropagation();
          },
          preventDefault: () => {
            e.preventDefault();
          },
          nativeEvent: {
            stopImmediatePropagation: () => {
              if (e.nativeEvent && typeof e.nativeEvent.stopImmediatePropagation === 'function') {
                e.nativeEvent.stopImmediatePropagation();
              }
            }
          }
        };
        return cbValue;
      },
      getIsInGroup: () => this.isInGroup(),
      getGroupValue: () => this.context && this.context.checkboxGroup.value || [],
      notifyGroupChange: cbContent => {
        this.context.checkboxGroup.onChange(cbContent);
      },
      getGroupDisabled: () => this.context && this.context.checkboxGroup.disabled,
      setAddonId: () => {
        this.setState({
          addonId: (0, _uuid.getUuidShort)({
            prefix: 'addon'
          })
        });
      },
      setExtraId: () => {
        this.setState({
          extraId: (0, _uuid.getUuidShort)({
            prefix: 'extra'
          })
        });
      },
      setFocusVisible: focusVisible => {
        this.setState({
          focusVisible
        });
      },
      focusCheckboxEntity: () => {
        this.focus();
      }
    });
  }
  constructor(props) {
    super(props);
    this.handleChange = e => this.foundation.handleChange(e);
    this.handleEnterPress = e => this.foundation.handleEnterPress(e);
    this.handleFocusVisible = event => {
      this.foundation.handleFocusVisible(event);
    };
    this.handleBlur = event => {
      this.foundation.handleBlur();
    };
    const checked = false;
    this.state = {
      checked: props.checked || props.defaultChecked || checked,
      addonId: props.addonId,
      extraId: props.extraId,
      focusVisible: false
    };
    this.checkboxEntity = null;
    this.foundation = new _checkboxFoundation.default(this.adapter);
  }
  componentDidUpdate(prevProps) {
    if (this.props.checked !== prevProps.checked) {
      if ((0, _isUndefined2.default)(this.props.checked)) {
        this.foundation.setChecked(false);
      } else if ((0, _isBoolean2.default)(this.props.checked)) {
        this.foundation.setChecked(this.props.checked);
      }
    }
  }
  isInGroup() {
    // Why do we need to determine whether there is a value in props?
    // If there is no value in the props of the checkbox in the context of the checkboxGroup, 
    // it will be considered not to belong to the checkboxGroup。
    return Boolean(this.context && this.context.checkboxGroup && 'value' in this.props);
  }
  focus() {
    this.checkboxEntity && this.checkboxEntity.focus();
  }
  blur() {
    this.checkboxEntity && this.checkboxEntity.blur();
  }
  render() {
    const {
      disabled,
      style,
      prefixCls,
      className,
      indeterminate,
      children,
      onMouseEnter,
      onMouseLeave,
      extra,
      value,
      role,
      tabIndex,
      id,
      type
    } = this.props;
    const {
      checked,
      addonId,
      extraId,
      focusVisible
    } = this.state;
    const props = {
      checked,
      disabled
    };
    const inGroup = this.isInGroup();
    if (inGroup) {
      if (this.context.checkboxGroup.value) {
        const realChecked = (this.context.checkboxGroup.value || []).includes(value);
        props.checked = realChecked;
      }
      if (this.context.checkboxGroup.disabled) {
        props.disabled = this.context.checkboxGroup.disabled || this.props.disabled;
      }
      const {
        isCardType,
        isPureCardType
      } = this.context.checkboxGroup;
      props.isCardType = isCardType;
      props.isPureCardType = isPureCardType;
      props['name'] = this.context.checkboxGroup.name;
    } else {
      props.isPureCardType = type === _constants.strings.TYPE_PURECARD;
      props.isCardType = type === _constants.strings.TYPE_CARD || props.isPureCardType;
    }
    const prefix = prefixCls || _constants.checkboxClasses.PREFIX;
    const focusOuter = props.isCardType || props.isPureCardType;
    const wrapper = (0, _classnames.default)(prefix, {
      [`${prefix}-disabled`]: props.disabled,
      [`${prefix}-indeterminate`]: indeterminate,
      [`${prefix}-checked`]: props.checked,
      [`${prefix}-unChecked`]: !props.checked,
      [`${prefix}-cardType`]: props.isCardType,
      [`${prefix}-cardType_disabled`]: props.disabled && props.isCardType,
      [`${prefix}-cardType_enable`]: !(props.disabled && props.isCardType),
      [`${prefix}-cardType_checked`]: props.isCardType && props.checked && !props.disabled,
      [`${prefix}-cardType_checked_disabled`]: props.isCardType && props.checked && props.disabled,
      [className]: Boolean(className),
      [`${prefix}-focus`]: focusVisible && focusOuter
    });
    const extraCls = (0, _classnames.default)(`${prefix}-extra`, {
      [`${prefix}-cardType_extra_noChildren`]: props.isCardType && !children
    });
    const name = inGroup && this.context.checkboxGroup.name;
    const xSemiPropChildren = this.props['x-semi-children-alias'] || 'children';
    const renderContent = () => {
      if (!children && !extra) {
        return null;
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefix}-content`
      }, children ? (/*#__PURE__*/_react.default.createElement("span", {
        id: addonId,
        className: `${prefix}-addon`,
        "x-semi-prop": xSemiPropChildren
      }, children)) : null, extra ? (/*#__PURE__*/_react.default.createElement("div", {
        id: extraId,
        className: extraCls,
        "x-semi-prop": "extra"
      }, extra)) : null);
    };
    return (
      /*#__PURE__*/
      // label is better than span, however span is here which is to solve gitlab issue #364
      _react.default.createElement("span", Object.assign({
        role: role,
        tabIndex: tabIndex,
        style: style,
        className: wrapper,
        id: id,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        onClick: this.handleChange,
        onKeyPress: this.handleEnterPress,
        "aria-labelledby": this.props['aria-labelledby']
      }, this.getDataAttr(this.props)), /*#__PURE__*/_react.default.createElement(_checkboxInner.default, Object.assign({}, this.props, props, {
        addonId: children && addonId,
        extraId: extra && extraId,
        isPureCardType: props.isPureCardType,
        ref: ref => {
          this.checkboxEntity = ref;
        },
        focusInner: focusVisible && !focusOuter,
        onInputFocus: this.handleFocusVisible,
        onInputBlur: this.handleBlur
      })), renderContent())
    );
  }
}
Checkbox.contextType = _context.Context;
Checkbox.propTypes = {
  'aria-describedby': _propTypes.default.string,
  'aria-errormessage': _propTypes.default.string,
  'aria-invalid': _propTypes.default.bool,
  'aria-labelledby': _propTypes.default.string,
  'aria-required': _propTypes.default.bool,
  // Specifies whether it is currently selected
  checked: _propTypes.default.bool,
  // Initial check
  defaultChecked: _propTypes.default.bool,
  // Failure state
  disabled: _propTypes.default.bool,
  // Set indeterminate state, only responsible for style control
  indeterminate: _propTypes.default.bool,
  // Callback function when changing
  onChange: _propTypes.default.func,
  value: _propTypes.default.any,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  extra: _propTypes.default.node,
  index: _propTypes.default.number,
  'aria-label': _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  preventScroll: _propTypes.default.bool,
  type: _propTypes.default.string
};
Checkbox.defaultProps = {
  defaultChecked: false,
  indeterminate: false,
  onChange: _noop2.default,
  onMouseEnter: _noop2.default,
  onMouseLeave: _noop2.default,
  type: 'default'
};
Checkbox.elementType = 'Checkbox';
var _default = exports.default = Checkbox;