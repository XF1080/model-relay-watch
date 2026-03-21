"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/radio/constants");
var _radioGroupFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/radio/radioGroupFoundation"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _context = _interopRequireDefault(require("./context"));
var _radio = _interopRequireDefault(require("./radio"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
class RadioGroup extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.onChange = evt => {
      this.foundation.handleChange(evt);
    };
    this.getFormatName = () => this.props.name || 'default';
    this.state = {
      value: props.value || props.defaultValue
    };
    this.foundation = new _radioGroupFoundation.default(this.adapter);
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
    const isButtonRadio = type === _constants.strings.TYPE_BUTTON;
    const isPureCardRadio = type === _constants.strings.TYPE_PURECARD;
    const isCardRadio = type === _constants.strings.TYPE_CARD || isPureCardRadio;
    const isDefaultRadio = type === _constants.strings.TYPE_DEFAULT;
    const prefix = prefixCls || _constants.radioGroupClasses.PREFIX;
    const prefixClsDisplay = (0, _classnames.default)(className, {
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
          return /*#__PURE__*/_react.default.createElement(_radio.default, {
            key: index,
            disabled: this.props.disabled,
            value: option
          }, option);
        } else {
          return /*#__PURE__*/_react.default.createElement(_radio.default, {
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
      inner = _react.default.Children.map(children, (itm, index) => /*#__PURE__*/_react.default.isValidElement(itm) ? /*#__PURE__*/_react.default.cloneElement(itm, {
        key: index
      }) : null);
    }
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: prefixClsDisplay,
      style: style,
      id: id,
      "aria-label": this.props['aria-label'],
      "aria-invalid": this.props['aria-invalid'],
      "aria-errormessage": this.props['aria-errormessage'],
      "aria-labelledby": this.props['aria-labelledby'],
      "aria-describedby": this.props['aria-describedby'],
      "aria-required": this.props['aria-required']
    }, this.getDataAttr(rest)), /*#__PURE__*/_react.default.createElement(_context.default.Provider, {
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
  defaultValue: _propTypes.default.any,
  disabled: _propTypes.default.bool,
  name: _propTypes.default.string,
  options: _propTypes.default.array,
  buttonSize: _propTypes.default.oneOf(_constants.strings.BUTTON_SIZE),
  type: _propTypes.default.oneOf([_constants.strings.TYPE_DEFAULT, _constants.strings.TYPE_BUTTON, _constants.strings.TYPE_CARD, _constants.strings.TYPE_PURECARD]),
  value: _propTypes.default.any,
  onChange: _propTypes.default.func,
  children: _propTypes.default.node,
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  direction: _propTypes.default.oneOf(_constants.strings.DIRECTION_SET),
  mode: _propTypes.default.oneOf(_constants.strings.MODE),
  'aria-label': _propTypes.default.string,
  'aria-describedby': _propTypes.default.string,
  'aria-errormessage': _propTypes.default.string,
  'aria-invalid': _propTypes.default.bool,
  'aria-labelledby': _propTypes.default.string,
  'aria-required': _propTypes.default.bool,
  id: _propTypes.default.string
};
RadioGroup.defaultProps = {
  disabled: false,
  onChange: _noop2.default,
  direction: _constants.strings.DEFAULT_DIRECTION,
  mode: '',
  type: _constants.strings.TYPE_DEFAULT,
  buttonSize: 'middle'
};
var _default = exports.default = RadioGroup;