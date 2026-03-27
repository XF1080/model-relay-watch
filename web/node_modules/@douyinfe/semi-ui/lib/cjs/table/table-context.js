"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const TableContext = /*#__PURE__*/_react.default.createContext({
  headWidths: [],
  setHeadWidths: _noop2.default,
  handleRowExpanded: _noop2.default
});
var _default = exports.default = TableContext;