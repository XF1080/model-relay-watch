"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/floatButton/constants");
require("@douyinfe/semi-foundation/lib/cjs/floatButton/floatButton.css");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _badge = _interopRequireDefault(require("../badge"));
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClassesGroup.PREFIX;
class FloatButtonGroup extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.handleClick = e => {
      var _a, _b;
      const value = e.target.dataset.value;
      (_b = (_a = this.props).onClick) === null || _b === void 0 ? void 0 : _b.call(_a, value, e);
    };
  }
  render() {
    const {
      className,
      style,
      disabled,
      items
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(prefixCls, className, {
        [`${prefixCls}-disabled`]: disabled
      }),
      style: style,
      onClick: this.handleClick
    }, items.map((item, index) => {
      if (item.badge) {
        return /*#__PURE__*/_react.default.createElement(_badge.default, Object.assign({
          key: index
        }, item.badge), /*#__PURE__*/_react.default.createElement("div", {
          className: (0, _classnames.default)(`${prefixCls}-item`),
          "data-value": item.value
        }, item.icon, item.content));
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        key: index,
        className: (0, _classnames.default)(`${prefixCls}-item`),
        "data-value": item.value
      }, item.icon, item.content);
    }));
  }
}
exports.default = FloatButtonGroup;
FloatButtonGroup.defaultProps = {
  shape: 'round',
  type: 'default',
  size: 'medium'
};