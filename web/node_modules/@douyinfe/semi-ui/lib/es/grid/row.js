var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/**
 * Implementation reference from: https://github.com/ant-design/ant-design/blob/master/components/grid/row.tsx
 */
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/grid/constants';
import '@douyinfe/semi-foundation/lib/es/grid/grid.css';
import { registerMediaQuery } from '../_utils';
const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
export const RowContext = /*#__PURE__*/React.createContext(null);
const responsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};
class Row extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      screens: {
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        xxl: true
      }
    };
    this.unRegisters = [];
  }
  componentDidMount() {
    this.unRegisters = Object.keys(responsiveMap).map(screen => registerMediaQuery(responsiveMap[screen], {
      match: () => {
        if (typeof this.props.gutter !== 'object') {
          return;
        }
        this.setState(prevState => ({
          screens: Object.assign(Object.assign({}, prevState.screens), {
            [screen]: true
          })
        }));
      },
      unmatch: () => {
        if (typeof this.props.gutter !== 'object') {
          return;
        }
        this.setState(prevState => ({
          screens: Object.assign(Object.assign({}, prevState.screens), {
            [screen]: false
          })
        }));
      }
    }));
  }
  componentWillUnmount() {
    this.unRegisters.forEach(unRegister => unRegister());
  }
  getGutter() {
    const {
      gutter = 0
    } = this.props;
    const results = [0, 0];
    const normalizedGutter = Array.isArray(gutter) ? gutter.slice(0, 2) : [gutter, 0];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object') {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint = responsiveArray[i];
          if (this.state.screens[breakpoint] && g[breakpoint] !== undefined) {
            results[index] = g[breakpoint];
            break;
          }
        }
      } else {
        results[index] = g || 0;
      }
    });
    return results;
  }
  render() {
    const _a = this.props,
      {
        prefixCls,
        type,
        justify,
        align,
        className,
        style,
        children
      } = _a,
      others = __rest(_a, ["prefixCls", "type", "justify", "align", "className", "style", "children"]);
    const gutters = this.getGutter();
    const prefix = `${prefixCls}-row`;
    const classes = classnames({
      [prefix]: type !== 'flex',
      [`${prefix}-${type}`]: type,
      [`${prefix}-${type}-${justify}`]: type && justify,
      [`${prefix}-${type}-${align}`]: type && align
    }, className);
    const rowStyle = Object.assign(Object.assign(Object.assign({}, gutters[0] > 0 ? {
      marginLeft: gutters[0] / -2,
      marginRight: gutters[0] / -2
    } : {}), gutters[1] > 0 ? {
      marginTop: gutters[1] / -2,
      marginBottom: gutters[1] / -2
    } : {}), style);
    const otherProps = Object.assign({}, others);
    delete otherProps.gutter;
    return /*#__PURE__*/React.createElement(RowContext.Provider, {
      value: {
        gutters
      }
    }, /*#__PURE__*/React.createElement("div", Object.assign({}, otherProps, {
      className: classes,
      style: rowStyle,
      "x-semi-prop": "children"
    }), children));
  }
}
Row.propTypes = {
  type: PropTypes.oneOf(['flex']),
  align: PropTypes.oneOf(['top', 'middle', 'bottom']),
  justify: PropTypes.oneOf(['start', 'end', 'center', 'space-around', 'space-between']),
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  gutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  prefixCls: PropTypes.string
};
Row.defaultProps = {
  prefixCls: cssClasses.PREFIX
};
Row.RowContext = {
  gutters: PropTypes.any
};
export default Row;