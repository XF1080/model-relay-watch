"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/select/constants");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const prefixCls = _constants.cssClasses.PREFIX_GROUP;
class OptionGroup extends _baseComponent.default {
  render() {
    const _a = this.props,
      {
        label,
        className,
        style
      } = _a,
      rest = __rest(_a, ["label", "className", "style"]);
    const groupCls = (0, _classnames.default)(className, {
      [prefixCls]: true
    });
    if (!label && typeof label !== 'number') {
      return null;
    }
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: groupCls,
      style: style
    }, this.getDataAttr(rest)), label);
  }
}
OptionGroup.isSelectOptionGroup = true;
OptionGroup.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.node]),
  label: _propTypes.default.node,
  className: _propTypes.default.string,
  style: _propTypes.default.object
};
var _default = exports.default = OptionGroup;