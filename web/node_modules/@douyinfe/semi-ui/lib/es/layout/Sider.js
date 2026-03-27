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
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/layout/constants';
import getDataAttr from '@douyinfe/semi-foundation/lib/es/utils/getDataAttr';
import LayoutContext from './layout-context';
import { registerMediaQuery } from '../_utils';
const responsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};
const generateId = (() => {
  let i = 0;
  return () => {
    i += 1;
    return `${cssClasses.PREFIX}-sider-${i}`;
  };
})();
const bpt = strings.BREAKPOINT;
class Sider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.unRegisters = [];
    this.uniqueId = '';
    this.uniqueId = generateId();
  }
  componentDidMount() {
    const {
      breakpoint
    } = this.props;
    const matchBpt = Object.keys(responsiveMap).filter(item => breakpoint && breakpoint.indexOf(item) !== -1);
    const unRegisters = matchBpt.map(screen => registerMediaQuery(responsiveMap[screen], {
      match: () => {
        this.responsiveHandler(screen, true);
      },
      unmatch: () => {
        this.responsiveHandler(screen, false);
      }
    }));
    this.unRegisters = unRegisters;
    if (this.context.siderHook) {
      this.context.siderHook.addSider(this.uniqueId);
    }
  }
  componentWillUnmount() {
    this.unRegisters.forEach(unRegister => unRegister());
    if (this.context.siderHook) {
      this.context.siderHook.removeSider(this.uniqueId);
    }
  }
  responsiveHandler(screen, matches) {
    const {
      onBreakpoint
    } = this.props;
    if (onBreakpoint) {
      onBreakpoint(screen, matches);
    }
  }
  render() {
    const _a = this.props,
      {
        prefixCls,
        className,
        children,
        style
      } = _a,
      others = __rest(_a, ["prefixCls", "className", "children", "style"]);
    const classString = cls(className, {
      [`${prefixCls}-sider`]: true
    });
    return /*#__PURE__*/React.createElement("aside", Object.assign({
      className: classString,
      "aria-label": this.props['aria-label'],
      style: style
    }, getDataAttr(others)), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-sider-children`
    }, children));
  }
}
Sider.propTypes = {
  prefixCls: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  breakpoint: PropTypes.arrayOf(PropTypes.oneOf(bpt)),
  onBreakpoint: PropTypes.func,
  'aria-label': PropTypes.string,
  role: PropTypes.string
};
Sider.defaultProps = {
  prefixCls: cssClasses.PREFIX
};
Sider.contextType = LayoutContext;
Sider.elementType = "Layout.Sider";
export default Sider;