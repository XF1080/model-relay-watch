import _throttle from "lodash/throttle";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import BaseComponent from '../_base/baseComponent';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/backtop/constants';
import BackTopFoundation from '@douyinfe/semi-foundation/lib/es/backtop/foundation';
import '@douyinfe/semi-foundation/lib/es/backtop/backtop.css';
import IconButton from '../iconButton';
import { IconChevronUp } from '@douyinfe/semi-icons';
import { getDefaultPropsFromGlobalConfig } from "../_utils";
const prefixCls = cssClasses.PREFIX;
const getDefaultTarget = () => window;
export default class BackTop extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.foundation = new BackTopFoundation(this.adapter);
  }
  componentDidMount() {
    var _a;
    this.foundation.init();
    this.handler = _throttle(this.handleClick, (_a = this.props.duration) !== null && _a !== void 0 ? _a : BackTop.defaultProps.duration);
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      updateVisible: visible => {
        this.setState({
          visible
        });
      },
      notifyClick: e => {
        this.props.onClick && this.props.onClick(e);
      },
      targetIsWindow: target => target === window,
      isWindowUndefined: () => window === undefined,
      targetScrollToTop: (targetNode, scrollTop) => {
        if (targetNode === window) {
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
        } else {
          targetNode.scrollTop = scrollTop;
        }
      }
    });
  }
  handleClick(e) {
    this.foundation.onClick(e);
  }
  renderDefault() {
    return /*#__PURE__*/React.createElement(IconButton, {
      theme: "light",
      icon: /*#__PURE__*/React.createElement(IconChevronUp, null)
    });
  }
  render() {
    const _a = this.props,
      {
        children,
        className,
        style,
        onClick,
        visibilityHeight,
        target
      } = _a,
      others = __rest(_a, ["children", "className", "style", "onClick", "visibilityHeight", "target"]);
    const {
      visible
    } = this.state;
    const preCls = cls(prefixCls, className);
    const backtopBtn = children ? children : this.renderDefault();
    const content = visible ? (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    React.createElement("div", Object.assign({}, others, {
      className: preCls,
      style: style,
      onClick: e => this.handler(e),
      "x-semi-prop": "children"
    }), backtopBtn)) : null;
    return content;
  }
}
BackTop.__SemiComponentName__ = "BackTop";
BackTop.defaultProps = getDefaultPropsFromGlobalConfig(BackTop.__SemiComponentName__, {
  visibilityHeight: 400,
  target: getDefaultTarget,
  duration: 450
});
BackTop.propTypes = {
  target: PropTypes.func,
  visibilityHeight: PropTypes.number,
  duration: PropTypes.number,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
};