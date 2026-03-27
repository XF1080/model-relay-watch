"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sectionRowPropTypes = exports.default = void 0;
var _isSet2 = _interopRequireDefault(require("lodash/isSet"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/table/constants");
var _utils = require("@douyinfe/semi-foundation/lib/cjs/table/utils");
var _BaseRow = _interopRequireDefault(require("./BaseRow"));
var _tableContext = _interopRequireDefault(require("../table-context"));
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
 * avoid affected by https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types
 */
const sectionRowPropTypes = exports.sectionRowPropTypes = {
  record: _propTypes.default.object,
  index: _propTypes.default.number,
  columns: _propTypes.default.array,
  group: _propTypes.default.object.isRequired,
  groupKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
  data: _propTypes.default.array,
  renderGroupSection: _propTypes.default.func,
  onGroupedRow: _propTypes.default.func,
  clickGroupedRowToExpand: _propTypes.default.bool,
  components: _propTypes.default.object,
  expanded: _propTypes.default.bool,
  prefixCls: _propTypes.default.string,
  onExpand: _propTypes.default.func,
  virtualized: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.object]),
  style: _propTypes.default.object,
  renderExpandIcon: _propTypes.default.func,
  className: _propTypes.default.string,
  store: _propTypes.default.object,
  rowKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.func])
};
/**
 * Grouping component title row
 */
class SectionRow extends _react.PureComponent {
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
      if (Array.isArray(data) && data.length && (0, _isSet2.default)(group)) {
        return data.filter(record => {
          const realRowKey = typeof rowKey === 'function' ? rowKey(record) : (0, _get2.default)(record, rowKey);
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
      return [_constants.strings.DEFAULT_KEY_COLUMN_EXPAND, _constants.strings.DEFAULT_KEY_COLUMN_SELECTION].includes(key);
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
    if (/*#__PURE__*/(0, _react.isValidElement)(cell)) {
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
    props.colSpan = (0, _utils.filterColumns)(propColumns).length;
    const columns = [Object.assign({
      render: () => ({
        props,
        children
      })
    }, column)];
    const rowCls = (0, _classnames.default)(className, `${prefixCls}-row-section`, {
      on: expanded
    });
    const {
      getCellWidths
    } = this.context;
    const baseRowCellWidths = getCellWidths(columns, null, true);
    return /*#__PURE__*/_react.default.createElement(_BaseRow.default, {
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
SectionRow.contextType = _tableContext.default;
SectionRow.propTypes = sectionRowPropTypes;
SectionRow.defaultProps = {
  prefixCls: _constants.cssClasses.PREFIX,
  components: {
    body: {
      row: 'tr',
      cell: 'td'
    }
  }
};
var _default = exports.default = SectionRow;