"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayAdd = arrayAdd;
exports.assignColumnKeys = assignColumnKeys;
exports.equalWith = equalWith;
exports.expandBtnShouldInRow = expandBtnShouldInRow;
exports.filterColumns = filterColumns;
exports.findColumn = findColumn;
exports.flattenColumns = flattenColumns;
exports.genExpandedRowKey = genExpandedRowKey;
exports.getAllDisabledRowKeys = getAllDisabledRowKeys;
exports.getAllLevelColumns = getAllLevelColumns;
exports.getColumnByLevelIndex = getColumnByLevelIndex;
exports.getColumnKey = getColumnKey;
exports.getColumnsByLevel = getColumnsByLevel;
exports.getDefaultVirtualizedRowConfig = getDefaultVirtualizedRowConfig;
exports.getRTLAlign = getRTLAlign;
exports.getRTLFlexAlign = getRTLFlexAlign;
exports.getRecord = getRecord;
exports.getRecordChildren = getRecordChildren;
exports.getRecordKey = getRecordKey;
exports.getScrollbarColumnWidth = getScrollbarColumnWidth;
exports.isAnyFixed = isAnyFixed;
exports.isAnyFixedRight = isAnyFixedRight;
exports.isDisabled = isDisabled;
exports.isExpanded = isExpanded;
exports.isExpandedColumn = isExpandedColumn;
exports.isFirstFixedRight = isFirstFixedRight;
exports.isFixed = isFixed;
exports.isFixedLeft = isFixedLeft;
exports.isFixedRight = isFixedRight;
exports.isInnerColumnKey = isInnerColumnKey;
exports.isLastLeftFixed = isLastLeftFixed;
exports.isScrollbarColumn = isScrollbarColumn;
exports.isSelected = isSelected;
exports.isSelectionColumn = isSelectionColumn;
exports.isTreeTable = isTreeTable;
exports.mergeQueries = mergeQueries;
exports.shouldShowEllipsisTitle = shouldShowEllipsisTitle;
exports.sliceColumnsByLevel = sliceColumnsByLevel;
exports.warnIfNoDataIndex = warnIfNoDataIndex;
exports.withResizeWidth = withResizeWidth;
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _toString2 = _interopRequireDefault(require("lodash/toString"));
var _includes2 = _interopRequireDefault(require("lodash/includes"));
var _some2 = _interopRequireDefault(require("lodash/some"));
var _findIndex2 = _interopRequireDefault(require("lodash/findIndex"));
var _each2 = _interopRequireDefault(require("lodash/each"));
var _find2 = _interopRequireDefault(require("lodash/find"));
var _filter2 = _interopRequireDefault(require("lodash/filter"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _isEqualWith2 = _interopRequireDefault(require("lodash/isEqualWith"));
var _constants = require("./constants");
var _isNullOrUndefined = _interopRequireDefault(require("../utils/isNullOrUndefined"));
var _Logger = _interopRequireDefault(require("../utils/Logger"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function equalWith(value, other, customizer) {
  return (0, _isEqualWith2.default)(value, other, function (objVal, othVal) {
    if (typeof objVal === 'function' && typeof othVal === 'function') {
      return (0, _toString2.default)(objVal) === (0, _toString2.default)(othVal);
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
function getColumnKey(column, keyPropNames) {
  keyPropNames = Array.isArray(keyPropNames) ? keyPropNames : ['key', 'dataIndex'];
  let key = null;
  (0, _each2.default)(keyPropNames, propName => {
    key = (0, _get2.default)(column, propName);
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
function arrayAdd() {
  let arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let beginIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  let endIndex = arguments.length > 2 ? arguments[2] : undefined;
  beginIndex = beginIndex < 0 || typeof beginIndex !== 'number' ? 0 : beginIndex;
  endIndex = endIndex > arr.length || typeof endIndex !== 'number' ? arr.length : endIndex;
  let result = 0;
  (0, _each2.default)(arr, (value, index) => {
    if (index >= beginIndex && index < endIndex) {
      result += typeof value === 'number' && !isNaN(value) ? value : 0;
    }
  });
  return result;
}
function isLastLeftFixed(columns, column) {
  let checkKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['key'];
  const leftFixedColumns = (0, _filter2.default)(columns, col => col.fixed === true || col.fixed === 'left');
  const index = (0, _findIndex2.default)(leftFixedColumns, col => checkKeys.every(key => col[key] != null && col[key] === column[key]));
  return leftFixedColumns.length > 0 && index === leftFixedColumns.length - 1;
}
function isFirstFixedRight(columns, column) {
  let checkKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['key'];
  const rightFixedColumns = (0, _filter2.default)(columns, col => col.fixed === 'right');
  const index = (0, _findIndex2.default)(rightFixedColumns, col => checkKeys.every(key => col[key] != null && col[key] === column[key]));
  return rightFixedColumns.length > 0 && index === 0;
}
function isAnyFixed(columns) {
  let fixedSet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['left', true, 'right'];
  if (typeof fixedSet === 'string' || typeof fixedSet === 'boolean') {
    fixedSet = [fixedSet];
  }
  return fixedSet.length > 0 && (0, _some2.default)(columns, col => fixedSet.includes(col.fixed));
}
function isAnyFixedRight(columns) {
  return (0, _some2.default)(columns, col => col.fixed === 'right');
}
function isFixedLeft(column) {
  return ['left', true].includes((0, _get2.default)(column, 'fixed'));
}
function isFixedRight(column) {
  return ['right'].includes((0, _get2.default)(column, 'fixed'));
}
function isFixed(column) {
  return isFixedLeft(column) || isFixedRight(column);
}
function isInnerColumnKey(key) {
  return [_constants.strings.DEFAULT_KEY_COLUMN_EXPAND, _constants.strings.DEFAULT_KEY_COLUMN_SCROLLBAR, _constants.strings.DEFAULT_KEY_COLUMN_SELECTION].includes(key);
}
function isExpandedColumn(column) {
  return (0, _get2.default)(column, 'key') === _constants.strings.DEFAULT_KEY_COLUMN_EXPAND;
}
function isScrollbarColumn(column) {
  return (0, _get2.default)(column, 'key') === _constants.strings.DEFAULT_KEY_COLUMN_SCROLLBAR;
}
function isSelectionColumn(column) {
  return (0, _get2.default)(column, 'key') === _constants.strings.DEFAULT_KEY_COLUMN_SELECTION;
}
function filterColumns(columns) {
  let ignoreKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [_constants.strings.DEFAULT_KEY_COLUMN_SCROLLBAR];
  return (0, _filter2.default)(columns, col => !ignoreKeys.includes(col.key));
}
/**
 * get width of scroll bar
 * @param {Array} columns
 * @returns {Number|undefined}
 */
function getScrollbarColumnWidth() {
  let columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  const len = columns.length;
  if (len) {
    const lastColumn = columns[len - 1];
    if ((0, _get2.default)(lastColumn, 'key') === _constants.strings.DEFAULT_KEY_COLUMN_SCROLLBAR) {
      return (0, _get2.default)(lastColumn, 'width', 0);
    }
  }
}
function getRecordKey(record, rowKey) {
  if (rowKey === undefined) {
    rowKey = 'key';
  }
  return typeof rowKey === 'function' ? rowKey(record) : (0, _get2.default)(record, rowKey);
}
/**
 * Determine whether the expandedRowKeys includes a key (rowKey will be added to expandedRowKeys when the expand button is clicked)
 * @param {*} expandedRowKeys
 * @param {*} key
 */
function isExpanded(expandedRowKeys, key) {
  return key != null && (0, _includes2.default)(expandedRowKeys, key);
}
/**
 * Determine whether the selectedKeysSet includes the key
 * @param {Set} selectedRowKeysSet
 * @param {String} key
 */
function isSelected(selectedRowKeysSet, key) {
  return key !== null && selectedRowKeysSet.has(key);
}
/**
 * Whether the key is included in the disabledRowKeysSet
 * @param {Set} disabledRowKeysSet
 * @param {String} key
 */
function isDisabled(disabledRowKeysSet, key) {
  return key !== null && disabledRowKeysSet.has(key);
}
function getRecord(data, recordKey, rowKey) {
  if (rowKey === undefined) {
    rowKey = 'key';
  }
  return (0, _find2.default)(data, record => recordKey != null && recordKey !== '' && getRecordKey(record, rowKey) === recordKey);
}
function getRecordChildren(record, childrenRecordName) {
  if (childrenRecordName === undefined) {
    childrenRecordName = 'children';
  }
  return (0, _get2.default)(record, childrenRecordName);
}
function genExpandedRowKey() {
  let recordKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let suffix = arguments.length > 1 ? arguments[1] : undefined;
  if (suffix === undefined) {
    suffix = '__expanded_row';
  }
  return recordKey + suffix;
}
function getDefaultVirtualizedRowConfig() {
  let size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let sectionRow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const config = {};
  if (size === 'small') {
    config.height = sectionRow ? _constants.numbers.DEFAULT_VIRTUALIZED_SECTION_ROW_SMALL_HEIGHT : _constants.numbers.DEFAULT_VIRTUALIZED_ROW_SMALL_HEIGHT;
    config.minHeight = _constants.numbers.DEFAULT_VIRTUALIZED_ROW_SMALL_MIN_HEIGHT;
  } else if (size === 'middle') {
    config.height = sectionRow ? _constants.numbers.DEFAULT_VIRTUALIZED_SECTION_ROW_MIDDLE_HEIGHT : _constants.numbers.DEFAULT_VIRTUALIZED_ROW_MIDDLE_HEIGHT;
    config.minHeight = _constants.numbers.DEFAULT_VIRTUALIZED_ROW_MIDDLE_MIN_HEIGHT;
  } else {
    config.height = sectionRow ? _constants.numbers.DEFAULT_VIRTUALIZED_SECTION_ROW_HEIGHT : _constants.numbers.DEFAULT_VIRTUALIZED_ROW_HEIGHT;
    config.minHeight = _constants.numbers.DEFAULT_VIRTUALIZED_ROW_MIN_HEIGHT;
  }
  return config;
}
function flattenColumns(cols) {
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
function assignColumnKeys(columns) {
  let childrenColumnName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';
  let level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  const sameLevelCols = [];
  (0, _each2.default)(columns, (column, index) => {
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
function sliceColumnsByLevel(columns) {
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
function getColumnsByLevel(columns) {
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
function getAllLevelColumns(columns) {
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
function getColumnByLevelIndex(columns, index) {
  let level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let childrenColumnName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';
  const allLevelColumns = getAllLevelColumns(columns, childrenColumnName);
  return allLevelColumns[level][index];
}
function findColumn(columns, column) {
  let childrenColumnName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  let found;
  (0, _each2.default)(columns, item => {
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
function expandBtnShouldInRow(props) {
  const {
    expandedRowRender,
    dataSource,
    hideExpandedColumn,
    childrenRecordName,
    rowExpandable
  } = props;
  const hasExpandedRowRender = typeof expandedRowRender === 'function';
  return hideExpandedColumn && hasExpandedRowRender || !hasExpandedRowRender && dataSource.some(record => {
    const children = (0, _get2.default)(record, childrenRecordName);
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
function mergeQueries(query) {
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
function withResizeWidth(columns, newColumns) {
  const _newColumns = [...newColumns];
  for (const column of columns) {
    if (!(0, _isNullOrUndefined.default)(column.width)) {
      const currentColumn = column.key;
      const columnIndex = (0, _findIndex2.default)(_newColumns, item => item.key === currentColumn);
      if (columnIndex !== -1) {
        _newColumns[columnIndex].width = (0, _get2.default)(column, 'width');
      }
    }
  }
  return _newColumns;
}
/**
 * Pure function version of the same function in table foundation
 * This is not accessible in getDerivedStateFromProps, so fork one out
 */
function getAllDisabledRowKeys(_ref) {
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
      const recordKey = typeof rowKey === 'function' ? rowKey(record) : (0, _get2.default)(record, rowKey);
      if (props && props.disabled) {
        disabledRowKeys.push(recordKey);
      }
      const children = (0, _get2.default)(record, childrenRecordName);
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
function warnIfNoDataIndex(column) {
  if (typeof column === 'object' && column !== null) {
    const {
      filters,
      sorter,
      dataIndex,
      onFilter
    } = column;
    const logger = new _Logger.default('[@douyinfe/semi-ui Table]');
    if ((Array.isArray(filters) || (0, _isFunction2.default)(onFilter) || (0, _isFunction2.default)(sorter)) && (0, _isNullOrUndefined.default)(dataIndex)) {
      logger.warn(`The column with sorter or filter must pass the 'dataIndex' prop`);
    }
  }
}
/**
 * Whether is tree table
 */
function isTreeTable(_ref2) {
  let {
    dataSource,
    childrenRecordName = 'children'
  } = _ref2;
  let flag = false;
  if (Array.isArray(dataSource)) {
    for (const data of dataSource) {
      const children = (0, _get2.default)(data, childrenRecordName);
      if (Array.isArray(children) && children.length) {
        flag = true;
        break;
      }
    }
  }
  return flag;
}
function getRTLAlign(align, direction) {
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
function getRTLFlexAlign(align, direction) {
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
function shouldShowEllipsisTitle(ellipsis) {
  const shouldShowTitle = ellipsis === true || (0, _get2.default)(ellipsis, 'showTitle', true);
  return shouldShowTitle;
}