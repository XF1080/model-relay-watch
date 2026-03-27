"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isNull2 = _interopRequireDefault(require("lodash/isNull"));
var _set2 = _interopRequireDefault(require("lodash/set"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/table/constants");
var _utils = require("@douyinfe/semi-foundation/lib/cjs/table/utils");
var _tableContext = _interopRequireDefault(require("../table-context"));
var _BaseRow = _interopRequireDefault(require("./BaseRow"));
var _utils2 = require("../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
 * Render expanded row
 */
class TableExpandedRow extends _react.PureComponent {
  render() {
    const {
      record,
      columns: propColumns = [],
      prefixCls,
      className,
      expanded,
      expandedRowRender,
      renderExpandIcon,
      index,
      store,
      components,
      style,
      virtualized,
      indentSize,
      cellWidths,
      displayNone
    } = this.props;
    const {
      tableWidth,
      anyColumnFixed,
      getCellWidths
    } = this.context;
    const cell = expandedRowRender(record, index, expanded);
    let children = null;
    const props = {};
    let column = {};
    if ((0, _isNull2.default)(cell)) {
      return null;
    } else if (/*#__PURE__*/(0, _react.isValidElement)(cell)) {
      children = cell;
    } else if (cell && Object.prototype.toString.call(cell) === '[object Object]') {
      const _a = cell,
        {
          children: cellChildren,
          fixed
        } = _a,
        restProps = __rest(_a, ["children", "fixed"]);
      children = cellChildren;
      column = Object.assign({}, restProps);
    }
    if ((0, _get2.default)(components, 'body.cell') !== _constants.strings.DEFAULT_COMPONENTS.body.cell) {
      if (virtualized) {
        (0, _set2.default)(props, 'style.height', '100%');
      }
      (0, _set2.default)(props, 'style.display', 'block');
      (0, _set2.default)(props, 'style.width', (0, _utils.arrayAdd)(cellWidths, 0, propColumns.length));
    } else {
      // Remove the row where the scroll bar is located
      props.colSpan = (0, _utils.filterColumns)(propColumns).length;
    }
    const columns = [Object.assign({
      render: () => ({
        props,
        children: (/*#__PURE__*/_react.default.createElement("div", {
          className: (0, _classnames.default)(`${prefixCls}-expand-inner`),
          style: {
            width: anyColumnFixed ? (0, _utils2.amendTableWidth)(tableWidth) : undefined
          }
        }, children))
      })
    }, column)];
    const rowCls = (0, _classnames.default)(className, `${prefixCls}-row-expand`);
    const baseRowCellWidths = getCellWidths(columns);
    return /*#__PURE__*/_react.default.createElement(_BaseRow.default, {
      style: style,
      components: components,
      className: rowCls,
      expandedRow: true,
      renderExpandIcon: renderExpandIcon,
      rowKey: `${record.key}-expanded-row`,
      columns: columns,
      store: store,
      virtualized: virtualized,
      indentSize: indentSize,
      cellWidths: baseRowCellWidths,
      displayNone: displayNone
    });
  }
}
exports.default = TableExpandedRow;
TableExpandedRow.contextType = _tableContext.default;
TableExpandedRow.propTypes = {
  cellWidths: _propTypes.default.array.isRequired,
  className: _propTypes.default.string,
  columns: _propTypes.default.array,
  components: _propTypes.default.object,
  defaultExpandAllRows: _propTypes.default.bool,
  defaultExpandedRowKeys: _propTypes.default.array,
  expandIcon: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.node, _propTypes.default.func]),
  expandRowByClick: _propTypes.default.bool,
  expanded: _propTypes.default.bool,
  expandedRowKeys: _propTypes.default.array,
  expandedRowRender: _propTypes.default.func,
  indentSize: _propTypes.default.number,
  index: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  onExpand: _propTypes.default.func,
  onExpandedRowsChange: _propTypes.default.func,
  prefixCls: _propTypes.default.string,
  record: _propTypes.default.object,
  renderExpandIcon: _propTypes.default.func,
  store: _propTypes.default.object,
  style: _propTypes.default.object,
  virtualized: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.object])
};
TableExpandedRow.defaultProps = {
  record: {},
  prefixCls: _constants.cssClasses.PREFIX
};