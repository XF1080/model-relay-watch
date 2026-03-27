var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import BaseComponent from '../_base/baseComponent';
import { cssClasses as css, strings } from '@douyinfe/semi-foundation/lib/es/spin/constants';
import SpinFoundation from '@douyinfe/semi-foundation/lib/es/spin/foundation';
import SpinIcon from './icon';
import '@douyinfe/semi-foundation/lib/es/spin/spin.css';
import { getDefaultPropsFromGlobalConfig } from '../_utils';
const prefixCls = css.PREFIX;
class Spin extends BaseComponent {
  constructor(props) {
    super(props);
    this.foundation = new SpinFoundation(this.adapter);
    this.state = {
      delay: props.delay,
      loading: true
    };
  }
  static getDerivedStateFromProps(props) {
    if (!props.delay) {
      return {
        loading: props.spinning
      };
    }
    if (props.spinning === false) {
      return {
        delay: 0,
        loading: false
      };
    }
    return {
      delay: props.delay
    };
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setLoading: value => {
        this.setState({
          loading: value
        });
      }
    });
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  renderSpin() {
    const {
      indicator,
      tip
    } = this.props;
    const {
      loading
    } = this.state;
    return loading ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-wrapper`
    }, indicator ? (/*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-animate`,
      "x-semi-prop": "indicator"
    }, indicator)) : (/*#__PURE__*/React.createElement(SpinIcon, null)), tip ? /*#__PURE__*/React.createElement("div", {
      "x-semi-prop": "tip"
    }, tip) : null) : null;
  }
  render() {
    this.foundation.updateLoadingIfNeedDelay();
    const _a = this.props,
      {
        children,
        style,
        wrapperClassName,
        childStyle,
        size
      } = _a,
      rest = __rest(_a, ["children", "style", "wrapperClassName", "childStyle", "size"]);
    const {
      loading
    } = this.state;
    const spinCls = cls(prefixCls, wrapperClassName, {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-block`]: children,
      [`${prefixCls}-hidden`]: !loading
    });
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: spinCls,
      style: style
    }, this.getDataAttr(rest)), this.renderSpin(), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-children`,
      style: childStyle,
      "x-semi-prop": "children"
    }, children));
  }
}
Spin.propTypes = {
  size: PropTypes.oneOf(strings.SIZE),
  spinning: PropTypes.bool,
  children: PropTypes.node,
  indicator: PropTypes.node,
  delay: PropTypes.number,
  tip: PropTypes.node,
  wrapperClassName: PropTypes.string,
  childStyle: PropTypes.object,
  style: PropTypes.object
};
Spin.__SemiComponentName__ = "Spin";
Spin.defaultProps = getDefaultPropsFromGlobalConfig(Spin.__SemiComponentName__, {
  size: 'middle',
  spinning: true,
  children: null,
  indicator: null,
  delay: 0
});
export default Spin;