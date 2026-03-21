var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import Animation from './Animation';
import PropTypes from 'prop-types';
import React, { Component, isValidElement } from 'react';
import noop from './utils/noop';
export default class Transition extends Component {
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
    return /*#__PURE__*/React.createElement(Animation, Object.assign({}, restProps, {
      force: true,
      from: from,
      to: to,
      onRest: this.onRest,
      onStart: this.onStart
    }), props =>
    // eslint-disable-next-line no-nested-ternary
    typeof children === 'function' ? children(props) : /*#__PURE__*/isValidElement(children) ? children : null);
  }
}
Transition.propTypes = {
  children: PropTypes.any,
  from: PropTypes.object,
  enter: PropTypes.object,
  leave: PropTypes.object,
  willEnter: PropTypes.func,
  didEnter: PropTypes.func,
  willLeave: PropTypes.func,
  didLeave: PropTypes.func,
  state: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};
Transition.defaultProps = {
  willEnter: noop,
  didEnter: noop,
  willLeave: noop,
  didLeave: noop,
  onStart: noop,
  onRest: noop
};