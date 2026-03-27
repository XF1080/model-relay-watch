"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _convert = require("@douyinfe/semi-foundation/lib/cjs/colorPicker/utils/convert");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/colorPicker/constants");
var _classnames = _interopRequireDefault(require("classnames"));
var _ColorChooseAreaFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/colorPicker/ColorChooseAreaFoundation"));
var _baseComponent = _interopRequireDefault(require("../../_base/baseComponent"));
var _round = require("@douyinfe/semi-foundation/lib/cjs/colorPicker/utils/round");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ColorChooseArea extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.handleClick = e => {
      this.foundation.setHandlePositionByMousePosition(e);
      this.foundation.handleMouseDown(e);
    };
    this.foundation = new _ColorChooseAreaFoundation.default(this.adapter);
    this.state = {
      handlePosition: this.foundation.getHandlePositionByHSVA(),
      isHandleGrabbing: false
    };
    this.ref = /*#__PURE__*/_react.default.createRef();
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
    const areaBgStyle = (0, _convert.hsvaToHslString)({
      h: this.props.hsva.h,
      s: 100,
      v: 100,
      a: 1
    });
    const currentColor = (0, _convert.hsvaToRgba)(this.props.hsva);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(`${_constants.cssClasses.PREFIX}-colorChooseArea`, this.props.className),
      style: Object.assign({
        backgroundColor: areaBgStyle,
        width: this.props.width,
        height: this.props.height,
        cursor: this.state.isHandleGrabbing ? 'grabbing' : 'pointer'
      }, this.props.style),
      ref: this.ref,
      "aria-label": "Color",
      onMouseDown: this.handleClick,
      "aria-valuetext": `Saturation ${(0, _round.round)(this.props.hsva.s)}%, Brightness ${(0, _round.round)(this.props.hsva.v)}%`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${_constants.cssClasses.PREFIX}-handle`,
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
var _default = exports.default = ColorChooseArea;