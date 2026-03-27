import _isFunction from "lodash/isFunction";
import _toString from "lodash/toString";
import _includes from "lodash/includes";
import _some from "lodash/some";
import _findIndex from "lodash/findIndex";
import _each from "lodash/each";
import _find from "lodash/find";
import _filter from "lodash/filter";
import _get from "lodash/get";
import _isEqualWith from "lodash/isEqualWith";
import { strings, numbers } from './constants';
import isNullOrUndefined from '../utils/isNullOrUndefined';
import Logger from '../utils/Logger';
export function equalWith(value, other, customizer) {
  return _isEqualWith(value, other, function (objVal, othVal) {
    if (typeof objVal === 'function' && typeof othVal === 'function') {
      return _toString(objVal) === _toString(othVal);
    }
    if (typeof customizer === 'function') {
      for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        rest[_key - 2] = arguments[_key];
      }
      return customizer(objVal, othVal, ...rest);
    }
    // If customizer returns undefined, comparisons are handled by isEqual instead
    return undefined;
  });
}
export function getColumnKey(column, keyPropNames) {
  keyPropNames = Array.isArray(keyPropNames) ? keyPropNames : ['key', 'dataIndex'];
  let key = null;
  _each(keyPropNames, propName => {
    key = _get(column, propName);
    if (key != null) {
      return false;
    }
    return undefined;
  });
  return key;
}
/**
 *
 * @param {Array<number>} arr
 * @param {number} [beginIndex] begin index, included
 * @param {number} [endIndex] end index, not included
 * @returns {number}
 */
export function arrayAdd() {
  let arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let beginIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  let endIndex = arguments.length > 2 ? arguments[2] : undefined;
  beginIndex = beginIndex < 0 || typeof beginIndex !== 'number' ? 0 : beginIndex;
  endIndex = endIndex > arr.length || typeof endIndex !== 'number' ? arr.length : endIndex;
  let result = 0;
  _each(arr, (value, index) => {
    if (index >= beginIndex && index < endIndex) {
      result += typeof value === 'number' && !isNaN(value) ? value : 0;
    }
  });
  return result;
}
export function isLastLeftFixed(columns, column) {
  let checkKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['key'];
  const leftFixedColumns = _filter(columns, col => col.fixed === true || col.fixed === 'left');
  const index = _findIndex(leftFixedColumns, col => checkKeys.every(key => col[key] != null && col[key] === column[key]));
  return leftFixedColumns.length > 0 && index === leftFixedColumns.length - 1;
}
export function isFirstFixedRight(columns, column) {
  let checkKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['key'];
  const rightFixedColumns = _filter(columns, col => col.fixed === 'right');
  const index = _findIndex(rightFixedColumns, col => checkKeys.every(key => col[key] != null && col[key] === column[key]));
  return rightFixedColumns.length > 0 && index === 0;
}
export function isAnyFixed(columns) {
  let fixedSet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['left', true, 'right'];
  if (typeof fixedSet === 'string' || typeof fixedSet === 'boolean') {
    fixedSet = [fixedSet];
  }
  return fixedSet.length > 0 && _some(columns, col => fixedSet.includes(col.fixed));
}
export function isAnyFixedRight(columns) {
  return _some(columns, col => col.fixed === 'right');
}
export function isFixedLeft(column) {
  return ['left', true].includes(_get(column, 'fixed'));
}
export function isFixedRight(column) {
  return ['right'].includes(_get(column, 'fixed'));
}
export function isFixed(column) {
  return isFixedLeft(column) || isFixedRight(column);
}
export function isInnerColumnKey(key) {
  return [strings.DEFAULT_KEY_COLUMN_EXPAND, strings.DEFAULT_KEY_COLUMN_SCROLLBAR, strings.DEFAULT_KEY_COLUMN_SELECTION].includes(key);
}
export function isExpandedColumn(column) {
  return _get(column, 'key') === strings.DEFAULT_KEY_COLUMN_EXPAND;
}
export function isScrollbarColumn(column) {
  return _get(column, 'key') === strings.DEFAULT_KEY_COLUMN_SCROLLBAR;
}
export function isSelectionColumn(column) {
  return _get(column, 'key') === strings.DEFAULT_KEY_COLUMN_SELECTION;
}
export function filterColumns(columns) {
  let ignoreKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [strings.DEFAULT_KEY_COLUMN_SCROLLBAR];
  return _filter(columns, col => !ignoreKeys.includes(col.key));
}
/**
 * get width of scroll bar
 * @param {Array} columns
 * @returns {Number|undefined}
 */
export function getScrollbarColumnWidth() {
  let columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  const len = columns.length;
  if (len) {
    const lastColumn = columns[len - 1];
    if (_get(lastColumn, 'key') === strings.DEFAULT_KEY_COLUMN_SCROLLBAR) {
      return _get(lastColumn, 'width', 0);
    }
  }
}
export function getRecordKey(record, rowKey) {
  if (rowKey === undefined) {
    rowKey = 'key';
  }
  return typeof rowKey === 'function' ? rowKey(record) : _get(record, rowKey);
}
/**
 * Determine whether the expandedRowKeys includes a key (rowKey will be added to expandedRowKeys when the expand button is clicked)
 * @param {*} expandedRowKeys
 * @param {*} key
 */
export function isExpanded(expandedRowKeys, key) {
  return key != null && _includes(expandedRowKeys, key);
}
/**
 * Determine whether the selectedKeysSet includes the key
 * @param {Set} selectedRowKeysSet
 * @param {String} key
 */
export function isSelected(selectedRowKeysSet, key) {
  return key !== null && selectedRowKeysSet.has(key);
}
/**
 * Whether the key is included in the disabledRowKeysSet
 * @param {Set} disabledRowKeysSet
 * @param {String} key
 */
export function isDisabled(disabledRowKeysSet, key) {
  return key !== null && disabledRowKeysSet.has(key);
}
export function getRecord(data, recordKey, rowKey) {
  if (rowKey === undefined) {
    rowKey = 'key';
  }
  return _find(data, record => recordKey != null && recordKey !== '' && getRecordKey(record, rowKey) === recordKey);
}
export function getRecordChildren(record, childrenRecordName) {
  if (childrenRecordName === undefined) {
    childrenRecordName = 'children';
  }
  return _get(record, childrenRecordName);
}
export function genExpandedRowKey() {
  let recordKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let suffix = arguments.length > 1 ? arguments[1] : undefined;
  if (suffix === undefined) {
    suffix = '__expanded_row';
  }
  return recordKey + suffix;
}
export function getDefaultVirtualizedRowConfig() {
  let size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let sectionRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const config = {};
  if (size === 'small') {
    config.height = sectionRow ? numbers.DEFAULT_VIRTUALIZED_SECTION_ROW_SMALL_HEIGHT : numbers.DEFAULT_VIRTUALIZED_ROW_SMALL_HEIGHT;
    config.minHeight = numbers.DEFAULT_VIRTUALIZED_ROW_SMALL_MIN_HEIGHT;
  } else if (size === 'middle') {
    config.height = sectionRow ? numbers.DEFAULT_VIRTUALIZED_SECTION_ROW_MIDDLE_HEIGHT : numbers.DEFAULT_VIRTUALIZED_ROW_MIDDLE_HEIGHT;
    config.minHeight = numbers.DEFAULT_VIRTUALIZED_ROW_MIDDLE_MIN_HEIGHT;
  } else {
    config.height = sectionRow ? numbers.DEFAULT_VIRTUALIZED_SECTION_ROW_HEIGHT : numbers.DEFAULT_VIRTUALIZED_ROW_HEIGHT;
    config.minHeight = numbers.DEFAULT_VIRTUALIZED_ROW_MIN_HEIGHT;
  }
  return config;
}
export function flattenColumns(cols) {
  let childrenColumnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';
  const list = [];
  if (Array.isArray(cols) && cols.length) {
    for (const col of cols) {
      if (Array.isArray(col[childrenColumnName]) && col[childrenColumnName].length) {
        list.push(...flattenColumns(col[childrenColumnName], childrenColumnName));
      } else {
        warnIfNoDataIndex(col);
        list.push(col);
      }
    }
  }
  return list;
}
export function assignColumnKeys(columns) {
  let childrenColumnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';
  let level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  const sameLevelCols = [];
  _each(columns, (column, index) => {
    if (column.key == null) {
      // if user give column a dataIndex, use it for backup
      const _index = column.dataIndex || index;
      column.key = `${level}-${_index}`;
    }
    if (Array.isArray(column[childrenColumnName]) && column[childrenColumnName].length) {
      sameLevelCols.push(...column[childrenColumnName]);
    }
  });
  if (sameLevelCols.length) {
    assignColumnKeys(sameLevelCols, childrenColumnName, level + 1);
  }
  return columns;
}
export function sliceColumnsByLevel(columns) {
  let targetLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  let childrenColumnName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  let currentLevel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  const slicedColumns = [];
  if (Array.isArray(columns) && columns.length && currentLevel <= targetLevel) {
    columns.forEach(column => {
      const children = column[childrenColumnName];
      if (Array.isArray(children) && children.length && currentLevel < targetLevel) {
        slicedColumns.push(...sliceColumnsByLevel(children, targetLevel, childrenColumnName, currentLevel + 1));
      } else {
        slicedColumns.push(column);
      }
    });
  }
  return slicedColumns;
}
export function getColumnsByLevel(columns) {
  let targetLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  let targetColumns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  let currentLevel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  let childrenColumnName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'children';
  if (Array.isArray(columns) && columns.length) {
    if (targetLevel === currentLevel) {
      targetColumns.push(...columns);
    } else {
      columns.forEach(column => {
        getColumnsByLevel(column[childrenColumnName], targetLevel, targetColumns, currentLevel + 1, childrenColumnName);
      });
    }
  }
  return targetColumns;
}
export function getAllLevelColumns(columns) {
  let childrenColumnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';
  const all = [];
  if (Array.isArray(columns) && columns.length) {
    all.push([...columns]);
    const sameLevelColumns = [];
    columns.forEach(column => {
      const children = column[childrenColumnName];
      if (Array.isArray(children) && children.length) {
        sameLevelColumns.push(...children);
      }
    });
    if (sameLevelColumns.length) {
      all.push(sameLevelColumns);
    }
  }
  return all;
}
export function getColumnByLevelIndex(columns, index) {
  let level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let childrenColumnName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';
  const allLevelColumns = getAllLevelColumns(columns, childrenColumnName);
  return allLevelColumns[level][index];
}
export function findColumn(columns, column) {
  let childrenColumnName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  let found;
  _each(columns, item => {
    if (item && item.key != null && !found) {
      if (item.key === column.key) {
        found = item;
      }
    }
    if (item && Array.isArray(item[childrenColumnName]) && !found) {
      found = findColumn(item[childrenColumnName], column, childrenColumnName);
    }
    if (found) {
      return false;
    }
    return undefined;
  });
  return found;
}
export function expandBtnShouldInRow(props) {
  const {
    expandedRowRender,
    dataSource,
    hideExpandedColumn,
    childrenRecordName,
    rowExpandable
  } = props;
  const hasExpandedRowRender = typeof expandedRowRender === 'function';
  return hideExpandedColumn && hasExpandedRowRender || !hasExpandedRowRender && dataSource.some(record => {
    const children = _get(record, childrenRecordName);
    if (Array.isArray(children) && children.length || rowExpandable(record)) {
      return true;
    } else {
      return false;
    }
  });
}
/**
 * merge query
 * @param {*} query
 * @param {*} queries
 */
export function mergeQueries(query) {
  let queries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let _mergedQuery;
  const idx = queries.findIndex(item => {
    if (query.dataIndex === item.dataIndex) {
      _mergedQuery = Object.assign(Object.assign({}, item), query);
      return true;
    }
    return false;
  });
  if (idx > -1) {
    queries.splice(idx, 1, _mergedQuery);
  } else {
    queries.push(_mergedQuery);
  }
  return [...queries];
}
/**
 * Replace the width of the newColumns column with the width of the column after resize
 * @param {Object[]} columns columns retain the column width after resize
 * @param {Object[]} newColumns
 */
export function withResizeWidth(columns, newColumns) {
  const _newColumns = [...newColumns];
  for (const column of columns) {
    if (!isNullOrUndefined(column.width)) {
      const currentColumn = column.key;
      const columnIndex = _findIndex(_newColumns, item => item.key === currentColumn);
      if (columnIndex !== -1) {
        _newColumns[columnIndex].width = _get(column, 'width');
      }
    }
  }
  return _newColumns;
}
/**
 * Pure function version of the same function in table foundation
 * This is not accessible in getDerivedStateFromProps, so fork one out
 */
export function getAllDisabledRowKeys(_ref) {
  let {
    dataSource,
    getCheckboxProps,
    childrenRecordName,
    rowKey
  } = _ref;
  const disabledRowKeys = [];
  if (Array.isArray(dataSource) && dataSource.length && typeof getCheckboxProps === 'function') {
    for (const record of dataSource) {
      const props = getCheckboxProps(record);
      const recordKey = typeof rowKey === 'function' ? rowKey(record) : _get(record, rowKey);
      if (props && props.disabled) {
        disabledRowKeys.push(recordKey);
      }
      const children = _get(record, childrenRecordName);
      if (Array.isArray(children) && children.length) {
        const keys = getAllDisabledRowKeys({
          dataSource: children,
          getCheckboxProps
        });
        disabledRowKeys.push(...keys);
      }
    }
  }
  return disabledRowKeys;
}
export function warnIfNoDataIndex(column) {
  if (typeof column === 'object' && column !== null) {
    const {
      filters,
      sorter,
      dataIndex,
      onFilter
    } = column;
    const logger = new Logger('[@douyinfe/semi-ui Table]');
    if ((Array.isArray(filters) || _isFunction(onFilter) || _isFunction(sorter)) && isNullOrUndefined(dataIndex)) {
      logger.warn(`The column with sorter or filter must pass the 'dataIndex' prop`);
    }
  }
}
/**
 * Whether is tree table
 */
export function isTreeTable(_ref2) {
  let {
    dataSource,
    childrenRecordName = 'children'
  } = _ref2;
  let flag = false;
  if (Array.isArray(dataSource)) {
    for (const data of dataSource) {
      const children = _get(data, childrenRecordName);
      if (Array.isArray(children) && children.length) {
        flag = true;
        break;
      }
    }
  }
  return flag;
}
export function getRTLAlign(align, direction) {
  if (direction === 'rtl') {
    switch (align) {
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      default:
        return align;
    }
  }
  return align;
}
export function getRTLFlexAlign(align, direction) {
  if (direction === 'rtl') {
    switch (align) {
      case 'left':
        return 'flex-end';
      case 'right':
        return 'flex-start';
      default:
        return align;
    }
  } else {
    switch (align) {
      case 'left':
        return 'flex-start';
      case 'right':
        return 'flex-end';
      default:
        return align;
    }
  }
}
export function shouldShowEllipsisTitle(ellipsis) {
  const shouldShowTitle = ellipsis === true || _get(ellipsis, 'showTitle', true);
  return shouldShowTitle;
}