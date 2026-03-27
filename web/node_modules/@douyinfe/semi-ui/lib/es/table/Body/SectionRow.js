import _isSet from "lodash/isSet";
import _get from "lodash/get";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { PureComponent, isValidElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/table/constants';
import { filterColumns } from '@douyinfe/semi-foundation/lib/es/table/utils';
import BaseRow from './BaseRow';
import TableContext from '../table-context';
/**
 * avoid affected by https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types
 */
export const sectionRowPropTypes = {
  record: PropTypes.object,
  index: PropTypes.number,
  columns: PropTypes.array,
  group: PropTypes.object.isRequired,
  groupKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  data: PropTypes.array,
  renderGroupSection: PropTypes.func,
  onGroupedRow: PropTypes.func,
  clickGroupedRowToExpand: PropTypes.bool,
  components: PropTypes.object,
  expanded: PropTypes.bool,
  prefixCls: PropTypes.string,
  onExpand: PropTypes.func,
  virtualized: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  style: PropTypes.object,
  renderExpandIcon: PropTypes.func,
  className: PropTypes.string,
  store: PropTypes.object,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func])
};
/**
 * Grouping component title row
 */
class SectionRow extends PureComponent {
  constructor() {
    var _this;
    super(...arguments);
    _this = this;
    this.onRow = function () {
      const {
        onGroupedRow,
        clickGroupedRowToExpand,
        onExpand,
        groupKey,
        expanded
      } = _this.props;
      const rowProps = {};
      if (typeof onGroupedRow === 'function') {
        Object.assign(rowProps, onGroupedRow(...arguments));
      }
      return Object.assign(Object.assign({}, rowProps), {
        onClick: e => {
          if (typeof onExpand === 'function' && clickGroupedRowToExpand) {
            onExpand(!expanded, groupKey, e);
          }
          if (typeof rowProps.onClick === 'function') {
            rowProps.onClick(e);
          }
        }
      });
    };
    this.collectGroupedData = () => {
      const {
        data,
        group,
        rowKey
      } = this.props;
      if (Array.isArray(data) && data.length && _isSet(group)) {
        return data.filter(record => {
          const realRowKey = typeof rowKey === 'function' ? rowKey(record) : _get(record, rowKey);
          return realRowKey != null && realRowKey !== '' && group.has(realRowKey);
        });
      }
      return [];
    };
    this.renderExpandIcon = record => {
      const {
        renderExpandIcon,
        groupKey
      } = this.props;
      if (typeof renderExpandIcon === 'function') {
        return renderExpandIcon(record, false, groupKey);
      }
      return null;
    };
  }
  isInnerColumnKey(key) {
    if (key != null) {
      return [strings.DEFAULT_KEY_COLUMN_EXPAND, strings.DEFAULT_KEY_COLUMN_SELECTION].includes(key);
    }
    return false;
  }
  render() {
    const {
      record,
      columns: propColumns = [],
      prefixCls,
      className,
      expanded,
      renderGroupSection,
      components,
      index,
      store,
      group,
      groupKey,
      virtualized,
      style
    } = this.props;
    const props = {};
    let column = {};
    let children = null;
    // render title
    const cell = typeof renderGroupSection === 'function' ? renderGroupSection(groupKey, [...group]) : null;
    if (/*#__PURE__*/isValidElement(cell)) {
      children = cell;
    } else if (cell && Object.prototype.toString.call(cell) === '[object Object]') {
      const _a = cell,
        {
          children: cellChildren
        } = _a,
        restProps = __rest(_a, ["children"]);
      children = cellChildren;
      column = Object.assign({}, restProps);
    }
    // Filter out scroll-bar column
    props.colSpan = filterColumns(propColumns).length;
    const columns = [Object.assign({
      render: () => ({
        props,
        children
      })
    }, column)];
    const rowCls = classnames(className, `${prefixCls}-row-section`, {
      on: expanded
    });
    const {
      getCellWidths
    } = this.context;
    const baseRowCellWidths = getCellWidths(columns, null, true);
    return /*#__PURE__*/React.createElement(BaseRow, {
      components: components,
      virtualized: virtualized,
      index: index,
      onRow: this.onRow,
      expanded: expanded,
      expandIcon: true,
      isSection: true,
      record: record,
      replaceClassName: rowCls,
      expandableRow: true,
      renderExpandIcon: this.renderExpandIcon,
      rowKey: groupKey,
      columns: columns,
      store: store,
      style: style,
      cellWidths: baseRowCellWidths
    });
  }
}
SectionRow.contextType = TableContext;
SectionRow.propTypes = sectionRowPropTypes;
SectionRow.defaultProps = {
  prefixCls: cssClasses.PREFIX,
  components: {
    body: {
      row: 'tr',
      cell: 'td'
    }
  }
};
export default SectionRow;