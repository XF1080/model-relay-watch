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
import classNames from 'classnames';
import { strings } from '@douyinfe/semi-foundation/lib/es/timePicker/constants';
import Input from '../input';
import BaseComponent from '../_base/baseComponent';
import InputFoundation from '@douyinfe/semi-foundation/lib/es/timePicker/inputFoundation';
import { IconClock } from '@douyinfe/semi-icons';
class TimeInput extends BaseComponent {
  constructor(props) {
    super(props);
    this.setRef = node => this.adapter.setCache('inputNode', node);
    this.handleClick = e => this.props.onClick(e);
    this.handleFocus = e => this.foundation.handleFocus(e);
    this.handleBlur = e => this.foundation.handleBlur(e);
    this.handleChange = v => this.foundation.handleChange(v);
    this.foundation = new InputFoundation(this.adapter);
    this.state = {
      // focusing: props.focusOnOpen,
    };
  }
  componentDidMount() {
    super.componentDidMount();
    const {
      focusOnOpen,
      preventScroll
    } = this.props;
    if (focusOnOpen) {
      const requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
      requestAnimationFrame(() => {
        const inputNode = this.adapter.getCache('inputNode');
        if (inputNode) {
          inputNode.focus({
            preventScroll
          });
          inputNode.select();
        }
      });
    }
  }
  componentDidUpdate(prevProps) {
    const {
      timeStampValue
    } = this.props;
    if (this.isControlled('timeStampValue') && timeStampValue !== this.state.timeStampValue) {
      this.foundation.restoreCursor();
    }
    if (this.props.value !== prevProps.value) {
      this.foundation.restoreCursor();
    }
  }
  get adapter() {
    var _this = this;
    return Object.assign(Object.assign({}, super.adapter), {
      notifyChange: function () {
        return _this.props.onChange(...arguments);
      },
      notifyFocus: function () {
        return _this.props.onFocus(...arguments);
      },
      notifyBlur: function () {
        return _this.props.onBlur(...arguments);
      }
    });
  }
  getInput() {
    const _a = this.props,
      {
        prefixCls,
        placeholder,
        inputReadOnly,
        onFocus,
        disabled,
        type,
        locale,
        localeCode,
        insetLabel,
        validateStatus,
        value,
        onChange,
        invalid,
        format,
        clearText,
        disabledHours,
        disabledMinutes,
        disabledSeconds,
        onEsc,
        defaultOpenValue,
        currentSelectPanel,
        focusOnOpen,
        timeStampValue,
        timeZone,
        defaultOpen,
        dateFnsLocale
      } = _a,
      rest = __rest(_a, ["prefixCls", "placeholder", "inputReadOnly", "onFocus", "disabled", "type", "locale", "localeCode", "insetLabel", "validateStatus", "value", "onChange", "invalid", "format", "clearText", "disabledHours", "disabledMinutes", "disabledSeconds", "onEsc", "defaultOpenValue", "currentSelectPanel", "focusOnOpen", "timeStampValue", "timeZone", "defaultOpen", "dateFnsLocale"]);
    // const { focusing } = this.state;
    const inputCls = classNames(`${prefixCls}-input`, {
      [`${prefixCls}-input-invalid`]: invalid,
      [`${prefixCls}-input-readonly`]: inputReadOnly
    });
    const mergeValidateStatus = invalid ? 'error' : validateStatus;
    return /*#__PURE__*/React.createElement(Input, Object.assign({}, rest, {
      hideSuffix: true,
      className: inputCls,
      ref: this.setRef,
      value: value,
      placeholder: placeholder || locale.placeholder[type],
      readonly: Boolean(inputReadOnly),
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      suffix: /*#__PURE__*/React.createElement(IconClock, {
        onClick: this.handleClick
      }),
      validateStatus: mergeValidateStatus,
      disabled: disabled,
      insetLabel: insetLabel
    }));
  }
  render() {
    const {
      prefixCls
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-input-wrap`
    }, this.getInput());
  }
}
TimeInput.propTypes = {
  borderless: PropTypes.bool,
  format: PropTypes.string,
  prefixCls: PropTypes.string,
  placeholder: PropTypes.string,
  clearText: PropTypes.string,
  inputReadOnly: PropTypes.bool,
  hourOptions: PropTypes.array,
  minuteOptions: PropTypes.array,
  secondOptions: PropTypes.array,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onEsc: PropTypes.func,
  onClick: PropTypes.func,
  defaultOpenValue: PropTypes.object,
  currentSelectPanel: PropTypes.string,
  focusOnOpen: PropTypes.bool,
  timeStampValue: PropTypes.any,
  locale: PropTypes.object,
  localeCode: PropTypes.string,
  insetLabel: PropTypes.node,
  validateStatus: PropTypes.string,
  preventScroll: PropTypes.bool
};
TimeInput.defaultProps = {
  borderless: false,
  inputReadOnly: false,
  onChange: _noop,
  onBlur: _noop,
  onFocus: _noop,
  onClick: _noop,
  disabledHours: _noop,
  disabledMinutes: _noop,
  disabledSeconds: _noop,
  format: strings.DEFAULT_FORMAT
};
export default TimeInput;