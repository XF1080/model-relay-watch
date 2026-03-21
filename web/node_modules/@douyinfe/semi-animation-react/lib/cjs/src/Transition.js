"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Animation = _interopRequireDefault(require("./Animation"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _noop = _interopRequireDefault(require("./utils/noop"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
class Transition extends _react.Component {
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(props);
    this._isControlled = () => [true, false, 'enter', 'leave'].includes(this.props.state);
    this.forwardInstance = instance => {
      this.instance = instance;
    };
    this.onRest = props => {
      const {
        state
      } = this.state;
      if (state === 'enter') {
        this.props.didEnter(props);
      } else if (state === 'leave') {
        this.setState({
          currentChildren: null,
          lastChildren: null
        });
        this.props.didLeave(props);
      }
      this.props.onRest(props);
    };
    this.onStart = props => {
      const {
        state
      } = this.state;
      if (state === 'enter') {
        this.props.willEnter(props);
      } else if (state === 'leave') {
        this.props.willLeave(props);
      }
      this.props.onStart(props);
    };
    this.state = {
      state: '',
      lastChildren: null,
      currentChildren: null
    };
  }
  static getDerivedStateFromProps(props, state) {
    const willUpdateStates = {};
    if (props.children !== state.currentChildren
    // && (props.children == null || state.currentChildren == null)
    ) {
      willUpdateStates.lastChildren = state.currentChildren;
      willUpdateStates.currentChildren = props.children;
      if (props.children == null) {
        willUpdateStates.state = 'leave';
      } else {
        willUpdateStates.state = 'enter';
      }
    }
    if (props.state != null) {
      willUpdateStates.state = props.state;
    }
    return willUpdateStates;
  }
  componentWillUnmount() {
    if (this.instance) {
      this.instance.destroy();
      this.instance = null;
    }
  }
  render() {
    const _a = this.props,
      {
        from: propsFrom,
        enter,
        leave
      } = _a,
      restProps = __rest(_a, ["from", "enter", "leave"]);
    let children;
    let {
      currentChildren,
      lastChildren,
      state
    } = this.state;
    let from = {};
    let to = {};
    const isControlled = this._isControlled();
    if (isControlled) {
      children = this.props.children;
      state = this.props.state;
    } else if (currentChildren == null && lastChildren == null) {
      return null;
    }
    if (state === 'enter') {
      from = propsFrom;
      to = enter;
      if (!isControlled) {
        children = currentChildren;
      }
    } else if (state === 'leave') {
      from = enter;
      to = leave;
      if (!isControlled) {
        children = lastChildren;
      }
    }
    return /*#__PURE__*/_react.default.createElement(_Animation.default, Object.assign({}, restProps, {
      force: true,
      from: from,
      to: to,
      onRest: this.onRest,
      onStart: this.onStart
    }), props =>
    // eslint-disable-next-line no-nested-ternary
    typeof children === 'function' ? children(props) : /*#__PURE__*/(0, _react.isValidElement)(children) ? children : null);
  }
}
exports.default = Transition;
Transition.propTypes = {
  children: _propTypes.default.any,
  from: _propTypes.default.object,
  enter: _propTypes.default.object,
  leave: _propTypes.default.object,
  willEnter: _propTypes.default.func,
  didEnter: _propTypes.default.func,
  willLeave: _propTypes.default.func,
  didLeave: _propTypes.default.func,
  state: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool])
};
Transition.defaultProps = {
  willEnter: _noop.default,
  didEnter: _noop.default,
  willLeave: _noop.default,
  didLeave: _noop.default,
  onStart: _noop.default,
  onRest: _noop.default
};