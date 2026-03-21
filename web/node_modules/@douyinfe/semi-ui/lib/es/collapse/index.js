import _isEqual from "lodash/isEqual";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/collapse/constants';
import CollapseFoundation from '@douyinfe/semi-foundation/lib/es/collapse/foundation';
import BaseComponent from '../_base/baseComponent';
import CollapsePanel from './item';
import '@douyinfe/semi-foundation/lib/es/collapse/collapse.css';
import { noop } from '@douyinfe/semi-foundation/lib/es/utils/function';
import CollapseContext from './collapse-context';
import { getDefaultPropsFromGlobalConfig } from '../_utils';
class Collapse extends BaseComponent {
  constructor(props) {
    super(props);
    this.onChange = (activeKey, e) => {
      this.foundation.handleChange(activeKey, e);
    };
    this.foundation = new CollapseFoundation(this.adapter);
    const initKeys = this.foundation.initActiveKey();
    this.state = {
      activeSet: new Set(initKeys)
    };
    this.onChange = this.onChange.bind(this);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      handleChange: (activeKey, e) => this.props.onChange(activeKey, e),
      addActiveKey: activeSet => this.setState({
        activeSet
      })
    });
  }
  static getDerivedStateFromProps(props, state) {
    if (props.activeKey) {
      const keys = Array.isArray(props.activeKey) ? props.activeKey : [props.activeKey];
      const newSet = new Set(keys);
      if (!_isEqual(newSet, state.activeSet)) {
        return Object.assign(Object.assign({}, state), {
          activeSet: newSet
        });
      }
      return state;
    }
    return state;
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  render() {
    const _a = this.props,
      {
        defaultActiveKey,
        lazyRender,
        accordion,
        style,
        motion,
        className,
        keepDOM,
        expandIconPosition,
        expandIcon,
        collapseIcon,
        children,
        clickHeaderToExpand
      } = _a,
      rest = __rest(_a, ["defaultActiveKey", "lazyRender", "accordion", "style", "motion", "className", "keepDOM", "expandIconPosition", "expandIcon", "collapseIcon", "children", "clickHeaderToExpand"]);
    const clsPrefix = cls(cssClasses.PREFIX, className);
    const {
      activeSet
    } = this.state;
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: clsPrefix,
      style: style
    }, this.getDataAttr(this.props)), /*#__PURE__*/React.createElement(CollapseContext.Provider, {
      value: {
        activeSet,
        expandIcon,
        collapseIcon,
        clickHeaderToExpand,
        keepDOM,
        expandIconPosition,
        onClick: this.onChange,
        motion,
        lazyRender
      }
    }, children));
  }
}
Collapse.Panel = CollapsePanel;
Collapse.propTypes = {
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  accordion: PropTypes.bool,
  clickHeaderToExpand: PropTypes.bool,
  onChange: PropTypes.func,
  expandIcon: PropTypes.node,
  collapseIcon: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  keepDOM: PropTypes.bool,
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
  expandIconPosition: PropTypes.oneOf(strings.iconPosition),
  lazyRender: PropTypes.bool
};
Collapse.__SemiComponentName__ = 'Collapse';
Collapse.defaultProps = getDefaultPropsFromGlobalConfig(Collapse.__SemiComponentName__, {
  defaultActiveKey: '',
  clickHeaderToExpand: true,
  onChange: noop,
  expandIconPosition: 'right',
  lazyRender: false
});
export default Collapse;