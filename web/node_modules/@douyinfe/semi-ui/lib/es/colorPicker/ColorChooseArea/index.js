import React from 'react';
import { hsvaToHslString, hsvaToRgba } from '@douyinfe/semi-foundation/lib/es/colorPicker/utils/convert';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/colorPicker/constants';
import cls from 'classnames';
import ColorChooseAreaFoundation from '@douyinfe/semi-foundation/lib/es/colorPicker/ColorChooseAreaFoundation';
import BaseComponent from "../../_base/baseComponent";
import { round } from '@douyinfe/semi-foundation/lib/es/colorPicker/utils/round';
class ColorChooseArea extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleClick = e => {
      this.foundation.setHandlePositionByMousePosition(e);
      this.foundation.handleMouseDown(e);
    };
    this.foundation = new ColorChooseAreaFoundation(this.adapter);
    this.state = {
      handlePosition: this.foundation.getHandlePositionByHSVA(),
      isHandleGrabbing: false
    };
    this.ref = /*#__PURE__*/React.createRef();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      getColorPickerFoundation: () => this.props.foundation,
      handleMouseDown: e => {
        this.setState({
          isHandleGrabbing: true
        });
        this.ref.current.addEventListener('mousemove', this.foundation.setHandlePositionByMousePosition);
        window.addEventListener('mouseup', this.foundation.handleMouseUp);
      },
      handleMouseUp: () => {
        this.ref.current.removeEventListener('mousemove', this.foundation.setHandlePositionByMousePosition);
        window.removeEventListener('mouseup', this.foundation.handleMouseUp);
        this.setState({
          isHandleGrabbing: false
        });
      },
      getDOM: () => this.ref.current,
      notifyChange: newColor => this.props.onChange(newColor)
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps.hsva) !== JSON.stringify(this.props.hsva)) {
      this.setState({
        handlePosition: this.foundation.getHandlePositionByHSVA()
      });
    }
  }
  render() {
    const areaBgStyle = hsvaToHslString({
      h: this.props.hsva.h,
      s: 100,
      v: 100,
      a: 1
    });
    const currentColor = hsvaToRgba(this.props.hsva);
    return /*#__PURE__*/React.createElement("div", {
      className: cls(`${cssClasses.PREFIX}-colorChooseArea`, this.props.className),
      style: Object.assign({
        backgroundColor: areaBgStyle,
        width: this.props.width,
        height: this.props.height,
        cursor: this.state.isHandleGrabbing ? 'grabbing' : 'pointer'
      }, this.props.style),
      ref: this.ref,
      "aria-label": "Color",
      onMouseDown: this.handleClick,
      "aria-valuetext": `Saturation ${round(this.props.hsva.s)}%, Brightness ${round(this.props.hsva.v)}%`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${cssClasses.PREFIX}-handle`,
      style: {
        width: this.props.handleSize,
        height: this.props.handleSize,
        left: this.state.handlePosition.x,
        top: this.state.handlePosition.y,
        backgroundColor: `rgba(${currentColor.r},${currentColor.g},${currentColor.b},${currentColor.a})`
      },
      onMouseDown: e => this.foundation.handleMouseDown(e)
    }));
  }
}
export default ColorChooseArea;