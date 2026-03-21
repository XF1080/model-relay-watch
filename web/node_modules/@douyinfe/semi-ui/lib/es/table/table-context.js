import _noop from "lodash/noop";
import React from 'react';
const TableContext = /*#__PURE__*/React.createContext({
  headWidths: [],
  setHeadWidths: _noop,
  handleRowExpanded: _noop
});
export default TableContext;