import _isEqual from "lodash/isEqual";
import React from 'react';
import Input from "../../input";
import InputGroup from "../../input/inputGroup";
import InputNumber from "../../inputNumber";
import Select from "../../select";
import Button from "../../button";
import ColorPickerFoundation from '@douyinfe/semi-foundation/lib/es/colorPicker/foundation';
import { IconEyedropper } from '@douyinfe/semi-icons';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/colorPicker/constants';
import BaseComponent from "../../_base/baseComponent";
import DataPartFoundation from '@douyinfe/semi-foundation/lib/es/colorPicker/DataPartFoundation';
class DataPart extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleChange = newColor => {
      this.props.foundation.handleChange(newColor, this.state.format);
    };
    this.foundation = new DataPartFoundation(this.adapter);
    this.state = {
      format: this.props.defaultFormat,
      inputValue: ''
    };
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      getColorPickerFoundation: () => this.props.foundation
    });
  }
  componentDidMount() {
    this.foundation.handleInputValueChange(this.foundation.getInputValue());
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!_isEqual(prevProps.currentColor, this.props.currentColor) || prevState.format !== this.state.format) {
      this.foundation.handleInputValueChange(this.foundation.getInputValue());
    }
  }
  render() {
    const rgba = this.props.currentColor.rgba;
    return /*#__PURE__*/React.createElement("div", {
      className: `${cssClasses.PREFIX}-dataPart`,
      style: {
        width: this.props.width
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `${cssClasses.PREFIX}-colorDemoBlock`,
      style: {
        minWidth: 20,
        minHeight: 20,
        backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }
    }), /*#__PURE__*/React.createElement(InputGroup, {
      size: 'small',
      className: `${cssClasses.PREFIX}-inputGroup`
    }, /*#__PURE__*/React.createElement(Input, {
      className: `${cssClasses.PREFIX}-colorPickerInput`,
      value: this.state.inputValue,
      onChange: v => {
        const value = this.foundation.getValueByInputValue(v);
        if (value) {
          this.handleChange(value);
        }
        this.foundation.handleInputValueChange(v);
      }
    }), this.props.alpha && /*#__PURE__*/React.createElement(InputNumber, {
      min: 0,
      max: 100,
      className: `${cssClasses.PREFIX}-colorPickerInputNumber`,
      value: Number(Math.round(this.props.currentColor.rgba.a * 100)),
      onNumberChange: v => {
        if (this.state.format === 'rgba') {
          this.handleChange(Object.assign(Object.assign({}, this.props.currentColor.rgba), {
            a: Number((v / 100).toFixed(2))
          }));
        } else if (this.state.format === 'hex') {
          const rgba = Object.assign(Object.assign({}, this.props.currentColor.rgba), {
            a: Number((v / 100).toFixed(2))
          });
          const hex = ColorPickerFoundation.rgbaToHex(rgba);
          this.handleChange(hex);
        } else if (this.state.format === 'hsva') {
          const rgba = Object.assign(Object.assign({}, this.props.currentColor.hsva), {
            a: Number((v / 100).toFixed(2))
          });
          this.handleChange(rgba);
        }
      },
      suffix: /*#__PURE__*/React.createElement("span", {
        className: `${cssClasses.PREFIX}-inputNumberSuffix`
      }, "%"),
      hideButtons: true
    }), /*#__PURE__*/React.createElement(Select, {
      className: `${cssClasses.PREFIX}-formatSelect`,
      size: 'small',
      value: this.state.format,
      onSelect: v => this.foundation.handleFormatChange(v),
      optionList: ['hex', 'rgba', 'hsva'].map(type => ({
        label: type,
        value: type
      }))
    })), this.props.eyeDropper && /*#__PURE__*/React.createElement(Button, {
      type: 'tertiary',
      theme: 'light',
      size: 'small',
      onClick: this.foundation.handlePickValueWithStraw,
      icon: /*#__PURE__*/React.createElement(IconEyedropper, null)
    }));
  }
}
export default DataPart;