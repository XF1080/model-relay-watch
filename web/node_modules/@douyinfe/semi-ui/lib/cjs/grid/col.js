"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _row = require("./row");
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/grid/constants");
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
 * Implementation reference from: https://github.com/ant-design/ant-design/blob/master/components/grid/col.tsx
 */

const objectOrNumber = _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.number]);
class Col extends _react.default.Component {
  render() {
    const {
      props
    } = this;
    const {
        prefixCls,
        span,
        order,
        offset,
        push,
        pull,
        className,
        children
      } = props,
      others = __rest(props, ["prefixCls", "span", "order", "offset", "push", "pull", "className", "children"]);
    let sizeClassObj = {};
    const prefix = `${prefixCls}-col`;
    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
      let sizeProps = {};
      if (typeof props[size] === 'number') {
        sizeProps.span = props[size];
      } else if (typeof props[size] === 'object') {
        sizeProps = props[size] || {};
      }
      delete others[size];
      sizeClassObj = Object.assign(Object.assign({}, sizeClassObj), {
        [`${prefix}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
        [`${prefix}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
        [`${prefix}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
        [`${prefix}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
        [`${prefix}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0
      });
    });
    const classes = (0, _classnames.default)(prefix, {
      [`${prefix}-${span}`]: span !== undefined,
      [`${prefix}-order-${order}`]: order,
      [`${prefix}-offset-${offset}`]: offset,
      [`${prefix}-push-${push}`]: push,
      [`${prefix}-pull-${pull}`]: pull
    }, className, sizeClassObj);
    let {
      style
    } = others;
    let gutters;
    try {
      gutters = this.context.gutters;
    } catch (error) {
      throw new Error('please make sure <Col> inside <Row>');
    }
    style = Object.assign(Object.assign(Object.assign({}, gutters[0] > 0 ? {
      paddingLeft: gutters[0] / 2,
      paddingRight: gutters[0] / 2
    } : {}), gutters[1] > 0 ? {
      paddingTop: gutters[1] / 2,
      paddingBottom: gutters[1] / 2
    } : {}), style);
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, others, {
      style: style,
      className: classes,
      "x-semi-prop": "children"
    }), children);
  }
}
Col.contextType = _row.RowContext;
Col.propTypes = {
  span: _propTypes.default.number,
  order: _propTypes.default.number,
  offset: _propTypes.default.number,
  push: _propTypes.default.number,
  pull: _propTypes.default.number,
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  xs: objectOrNumber,
  sm: objectOrNumber,
  md: objectOrNumber,
  lg: objectOrNumber,
  xl: objectOrNumber,
  xxl: objectOrNumber,
  prefixCls: _propTypes.default.string
};
Col.defaultProps = {
  prefixCls: _constants.cssClasses.PREFIX
};
var _default = exports.default = Col;