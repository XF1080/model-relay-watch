"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/progress/constants");
var _getDataAttr = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/getDataAttr"));
require("@douyinfe/semi-foundation/lib/cjs/progress/progress.css");
var _semiAnimation = require("@douyinfe/semi-animation");
var _generates = require("@douyinfe/semi-foundation/lib/cjs/progress/generates");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const prefixCls = _constants.cssClasses.PREFIX;
class Progress extends _react.Component {
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
      this.animation = new _semiAnimation.Animation({
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
      wrapper: (0, _classnames.default)(`${prefixCls}-circle`, className),
      svg: (0, _classnames.default)(`${prefixCls}-circle-ring`),
      circle: (0, _classnames.default)(`${prefixCls}-circle-ring-inner`),
      track: (0, _classnames.default)(`${prefixCls}-circle-ring-track`)
    };
    const perc = this.calcPercent(percent);
    const percNumber = this.calcPercent(percentNumber);
    let width;
    if (this.props.width) {
      width = this.props.width;
    } else {
      size === _constants.strings.DEFAULT_SIZE ? width = 72 : width = 24;
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
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
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
    }, (0, _getDataAttr.default)(rest)), /*#__PURE__*/_react.default.createElement("svg", {
      key: size,
      className: classNames.svg,
      height: width,
      width: width,
      "aria-hidden": true
    }, /*#__PURE__*/_react.default.createElement("circle", {
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
    }), /*#__PURE__*/_react.default.createElement("circle", {
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
    })), showInfo && size !== 'small' ? /*#__PURE__*/_react.default.createElement("span", {
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
    const color = (0, _generates.generateColor)(stroke, percent, strokeGradient);
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
    const progressWrapperCls = (0, _classnames.default)(prefixCls, className, {
      [`${prefixCls}-horizontal`]: direction === _constants.strings.DEFAULT_DIRECTION,
      [`${prefixCls}-vertical`]: direction !== _constants.strings.DEFAULT_DIRECTION,
      [`${prefixCls}-large`]: size === 'large'
    });
    const progressTrackCls = (0, _classnames.default)({
      [`${prefixCls}-track`]: true
    });
    const innerCls = (0, _classnames.default)(`${prefixCls}-track-inner`);
    const perc = this.calcPercent(percent);
    const percNumber = this.calcPercent(percentNumber);
    // parse stroke & generate gradients
    const _stroke = this.selectStroke(stroke, percent, strokeGradient);
    const innerStyle = {
      background: _stroke
    };
    if (direction === _constants.strings.DEFAULT_DIRECTION) {
      innerStyle.width = `${perc}%`;
    } else {
      innerStyle.height = `${perc}%`;
    }
    const text = format(percNumber);
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
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
    }, (0, _getDataAttr.default)(rest)), /*#__PURE__*/_react.default.createElement("div", {
      className: progressTrackCls,
      style: orbitStroke ? {
        backgroundColor: orbitStroke
      } : {},
      "aria-hidden": true
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: innerCls,
      style: innerStyle,
      "aria-hidden": true
    })), showInfo ? /*#__PURE__*/_react.default.createElement("div", {
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
  'aria-label': _propTypes.default.string,
  'aria-labelledby': _propTypes.default.string,
  'aria-valuetext': _propTypes.default.string,
  className: _propTypes.default.string,
  direction: _propTypes.default.oneOf(_constants.strings.directions),
  format: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node]),
  id: _propTypes.default.string,
  motion: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func, _propTypes.default.object]),
  orbitStroke: _propTypes.default.string,
  percent: _propTypes.default.number,
  scale: _propTypes.default.number,
  showInfo: _propTypes.default.bool,
  size: _propTypes.default.oneOf(_constants.strings.sizes),
  stroke: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.shape({
    percent: _propTypes.default.number,
    color: _propTypes.default.string
  }))]),
  strokeGradient: _propTypes.default.bool,
  strokeLinecap: _propTypes.default.oneOf(_constants.strings.strokeLineCap),
  strokeWidth: _propTypes.default.number,
  style: _propTypes.default.object,
  type: _propTypes.default.oneOf(_constants.strings.types),
  width: _propTypes.default.number
};
Progress.defaultProps = {
  className: '',
  direction: _constants.strings.DEFAULT_DIRECTION,
  format: text => `${text}%`,
  motion: true,
  percent: 0,
  showInfo: false,
  size: _constants.strings.DEFAULT_SIZE,
  strokeGradient: false,
  strokeLinecap: _constants.strings.DEFAULT_LINECAP,
  strokeWidth: 4,
  style: {},
  type: _constants.strings.DEFAULT_TYPE
};
var _default = exports.default = Progress;