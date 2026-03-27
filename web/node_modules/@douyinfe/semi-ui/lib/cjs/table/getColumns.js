"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getColumns;
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireDefault(require("react"));
var _Column = _interopRequireDefault(require("./Column"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Convert jsx children into object columns
 * @param {Node} children
 * @returns
 */
function getColumns(children) {
  if (children) {
    const columns = [];
    _react.default.Children.forEach(children, child => {
      if (/*#__PURE__*/_react.default.isValidElement(child) && (child.type === _Column.default || (0, _get2.default)(child, 'type.elementType') === 'Column')) {
        const col = (0, _omit2.default)(child.props, ['children']);
        if (Array.isArray(child.props.children) && child.props.children.length) {
          col.children = getColumns(child.props.children);
        }
        columns.push(Object.assign({
          key: child.key
        }, col));
      }
    });
    return columns;
  }
  return [];
}