"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));
var _isArray2 = _interopRequireDefault(require("lodash/isArray"));
var _isString2 = _interopRequireDefault(require("lodash/isString"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/space/constants");
require("@douyinfe/semi-foundation/lib/cjs/space/space.css");
var _utils = require("./utils");
var _getDataAttr = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/getDataAttr"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.PREFIX;
class Space extends _react.PureComponent {
  render() {
    const {
      children = null,
      style,
      className,
      spacing,
      wrap,
      align,
      vertical
    } = this.props;
    const isWrap = wrap && vertical ? false : wrap;
    const realStyle = Object.assign({}, style);
    let spacingHorizontalType = '';
    let spacingVerticalType = '';
    if ((0, _isString2.default)(spacing)) {
      spacingHorizontalType = spacing;
      spacingVerticalType = spacing;
    } else if ((0, _isNumber2.default)(spacing)) {
      realStyle.rowGap = spacing;
      realStyle.columnGap = spacing;
    } else if ((0, _isArray2.default)(spacing)) {
      if ((0, _isString2.default)(spacing[0])) {
        spacingHorizontalType = spacing[0];
      } else if ((0, _isNumber2.default)(spacing[0])) {
        realStyle.columnGap = `${spacing[0]}px`;
      }
      if ((0, _isString2.default)(spacing[1])) {
        spacingVerticalType = spacing[1];
      } else if ((0, _isNumber2.default)(spacing[1])) {
        realStyle.rowGap = `${spacing[1]}px`;
      }
    }
    const classNames = (0, _classnames.default)(prefixCls, className, {
      [`${prefixCls}-align-${align}`]: align,
      [`${prefixCls}-vertical`]: vertical,
      [`${prefixCls}-horizontal`]: !vertical,
      [`${prefixCls}-wrap`]: isWrap,
      [`${prefixCls}-tight-horizontal`]: spacingHorizontalType === _constants.strings.SPACING_TIGHT,
      [`${prefixCls}-tight-vertical`]: spacingVerticalType === _constants.strings.SPACING_TIGHT,
      [`${prefixCls}-medium-horizontal`]: spacingHorizontalType === _constants.strings.SPACING_MEDIUM,
      [`${prefixCls}-medium-vertical`]: spacingVerticalType === _constants.strings.SPACING_MEDIUM,
      [`${prefixCls}-loose-horizontal`]: spacingHorizontalType === _constants.strings.SPACING_LOOSE,
      [`${prefixCls}-loose-vertical`]: spacingVerticalType === _constants.strings.SPACING_LOOSE
    });
    const childrenNodes = (0, _utils.flatten)(children);
    const dataAttributes = (0, _getDataAttr.default)(this.props);
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, dataAttributes, {
      className: classNames,
      style: realStyle,
      "x-semi-prop": "children"
    }), childrenNodes);
  }
}
Space.propTypes = {
  wrap: _propTypes.default.bool,
  align: _propTypes.default.oneOf(_constants.strings.ALIGN_SET),
  vertical: _propTypes.default.bool,
  spacing: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array]),
  children: _propTypes.default.node,
  style: _propTypes.default.object,
  className: _propTypes.default.string
};
Space.defaultProps = {
  vertical: false,
  wrap: false,
  spacing: 'tight',
  align: 'center'
};
var _default = exports.default = Space;