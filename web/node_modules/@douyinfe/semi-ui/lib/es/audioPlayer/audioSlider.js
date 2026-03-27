import _noop from "lodash/noop";
import React from 'react';
import cls from 'classnames';
import '@douyinfe/semi-foundation/lib/es/audioPlayer/audioPlayer.css';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/audioPlayer/constants';
import Tooltip from '../tooltip';
import { formatTime } from './utils';
const prefixCls = cssClasses.PREFIX;
export default class AudioSlider extends React.Component {
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
    this.sliderRef = /*#__PURE__*/React.createRef();
    this.handleRef = /*#__PURE__*/React.createRef();
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
    const sliderContent = /*#__PURE__*/React.createElement("div", {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onMouseMove: this.handleMouseMove,
      className: cls(`${prefixCls}-slider-wrapper`, {
        [`${prefixCls}-slider-wrapper-vertical`]: vertical,
        [`${prefixCls}-slider-wrapper-horizontal`]: !vertical
      })
    }, /*#__PURE__*/React.createElement("div", {
      ref: this.sliderRef,
      className: cls(`${prefixCls}-slider`, `${prefixCls}-slider-${theme}`, {
        [`${prefixCls}-slider-vertical`]: vertical,
        [`${prefixCls}-slider-horizontal`]: !vertical
      }),
      style: {
        width: vertical ? isHovering ? 8 : 4 : width,
        height: vertical ? height : isHovering ? 8 : 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: cls(`${prefixCls}-slider-progress`, {
        [`${prefixCls}-slider-progress-vertical`]: vertical,
        [`${prefixCls}-slider-progress-horizontal`]: !vertical
      }),
      style: {
        height: vertical ? `${currentValue / max * 100}%` : '100%',
        width: vertical ? '100%' : `${currentValue / max * 100}%`
      }
    }), /*#__PURE__*/React.createElement("div", {
      ref: this.handleRef,
      className: cls(`${prefixCls}-slider-dot`),
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
    return showTooltip ? (/*#__PURE__*/React.createElement(Tooltip, {
      position: vertical ? 'right' : 'top',
      autoAdjustOverflow: true,
      content: formatTime((movingInfo === null || movingInfo === void 0 ? void 0 : movingInfo.progress) * max),
      style: {
        [vertical ? 'top' : 'left']: movingInfo === null || movingInfo === void 0 ? void 0 : movingInfo.offset
      }
    }, sliderContent)) : sliderContent;
  }
}
AudioSlider.defaultProps = {
  value: 0,
  onChange: _noop,
  max: 100,
  vertical: false,
  width: '100%',
  height: 4,
  showTooltip: true,
  disabled: false,
  theme: 'dark'
};