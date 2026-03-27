"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var React = _interopRequireWildcard(require("react"));
var _table = _interopRequireDefault(require("../../table"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
  const headTr = React.Children.toArray((0, _get2.default)(thead, 'props.children')).find(React.isValidElement);
  const columnsFiber = React.Children.toArray((0, _get2.default)(headTr, 'props.children'));
  const dataFiber = React.Children.toArray((0, _get2.default)(tbody, 'props.children'));
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
  return /*#__PURE__*/React.createElement(_table.default, Object.assign({
    dataSource: tableDataSource,
    columns: titlesColumns
  }, (0, _omit2.default)(props, 'children')));
};
var _default = exports.default = table;