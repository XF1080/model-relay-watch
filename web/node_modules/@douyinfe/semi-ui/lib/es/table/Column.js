import React from 'react';
import ColumnShape from './ColumnShape';
export default class Column extends React.PureComponent {
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(props);
  }
  render() {
    return null;
  }
}
Column.propTypes = Object.assign({}, ColumnShape);
Column.elementType = 'Column';