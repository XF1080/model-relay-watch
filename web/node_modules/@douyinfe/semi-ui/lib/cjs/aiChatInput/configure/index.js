"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _context = require("./context");
var _button = _interopRequireDefault(require("./button"));
var _select = _interopRequireDefault(require("./select"));
var _mcp = _interopRequireDefault(require("./mcp"));
var _radioButton = _interopRequireDefault(require("./radioButton"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Configure extends _react.default.Component {
  constructor(props) {
    var _this;
    super(props);
    _this = this;
    this.onChange = function (obj) {
      let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      _this.setState(s => {
        const {
          value
        } = s;
        const newValue = Object.assign(Object.assign({}, value), obj);
        const {
          onChange
        } = _this.props;
        !init && (onChange === null || onChange === void 0 ? void 0 : onChange(newValue, obj));
        return {
          value: newValue
        };
      });
    };
    this.onRemove = field => {
      this.setState(s => {
        const {
          value = {}
        } = s;
        const newValue = {};
        Object.keys(value).forEach(key => {
          if (key !== field) {
            newValue[key] = value[key];
          }
        });
        const {
          onChange
        } = this.props;
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        return {
          value: newValue
        };
      });
    };
    this.getConfigureValue = () => {
      return this.state.value;
    };
    this.getContextValue = () => {
      if (!this._contextValue || this._contextValue.value !== this.state.value || this._contextValue.onChange !== this.onChange || this._contextValue.onRemove !== this.onRemove) {
        this._contextValue = {
          value: this.state.value,
          onChange: this.onChange,
          onRemove: this.onRemove
        };
      }
      return this._contextValue;
    };
    this.state = {
      value: props.value || props.defaultValue
    };
    this._contextValue = {
      value: this.state.value,
      onChange: this.onChange,
      onRemove: this.onRemove
    };
  }
  render() {
    const {
      children
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_context.Context.Provider, {
      value: this.getContextValue()
    }, children);
  }
}
Configure.contextType = _context.Context;
Configure.Button = _button.default;
Configure.Select = _select.default;
Configure.Mcp = _mcp.default;
Configure.RadioButton = _radioButton.default;
var _default = exports.default = Configure;