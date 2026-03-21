var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { Component } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/progress/constants';
import getDataAttr from '@douyinfe/semi-foundation/lib/es/utils/getDataAttr';
import '@douyinfe/semi-foundation/lib/es/progress/progress.css';
import { Animation } from '@douyinfe/semi-animation';
import { generateColor } from '@douyinfe/semi-foundation/lib/es/progress/generates';
const prefixCls = cssClasses.PREFIX;
class Progress extends Component {
  constructor(props) {
    super(props);
    this._mounted = true;
    this._mounted = true;
    this.state = {
      percentNumber: this.props.percent // Specially used for animation of numbers
    };
  }
  componentDidUpdate(prevProps) {
    if (isNaN(this.props.percent) || isNaN(prevProps.percent)) {
      throw new Error('[Semi Progress]:percent can not be NaN');
      return;
    }
    if (prevProps.percent !== this.props.percent) {
      if (!this.props.motion) {
        this.setState({
          percentNumber: this.props.percent
        });
        return;
      }
      if (this.animation && this.animation.destroy) {
        this.animation.destroy();
      }
      this.animation = new Animation({
        from: {
          value: prevProps.percent
        },
        to: {
          value: this.props.percent
        }
      }, {
        // easing: 'cubic-bezier(0, .68, .3, 1)'
        easing: 'linear',
        duration: 300
      });
      this.animation.on('frame', props => {
        // prevent setState while component is unmounted but this timer is called
        if (this._mounted === false) {
          return;
        }
        // let percentNumber = Number.isInteger(props.value) ? props.value : Math.floor(props.value * 100) / 100;
        const percentNumber = parseInt(props.value);
        this.setState({
          percentNumber
        });
      });
      this.animation.on('rest', () => {
        // prevent setState while component is unmounted but this timer is called
        if (this._mounted === false) {
          return;
        }
        this.setState({
          percentNumber: this.props.percent
        });
      });
      this.animation.start();
    }
  }
  componentWillUnmount() {
    this.animation && this.animation.destroy();
    this._mounted = false;
  }
  renderCircleProgress() {
    const _a = this.props,
      {
        strokeLinecap,
        style,
        className,
        strokeWidth,
        format,
        size,
        stroke,
        strokeGradient,
        showInfo,
        percent,
        orbitStroke,
        id
      } = _a,
      rest = __rest(_a, ["strokeLinecap", "style", "className", "strokeWidth", "format", "size", "stroke", "strokeGradient", "showInfo", "percent", "orbitStroke", "id"]);
    const ariaLabel = this.props['aria-label'];
    const ariaLabelledBy = this.props['aria-labelledby'];
    const ariaValueText = this.props['aria-valuetext'];
    const {
      percentNumber
    } = this.state;
    const classNames = {
      wrapper: cls(`${prefixCls}-circle`, className),
      svg: cls(`${prefixCls}-circle-ring`),
      circle: cls(`${prefixCls}-circle-ring-inner`),
      track: cls(`${prefixCls}-circle-ring-track`)
    };
    const perc = this.calcPercent(percent);
    const percNumber = this.calcPercent(percentNumber);
    let width;
    if (this.props.width) {
      width = this.props.width;
    } else {
      size === strings.DEFAULT_SIZE ? width = 72 : width = 24;
    }
    // parse stroke & generate gradients
    const _stroke = this.selectStroke(stroke, percent, strokeGradient);
    // cx, cy is circle center
    const cy = width / 2;
    const cx = width / 2;
    const radius = (width - strokeWidth) / 2; // radius
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = (1 - perc / 100) * circumference; // Offset
    const strokeDasharray = `${circumference} ${circumference}`;
    const text = format(percNumber);
    return /*#__PURE__*/React.createElement("div", Object.assign({
      id: id,
      className: classNames.wrapper,
      style: style,
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": percNumber,
      "aria-labelledby": ariaLabelledBy,
      "aria-label": ariaLabel,
      "aria-valuetext": ariaValueText
    }, getDataAttr(rest)), /*#__PURE__*/React.createElement("svg", {
      key: size,
      className: classNames.svg,
      height: width,
      width: width,
      "aria-hidden": true
    }, /*#__PURE__*/React.createElement("circle", {
      className: classNames.track,
      strokeDashoffset: 0,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      strokeLinecap: strokeLinecap,
      fill: "transparent",
      style: {
        stroke: orbitStroke
      },
      r: radius,
      cx: cx,
      cy: cy,
      "aria-hidden": true
    }), /*#__PURE__*/React.createElement("circle", {
      className: classNames.circle,
      strokeDashoffset: strokeDashoffset,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      strokeLinecap: strokeLinecap,
      fill: "transparent",
      style: {
        stroke: _stroke
      },
      r: radius,
      cx: cx,
      cy: cy,
      "aria-hidden": true
    })), showInfo && size !== 'small' ? /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-circle-text`
    }, text) : null);
  }
  calcPercent(percent) {
    let perc;
    if (percent > 100) {
      perc = 100;
    } else if (percent < 0) {
      perc = 0;
    } else {
      perc = percent;
    }
    return perc;
  }
  selectStroke(stroke, percent, strokeGradient) {
    if (typeof stroke === 'string') {
      return stroke;
    }
    const color = generateColor(stroke, percent, strokeGradient);
    if (typeof color !== 'undefined') {
      return color;
    }
    return null;
  }
  renderLineProgress() {
    const _a = this.props,
      {
        className,
        style,
        stroke,
        strokeGradient,
        direction,
        format,
        showInfo,
        size,
        percent,
        orbitStroke,
        id
      } = _a,
      rest = __rest(_a, ["className", "style", "stroke", "strokeGradient", "direction", "format", "showInfo", "size", "percent", "orbitStroke", "id"]);
    const ariaLabel = this.props['aria-label'];
    const ariaLabelledBy = this.props['aria-labelledby'];
    const ariaValueText = this.props['aria-valuetext'];
    const {
      percentNumber
    } = this.state;
    const progressWrapperCls = cls(prefixCls, className, {
      [`${prefixCls}-horizontal`]: direction === strings.DEFAULT_DIRECTION,
      [`${prefixCls}-vertical`]: direction !== strings.DEFAULT_DIRECTION,
      [`${prefixCls}-large`]: size === 'large'
    });
    const progressTrackCls = cls({
      [`${prefixCls}-track`]: true
    });
    const innerCls = cls(`${prefixCls}-track-inner`);
    const perc = this.calcPercent(percent);
    const percNumber = this.calcPercent(percentNumber);
    // parse stroke & generate gradients
    const _stroke = this.selectStroke(stroke, percent, strokeGradient);
    const innerStyle = {
      background: _stroke
    };
    if (direction === strings.DEFAULT_DIRECTION) {
      innerStyle.width = `${perc}%`;
    } else {
      innerStyle.height = `${perc}%`;
    }
    const text = format(percNumber);
    return /*#__PURE__*/React.createElement("div", Object.assign({
      id: id,
      className: progressWrapperCls,
      style: style,
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": perc,
      "aria-labelledby": ariaLabelledBy,
      "aria-label": ariaLabel,
      "aria-valuetext": ariaValueText
    }, getDataAttr(rest)), /*#__PURE__*/React.createElement("div", {
      className: progressTrackCls,
      style: orbitStroke ? {
        backgroundColor: orbitStroke
      } : {},
      "aria-hidden": true
    }, /*#__PURE__*/React.createElement("div", {
      className: innerCls,
      style: innerStyle,
      "aria-hidden": true
    })), showInfo ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-line-text`
    }, text) : null);
  }
  render() {
    const {
      type
    } = this.props;
    if (type === 'line') {
      return this.renderLineProgress();
    } else {
      return this.renderCircleProgress();
    }
  }
}
Progress.propTypes = {
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-valuetext': PropTypes.string,
  className: PropTypes.string,
  direction: PropTypes.oneOf(strings.directions),
  format: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  id: PropTypes.string,
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
  orbitStroke: PropTypes.string,
  percent: PropTypes.number,
  scale: PropTypes.number,
  showInfo: PropTypes.bool,
  size: PropTypes.oneOf(strings.sizes),
  stroke: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.shape({
    percent: PropTypes.number,
    color: PropTypes.string
  }))]),
  strokeGradient: PropTypes.bool,
  strokeLinecap: PropTypes.oneOf(strings.strokeLineCap),
  strokeWidth: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.oneOf(strings.types),
  width: PropTypes.number
};
Progress.defaultProps = {
  className: '',
  direction: strings.DEFAULT_DIRECTION,
  format: text => `${text}%`,
  motion: true,
  percent: 0,
  showInfo: false,
  size: strings.DEFAULT_SIZE,
  strokeGradient: false,
  strokeLinecap: strings.DEFAULT_LINECAP,
  strokeWidth: 4,
  style: {},
  type: strings.DEFAULT_TYPE
};
export default Progress;