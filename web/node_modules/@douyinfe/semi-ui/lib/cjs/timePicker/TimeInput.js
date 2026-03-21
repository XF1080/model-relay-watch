"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/timePicker/constants");
var _input = _interopRequireDefault(require("../input"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _inputFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/timePicker/inputFoundation"));
var _semiIcons = require("@douyinfe/semi-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
class TimeInput extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.setRef = node => this.adapter.setCache('inputNode', node);
    this.handleClick = e => this.props.onClick(e);
    this.handleFocus = e => this.foundation.handleFocus(e);
    this.handleBlur = e => this.foundation.handleBlur(e);
    this.handleChange = v => this.foundation.handleChange(v);
    this.foundation = new _inputFoundation.default(this.adapter);
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
    const inputCls = (0, _classnames.default)(`${prefixCls}-input`, {
      [`${prefixCls}-input-invalid`]: invalid,
      [`${prefixCls}-input-readonly`]: inputReadOnly
    });
    const mergeValidateStatus = invalid ? 'error' : validateStatus;
    return /*#__PURE__*/_react.default.createElement(_input.default, Object.assign({}, rest, {
      hideSuffix: true,
      className: inputCls,
      ref: this.setRef,
      value: value,
      placeholder: placeholder || locale.placeholder[type],
      readonly: Boolean(inputReadOnly),
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      suffix: /*#__PURE__*/_react.default.createElement(_semiIcons.IconClock, {
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
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-input-wrap`
    }, this.getInput());
  }
}
TimeInput.propTypes = {
  borderless: _propTypes.default.bool,
  format: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  clearText: _propTypes.default.string,
  inputReadOnly: _propTypes.default.bool,
  hourOptions: _propTypes.default.array,
  minuteOptions: _propTypes.default.array,
  secondOptions: _propTypes.default.array,
  disabledHours: _propTypes.default.func,
  disabledMinutes: _propTypes.default.func,
  disabledSeconds: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onEsc: _propTypes.default.func,
  onClick: _propTypes.default.func,
  defaultOpenValue: _propTypes.default.object,
  currentSelectPanel: _propTypes.default.string,
  focusOnOpen: _propTypes.default.bool,
  timeStampValue: _propTypes.default.any,
  locale: _propTypes.default.object,
  localeCode: _propTypes.default.string,
  insetLabel: _propTypes.default.node,
  validateStatus: _propTypes.default.string,
  preventScroll: _propTypes.default.bool
};
TimeInput.defaultProps = {
  borderless: false,
  inputReadOnly: false,
  onChange: _noop2.default,
  onBlur: _noop2.default,
  onFocus: _noop2.default,
  onClick: _noop2.default,
  disabledHours: _noop2.default,
  disabledMinutes: _noop2.default,
  disabledSeconds: _noop2.default,
  format: _constants.strings.DEFAULT_FORMAT
};
var _default = exports.default = TimeInput;