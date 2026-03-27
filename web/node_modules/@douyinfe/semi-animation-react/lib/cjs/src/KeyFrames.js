"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _noop = _interopRequireDefault(require("./utils/noop"));
var _Animation = _interopRequireDefault(require("./Animation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class KeyFrames extends _react.Component {
  constructor() {
    var _this;
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(props);
    _this = this;
    this.onFrame = function () {
      let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const currentStyle = Object.assign({}, props);
      _this.props.onFrame(currentStyle);
      _this.setState({
        currentStyle
      });
    };
    this.next = () => {
      let {
        frameIndex
      } = this.state;
      const {
        frames,
        loop
      } = this.props;
      frameIndex++;
      if (frameIndex < frames.length - 1) {
        this.setState({
          frameIndex
        });
      } else {
        frameIndex = 0;
        this.props.onRest(this.state.currentStyle);
        if (loop) {
          this.setState({
            frameIndex
          });
        }
      }
      this.props.onKeyRest(this.state.currentStyle);
    };
    this.forwardInstance = instance => {
      this.instance = instance;
      if (typeof this.props.forwardInstance === 'function') {
        this.props.forwardInstance(this.instance);
      }
    };
    this.state = {
      currentStyle: {},
      frameIndex: 0
    };
  }
  componentDidMount() {
    // this.props.forwardInstance(this.instance);
  }
  componentWillUnmount() {
    this.instance && this.instance.destroy();
  }
  render() {
    const {
      children,
      frames
    } = this.props;
    const {
      frameIndex,
      currentStyle
    } = this.state;
    const from = frames[frameIndex];
    const to = frames[frameIndex + 1];
    return /*#__PURE__*/_react.default.createElement(_Animation.default, Object.assign({}, this.props, {
      forwardInstance: this.forwardInstance,
      from: from,
      to: to,
      onFrame: this.onFrame,
      onRest: this.next
    }), typeof children === 'function' ? children(currentStyle) : children);
  }
}
exports.default = KeyFrames;
KeyFrames.propTypes = {
  frames: _propTypes.default.array,
  loop: _propTypes.default.bool,
  onFrame: _propTypes.default.func,
  onKeyRest: _propTypes.default.func,
  onRest: _propTypes.default.func
};
KeyFrames.defaultProps = {
  frames: [],
  loop: false,
  onKeyRest: _noop.default,
  onRest: _noop.default,
  onFrame: _noop.default
};