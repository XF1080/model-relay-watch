import _get from "lodash/get";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/table/constants';
import { flattenColumns } from '@douyinfe/semi-foundation/lib/es/table/utils';
export default class ColGroup extends React.PureComponent {
  render() {
    const {
      columns,
      className,
      style,
      prefixCls,
      components
    } = this.props;
    const ColGroup = _get(components, 'colgroup.wrapper', 'colgroup');
    const Col = _get(components, 'colgroup.col', 'col');
    const cols = flattenColumns(columns).map((column, idx) => {
      const colStyle = {};
      /**
       * table width
       */
      if (column.width) {
        colStyle.width = column.width;
        colStyle.minWidth = colStyle.width;
      }
      return /*#__PURE__*/React.createElement(Col, {
        className: classnames(`${prefixCls}-col`, column.className),
        key: column.key || column.dataIndex || idx,
        style: colStyle
      });
    });
    const groupCls = classnames(`${prefixCls}-colgroup`, className);
    return /*#__PURE__*/React.createElement(ColGroup, {
      className: groupCls,
      style: style
    }, cols);
  }
}
ColGroup.propTypes = {
  columns: PropTypes.array,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  components: PropTypes.object
};
ColGroup.defaultProps = {
  columns: [],
  prefixCls: cssClasses.PREFIX
};