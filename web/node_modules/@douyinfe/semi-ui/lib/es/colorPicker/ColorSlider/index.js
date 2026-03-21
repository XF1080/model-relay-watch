import React from 'react';
import ColorPickerFoundation from '@douyinfe/semi-foundation/lib/es/colorPicker/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/colorPicker/constants';
import cls from 'classnames';
import ColorSliderFoundation from '@douyinfe/semi-foundation/lib/es/colorPicker/ColorSliderFoundation';
import BaseComponent from "../../_base/baseComponent";
class ColorSlider extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleClick = e => {
      this.foundation.setHandlePositionByMousePosition(e);
      this.foundation.handleMouseDown(e);
    };
    this.foundation = new ColorSliderFoundation(this.adapter);
    this.state = {
      handlePosition: props.hue / 360 * props.width - props.handleSize / 2,
      isHandleGrabbing: false
    };
    this.ref = /*#__PURE__*/React.createRef();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      handleMouseDown: e => {
        this.setState({
          isHandleGrabbing: true
        });
        window.addEventListener('mousemove', this.foundation.setHandlePositionByMousePosition);
        window.addEventListener('mouseup', this.foundation.handleMouseUp);
      },
      handleMouseUp: e => {
        this.setState({
          isHandleGrabbing: false
        });
        window.removeEventListener('mousemove', this.foundation.setHandlePositionByMousePosition);
        window.removeEventListener('mouseup', this.foundation.handleMouseUp);
      },
      getColorPickerFoundation: () => this.props.foundation,
      getDOM: () => this.ref.current
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.hue !== this.props.hue) {
      this.setState({
        handlePosition: this.props.hue / 360 * this.props.width - this.props.handleSize / 2
      });
    }
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: cls(`${cssClasses.PREFIX}-colorSlider`, this.props.className),
      ref: this.ref,
      onMouseDown: this.handleClick,
      style: Object.assign({
        width: this.props.width,
        height: this.props.height
      }, this.props.style)
    }, /*#__PURE__*/React.createElement("div", {
      className: `${cssClasses.PREFIX}-handle`,
      style: {
        width: this.props.handleSize,
        height: this.props.handleSize,
        left: this.state.handlePosition,
        top: `50%`,
        transform: `translateY(-50%)`,
        backgroundColor: ColorPickerFoundation.hsvaToHslString({
          h: this.props.hue,
          s: 100,
          v: 100,
          a: 1
        })
      },
      onMouseDown: e => this.foundation.handleMouseDown(e)
    }));
  }
}
export default ColorSlider;