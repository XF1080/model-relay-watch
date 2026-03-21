"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _semiAnimation = require("@douyinfe/semi-animation");
var _noop = _interopRequireDefault(require("./utils/noop"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable @typescript-eslint/ban-types */

class Animation extends _react.PureComponent {
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(props);
    this.initAnimation = props => {
      props = props == null ? this.props : props;
      let {
        from,
        to,
        config,
        reverse
      } = props;
      if (reverse) {
        [from, to] = [to, from];
      }
      this.animation = new _semiAnimation.Animation({
        from: Object.assign({}, from),
        to: Object.assign({}, to)
      }, Object.assign({}, config));
      _semiAnimation.events.forEach(event => {
        const propName = `on${event[0].toUpperCase() + event.slice(1)}`;
        // eslint-disable-next-line @typescript-eslint/no-shadow
        this.animation.on(event, props => {
          // avoid memory leak
          if (this._mounted && !this._destroyed) {
            this.setState({
              currentStyle: Object.assign({}, props)
            });
            this.props[propName](props);
          }
        });
      });
      this._destroyed = false;
    };
    this.bindEvents = () => {
      this.startOrNot = () => {
        const {
          immediate,
          autoStart
        } = this.props;
        if (immediate) {
          this.end();
        } else if (autoStart) {
          this.start();
        }
      };
      this.start = () => {
        this.animation && this.animation.start();
      };
      this.pause = () => {
        this.animation && this.animation.pause();
      };
      this.stop = () => {
        this.animation && this.animation.stop();
      };
      this.end = () => {
        this.animation && this.animation.end();
      };
      this.resume = () => {
        this.animation && this.animation.resume();
      };
      this.reset = () => {
        if (this.animation) {
          this.animation.reset();
          this.startOrNot();
        }
      };
      this.reverse = () => {
        if (this.animation) {
          this.animation.reverse();
          this.startOrNot();
        }
      };
      this.destroy = () => {
        this._destroyed = true;
        this.animation && this.animation.destroy();
      };
    };
    this.state = {
      currentStyle: {}
    };
    this._mounted = false;
    this._destroyed = false;
    this.initAnimation();
    this.bindEvents();
  }
  startOrNot() {
    throw new Error('Method not implemented.');
  }
  componentDidMount() {
    this._mounted = true;
    const {
      forwardInstance
    } = this.props;
    if (this.animation === null) {
      // didmount/willUnmount may be called twice when React.StrictMode is true in React 18, we need to ensure that this.animation is correct
      this.initAnimation();
      this.bindEvents();
    }
    if (typeof forwardInstance === 'function') {
      forwardInstance(this.animation);
    }
    this.startOrNot();
  }
  componentWillUnmount() {
    this._mounted = false;
    if (this.animation) {
      this.animation.destroy();
      this.animation = null;
    }
  }
  componentDidUpdate() {
    let prevProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (this.props.reset) {
      if (this.props.from !== prevProps.from || this.props.to !== prevProps.to) {
        this.destroy();
        this.initAnimation();
        this.startOrNot();
      }
    }
    if (this.props.force) {
      if (this.props.to !== prevProps.to) {
        this.initAnimation(Object.assign(Object.assign({}, this.props), {
          from: prevProps.to
        }));
        this.startOrNot();
      }
    }
  }
  render() {
    const {
      children
    } = this.props;
    if (typeof children === 'function') {
      return children(this.animation.getCurrentStates());
    } else if (/*#__PURE__*/(0, _react.isValidElement)(children)) {
      return children;
    } else {
      return null;
    }
  }
}
exports.default = Animation;
Animation.propTypes = {
  onStart: _propTypes.default.func,
  onFrame: _propTypes.default.func,
  onPause: _propTypes.default.func,
  onResume: _propTypes.default.func,
  onStop: _propTypes.default.func,
  onRest: _propTypes.default.func,
  children: _propTypes.default.any,
  from: _propTypes.default.object,
  to: _propTypes.default.object,
  reverse: _propTypes.default.bool,
  reset: _propTypes.default.bool,
  force: _propTypes.default.bool,
  config: _propTypes.default.object,
  autoStart: _propTypes.default.bool,
  forwardInstance: _propTypes.default.func,
  immediate: _propTypes.default.bool
};
Animation.defaultProps = {
  autoStart: true,
  force: false,
  onStart: _noop.default,
  onFrame: _noop.default,
  onPause: _noop.default,
  onResume: _noop.default,
  onStop: _noop.default,
  onRest: _noop.default
};