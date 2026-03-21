import _noop from "lodash/noop";
import React from 'react';
import PropTypes from 'prop-types';
import RadioInnerFoundation from '@douyinfe/semi-foundation/lib/es/radio/radioInnerFoundation';
import BaseComponent from '../_base/baseComponent';
import { radioClasses as css } from '@douyinfe/semi-foundation/lib/es/radio/constants';
import Context from './context';
import classnames from 'classnames';
import { IconRadio } from '@douyinfe/semi-icons';
class RadioInner extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
    this.foundation = new RadioInnerFoundation(this.adapter);
    this.onChange = this.onChange.bind(this);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setNativeControlChecked: checked => {
        this.setState({
          checked
        });
      },
      notifyChange: e => {
        this.props.onChange(e);
      }
    });
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.checked !== this.props.checked) {
      this.foundation.setChecked(this.props.checked);
    }
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
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
  onChange(e) {
    this.foundation.handleChange(e);
  }
  render() {
    const {
      disabled,
      mode,
      autoFocus,
      name,
      isButtonRadio,
      isPureCardRadioGroup,
      addonId,
      extraId,
      'aria-label': ariaLabel,
      focusInner,
      onInputFocus,
      onInputBlur
    } = this.props;
    const {
      checked
    } = this.state;
    const prefix = this.props.prefixCls || css.PREFIX;
    const wrapper = classnames({
      [`${prefix}-inner`]: true,
      [`${prefix}-inner-checked`]: Boolean(checked),
      [`${prefix}-inner-buttonRadio`]: isButtonRadio,
      [`${prefix}-inner-pureCardRadio`]: isPureCardRadioGroup
    });
    const inner = classnames({
      [`${prefix}-focus`]: focusInner,
      [`${prefix}-focus-border`]: focusInner && !checked,
      [`${prefix}-inner-display`]: !isButtonRadio
    });
    return /*#__PURE__*/React.createElement("span", {
      className: wrapper
    }, /*#__PURE__*/React.createElement("input", {
      ref: ref => {
        this.inputEntity = ref;
      },
      autoFocus: autoFocus,
      type: mode === 'advanced' ? 'checkbox' : 'radio',
      checked: Boolean(checked),
      disabled: disabled,
      onChange: this.onChange,
      name: name,
      "aria-label": ariaLabel,
      "aria-labelledby": addonId,
      "aria-describedby": extraId,
      onFocus: onInputFocus,
      onBlur: onInputBlur
    }), /*#__PURE__*/React.createElement("span", {
      className: inner
    }, checked ? /*#__PURE__*/React.createElement(IconRadio, null) : null));
  }
}
RadioInner.contextType = Context;
RadioInner.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  isButtonRadio: PropTypes.bool,
  onChange: PropTypes.func,
  mode: PropTypes.oneOf(['advanced', '']),
  'aria-label': PropTypes.string,
  focusInner: PropTypes.bool,
  onInputFocus: PropTypes.func,
  onInputBlur: PropTypes.func,
  preventScroll: PropTypes.bool
};
RadioInner.defaultProps = {
  onChange: _noop,
  isButtonRadio: false
};
export default RadioInner;