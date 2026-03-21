"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/table/constants");
var _pagination = _interopRequireDefault(require("../pagination"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TablePagination extends _react.PureComponent {
  render() {
    const {
      pagination,
      prefixCls,
      info,
      renderPagination
    } = this.props;
    const total = (0, _get2.default)(pagination, 'total');
    const customPagination = renderPagination && (0, _isFunction2.default)(renderPagination) ? renderPagination(pagination) : null;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-pagination-outer`
    }, /*#__PURE__*/(0, _react.isValidElement)(customPagination) ? customPagination : (/*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-pagination-info`
    }, info), /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-pagination-wrapper`
    }, total > 0 ? /*#__PURE__*/_react.default.createElement(_pagination.default, Object.assign({}, pagination, {
      key: (0, _get2.default)(pagination, 'pageSize', 'pagination')
    })) : null))));
  }
}
exports.default = TablePagination;
TablePagination.propTypes = {
  style: _propTypes.default.object,
  prefixCls: _propTypes.default.string,
  pagination: _propTypes.default.object,
  info: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  renderPagination: _propTypes.default.func
};
TablePagination.defaultProps = {
  prefixCls: _constants.cssClasses.PREFIX
};