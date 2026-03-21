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
import cls from 'classnames';
import PropTypes from 'prop-types';
import SwitchFoudation from '@douyinfe/semi-foundation/lib/es/switch/foundation';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/switch/constants';
import BaseComponent from '../_base/baseComponent';
import '@douyinfe/semi-foundation/lib/es/switch/switch.css';
import Spin from '../spin';
class Switch extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleFocusVisible = event => {
      this.foundation.handleFocusVisible(event);
    };
    this.handleBlur = event => {
      this.foundation.handleBlur();
    };
    this.state = {
      nativeControlChecked: props.defaultChecked || props.checked,
      nativeControlDisabled: false,
      focusVisible: false
    };
    this.switchRef = /*#__PURE__*/React.createRef();
    this.foundation = new SwitchFoudation(this.adapter);
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentDidUpdate(prevProps) {
    if (this.props.checked !== prevProps.checked) {
      this.foundation.setChecked(this.props.checked);
    }
    if (this.props.disabled !== prevProps.disabled) {
      this.foundation.setDisabled(this.props.disabled);
    }
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setNativeControlChecked: nativeControlChecked => {
        this.setState({
          nativeControlChecked
        });
      },
      setNativeControlDisabled: nativeControlDisabled => {
        this.setState({
          nativeControlDisabled
        });
      },
      setFocusVisible: focusVisible => {
        this.setState({
          focusVisible
        });
      },
      notifyChange: (checked, e) => {
        this.props.onChange(checked, e);
      }
    });
  }
  render() {
    const {
      nativeControlChecked,
      nativeControlDisabled,
      focusVisible
    } = this.state;
    const _a = this.props,
      {
        className,
        style,
        onMouseEnter,
        onMouseLeave,
        size,
        checkedText,
        uncheckedText,
        loading,
        id
      } = _a,
      rest = __rest(_a, ["className", "style", "onMouseEnter", "onMouseLeave", "size", "checkedText", "uncheckedText", "loading", "id"]);
    const wrapperCls = cls(className, {
      [cssClasses.PREFIX]: true,
      [cssClasses.CHECKED]: nativeControlChecked,
      [cssClasses.DISABLED]: nativeControlDisabled,
      [cssClasses.LARGE]: size === 'large',
      [cssClasses.SMALL]: size === 'small',
      [cssClasses.LOADING]: loading,
      [cssClasses.FOCUS]: focusVisible
    });
    const switchProps = {
      type: 'checkbox',
      className: cssClasses.NATIVE_CONTROL,
      disabled: nativeControlDisabled || loading,
      checked: nativeControlChecked || false
    };
    const showCheckedText = checkedText && nativeControlChecked && size !== 'small';
    const showUncheckedText = uncheckedText && !nativeControlChecked && size !== 'small';
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: wrapperCls,
      style: style,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }, this.getDataAttr(rest)), loading ? (/*#__PURE__*/React.createElement(Spin, {
      wrapperClassName: cssClasses.LOADING_SPIN,
      size: size === 'default' ? 'middle' : size
    })) : (/*#__PURE__*/React.createElement("div", {
      className: cssClasses.KNOB,
      "aria-hidden": true
    })), showCheckedText ? (/*#__PURE__*/React.createElement("div", {
      className: cssClasses.CHECKED_TEXT,
      "x-semi-prop": "checkedText"
    }, checkedText)) : null, showUncheckedText ? (/*#__PURE__*/React.createElement("div", {
      className: cssClasses.UNCHECKED_TEXT,
      "x-semi-prop": "uncheckedText"
    }, uncheckedText)) : null, /*#__PURE__*/React.createElement("input", Object.assign({}, switchProps, {
      ref: this.switchRef,
      id: id,
      role: "switch",
      "aria-checked": nativeControlChecked,
      "aria-invalid": this.props['aria-invalid'],
      "aria-errormessage": this.props['aria-errormessage'],
      "aria-label": this.props['aria-label'],
      "aria-labelledby": this.props['aria-labelledby'],
      "aria-describedby": this.props['aria-describedby'],
      "aria-disabled": this.props['disabled'],
      onChange: e => this.foundation.handleChange(e.target.checked, e),
      onFocus: e => this.handleFocusVisible(e),
      onBlur: e => this.handleBlur(e)
    })));
  }
}
Switch.propTypes = {
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-errormessage': PropTypes.string,
  'aria-describedby': PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  checkedText: PropTypes.node,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  style: PropTypes.object,
  size: PropTypes.oneOf(strings.SIZE_MAP),
  uncheckedText: PropTypes.node,
  id: PropTypes.string
};
Switch.defaultProps = {
  disabled: false,
  className: '',
  onChange: _noop,
  loading: false,
  onMouseEnter: _noop,
  onMouseLeave: _noop,
  size: 'default'
};
export default Switch;