"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/checkbox/constants");
var _checkboxGroupFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/checkbox/checkboxGroupFoundation"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _context = require("./context");
var _checkbox = _interopRequireDefault(require("./checkbox"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CheckboxGroup extends _baseComponent.default {
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      updateGroupValue: value => {
        this.setState({
          value
        });
      },
      notifyChange: value => {
        this.props.onChange && this.props.onChange(value);
      }
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue
    };
    this.foundation = new _checkboxGroupFoundation.default(this.adapter);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentDidUpdate(prevProps) {
    if (!(0, _isEqual2.default)(prevProps.value, this.props.value)) {
      this.foundation.handlePropValueChange(this.props.value);
    }
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  onChange(evt) {
    this.foundation.handleChange(evt);
  }
  render() {
    const {
      children,
      options,
      prefixCls,
      direction,
      className,
      id,
      style,
      type,
      disabled
    } = this.props;
    const isPureCardType = type === _constants.strings.TYPE_PURECARD;
    const isCardType = type === _constants.strings.TYPE_CARD || isPureCardType;
    const prefix = prefixCls || _constants.checkboxGroupClasses.PREFIX;
    const prefixClsDisplay = (0, _classnames.default)({
      [prefix]: true,
      [`${prefix}-wrapper`]: true,
      [`${prefix}-${direction}`]: direction,
      [`${prefix}-${direction}-cardType`]: direction && isCardType,
      [`${prefix}-${direction}-pureCardType`]: direction && isPureCardType
    }, className);
    const realValue = this.state.value.slice();
    let inner;
    if (options) {
      inner = (options || []).map((option, index) => {
        if (typeof option === 'string') {
          return /*#__PURE__*/_react.default.createElement(_checkbox.default, {
            role: "listitem",
            key: index,
            disabled: this.props.disabled,
            value: option,
            prefixCls: prefixCls
          }, option);
        } else {
          return /*#__PURE__*/_react.default.createElement(_checkbox.default, {
            role: "listitem",
            key: index,
            disabled: option.disabled || this.props.disabled,
            value: option.value,
            prefixCls: prefixCls,
            extra: option.extra,
            className: option.className,
            style: option.style,
            onChange: option.onChange
          }, option.label);
        }
      });
    } else if (children) {
      inner = _react.default.Children.toArray(children).map((itm, index) => /*#__PURE__*/_react.default.cloneElement(itm, {
        key: index,
        role: 'listitem'
      }));
    }
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      id: id,
      role: "list",
      "aria-label": this.props['aria-label'],
      className: prefixClsDisplay,
      style: style,
      "aria-labelledby": this.props['aria-labelledby'],
      "aria-describedby": this.props['aria-describedby']
    }, this.getDataAttr(this.props)), /*#__PURE__*/_react.default.createElement(_context.Context.Provider, {
      value: {
        checkboxGroup: {
          onChange: this.onChange,
          value: realValue,
          disabled: this.props.disabled,
          name: this.foundation.getFormatName(),
          isCardType,
          isPureCardType
        }
      }
    }, inner));
  }
}
CheckboxGroup.propTypes = {
  'aria-describedby': _propTypes.default.string,
  'aria-errormessage': _propTypes.default.string,
  'aria-invalid': _propTypes.default.bool,
  'aria-labelledby': _propTypes.default.string,
  'aria-required': _propTypes.default.bool,
  defaultValue: _propTypes.default.array,
  disabled: _propTypes.default.bool,
  name: _propTypes.default.string,
  options: _propTypes.default.array,
  value: _propTypes.default.array,
  onChange: _propTypes.default.func,
  children: _propTypes.default.node,
  prefixCls: _propTypes.default.string,
  direction: _propTypes.default.oneOf(_constants.strings.DIRECTION_SET),
  className: _propTypes.default.string,
  type: _propTypes.default.oneOf([_constants.strings.TYPE_DEFAULT, _constants.strings.TYPE_CARD, _constants.strings.TYPE_PURECARD]),
  style: _propTypes.default.object
};
CheckboxGroup.defaultProps = {
  disabled: false,
  onChange: () => {},
  type: _constants.strings.TYPE_DEFAULT,
  defaultValue: [],
  direction: _constants.strings.DEFAULT_DIRECTION
};
var _default = exports.default = CheckboxGroup;