import React from 'react';
import ColorPickerFoundation from '@douyinfe/semi-foundation/lib/es/colorPicker/foundation';
import BaseComponent from '../_base/baseComponent';
import ColorChooseArea from './ColorChooseArea';
import AlphaSlider from './AlphaSlider';
import ColorSlider from './ColorSlider';
import DataPart from './DataPart';
import cls from 'classnames';
import '@douyinfe/semi-foundation/lib/es/colorPicker/colorPicker.css';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/colorPicker/constants';
import Popover from '../popover';
import { hexToHsva, hexToRgba, hsvaStringToHsva, hsvaToHex, hsvaToRgba, rgbaStringToHsva, rgbaStringToRgba, rgbaToHex, rgbStringToHsva, rgbStringToRgba } from '@douyinfe/semi-foundation/lib/es/colorPicker/utils/convert';
class ColorPicker extends BaseComponent {
  constructor(props) {
    var _a;
    super(props);
    this.foundation = new ColorPickerFoundation(this.adapter);
    const initValue = (_a = props.value) !== null && _a !== void 0 ? _a : props.defaultValue;
    this.state = {
      currentColor: initValue
    };
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      notifyChange: value => {
        var _a, _b;
        (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
      }
    });
  }
  renderPicker() {
    var _a, _b, _c, _d, _e;
    const {
      className: userClassName
    } = this.props;
    const className = cls(`${cssClasses.PREFIX}`, userClassName);
    const currentColor = this.foundation.getCurrentColor();
    return /*#__PURE__*/React.createElement("div", {
      className: className
    }, this.props.topSlot, /*#__PURE__*/React.createElement(ColorChooseArea, {
      hsva: currentColor.hsva,
      foundation: this.foundation,
      onChange: _ref => {
        let {
          s,
          v
        } = _ref;
        this.foundation.handleChange({
          s,
          v,
          a: currentColor.hsva.a,
          h: currentColor.hsva.h
        }, 'hsva');
      },
      handleSize: 20,
      width: (_a = this.props.width) !== null && _a !== void 0 ? _a : 280,
      height: (_b = this.props.height) !== null && _b !== void 0 ? _b : 280
    }), /*#__PURE__*/React.createElement(ColorSlider, {
      width: (_c = this.props.width) !== null && _c !== void 0 ? _c : 280,
      height: 10,
      handleSize: 18,
      hue: currentColor.hsva.h,
      className: 'colorSliderWrapper',
      foundation: this.foundation
    }), this.props.alpha && /*#__PURE__*/React.createElement(AlphaSlider, {
      width: (_d = this.props.width) !== null && _d !== void 0 ? _d : 280,
      height: 10,
      handleSize: 18,
      hsva: currentColor.hsva,
      className: 'alphaSliderWrapper',
      foundation: this.foundation
    }), /*#__PURE__*/React.createElement(DataPart, {
      currentColor: currentColor,
      eyeDropper: this.props.eyeDropper,
      alpha: this.props.alpha,
      width: (_e = this.props.width) !== null && _e !== void 0 ? _e : 280,
      foundation: this.foundation,
      defaultFormat: this.props.defaultFormat
    }), this.props.bottomSlot);
  }
  render() {
    var _a, _b;
    const currentColor = this.foundation.getCurrentColor();
    if (this.props.usePopover) {
      return /*#__PURE__*/React.createElement(Popover, Object.assign({}, this.props.popoverProps, {
        className: cls(`${cssClasses.PREFIX}-popover`, (_a = this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.className),
        content: this.renderPicker()
      }), (_b = this.props.children) !== null && _b !== void 0 ? _b : /*#__PURE__*/React.createElement("div", {
        style: {
          backgroundColor: currentColor.hex
        },
        className: cls(`${cssClasses.PREFIX}-popover-defaultChildren`)
      }));
    } else {
      return this.renderPicker();
    }
  }
}
ColorPicker.__SemiComponentName__ = "ColorPicker";
ColorPicker.defaultProps = {
  defaultValue: {
    hsva: {
      h: 176,
      s: 71,
      v: 77,
      a: 1
    },
    rgba: {
      r: 57,
      g: 197,
      b: 187,
      a: 1
    },
    hex: '#39c5bb'
  },
  eyeDropper: true,
  defaultFormat: 'hex'
};
ColorPicker.colorStringToValue = raw => {
  if (raw.startsWith("#")) {
    return {
      hsva: hexToHsva(raw),
      rgba: hexToRgba(raw),
      hex: raw
    };
  } else if (raw.startsWith('rgba')) {
    const rgba = rgbaStringToRgba(raw);
    return {
      hsva: rgbaStringToHsva(raw),
      rgba: rgba,
      hex: rgbaToHex(rgba)
    };
  } else if (raw.startsWith("rgb")) {
    const rgba = rgbStringToRgba(raw);
    return {
      hsva: rgbStringToHsva(raw),
      rgba: rgba,
      hex: rgbaToHex(rgba)
    };
  } else if (raw.startsWith("hsv")) {
    const hsva = hsvaStringToHsva(raw);
    const rgba = hsvaToRgba(hsva);
    const hex = hsvaToHex(hsva);
    return {
      hsva,
      rgba,
      hex
    };
  } else {
    throw new Error("Semi ColorPicker: error on static colorStringToValue method, input value is invalid: " + raw);
  }
};
export * from '@douyinfe/semi-foundation/lib/es/colorPicker/interface';
export default ColorPicker;