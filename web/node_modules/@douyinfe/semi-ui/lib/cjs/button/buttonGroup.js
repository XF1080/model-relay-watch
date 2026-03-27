"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireWildcard(require("react"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/button/constants");
require("@douyinfe/semi-foundation/lib/cjs/button/button.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
const btnSizes = _constants.strings.sizes;
class ButtonGroup extends _baseComponent.default {
  getInnerWithLine(inner) {
    const innerWithLine = [];
    if (inner.length > 1) {
      inner.slice(0, -1).forEach((item, index) => {
        const isButtonType = (0, _get2.default)(item, 'type.elementType') === 'Button';
        const buttonProps = (0, _get2.default)(item, 'props');
        const {
          type,
          theme,
          disabled
        } = buttonProps !== null && buttonProps !== void 0 ? buttonProps : {};
        if (isButtonType && theme !== 'outline') {
          const lineCls = (0, _classnames.default)(`${prefixCls}-group-line`, `${prefixCls}-group-line-${theme !== null && theme !== void 0 ? theme : 'light'}`, `${prefixCls}-group-line-${type !== null && type !== void 0 ? type : 'primary'}`, {
            [`${prefixCls}-group-line-disabled`]: disabled
          });
          innerWithLine.push(item, /*#__PURE__*/_react.default.createElement("span", {
            className: lineCls,
            key: `line-${index}`
          }));
        } else {
          innerWithLine.push(item);
        }
      });
      innerWithLine.push(inner.slice(-1));
      return innerWithLine;
    } else {
      return inner;
    }
  }
  render() {
    const _a = this.props,
      {
        children,
        disabled,
        size,
        type,
        className,
        style,
        'aria-label': ariaLabel
      } = _a,
      rest = __rest(_a, ["children", "disabled", "size", "type", "className", "style", 'aria-label']);
    let inner;
    let innerWithLine = [];
    const cls = (0, _classnames.default)(`${prefixCls}-group`, className);
    if (children) {
      inner = (Array.isArray(children) ? children : [children]).map((itm, index) => {
        var _a;
        return /*#__PURE__*/(0, _react.isValidElement)(itm) ? /*#__PURE__*/(0, _react.cloneElement)(itm, Object.assign(Object.assign(Object.assign({
          disabled,
          size,
          type
        }, itm.props), rest), {
          key: (_a = itm.key) !== null && _a !== void 0 ? _a : index
        })) : itm;
      });
      innerWithLine = this.getInnerWithLine(inner);
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: cls,
      style: style,
      role: "group",
      "aria-label": ariaLabel
    }, innerWithLine);
  }
}
exports.default = ButtonGroup;
ButtonGroup.propTypes = {
  children: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  type: _propTypes.default.string,
  size: _propTypes.default.oneOf(btnSizes),
  theme: _propTypes.default.oneOf(_constants.strings.themes),
  'aria-label': _propTypes.default.string
};
ButtonGroup.defaultProps = {
  // There are default values ​​for type and theme in Button. 
  // In order to allow users to individually customize the type and theme of the Button through the parameters of the Button in the ButtonGroup,
  // the default value of type and theme is not given in the ButtonGroup。
  size: 'default'
};