"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
require("@douyinfe/semi-foundation/lib/cjs/audioPlayer/audioPlayer.css");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/audioPlayer/constants");
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.PREFIX;
class AudioSlider extends _react.default.Component {
  constructor(props) {
    var _this;
    super(props);
    _this = this;
    this.handleMouseEnter = e => {
      this.setState({
        isHovering: true
      });
      this.handleMouseEvent(e, false);
    };
    this.handleMouseDown = e => {
      this.setState({
        isDragging: true
      });
      this.handleMouseEvent(e, true);
    };
    this.handleMouseUp = () => {
      if (this.state.isDragging) {
        this.setState({
          isDragging: false
        });
      }
    };
    this.handleMouseEvent = function (e) {
      let shouldSetValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!_this.sliderRef.current || _this.props.disabled) return;
      const rect = _this.sliderRef.current.getBoundingClientRect();
      const offset = _this.props.vertical ? rect.bottom - e.clientY : e.clientX - rect.left;
      const total = _this.props.vertical ? rect.height : rect.width;
      const percentage = Math.min(Math.max(offset / total, 0), 1);
      const value = percentage * _this.props.max;
      if (shouldSetValue && (_this.state.isDragging || e.type === 'mousedown')) {
        _this.props.onChange(value);
      }
      _this.setState({
        movingInfo: {
          progress: percentage,
          offset: _this.props.vertical ? offset - rect.height / 2 : offset - rect.width / 2
        }
      });
    };
    this.handleMouseMove = e => {
      this.handleMouseEvent(e, true);
    };
    this.handleMouseLeave = () => {
      this.setState({
        isHovering: false,
        isDragging: false
      });
    };
    this.state = {
      isDragging: false,
      isHovering: false,
      movingInfo: null
    };
    this.sliderRef = /*#__PURE__*/_react.default.createRef();
    this.handleRef = /*#__PURE__*/_react.default.createRef();
  }
  render() {
    const {
      vertical,
      width,
      height,
      showTooltip,
      max,
      value: currentValue,
      theme
    } = this.props;
    const {
      movingInfo,
      isHovering
    } = this.state;
    const sliderContent = /*#__PURE__*/_react.default.createElement("div", {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onMouseMove: this.handleMouseMove,
      className: (0, _classnames.default)(`${prefixCls}-slider-wrapper`, {
        [`${prefixCls}-slider-wrapper-vertical`]: vertical,
        [`${prefixCls}-slider-wrapper-horizontal`]: !vertical
      })
    }, /*#__PURE__*/_react.default.createElement("div", {
      ref: this.sliderRef,
      className: (0, _classnames.default)(`${prefixCls}-slider`, `${prefixCls}-slider-${theme}`, {
        [`${prefixCls}-slider-vertical`]: vertical,
        [`${prefixCls}-slider-horizontal`]: !vertical
      }),
      style: {
        width: vertical ? isHovering ? 8 : 4 : width,
        height: vertical ? height : isHovering ? 8 : 4
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(`${prefixCls}-slider-progress`, {
        [`${prefixCls}-slider-progress-vertical`]: vertical,
        [`${prefixCls}-slider-progress-horizontal`]: !vertical
      }),
      style: {
        height: vertical ? `${currentValue / max * 100}%` : '100%',
        width: vertical ? '100%' : `${currentValue / max * 100}%`
      }
    }), /*#__PURE__*/_react.default.createElement("div", {
      ref: this.handleRef,
      className: (0, _classnames.default)(`${prefixCls}-slider-dot`),
      style: {
        left: vertical ? '50%' : `calc(${currentValue / max * 100}% - 8px)`,
        bottom: vertical ? `calc(${currentValue / max * 100}% - 8px)` : undefined,
        top: vertical ? undefined : '50%',
        transform: vertical ? 'translateX(-50%)' : 'translateY(-50%)',
        opacity: isHovering ? 1 : 0,
        transition: 'opacity 0.2s',
        pointerEvents: 'none'
      }
    })));
    return showTooltip ? (/*#__PURE__*/_react.default.createElement(_tooltip.default, {
      position: vertical ? 'right' : 'top',
      autoAdjustOverflow: true,
      content: (0, _utils.formatTime)((movingInfo === null || movingInfo === void 0 ? void 0 : movingInfo.progress) * max),
      style: {
        [vertical ? 'top' : 'left']: movingInfo === null || movingInfo === void 0 ? void 0 : movingInfo.offset
      }
    }, sliderContent)) : sliderContent;
  }
}
exports.default = AudioSlider;
AudioSlider.defaultProps = {
  value: 0,
  onChange: _noop2.default,
  max: 100,
  vertical: false,
  width: '100%',
  height: 4,
  showTooltip: true,
  disabled: false,
  theme: 'dark'
};