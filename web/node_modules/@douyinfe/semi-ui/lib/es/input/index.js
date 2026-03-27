import _isUndefined from "lodash/isUndefined";
import _isFunction from "lodash/isFunction";
import _noop from "lodash/noop";
import _isString from "lodash/isString";
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
import InputFoundation from '@douyinfe/semi-foundation/lib/es/input/foundation';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/input/constants';
import { isSemiIcon } from '../_utils';
import BaseComponent from '../_base/baseComponent';
import '@douyinfe/semi-foundation/lib/es/input/input.css';
import { IconClear, IconEyeOpened, IconEyeClosedSolid } from '@douyinfe/semi-icons';
const prefixCls = cssClasses.PREFIX;
const sizeSet = strings.SIZE;
const statusSet = strings.STATUS;
const modeSet = strings.MODE;
class Input extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleClear = e => {
      this.foundation.handleClear(e);
    };
    this.handleClick = e => {
      this.foundation.handleClick(e);
    };
    this.handleMouseOver = e => {
      this.setState({
        isHovering: true
      });
    };
    this.handleMouseLeave = e => {
      this.setState({
        isHovering: false
      });
    };
    this.handleModeChange = mode => {
      this.foundation.handleModeChange(mode);
    };
    this.handleClickEye = e => {
      this.foundation.handleClickEye(e);
    };
    this.handleMouseDown = e => {
      this.foundation.handleMouseDown(e);
    };
    this.handleMouseUp = e => {
      this.foundation.handleMouseUp(e);
    };
    this.handleModeEnterPress = e => {
      this.foundation.handleModeEnterPress(e);
    };
    this.handleClickPrefixOrSuffix = e => {
      this.foundation.handleClickPrefixOrSuffix(e);
    };
    this.handlePreventMouseDown = e => {
      this.foundation.handlePreventMouseDown(e);
    };
    const initValue = 'value' in props ? props.value : props.defaultValue;
    this.state = {
      value: initValue,
      cachedValue: props.value,
      disabled: false,
      props: {},
      isFocus: false,
      isHovering: false,
      eyeClosed: props.mode === 'password',
      minLength: props.minLength
    };
    this.inputRef = /*#__PURE__*/React.createRef();
    this.prefixRef = /*#__PURE__*/React.createRef();
    this.suffixRef = /*#__PURE__*/React.createRef();
    this.foundation = new InputFoundation(this.adapter);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setValue: value => this.setState({
        value
      }),
      setEyeClosed: value => this.setState({
        eyeClosed: value
      }),
      toggleFocusing: isFocus => {
        this.setState({
          isFocus
        });
      },
      focusInput: () => {
        const {
          preventScroll
        } = this.props;
        const input = this.inputRef && this.inputRef.current;
        input && input.focus({
          preventScroll
        });
      },
      toggleHovering: isHovering => this.setState({
        isHovering
      }),
      getIfFocusing: () => this.state.isFocus,
      notifyChange: (cbValue, e) => this.props.onChange(cbValue, e),
      notifyBlur: (val, e) => this.props.onBlur(e),
      notifyFocus: (val, e) => this.props.onFocus(e),
      notifyInput: e => this.props.onInput(e),
      notifyKeyPress: e => this.props.onKeyPress(e),
      notifyKeyDown: e => this.props.onKeyDown(e),
      notifyKeyUp: e => this.props.onKeyUp(e),
      notifyEnterPress: e => this.props.onEnterPress(e),
      notifyClear: e => this.props.onClear(e),
      notifyCompositionStart: e => this.props.onCompositionStart(e),
      notifyCompositionEnd: e => this.props.onCompositionEnd(e),
      notifyCompositionUpdate: e => this.props.onCompositionUpdate(e),
      setMinLength: minLength => this.setState({
        minLength
      }),
      isEventTarget: e => e && e.target === e.currentTarget
    });
  }
  static getDerivedStateFromProps(props, state) {
    const willUpdateStates = {};
    if (props.value !== state.cachedValue) {
      willUpdateStates.value = props.value;
      willUpdateStates.cachedValue = props.value;
    }
    return willUpdateStates;
  }
  componentDidUpdate(prevProps) {
    const {
      mode
    } = this.props;
    if (prevProps.mode !== mode) {
      this.handleModeChange(mode);
    }
  }
  componentDidMount() {
    // autofocus is changed from the original support of input to the support of manually calling the focus method,
    // so that preventScroll can still take effect under the setting of autofocus
    const {
      disabled,
      autoFocus,
      preventScroll
    } = this.props;
    if (!disabled && (autoFocus || this.props['autofocus'])) {
      this.inputRef.current.focus({
        preventScroll
      });
    }
  }
  renderPrepend() {
    const {
      addonBefore
    } = this.props;
    if (addonBefore) {
      const prefixWrapperCls = cls({
        [`${prefixCls}-prepend`]: true,
        [`${prefixCls}-prepend-text`]: addonBefore && _isString(addonBefore),
        [`${prefixCls}-prepend-icon`]: isSemiIcon(addonBefore)
      });
      return /*#__PURE__*/React.createElement("div", {
        className: prefixWrapperCls,
        "x-semi-prop": "addonBefore"
      }, addonBefore);
    }
    return null;
  }
  renderAppend() {
    const {
      addonAfter
    } = this.props;
    if (addonAfter) {
      const prefixWrapperCls = cls({
        [`${prefixCls}-append`]: true,
        [`${prefixCls}-append-text`]: addonAfter && _isString(addonAfter),
        [`${prefixCls}-append-icon`]: isSemiIcon(addonAfter)
      });
      return /*#__PURE__*/React.createElement("div", {
        className: prefixWrapperCls,
        "x-semi-prop": "addonAfter"
      }, addonAfter);
    }
    return null;
  }
  renderClearBtn() {
    const clearCls = cls(`${prefixCls}-clearbtn`);
    const {
      clearIcon
    } = this.props;
    const allowClear = this.foundation.isAllowClear();
    // use onMouseDown to fix issue 1203
    if (allowClear) {
      return (
        /*#__PURE__*/
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        React.createElement("div", {
          className: clearCls,
          onMouseDown: this.handleClear
        }, clearIcon ? clearIcon : /*#__PURE__*/React.createElement(IconClear, null))
      );
    }
    return null;
  }
  renderModeBtn() {
    const {
      eyeClosed
    } = this.state;
    const {
      mode,
      disabled
    } = this.props;
    const modeCls = cls(`${prefixCls}-modebtn`);
    const modeIcon = eyeClosed ? /*#__PURE__*/React.createElement(IconEyeClosedSolid, null) : /*#__PURE__*/React.createElement(IconEyeOpened, null);
    // alway show password button for a11y
    const showModeBtn = mode === 'password' && !disabled;
    const ariaLabel = eyeClosed ? 'Show password' : 'Hidden password';
    if (showModeBtn) {
      return /*#__PURE__*/React.createElement("div", {
        role: "button",
        tabIndex: 0,
        "aria-label": ariaLabel,
        className: modeCls,
        onClick: this.handleClickEye,
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        onKeyPress: this.handleModeEnterPress
      }, modeIcon);
    }
    return null;
  }
  renderPrefix() {
    const {
      prefix,
      insetLabel,
      insetLabelId
    } = this.props;
    const labelNode = prefix || insetLabel;
    if (!labelNode) {
      return null;
    }
    const prefixWrapperCls = cls({
      [`${prefixCls}-prefix`]: true,
      [`${prefixCls}-inset-label`]: insetLabel,
      [`${prefixCls}-prefix-text`]: labelNode && _isString(labelNode),
      [`${prefixCls}-prefix-icon`]: isSemiIcon(labelNode)
    });
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      React.createElement("div", {
        className: prefixWrapperCls,
        onMouseDown: this.handlePreventMouseDown,
        onClick: this.handleClickPrefixOrSuffix,
        id: insetLabelId,
        "x-semi-prop": "prefix,insetLabel"
      }, labelNode)
    );
  }
  renderSuffix(suffixAllowClear) {
    const {
      suffix,
      hideSuffix
    } = this.props;
    if (!suffix) {
      return null;
    }
    const suffixWrapperCls = cls({
      [`${prefixCls}-suffix`]: true,
      [`${prefixCls}-suffix-text`]: suffix && _isString(suffix),
      [`${prefixCls}-suffix-icon`]: isSemiIcon(suffix),
      [`${prefixCls}-suffix-hidden`]: suffixAllowClear && Boolean(hideSuffix)
    });
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      React.createElement("div", {
        className: suffixWrapperCls,
        onMouseDown: this.handlePreventMouseDown,
        onClick: this.handleClickPrefixOrSuffix,
        "x-semi-prop": "suffix"
      }, suffix)
    );
  }
  getInputRef() {
    const {
      forwardRef
    } = this.props;
    if (!_isUndefined(forwardRef)) {
      if (typeof forwardRef === 'function') {
        return node => {
          forwardRef(node);
          this.inputRef = {
            current: node
          };
        };
      } else if (Object.prototype.toString.call(forwardRef) === '[object Object]') {
        this.inputRef = forwardRef;
        return forwardRef;
      }
    }
    return this.inputRef;
  }
  render() {
    const _a = this.props,
      {
        addonAfter,
        addonBefore,
        autoFocus,
        clearIcon,
        className,
        disabled,
        defaultValue,
        placeholder,
        prefix,
        mode,
        insetLabel,
        insetLabelId,
        validateStatus,
        type,
        readonly,
        size,
        suffix,
        style,
        showClear,
        onEnterPress,
        onClear,
        hideSuffix,
        inputStyle,
        forwardRef,
        maxLength,
        getValueLength,
        preventScroll,
        borderless,
        showClearIgnoreDisabled,
        onlyBorder
      } = _a,
      rest = __rest(_a, ["addonAfter", "addonBefore", "autoFocus", "clearIcon", "className", "disabled", "defaultValue", "placeholder", "prefix", "mode", "insetLabel", "insetLabelId", "validateStatus", "type", "readonly", "size", "suffix", "style", "showClear", "onEnterPress", "onClear", "hideSuffix", "inputStyle", "forwardRef", "maxLength", "getValueLength", "preventScroll", "borderless", "showClearIgnoreDisabled", "onlyBorder"]);
    const {
      value,
      isFocus,
      minLength: stateMinLength
    } = this.state;
    const suffixAllowClear = this.foundation.isAllowClear();
    const suffixIsIcon = isSemiIcon(suffix);
    const ref = this.getInputRef();
    const wrapperPrefix = `${prefixCls}-wrapper`;
    const wrapperCls = cls(wrapperPrefix, className, {
      [`${prefixCls}-wrapper__with-prefix`]: prefix || insetLabel,
      [`${prefixCls}-wrapper__with-suffix`]: suffix,
      [`${prefixCls}-wrapper__with-suffix-hidden`]: suffixAllowClear && Boolean(hideSuffix),
      [`${prefixCls}-wrapper__with-suffix-icon`]: suffixIsIcon,
      [`${prefixCls}-wrapper__with-append`]: addonBefore,
      [`${prefixCls}-wrapper__with-prepend`]: addonAfter,
      [`${prefixCls}-wrapper__with-append-only`]: addonBefore && !addonAfter,
      [`${prefixCls}-wrapper__with-prepend-only`]: !addonBefore && addonAfter,
      [`${wrapperPrefix}-readonly`]: readonly,
      [`${wrapperPrefix}-disabled`]: disabled,
      [`${wrapperPrefix}-warning`]: validateStatus === 'warning',
      [`${wrapperPrefix}-error`]: validateStatus === 'error',
      [`${wrapperPrefix}-focus`]: isFocus,
      [`${wrapperPrefix}-clearable`]: showClear,
      [`${wrapperPrefix}-modebtn`]: mode === 'password',
      [`${wrapperPrefix}-hidden`]: type === 'hidden',
      [`${wrapperPrefix}-${size}`]: size,
      [`${prefixCls}-borderless`]: borderless,
      [`${prefixCls}-only_border`]: onlyBorder !== undefined && onlyBorder !== null
    });
    const inputCls = cls(prefixCls, {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-sibling-clearbtn`]: this.foundation.isAllowClear(),
      [`${prefixCls}-sibling-modebtn`]: mode === 'password'
    });
    const inputValue = value === null || value === undefined ? '' : value;
    const inputProps = Object.assign(Object.assign({}, rest), {
      style: inputStyle,
      className: inputCls,
      disabled,
      readOnly: readonly,
      type: this.foundation.handleInputType(type),
      placeholder: placeholder,
      onInput: e => this.foundation.handleInput(e),
      onChange: e => this.foundation.handleChange(e.target.value, e),
      onFocus: e => this.foundation.handleFocus(e),
      onBlur: e => this.foundation.handleBlur(e),
      onKeyUp: e => this.foundation.handleKeyUp(e),
      onKeyDown: e => this.foundation.handleKeyDown(e),
      onKeyPress: e => this.foundation.handleKeyPress(e),
      onCompositionStart: this.foundation.handleCompositionStart,
      onCompositionEnd: this.foundation.handleCompositionEnd,
      onCompositionUpdate: this.foundation.handleCompositionUpdate,
      value: inputValue
    });
    if (!_isFunction(getValueLength)) {
      inputProps.maxLength = maxLength;
    }
    if (stateMinLength) {
      inputProps.minLength = stateMinLength;
    }
    if (validateStatus === 'error') {
      inputProps['aria-invalid'] = 'true';
    }
    let wrapperStyle = Object.assign({}, style);
    if (onlyBorder !== undefined) {
      wrapperStyle = Object.assign({
        borderWidth: onlyBorder
      }, style);
    }
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      React.createElement("div", {
        className: wrapperCls,
        style: wrapperStyle,
        onMouseEnter: e => this.handleMouseOver(e),
        onMouseLeave: e => this.handleMouseLeave(e),
        onClick: e => this.handleClick(e)
      }, this.renderPrepend(), this.renderPrefix(), /*#__PURE__*/React.createElement("input", Object.assign({}, inputProps, {
        ref: ref
      })), this.renderClearBtn(), this.renderSuffix(suffixAllowClear), this.renderModeBtn(), this.renderAppend())
    );
  }
}
Input.propTypes = {
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-errormessage': PropTypes.string,
  'aria-describedby': PropTypes.string,
  'aria-required': PropTypes.bool,
  addonBefore: PropTypes.node,
  addonAfter: PropTypes.node,
  clearIcon: PropTypes.node,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  mode: PropTypes.oneOf(modeSet),
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  showClear: PropTypes.bool,
  hideSuffix: PropTypes.bool,
  placeholder: PropTypes.any,
  size: PropTypes.oneOf(sizeSet),
  className: PropTypes.string,
  style: PropTypes.object,
  validateStatus: PropTypes.oneOf(statusSet),
  onClear: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onInput: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  onEnterPress: PropTypes.func,
  onCompositionStart: PropTypes.func,
  onCompositionEnd: PropTypes.func,
  onCompositionUpdate: PropTypes.func,
  insetLabel: PropTypes.node,
  insetLabelId: PropTypes.string,
  inputStyle: PropTypes.object,
  getValueLength: PropTypes.func,
  preventScroll: PropTypes.bool,
  borderless: PropTypes.bool
};
Input.defaultProps = {
  addonBefore: '',
  addonAfter: '',
  prefix: '',
  suffix: '',
  readonly: false,
  type: 'text',
  showClear: false,
  hideSuffix: false,
  placeholder: '',
  size: 'default',
  className: '',
  onClear: _noop,
  onChange: _noop,
  onBlur: _noop,
  onFocus: _noop,
  onInput: _noop,
  onKeyDown: _noop,
  onKeyUp: _noop,
  onKeyPress: _noop,
  onEnterPress: _noop,
  onCompositionStart: _noop,
  onCompositionEnd: _noop,
  onCompositionUpdate: _noop,
  validateStatus: 'default',
  borderless: false
};
const ForwardInput = /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(Input, Object.assign({}, props, {
  forwardRef: ref
})));
export default ForwardInput;
export { Input };