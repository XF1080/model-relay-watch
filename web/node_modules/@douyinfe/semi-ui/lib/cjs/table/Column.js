"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ColumnShape = _interopRequireDefault(require("./ColumnShape"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Column extends _react.default.PureComponent {
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(props);
  }
  render() {
    return null;
  }
}
exports.default = Column;
Column.propTypes = Object.assign({}, _ColumnShape.default);
Column.elementType = 'Column';