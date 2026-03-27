import React from 'react';
import { hsvaToHslaString, hsvaToRgbaString } from '@douyinfe/semi-foundation/lib/es/colorPicker/utils/convert';
import { round } from '@douyinfe/semi-foundation/lib/es/colorPicker/utils/round';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/colorPicker/constants';
import BaseComponent from "../../_base/baseComponent";
import AlphaSliderFoundation from '@douyinfe/semi-foundation/lib/es/colorPicker/AlphaSliderFoundation';
class AlphaSlider extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleClick = e => {
      this.foundation.setHandlePositionByMousePosition(e);
      this.foundation.handleMouseDown(e);
    };
    this.foundation = new AlphaSliderFoundation(this.adapter);
    this.state = {
      handlePosition: props.hsva.a * props.width - props.handleSize / 2,
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
    if (prevProps.hsva.a !== this.props.hsva.a) {
      this.setState({
        handlePosition: this.props.hsva.a * this.props.width - this.props.handleSize / 2
      });
    }
  }
  render() {
    const colorFrom = hsvaToHslaString(Object.assign(Object.assign({}, this.props.hsva), {
      a: 0
    }));
    const colorTo = hsvaToHslaString(Object.assign(Object.assign({}, this.props.hsva), {
      a: 1
    }));
    const alphaSliderBackground = `linear-gradient(90deg, ${colorFrom}, ${colorTo})`;
    return /*#__PURE__*/React.createElement("div", {
      className: `${cssClasses.PREFIX}-alphaSlider`,
      ref: this.ref,
      "aria-label": "Alpha",
      "aria-valuetext": `${round(this.props.hsva.a * 100)}%`,
      onMouseDown: this.handleClick,
      style: Object.assign({
        width: this.props.width,
        height: this.props.height
      }, this.props.style)
    }, /*#__PURE__*/React.createElement("div", {
      className: `${cssClasses.PREFIX}-alphaSliderInner`,
      style: {
        background: alphaSliderBackground
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `${cssClasses.PREFIX}-alphaHandle`,
      style: {
        width: this.props.handleSize,
        height: this.props.handleSize,
        left: this.state.handlePosition,
        top: `50%`,
        transform: `translateY(-50%)`,
        backgroundColor: hsvaToRgbaString(this.props.hsva)
      },
      onMouseDown: e => this.foundation.handleMouseDown(e)
    })));
  }
}
export default AlphaSlider;