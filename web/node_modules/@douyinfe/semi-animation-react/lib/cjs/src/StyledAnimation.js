"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _semiAnimationStyled = require("@douyinfe/semi-animation-styled");
var _noop = _interopRequireDefault(require("./utils/noop"));
var _invokeFns = _interopRequireDefault(require("./utils/invokeFns"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const types = Object.values(_semiAnimationStyled.types).reduce((arr, cur) => [...arr, ...cur], []);
class StyledAnimation extends _react.PureComponent {
  constructor() {
    var _this;
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(props);
    _this = this;
    this._generateAnimateEvents = function (child) {
      let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return {
        onAnimationIteration: function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return (0, _invokeFns.default)([child && child.props && child.props.onAnimationIteration, props.onFrame], args);
        },
        onAnimationStart: function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return (0, _invokeFns.default)([child && child.props && child.props.onAnimationStart, props.onStart], args);
        },
        onAnimationEnd: function () {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          return (0, _invokeFns.default)([child && child.props && child.props.onAnimationEnd, props.onRest], args);
        }
      };
    };
    this._hasSpeedClass = function () {
      let speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.speed;
      return speed != null && _semiAnimationStyled.speeds.includes(speed);
    };
    this._hasTypeClass = function () {
      let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.type;
      return type != null && types.includes(type);
    };
    this._hasDelayClass = function () {
      let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.delay;
      return delay != null && _semiAnimationStyled.delays.includes(delay);
    };
    this._hasLoopClass = function () {
      let loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.loop;
      return loop != null && _semiAnimationStyled.loops.includes(loop);
    };
  }
  render() {
    let {
      type,
      speed,
      duration,
      delay,
      loop,
      reverse,
      children,
      prefixCls,
      timing,
      className,
      fillMode
    } = this.props;
    const hasTypeClass = this._hasTypeClass();
    const hasSpeedClass = this._hasSpeedClass();
    const hasDelayClass = this._hasDelayClass();
    const hasLoopClass = this._hasLoopClass();
    const animateCls = className || (0, _classnames.default)(`${prefixCls}-animated`, {
      [`${prefixCls}-${type}`]: Boolean(type),
      [`${prefixCls}-speed-${speed}`]: hasSpeedClass,
      [`${prefixCls}-delay-${delay}`]: hasDelayClass,
      [`${prefixCls}-loop-${loop}`]: hasLoopClass
    });
    const animateStyle = {
      animationTimingFunction: timing,
      animationName: !hasTypeClass && type,
      animationDuration: duration,
      animationDelay: !hasDelayClass && delay,
      animationIterationCount: !hasLoopClass && loop,
      animationDirection: reverse ? 'alternate' : 'normal',
      animationFillMode: fillMode
    };
    if (/*#__PURE__*/(0, _react.isValidElement)(children)) {
      children = _react.Children.map(children, child => {
        const animateEvents = this._generateAnimateEvents(child, this.props);
        return /*#__PURE__*/(0, _react.cloneElement)(child, Object.assign({
          className: (0, _classnames.default)(child.props.className, animateCls),
          style: Object.assign(Object.assign({}, child.props.style), this.props.style)
        }, animateEvents));
      });
    }
    return typeof children === 'function' ? children({
      animateCls,
      animateStyle,
      animateEvents: this._generateAnimateEvents(null, this.props)
    }) : children;
  }
}
exports.default = StyledAnimation;
StyledAnimation.propTypes = {
  className: _propTypes.default.string,
  type: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.any]),
  speed: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  delay: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  reverse: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  loop: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  children: _propTypes.default.any,
  onStart: _propTypes.default.func,
  onFrame: _propTypes.default.func,
  onRest: _propTypes.default.func,
  prefixCls: _propTypes.default.string,
  timing: _propTypes.default.string,
  duration: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  fillMode: _propTypes.default.string
};
StyledAnimation.defaultProps = {
  prefixCls: 'semi',
  speed: 'faster',
  onFrame: _noop.default,
  onStart: _noop.default,
  onRest: _noop.default
};