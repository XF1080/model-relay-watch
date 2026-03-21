"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/table/constants");
var _tableSelectionCellFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/table/tableSelectionCellFoundation"));
var _checkbox = require("../checkbox");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * render selection cell
 */
class TableSelectionCell extends _baseComponent.default {
  get adapter() {
    var _this = this;
    return Object.assign(Object.assign({}, super.adapter), {
      notifyChange: function () {
        return _this.props.onChange(...arguments);
      }
    });
  }
  constructor(props) {
    super(props);
    this.handleChange = e => this.foundation.handleChange(e);
    this.foundation = new _tableSelectionCellFoundation.default(this.adapter);
  }
  render() {
    const {
      selected,
      getCheckboxProps,
      indeterminate,
      disabled,
      prefixCls,
      className
    } = this.props;
    const ariaLabel = this.props['aria-label'];
    let checkboxProps = {
      onChange: this.handleChange,
      disabled,
      indeterminate,
      checked: selected
    };
    if (typeof getCheckboxProps === 'function') {
      checkboxProps = Object.assign(Object.assign({}, checkboxProps), getCheckboxProps());
    }
    const wrapCls = (0, _classnames.default)(`${prefixCls}-selection-wrap`, {
      [`${prefixCls}-selection-disabled`]: disabled
    }, className);
    return /*#__PURE__*/_react.default.createElement("span", {
      className: wrapCls
    }, /*#__PURE__*/_react.default.createElement(_checkbox.Checkbox, Object.assign({
      "aria-label": ariaLabel
    }, checkboxProps)));
  }
}
exports.default = TableSelectionCell;
TableSelectionCell.propTypes = {
  columnTitle: _propTypes.default.string,
  getCheckboxProps: _propTypes.default.func,
  type: _propTypes.default.string,
  onChange: _propTypes.default.func,
  selected: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  indeterminate: _propTypes.default.bool,
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  'aria-label': _propTypes.default.string
};
TableSelectionCell.defaultProps = {
  disabled: false,
  onChange: _noop2.default,
  prefixCls: _constants.cssClasses.PREFIX
};