"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _convert = require("@douyinfe/semi-foundation/lib/cjs/colorPicker/utils/convert");
var _round = require("@douyinfe/semi-foundation/lib/cjs/colorPicker/utils/round");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/colorPicker/constants");
var _baseComponent = _interopRequireDefault(require("../../_base/baseComponent"));
var _AlphaSliderFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/colorPicker/AlphaSliderFoundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AlphaSlider extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.handleClick = e => {
      this.foundation.setHandlePositionByMousePosition(e);
      this.foundation.handleMouseDown(e);
    };
    this.foundation = new _AlphaSliderFoundation.default(this.adapter);
    this.state = {
      handlePosition: props.hsva.a * props.width - props.handleSize / 2,
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
    if (prevProps.hsva.a !== this.props.hsva.a) {
      this.setState({
        handlePosition: this.props.hsva.a * this.props.width - this.props.handleSize / 2
      });
    }
  }
  render() {
    const colorFrom = (0, _convert.hsvaToHslaString)(Object.assign(Object.assign({}, this.props.hsva), {
      a: 0
    }));
    const colorTo = (0, _convert.hsvaToHslaString)(Object.assign(Object.assign({}, this.props.hsva), {
      a: 1
    }));
    const alphaSliderBackground = `linear-gradient(90deg, ${colorFrom}, ${colorTo})`;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `${_constants.cssClasses.PREFIX}-alphaSlider`,
      ref: this.ref,
      "aria-label": "Alpha",
      "aria-valuetext": `${(0, _round.round)(this.props.hsva.a * 100)}%`,
      onMouseDown: this.handleClick,
      style: Object.assign({
        width: this.props.width,
        height: this.props.height
      }, this.props.style)
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${_constants.cssClasses.PREFIX}-alphaSliderInner`,
      style: {
        background: alphaSliderBackground
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${_constants.cssClasses.PREFIX}-alphaHandle`,
      style: {
        width: this.props.handleSize,
        height: this.props.handleSize,
        left: this.state.handlePosition,
        top: `50%`,
        transform: `translateY(-50%)`,
        backgroundColor: (0, _convert.hsvaToRgbaString)(this.props.hsva)
      },
      onMouseDown: e => this.foundation.handleMouseDown(e)
    })));
  }
}
var _default = exports.default = AlphaSlider;