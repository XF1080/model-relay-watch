"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/table/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = {
  align: _propTypes.default.oneOf(_constants.strings.ALIGNS),
  className: _propTypes.default.string,
  colSpan: _propTypes.default.number,
  dataIndex: _propTypes.default.string,
  defaultSortOrder: _propTypes.default.oneOf(_constants.strings.SORT_DIRECTIONS),
  filterChildrenRecord: _propTypes.default.bool,
  filterDropdownProps: _propTypes.default.object,
  filterDropdown: _propTypes.default.node,
  filterDropdownVisible: _propTypes.default.bool,
  filterIcon: _propTypes.default.func,
  filterMultiple: _propTypes.default.bool,
  filteredValue: _propTypes.default.arrayOf(_propTypes.default.any),
  filters: _propTypes.default.array,
  fixed: _propTypes.default.oneOf(_constants.strings.FIXED_SET),
  onCell: _propTypes.default.func,
  onFilter: _propTypes.default.func,
  onFilterDropdownVisibleChange: _propTypes.default.func,
  onHeaderCell: _propTypes.default.func,
  onSorterChange: _propTypes.default.func,
  render: _propTypes.default.func,
  renderFilterDropdownItem: _propTypes.default.func,
  sortChildrenRecord: _propTypes.default.bool,
  sortDirections: _propTypes.default.arrayOf(_propTypes.default.string),
  sortOrder: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  sorter: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]),
  title: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node]),
  useFullRender: _propTypes.default.bool,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  showSortTip: _propTypes.default.bool
};