import _isFunction from "lodash/isFunction";
import _noop from "lodash/noop";
import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../_base/baseComponent';
import { strings, cssClasses } from '@douyinfe/semi-foundation/lib/es/table/constants';
import { shouldShowEllipsisTitle } from '@douyinfe/semi-foundation/lib/es/table/utils';
import TableHeaderRow from './TableHeaderRow';
function parseHeaderRows(columns) {
  const rows = [];
  function fillRowCells(columns, colIndex) {
    let parents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let rowIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    let level = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    // Init rows
    rows[rowIndex] = rows[rowIndex] || [];
    let currentColIndex = colIndex;
    const colSpans = columns.map(column => {
      const cell = {
        key: column.key,
        className: column.className || '',
        children: _isFunction(column.title) ? column.title() : column.title,
        column,
        colStart: currentColIndex,
        level,
        parents
      };
      let colSpan = 1;
      /**
        * Calculate header column merge colSpan
        *  - If the current cell has children, colSpan = the sum of children rowSpan
        *  - If the current cell has no children, colSpan = 1
        */
      const subColumns = column.children;
      if (subColumns && subColumns.length > 0) {
        colSpan = fillRowCells(subColumns, currentColIndex, [...parents, cell], rowIndex + 1, level + 1).reduce((total, count) => total + count, 0);
        cell.hasSubColumns = true;
      }
      if ('colSpan' in column) {
        ({
          colSpan
        } = column);
      }
      if ('rowSpan' in column) {
        cell.rowSpan = column.rowSpan;
      }
      if (column.key === strings.DEFAULT_KEY_COLUMN_SCROLLBAR) {
        cell['x-type'] = strings.DEFAULT_KEY_COLUMN_SCROLLBAR;
      }
      cell.colSpan = colSpan;
      cell.colEnd = cell.colStart + colSpan - 1;
      rows[rowIndex].push(cell);
      currentColIndex += colSpan;
      const ellipsis = column === null || column === void 0 ? void 0 : column.ellipsis;
      const shouldShowTitle = shouldShowEllipsisTitle(ellipsis);
      if (shouldShowTitle && typeof cell.children === 'string') {
        cell.title = cell.children;
      }
      return colSpan;
    });
    return colSpans;
  }
  // Generate `rows` cell data
  fillRowCells(columns, 0);
  /**
   * Calculate header row merge rowSpan
   *  - If the current cell has no children, you need to calculate rowSpan, rowSpan = the total number of rows in the header-which row currently belongs to
   *  - If the current cell has children, there is no need to calculate rowSpan
   *
   * 计算表头行合并 rowSpan
   *  - 如果当前cell没有children，则需要计算rowSpan，rowSpan = 表头总行数 - 当前属于第几行
   *  - 如果当前cell有children，则无需计算rowSpan
   */
  const rowCount = rows.length;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    rows[rowIndex].forEach(cell => {
      if (!('rowSpan' in cell) && !cell.hasSubColumns) {
        cell.rowSpan = rowCount - rowIndex;
      }
    });
  }
  return rows;
}
/**
 * Render the header of the table header, and control the merging of the columns of the header
 */
class TableHeader extends BaseComponent {
  get adapter() {
    return Object.assign({}, super.adapter);
  }
  render() {
    const {
      components,
      columns,
      prefixCls,
      fixed,
      onHeaderRow,
      forwardedRef,
      selectedRowKeysSet
    } = this.props;
    const rows = parseHeaderRows(columns);
    const HeaderWrapper = components.header.wrapper;
    return /*#__PURE__*/React.createElement(HeaderWrapper, {
      className: `${prefixCls}-thead`,
      ref: forwardedRef
    }, rows.map((row, idx) => (/*#__PURE__*/React.createElement(TableHeaderRow, {
      prefixCls: prefixCls,
      key: idx,
      index: idx,
      fixed: fixed,
      columns: columns,
      row: row,
      components: components,
      onHeaderRow: onHeaderRow,
      selectedRowKeysSet: selectedRowKeysSet
    }))));
  }
}
TableHeader.propTypes = {
  components: PropTypes.any,
  columns: PropTypes.array,
  columnManager: PropTypes.object,
  prefixCls: PropTypes.string,
  onHeaderRow: PropTypes.func,
  onDidUpdate: PropTypes.func,
  fixed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  selectedRowKeysSet: PropTypes.instanceOf(Set).isRequired
};
TableHeader.defaultProps = {
  columns: [],
  prefixCls: cssClasses.PREFIX,
  onHeaderRow: _noop,
  onDidUpdate: _noop,
  components: {
    header: {
      wrapper: 'thead',
      row: 'tr',
      cell: 'th'
    }
  }
};
export default /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(TableHeader, Object.assign({}, props, {
  forwardedRef: ref
})));