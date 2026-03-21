import { PureComponent, isValidElement, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { types as styledTypes, loops, delays, speeds } from '@douyinfe/semi-animation-styled';
import noop from './utils/noop';
import invokeFns from './utils/invokeFns';
const types = Object.values(styledTypes).reduce((arr, cur) => [...arr, ...cur], []);
export default class StyledAnimation extends PureComponent {
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
          return invokeFns([child && child.props && child.props.onAnimationIteration, props.onFrame], args);
        },
        onAnimationStart: function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return invokeFns([child && child.props && child.props.onAnimationStart, props.onStart], args);
        },
        onAnimationEnd: function () {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          return invokeFns([child && child.props && child.props.onAnimationEnd, props.onRest], args);
        }
      };
    };
    this._hasSpeedClass = function () {
      let speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.speed;
      return speed != null && speeds.includes(speed);
    };
    this._hasTypeClass = function () {
      let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.type;
      return type != null && types.includes(type);
    };
    this._hasDelayClass = function () {
      let delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.delay;
      return delay != null && delays.includes(delay);
    };
    this._hasLoopClass = function () {
      let loop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.loop;
      return loop != null && loops.includes(loop);
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
    const animateCls = className || classnames(`${prefixCls}-animated`, {
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
    if (/*#__PURE__*/isValidElement(children)) {
      children = Children.map(children, child => {
        const animateEvents = this._generateAnimateEvents(child, this.props);
        return /*#__PURE__*/cloneElement(child, Object.assign({
          className: classnames(child.props.className, animateCls),
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
StyledAnimation.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  speed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  reverse: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  loop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.any,
  onStart: PropTypes.func,
  onFrame: PropTypes.func,
  onRest: PropTypes.func,
  prefixCls: PropTypes.string,
  timing: PropTypes.string,
  duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fillMode: PropTypes.string
};
StyledAnimation.defaultProps = {
  prefixCls: 'semi',
  speed: 'faster',
  onFrame: noop,
  onStart: noop,
  onRest: noop
};