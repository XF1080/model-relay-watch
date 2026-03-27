"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));
var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _radioFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/radio/radioFoundation"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/radio/constants");
var _uuid = require("@douyinfe/semi-foundation/lib/cjs/utils/uuid");
require("@douyinfe/semi-foundation/lib/cjs/radio/radio.css");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _radioInner = _interopRequireDefault(require("./radioInner"));
var _context = _interopRequireDefault(require("./context"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
class Radio extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.onChange = e => {
      const {
        onChange
      } = this.props;
      if (this.isInGroup()) {
        const {
          radioGroup
        } = this.context;
        radioGroup.onChange && radioGroup.onChange(e);
      }
      !('checked' in this.props) && this.foundation.setChecked(e.target.checked);
      onChange && onChange(e);
    };
    this.handleMouseEnter = e => {
      this.props.onMouseEnter(e);
      this.foundation.setHover(true);
    };
    this.handleMouseLeave = e => {
      this.props.onMouseLeave(e);
      this.foundation.setHover(false);
    };
    this.handleFocusVisible = event => {
      this.foundation.handleFocusVisible(event);
    };
    this.handleBlur = event => {
      this.foundation.handleBlur();
    };
    this.state = {
      hover: false,
      addonId: props.addonId,
      extraId: props.extraId,
      checked: props.checked || props.defaultChecked || false
    };
    this.foundation = new _radioFoundation.default(this.adapter);
    this.radioEntity = null;
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
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setHover: hover => {
        this.setState({
          hover
        });
      },
      setAddonId: () => {
        this.setState({
          addonId: (0, _uuid.getUuidShort)({
            prefix: 'addon'
          })
        });
      },
      setChecked: checked => {
        this.setState({
          checked
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
      }
    });
  }
  isInGroup() {
    // eslint-disable-next-line react/destructuring-assignment
    return this.context && this.context.radioGroup;
  }
  focus() {
    this.radioEntity.focus();
  }
  blur() {
    this.radioEntity.blur();
  }
  render() {
    const _a = this.props,
      {
        addonClassName,
        addonStyle,
        disabled,
        style,
        className,
        prefixCls,
        displayMode,
        children,
        extra,
        mode,
        type,
        value: propValue,
        name
      } = _a,
      rest = __rest(_a, ["addonClassName", "addonStyle", "disabled", "style", "className", "prefixCls", "displayMode", "children", "extra", "mode", "type", "value", "name"]);
    let realChecked, isDisabled, realMode, isButtonRadioGroup, isCardRadioGroup, isPureCardRadioGroup, isButtonRadioComponent, buttonSize, realPrefixCls;
    const {
      hover: isHover,
      addonId,
      extraId,
      focusVisible,
      checked
    } = this.state;
    const props = {
      checked,
      disabled
    };
    if (this.isInGroup()) {
      realChecked = this.context.radioGroup.value === propValue;
      isDisabled = disabled || this.context.radioGroup.disabled;
      realMode = this.context.mode;
      isButtonRadioGroup = this.context.radioGroup.isButtonRadio;
      isCardRadioGroup = this.context.radioGroup.isCardRadio;
      isPureCardRadioGroup = this.context.radioGroup.isPureCardRadio;
      buttonSize = this.context.radioGroup.buttonSize;
      realPrefixCls = prefixCls || this.context.radioGroup.prefixCls;
      props.checked = realChecked;
      props.disabled = isDisabled;
    } else {
      realChecked = checked;
      isDisabled = disabled;
      realMode = mode;
      isButtonRadioComponent = type === 'button';
      realPrefixCls = prefixCls;
      isButtonRadioGroup = type === _constants.strings.TYPE_BUTTON;
      isPureCardRadioGroup = type === _constants.strings.TYPE_PURECARD;
      isCardRadioGroup = type === _constants.strings.TYPE_CARD || isPureCardRadioGroup;
    }
    const isButtonRadio = typeof isButtonRadioGroup === 'undefined' ? isButtonRadioComponent : isButtonRadioGroup;
    const prefix = realPrefixCls || _constants.radioClasses.PREFIX;
    const focusOuter = isCardRadioGroup || isPureCardRadioGroup || isButtonRadio;
    const wrapper = (0, _classnames.default)(prefix, {
      [`${prefix}-disabled`]: isDisabled,
      [`${prefix}-checked`]: realChecked,
      [`${prefix}-${displayMode}`]: Boolean(displayMode),
      [`${prefix}-buttonRadioComponent`]: isButtonRadioComponent,
      [`${prefix}-buttonRadioGroup`]: isButtonRadioGroup,
      [`${prefix}-buttonRadioGroup-${buttonSize}`]: isButtonRadioGroup && buttonSize,
      [`${prefix}-cardRadioGroup`]: isCardRadioGroup,
      [`${prefix}-cardRadioGroup_disabled`]: isDisabled && isCardRadioGroup,
      [`${prefix}-cardRadioGroup_checked`]: isCardRadioGroup && realChecked && !isDisabled,
      [`${prefix}-cardRadioGroup_checked_disabled`]: isCardRadioGroup && realChecked && isDisabled,
      [`${prefix}-cardRadioGroup_hover`]: isCardRadioGroup && !realChecked && isHover && !isDisabled,
      [className]: Boolean(className),
      [`${prefix}-focus`]: focusVisible && (isCardRadioGroup || isPureCardRadioGroup)
    });
    const groupName = this.isInGroup() && this.context.radioGroup.name;
    const addonCls = (0, _classnames.default)({
      [`${prefix}-addon`]: !isButtonRadio,
      [`${prefix}-addon-buttonRadio`]: isButtonRadio,
      [`${prefix}-addon-buttonRadio-checked`]: isButtonRadio && realChecked,
      [`${prefix}-addon-buttonRadio-disabled`]: isButtonRadio && isDisabled,
      [`${prefix}-addon-buttonRadio-hover`]: isButtonRadio && !realChecked && !isDisabled && isHover,
      [`${prefix}-addon-buttonRadio-${buttonSize}`]: isButtonRadio && buttonSize,
      [`${prefix}-focus`]: focusVisible && isButtonRadio
    }, addonClassName);
    const renderContent = () => {
      if (!children && !extra) {
        return null;
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)([`${prefix}-content`, {
          [`${prefix}-isCardRadioGroup_content`]: isCardRadioGroup
        }])
      }, children ? (/*#__PURE__*/_react.default.createElement("span", {
        className: addonCls,
        style: addonStyle,
        id: addonId,
        "x-semi-prop": "children"
      }, children)) : null, extra && !isButtonRadio ? (/*#__PURE__*/_react.default.createElement("div", {
        className: `${prefix}-extra`,
        id: extraId,
        "x-semi-prop": "extra"
      }, extra)) : null);
    };
    return /*#__PURE__*/_react.default.createElement("label", Object.assign({
      style: style,
      className: wrapper,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    }, this.getDataAttr(rest)), /*#__PURE__*/_react.default.createElement(_radioInner.default, Object.assign({}, this.props, props, {
      mode: realMode,
      name: name !== null && name !== void 0 ? name : groupName,
      isButtonRadio: isButtonRadio,
      isPureCardRadioGroup: isPureCardRadioGroup,
      onChange: this.onChange,
      ref: ref => {
        this.radioEntity = ref;
      },
      addonId: children && addonId,
      extraId: extra && extraId,
      focusInner: focusVisible && !focusOuter,
      onInputFocus: this.handleFocusVisible,
      onInputBlur: this.handleBlur
    })), renderContent());
  }
}
Radio.contextType = _context.default;
Radio.propTypes = {
  autoFocus: _propTypes.default.bool,
  checked: _propTypes.default.bool,
  defaultChecked: _propTypes.default.bool,
  value: _propTypes.default.any,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  prefixCls: _propTypes.default.string,
  displayMode: _propTypes.default.oneOf(['vertical', '']),
  onChange: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  mode: _propTypes.default.oneOf(_constants.strings.MODE),
  extra: _propTypes.default.node,
  addonStyle: _propTypes.default.object,
  addonClassName: _propTypes.default.string,
  type: _propTypes.default.oneOf([_constants.strings.TYPE_DEFAULT, _constants.strings.TYPE_BUTTON, _constants.strings.TYPE_CARD, _constants.strings.TYPE_PURECARD]),
  'aria-label': _propTypes.default.string,
  preventScroll: _propTypes.default.bool
};
Radio.defaultProps = {
  autoFocus: false,
  defaultChecked: false,
  value: undefined,
  style: undefined,
  onMouseEnter: _noop2.default,
  onMouseLeave: _noop2.default,
  mode: '',
  type: 'default'
};
Radio.elementType = 'Radio';
var _default = exports.default = Radio;