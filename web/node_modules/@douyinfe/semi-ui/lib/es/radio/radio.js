import _isBoolean from "lodash/isBoolean";
import _isUndefined from "lodash/isUndefined";
import _noop from "lodash/noop";
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
import cls from 'classnames';
import RadioFoundation from '@douyinfe/semi-foundation/lib/es/radio/radioFoundation';
import { strings, radioClasses as css } from '@douyinfe/semi-foundation/lib/es/radio/constants';
import { getUuidShort } from '@douyinfe/semi-foundation/lib/es/utils/uuid';
import '@douyinfe/semi-foundation/lib/es/radio/radio.css';
import BaseComponent from '../_base/baseComponent';
import RadioInner from './radioInner';
import Context from './context';
class Radio extends BaseComponent {
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
    this.foundation = new RadioFoundation(this.adapter);
    this.radioEntity = null;
  }
  componentDidUpdate(prevProps) {
    if (this.props.checked !== prevProps.checked) {
      if (_isUndefined(this.props.checked)) {
        this.foundation.setChecked(false);
      } else if (_isBoolean(this.props.checked)) {
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
          addonId: getUuidShort({
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
          extraId: getUuidShort({
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
      isButtonRadioGroup = type === strings.TYPE_BUTTON;
      isPureCardRadioGroup = type === strings.TYPE_PURECARD;
      isCardRadioGroup = type === strings.TYPE_CARD || isPureCardRadioGroup;
    }
    const isButtonRadio = typeof isButtonRadioGroup === 'undefined' ? isButtonRadioComponent : isButtonRadioGroup;
    const prefix = realPrefixCls || css.PREFIX;
    const focusOuter = isCardRadioGroup || isPureCardRadioGroup || isButtonRadio;
    const wrapper = cls(prefix, {
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
    const addonCls = cls({
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
      return /*#__PURE__*/React.createElement("div", {
        className: cls([`${prefix}-content`, {
          [`${prefix}-isCardRadioGroup_content`]: isCardRadioGroup
        }])
      }, children ? (/*#__PURE__*/React.createElement("span", {
        className: addonCls,
        style: addonStyle,
        id: addonId,
        "x-semi-prop": "children"
      }, children)) : null, extra && !isButtonRadio ? (/*#__PURE__*/React.createElement("div", {
        className: `${prefix}-extra`,
        id: extraId,
        "x-semi-prop": "extra"
      }, extra)) : null);
    };
    return /*#__PURE__*/React.createElement("label", Object.assign({
      style: style,
      className: wrapper,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave
    }, this.getDataAttr(rest)), /*#__PURE__*/React.createElement(RadioInner, Object.assign({}, this.props, props, {
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
Radio.contextType = Context;
Radio.propTypes = {
  autoFocus: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  value: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  prefixCls: PropTypes.string,
  displayMode: PropTypes.oneOf(['vertical', '']),
  onChange: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  mode: PropTypes.oneOf(strings.MODE),
  extra: PropTypes.node,
  addonStyle: PropTypes.object,
  addonClassName: PropTypes.string,
  type: PropTypes.oneOf([strings.TYPE_DEFAULT, strings.TYPE_BUTTON, strings.TYPE_CARD, strings.TYPE_PURECARD]),
  'aria-label': PropTypes.string,
  preventScroll: PropTypes.bool
};
Radio.defaultProps = {
  autoFocus: false,
  defaultChecked: false,
  value: undefined,
  style: undefined,
  onMouseEnter: _noop,
  onMouseLeave: _noop,
  mode: '',
  type: 'default'
};
Radio.elementType = 'Radio';
export default Radio;