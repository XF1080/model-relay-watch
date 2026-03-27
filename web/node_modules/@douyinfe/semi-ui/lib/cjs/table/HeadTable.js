"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _ColGroup = _interopRequireDefault(require("./ColGroup"));
var _TableHeader = _interopRequireDefault(require("./TableHeader"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * When there are fixed columns, the header is rendered as a separate Table
 */
class HeadTable extends _react.default.PureComponent {
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      selectedRowKeysSet: new Set()
    };
    super(props);
  }
  render() {
    const {
      scroll,
      prefixCls,
      fixed,
      forwardedRef,
      handleBodyScroll,
      columns,
      components,
      onDidUpdate,
      showHeader,
      tableLayout,
      bodyHasScrollBar,
      sticky
    } = this.props;
    const Table = (0, _get2.default)(components, 'header.outer', 'table');
    const x = (0, _get2.default)(scroll, 'x');
    const headStyle = {};
    const tableStyle = {};
    if (x && !fixed) {
      tableStyle.width = x;
    }
    if (bodyHasScrollBar) {
      headStyle.overflowY = 'scroll';
    }
    const colgroup = /*#__PURE__*/_react.default.createElement(_ColGroup.default, {
      columns: columns,
      prefixCls: prefixCls
    });
    const tableHeader = /*#__PURE__*/_react.default.createElement(_TableHeader.default, Object.assign({}, this.props, {
      columns: columns,
      components: components,
      onDidUpdate: onDidUpdate
    }));
    const headTableCls = (0, _classnames.default)(`${prefixCls}-header`, {
      [`${prefixCls}-header-sticky`]: sticky,
      [`${prefixCls}-header-hidden`]: !showHeader
    });
    const stickyTop = (0, _get2.default)(sticky, 'top', 0);
    if (typeof stickyTop === 'number') {
      headStyle.top = stickyTop;
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      key: "headTable",
      style: headStyle,
      className: headTableCls,
      ref: forwardedRef,
      onScroll: handleBodyScroll
    }, /*#__PURE__*/_react.default.createElement(Table, {
      style: tableStyle,
      className: (0, _classnames.default)(prefixCls, {
        [`${prefixCls}-fixed`]: tableLayout === 'fixed'
      })
    }, colgroup, tableHeader));
  }
}
HeadTable.propTypes = {
  tableLayout: _propTypes.default.string,
  bodyHasScrollBar: _propTypes.default.bool,
  columns: _propTypes.default.array,
  components: _propTypes.default.object,
  dataSource: _propTypes.default.array,
  fixed: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  handleBodyScroll: _propTypes.default.func,
  prefixCls: _propTypes.default.string,
  forwardedRef: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  scroll: _propTypes.default.shape({
    x: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.bool]),
    y: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
  }),
  selectedRowKeysSet: _propTypes.default.instanceOf(Set).isRequired,
  showHeader: _propTypes.default.bool,
  onDidUpdate: _propTypes.default.func,
  onHeaderRow: _propTypes.default.func
};
HeadTable.defaultProps = {
  handleBodyScroll: _noop2.default
};
var _default = exports.default = /*#__PURE__*/_react.default.forwardRef((props, ref) => /*#__PURE__*/_react.default.createElement(HeadTable, Object.assign({}, props, {
  forwardedRef: ref
})));