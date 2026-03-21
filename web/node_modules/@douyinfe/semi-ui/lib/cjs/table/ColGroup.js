"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/table/constants");
var _utils = require("@douyinfe/semi-foundation/lib/cjs/table/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ColGroup extends _react.default.PureComponent {
  render() {
    const {
      columns,
      className,
      style,
      prefixCls,
      components
    } = this.props;
    const ColGroup = (0, _get2.default)(components, 'colgroup.wrapper', 'colgroup');
    const Col = (0, _get2.default)(components, 'colgroup.col', 'col');
    const cols = (0, _utils.flattenColumns)(columns).map((column, idx) => {
      const colStyle = {};
      /**
       * table width
       */
      if (column.width) {
        colStyle.width = column.width;
        colStyle.minWidth = colStyle.width;
      }
      return /*#__PURE__*/_react.default.createElement(Col, {
        className: (0, _classnames.default)(`${prefixCls}-col`, column.className),
        key: column.key || column.dataIndex || idx,
        style: colStyle
      });
    });
    const groupCls = (0, _classnames.default)(`${prefixCls}-colgroup`, className);
    return /*#__PURE__*/_react.default.createElement(ColGroup, {
      className: groupCls,
      style: style
    }, cols);
  }
}
exports.default = ColGroup;
ColGroup.propTypes = {
  columns: _propTypes.default.array,
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  components: _propTypes.default.object
};
ColGroup.defaultProps = {
  columns: [],
  prefixCls: _constants.cssClasses.PREFIX
};