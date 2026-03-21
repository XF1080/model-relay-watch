import _noop from "lodash/noop";
import _get from "lodash/get";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ColGroup from './ColGroup';
import TableHeader from './TableHeader';
/**
 * When there are fixed columns, the header is rendered as a separate Table
 */
class HeadTable extends React.PureComponent {
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
    const Table = _get(components, 'header.outer', 'table');
    const x = _get(scroll, 'x');
    const headStyle = {};
    const tableStyle = {};
    if (x && !fixed) {
      tableStyle.width = x;
    }
    if (bodyHasScrollBar) {
      headStyle.overflowY = 'scroll';
    }
    const colgroup = /*#__PURE__*/React.createElement(ColGroup, {
      columns: columns,
      prefixCls: prefixCls
    });
    const tableHeader = /*#__PURE__*/React.createElement(TableHeader, Object.assign({}, this.props, {
      columns: columns,
      components: components,
      onDidUpdate: onDidUpdate
    }));
    const headTableCls = classnames(`${prefixCls}-header`, {
      [`${prefixCls}-header-sticky`]: sticky,
      [`${prefixCls}-header-hidden`]: !showHeader
    });
    const stickyTop = _get(sticky, 'top', 0);
    if (typeof stickyTop === 'number') {
      headStyle.top = stickyTop;
    }
    return /*#__PURE__*/React.createElement("div", {
      key: "headTable",
      style: headStyle,
      className: headTableCls,
      ref: forwardedRef,
      onScroll: handleBodyScroll
    }, /*#__PURE__*/React.createElement(Table, {
      style: tableStyle,
      className: classnames(prefixCls, {
        [`${prefixCls}-fixed`]: tableLayout === 'fixed'
      })
    }, colgroup, tableHeader));
  }
}
HeadTable.propTypes = {
  tableLayout: PropTypes.string,
  bodyHasScrollBar: PropTypes.bool,
  columns: PropTypes.array,
  components: PropTypes.object,
  dataSource: PropTypes.array,
  fixed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  handleBodyScroll: PropTypes.func,
  prefixCls: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  scroll: PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  selectedRowKeysSet: PropTypes.instanceOf(Set).isRequired,
  showHeader: PropTypes.bool,
  onDidUpdate: PropTypes.func,
  onHeaderRow: PropTypes.func
};
HeadTable.defaultProps = {
  handleBodyScroll: _noop
};
export default /*#__PURE__*/React.forwardRef((props, ref) => /*#__PURE__*/React.createElement(HeadTable, Object.assign({}, props, {
  forwardedRef: ref
})));