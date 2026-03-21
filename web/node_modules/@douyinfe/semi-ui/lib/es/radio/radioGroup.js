import _noop from "lodash/noop";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { radioGroupClasses as css, strings } from '@douyinfe/semi-foundation/lib/es/radio/constants';
import RadioGroupFoundation from '@douyinfe/semi-foundation/lib/es/radio/radioGroupFoundation';
import BaseComponent from '../_base/baseComponent';
import Context from './context';
import Radio from './radio';
class RadioGroup extends BaseComponent {
  constructor(props) {
    super(props);
    this.onChange = evt => {
      this.foundation.handleChange(evt);
    };
    this.getFormatName = () => this.props.name || 'default';
    this.state = {
      value: props.value || props.defaultValue
    };
    this.foundation = new RadioGroupFoundation(this.adapter);
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentDidUpdate(prevProps) {
    if (typeof prevProps.value === 'number' && isNaN(prevProps.value) && typeof this.props.value === 'number' && isNaN(this.props.value)) {
      // `NaN === NaN` returns false, and this will fail the next if check
      // therefore triggering an infinite loop
      return;
    }
    if (prevProps.value !== this.props.value) {
      this.foundation.handlePropValueChange(this.props.value);
    }
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setValue: value => {
        this.setState({
          value
        });
      },
      getProps: () => this.props,
      isInProps: name => Boolean(name in this.props),
      notifyChange: evt => {
        this.props.onChange && this.props.onChange(evt);
      }
    });
  }
  render() {
    const _a = this.props,
      {
        children,
        options,
        mode,
        prefixCls,
        className,
        style,
        direction,
        type,
        buttonSize,
        id
      } = _a,
      rest = __rest(_a, ["children", "options", "mode", "prefixCls", "className", "style", "direction", "type", "buttonSize", "id"]);
    const isButtonRadio = type === strings.TYPE_BUTTON;
    const isPureCardRadio = type === strings.TYPE_PURECARD;
    const isCardRadio = type === strings.TYPE_CARD || isPureCardRadio;
    const isDefaultRadio = type === strings.TYPE_DEFAULT;
    const prefix = prefixCls || css.PREFIX;
    const prefixClsDisplay = classnames(className, {
      [prefix]: true,
      [`${prefix}-wrapper`]: true,
      [`${prefix}-${direction}`]: direction && !isButtonRadio,
      [`${prefix}-${direction}-default`]: direction && isDefaultRadio,
      [`${prefix}-${direction}-card`]: direction && isCardRadio,
      [`${prefix}-buttonRadio`]: isButtonRadio
    });
    const realValue = this.state.value;
    let inner;
    if (options) {
      inner = (options || []).map((option, index) => {
        if (typeof option === 'string') {
          return /*#__PURE__*/React.createElement(Radio, {
            key: index,
            disabled: this.props.disabled,
            value: option
          }, option);
        } else {
          return /*#__PURE__*/React.createElement(Radio, {
            key: index,
            disabled: option.disabled || this.props.disabled,
            value: option.value,
            extra: option.extra,
            className: option.className,
            style: option.style,
            addonId: option.addonId,
            addonStyle: option.addonStyle,
            addonClassName: option.addonClassName,
            extraId: option.extraId
          }, option.label);
        }
      });
    } else if (children) {
      inner = React.Children.map(children, (itm, index) => /*#__PURE__*/React.isValidElement(itm) ? /*#__PURE__*/React.cloneElement(itm, {
        key: index
      }) : null);
    }
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: prefixClsDisplay,
      style: style,
      id: id,
      "aria-label": this.props['aria-label'],
      "aria-invalid": this.props['aria-invalid'],
      "aria-errormessage": this.props['aria-errormessage'],
      "aria-labelledby": this.props['aria-labelledby'],
      "aria-describedby": this.props['aria-describedby'],
      "aria-required": this.props['aria-required']
    }, this.getDataAttr(rest)), /*#__PURE__*/React.createElement(Context.Provider, {
      value: {
        radioGroup: {
          onChange: this.onChange,
          value: realValue,
          disabled: this.props.disabled,
          name: this.getFormatName(),
          isButtonRadio,
          isCardRadio,
          isPureCardRadio,
          buttonSize,
          prefixCls
        },
        mode
      }
    }, inner));
  }
}
RadioGroup.propTypes = {
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.array,
  buttonSize: PropTypes.oneOf(strings.BUTTON_SIZE),
  type: PropTypes.oneOf([strings.TYPE_DEFAULT, strings.TYPE_BUTTON, strings.TYPE_CARD, strings.TYPE_PURECARD]),
  value: PropTypes.any,
  onChange: PropTypes.func,
  children: PropTypes.node,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  direction: PropTypes.oneOf(strings.DIRECTION_SET),
  mode: PropTypes.oneOf(strings.MODE),
  'aria-label': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-labelledby': PropTypes.string,
  'aria-required': PropTypes.bool,
  id: PropTypes.string
};
RadioGroup.defaultProps = {
  disabled: false,
  onChange: _noop,
  direction: strings.DEFAULT_DIRECTION,
  mode: '',
  type: strings.TYPE_DEFAULT,
  buttonSize: 'middle'
};
export default RadioGroup;