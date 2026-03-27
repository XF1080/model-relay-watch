"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/dropdown/constants");
var _menuFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/dropdown/menuFoundation"));
var _context = _interopRequireDefault(require("./context"));
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
const prefixCls = _constants.cssClasses.PREFIX;
class DropdownMenu extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.foundation = new _menuFoundation.default(this.adapter);
  }
  get adapter() {
    return Object.assign({}, super.adapter);
  }
  render() {
    const _a = this.props,
      {
        children,
        className,
        style
      } = _a,
      rest = __rest(_a, ["children", "className", "style"]);
    return /*#__PURE__*/_react.default.createElement("ul", Object.assign({
      role: "menu",
      "aria-orientation": "vertical"
    }, rest, {
      className: (0, _classnames.default)(`${prefixCls}-menu`, className),
      style: style,
      onKeyDown: e => this.foundation.onMenuKeydown(e)
    }), children);
  }
}
DropdownMenu.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  style: _propTypes.default.object
};
DropdownMenu.contextType = _context.default;
var _default = exports.default = DropdownMenu;