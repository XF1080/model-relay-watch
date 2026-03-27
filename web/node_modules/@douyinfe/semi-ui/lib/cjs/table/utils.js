"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.amendTableWidth = amendTableWidth;
Object.defineProperty(exports, "cloneDeep", {
  enumerable: true,
  get: function () {
    return _utils.cloneDeep;
  }
});
exports.getNextSortOrder = getNextSortOrder;
exports.logger = void 0;
exports.measureScrollbar = measureScrollbar;
exports.mergeColumns = mergeColumns;
exports.mergeComponents = mergeComponents;
var _map2 = _interopRequireDefault(require("lodash/map"));
var _find2 = _interopRequireDefault(require("lodash/find"));
var _clone2 = _interopRequireDefault(require("lodash/clone"));
var _merge2 = _interopRequireDefault(require("lodash/merge"));
var _Logger = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/Logger"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/table/constants");
var _utils = require("../_utils");
var _utils2 = require("@douyinfe/semi-foundation/lib/cjs/table/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let scrollbarVerticalSize, scrollbarHorizontalSize;
// Measure scrollbar width for padding body during modal show/hide
const scrollbarMeasure = {
  position: 'absolute',
  top: '-9999px',
  width: '50px',
  height: '50px'
};
/**
 * @param {'vertical'|'horizontal'} [direction]
 * @returns {number}
 */
function measureScrollbar() {
  let direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'vertical';
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return 0;
  }
  const isVertical = direction === 'vertical';
  if (isVertical && scrollbarVerticalSize) {
    return scrollbarVerticalSize;
  } else if (!isVertical && scrollbarHorizontalSize) {
    return scrollbarHorizontalSize;
  }
  const scrollDiv = document.createElement('div');
  Object.keys(scrollbarMeasure).forEach(scrollProp => {
    scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
  });
  // Append related overflow style
  if (isVertical) {
    scrollDiv.style.overflowY = 'scroll';
  } else {
    scrollDiv.style.overflowX = 'scroll';
  }
  document.body.appendChild(scrollDiv);
  let size = 0;
  if (isVertical) {
    // clientWidth is the inner width (excluding borders and scrollbars)
    // offsetWidth is the outer width (including padding and borders)
    size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    scrollbarVerticalSize = size;
  } else {
    size = scrollDiv.offsetHeight - scrollDiv.clientHeight;
    scrollbarHorizontalSize = size;
  }
  document.body.removeChild(scrollDiv);
  // console.log(size);
  return size;
}
function amendTableWidth(tableWidth) {
  return typeof tableWidth === 'number' ? tableWidth - _constants.numbers.DEFAULT_CELL_PADDING_LEFT - _constants.numbers.DEFAULT_CELL_PADDING_RIGHT - _constants.numbers.DEFAULT_CELL_BORDER_WIDTH_LEFT - _constants.numbers.DEFAULT_CELL_BORDER_WIDTH_RIGHT - measureScrollbar('vertical') : undefined;
}
/**
 * The user can pass a component to define the rendering method of each level of the table
 * This function merges the components passed in by the user with the default components
 * @param {Object} components
 * @param {Boolean|Object} virtualized
 * @returns
 */
function mergeComponents(components, virtualized) {
  return (0, _merge2.default)({}, {
    table: 'table',
    header: {
      outer: 'table',
      wrapper: 'thead',
      row: 'tr',
      cell: 'th'
    },
    body: virtualized ? {
      outer: 'div',
      wrapper: 'div',
      row: 'div',
      cell: 'div',
      colgroup: {
        wrapper: 'div',
        col: 'div'
      }
    } : {
      outer: 'table',
      wrapper: 'tbody',
      row: 'tr',
      cell: 'td',
      colgroup: {
        wrapper: 'colgroup',
        col: 'col'
      }
    },
    footer: {
      wrapper: 'tfoot',
      row: 'tr',
      cell: 'td'
    }
  }, components);
}
const logger = exports.logger = new _Logger.default('[@douyinfe/semi-ui Table]');
function mergeColumns() {
  let oldColumns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let newColumns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let keyPropNames = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let deep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  const finalColumns = [];
  const clone = deep ? _utils.cloneDeep : _clone2.default;
  (0, _map2.default)(newColumns, newColumn => {
    newColumn = Object.assign({}, newColumn);
    const key = (0, _utils2.getColumnKey)(newColumn, keyPropNames);
    const oldColumn = key != null && (0, _find2.default)(oldColumns, item => (0, _utils2.getColumnKey)(item, keyPropNames) === key);
    if (oldColumn) {
      finalColumns.push(clone(Object.assign(Object.assign({}, oldColumn), newColumn)));
    } else {
      finalColumns.push(clone(newColumn));
    }
  });
  return finalColumns;
}
function getNextSortOrder(sortOrder) {
  switch (sortOrder) {
    case _constants.strings.SORT_DIRECTIONS[0]:
      return _constants.strings.SORT_DIRECTIONS[1];
    case _constants.strings.SORT_DIRECTIONS[1]:
      return 'cancelSort';
    default:
      return _constants.strings.SORT_DIRECTIONS[0];
  }
}