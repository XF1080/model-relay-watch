"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RowContext = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/grid/constants");
require("@douyinfe/semi-foundation/lib/cjs/grid/grid.css");
var _utils = require("../_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
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

const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
const RowContext = exports.RowContext = /*#__PURE__*/_react.default.createContext(null);
const responsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};
class Row extends _react.default.Component {
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
    this.unRegisters = Object.keys(responsiveMap).map(screen => (0, _utils.registerMediaQuery)(responsiveMap[screen], {
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
    const classes = (0, _classnames.default)({
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
    return /*#__PURE__*/_react.default.createElement(RowContext.Provider, {
      value: {
        gutters
      }
    }, /*#__PURE__*/_react.default.createElement("div", Object.assign({}, otherProps, {
      className: classes,
      style: rowStyle,
      "x-semi-prop": "children"
    }), children));
  }
}
Row.propTypes = {
  type: _propTypes.default.oneOf(['flex']),
  align: _propTypes.default.oneOf(['top', 'middle', 'bottom']),
  justify: _propTypes.default.oneOf(['start', 'end', 'center', 'space-around', 'space-between']),
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  children: _propTypes.default.node,
  gutter: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.number, _propTypes.default.array]),
  prefixCls: _propTypes.default.string
};
Row.defaultProps = {
  prefixCls: _constants.cssClasses.PREFIX
};
Row.RowContext = {
  gutters: _propTypes.default.any
};
var _default = exports.default = Row;