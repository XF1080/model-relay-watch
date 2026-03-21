import _omit from "lodash/omit";
import _get from "lodash/get";
import * as React from 'react';
import Table from '../../table';
const table = props => {
  var _a, _b, _c, _d;
  const {
    children
  } = props;
  // In MDX/React, `children` could be a single element, an array, or contain whitespace text nodes.
  // Also, when a row has only one column, `tr.props.children` is usually a single ReactElement
  // instead of an array. We normalize everything via `React.Children.toArray` to avoid losing data.
  const elementChildren = React.Children.toArray(children).filter(React.isValidElement);
  const thead = (_a = elementChildren.find(node => node.type === 'thead')) !== null && _a !== void 0 ? _a : elementChildren[0];
  const tbody = (_b = elementChildren.find(node => node.type === 'tbody')) !== null && _b !== void 0 ? _b : elementChildren[1];
  const headTr = React.Children.toArray(_get(thead, 'props.children')).find(React.isValidElement);
  const columnsFiber = React.Children.toArray(_get(headTr, 'props.children'));
  const dataFiber = React.Children.toArray(_get(tbody, 'props.children'));
  const titlesColumns = columnsFiber.map((column, i) => {
    var _a, _b;
    return {
      dataIndex: String(i),
      title: (_b = (_a = column === null || column === void 0 ? void 0 : column.props) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : ""
    };
  });
  const tableDataSource = [];
  for (let i = 0; i < dataFiber.length; i++) {
    let item = {
      key: String(i)
    };
    const rowCells = React.Children.toArray((_d = (_c = dataFiber[i]) === null || _c === void 0 ? void 0 : _c.props) === null || _d === void 0 ? void 0 : _d.children);
    rowCells.forEach((child, index) => {
      var _a, _b;
      item[String(index)] = (_b = (_a = child === null || child === void 0 ? void 0 : child.props) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : "";
    });
    tableDataSource.push(item);
  }
  return /*#__PURE__*/React.createElement(Table, Object.assign({
    dataSource: tableDataSource,
    columns: titlesColumns
  }, _omit(props, 'children')));
};
export default table;