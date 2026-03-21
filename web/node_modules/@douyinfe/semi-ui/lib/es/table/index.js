import React from 'react';
import PropTypes from 'prop-types';
import NormalTable from './Table';
import ResizableTable from './ResizableTable';
import Column from './Column';
import { strings } from '@douyinfe/semi-foundation/lib/es/table/constants';
import ConfigContext from '../configProvider/context';
class Table extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getCurrentPageData = () => this.tableRef.current && this.tableRef.current.getCurrentPageData();
    this.tableRef = /*#__PURE__*/React.createRef();
  }
  render() {
    var _a;
    // eslint-disable-next-line prefer-destructuring
    const props = this.props;
    const direction = (_a = this.props.direction) !== null && _a !== void 0 ? _a : this.context.direction;
    if (props.resizable) {
      return /*#__PURE__*/React.createElement(ResizableTable, Object.assign({}, props, {
        ref: this.tableRef,
        direction: direction
      }));
    } else {
      return /*#__PURE__*/React.createElement(NormalTable, Object.assign({}, props, {
        ref: this.tableRef,
        direction: direction
      }));
    }
  }
}
Table.Column = Column;
Table.DEFAULT_KEY_COLUMN_SELECTION = strings.DEFAULT_KEY_COLUMN_SELECTION;
Table.DEFAULT_KEY_COLUMN_EXPAND = strings.DEFAULT_KEY_COLUMN_EXPAND;
Table.propTypes = Object.assign(Object.assign({}, NormalTable.propTypes), {
  resizable: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
});
Table.defaultProps = {
  hideExpandedColumn: true
};
Table.contextType = ConfigContext;
export * from './interface';
export default Table;