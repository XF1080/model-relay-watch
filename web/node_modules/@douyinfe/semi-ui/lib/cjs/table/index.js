"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Table = _interopRequireDefault(require("./Table"));
var _ResizableTable = _interopRequireDefault(require("./ResizableTable"));
var _Column = _interopRequireDefault(require("./Column"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/table/constants");
var _context = _interopRequireDefault(require("../configProvider/context"));
var _interface = require("./interface");
Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interface[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Table extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.getCurrentPageData = () => this.tableRef.current && this.tableRef.current.getCurrentPageData();
    this.tableRef = /*#__PURE__*/_react.default.createRef();
  }
  render() {
    var _a;
    // eslint-disable-next-line prefer-destructuring
    const props = this.props;
    const direction = (_a = this.props.direction) !== null && _a !== void 0 ? _a : this.context.direction;
    if (props.resizable) {
      return /*#__PURE__*/_react.default.createElement(_ResizableTable.default, Object.assign({}, props, {
        ref: this.tableRef,
        direction: direction
      }));
    } else {
      return /*#__PURE__*/_react.default.createElement(_Table.default, Object.assign({}, props, {
        ref: this.tableRef,
        direction: direction
      }));
    }
  }
}
Table.Column = _Column.default;
Table.DEFAULT_KEY_COLUMN_SELECTION = _constants.strings.DEFAULT_KEY_COLUMN_SELECTION;
Table.DEFAULT_KEY_COLUMN_EXPAND = _constants.strings.DEFAULT_KEY_COLUMN_EXPAND;
Table.propTypes = Object.assign(Object.assign({}, _Table.default.propTypes), {
  resizable: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.object])
});
Table.defaultProps = {
  hideExpandedColumn: true
};
Table.contextType = _context.default;
var _default = exports.default = Table;