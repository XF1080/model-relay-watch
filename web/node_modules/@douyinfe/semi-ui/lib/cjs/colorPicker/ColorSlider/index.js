"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/colorPicker/foundation"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/colorPicker/constants");
var _classnames = _interopRequireDefault(require("classnames"));
var _ColorSliderFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/colorPicker/ColorSliderFoundation"));
var _baseComponent = _interopRequireDefault(require("../../_base/baseComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ColorSlider extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.handleClick = e => {
      this.foundation.setHandlePositionByMousePosition(e);
      this.foundation.handleMouseDown(e);
    };
    this.foundation = new _ColorSliderFoundation.default(this.adapter);
    this.state = {
      handlePosition: props.hue / 360 * props.width - props.handleSize / 2,
      isHandleGrabbing: false
    };
    this.ref = /*#__PURE__*/_react.default.createRef();
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
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(`${_constants.cssClasses.PREFIX}-colorSlider`, this.props.className),
      ref: this.ref,
      onMouseDown: this.handleClick,
      style: Object.assign({
        width: this.props.width,
        height: this.props.height
      }, this.props.style)
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${_constants.cssClasses.PREFIX}-handle`,
      style: {
        width: this.props.handleSize,
        height: this.props.handleSize,
        left: this.state.handlePosition,
        top: `50%`,
        transform: `translateY(-50%)`,
        backgroundColor: _foundation.default.hsvaToHslString({
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
var _default = exports.default = ColorSlider;