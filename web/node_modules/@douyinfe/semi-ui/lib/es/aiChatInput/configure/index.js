import React from 'react';
import { Context } from './context';
import ConfigureButton from './button';
import ConfigureSelect from './select';
import ConfigureMcp from './mcp';
import ConfigureRadioButton from './radioButton';
class Configure extends React.Component {
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
    return /*#__PURE__*/React.createElement(Context.Provider, {
      value: this.getContextValue()
    }, children);
  }
}
Configure.contextType = Context;
Configure.Button = ConfigureButton;
Configure.Select = ConfigureSelect;
Configure.Mcp = ConfigureMcp;
Configure.RadioButton = ConfigureRadioButton;
export default Configure;