"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/scrollList/constants");
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _scrollItem = _interopRequireDefault(require("./scrollItem"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/scrollList/foundation"));
require("@douyinfe/semi-foundation/lib/cjs/scrollList/scrollList.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
// eslint-disable-next-line @typescript-eslint/ban-types
class ScrollList extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.foundation = new _foundation.default(this.adapter);
  }
  render() {
    const _a = this.props,
      {
        children,
        header,
        footer,
        prefixCls,
        bodyHeight,
        className,
        style
      } = _a,
      rest = __rest(_a, ["children", "header", "footer", "prefixCls", "bodyHeight", "className", "style"]);
    const clsWrapper = (0, _classnames.default)(className, {
      [prefixCls || _constants.cssClasses.PREFIX]: true
    });
    const clsHeader = (0, _classnames.default)({
      [`${prefixCls || _constants.cssClasses.PREFIX}-header`]: true
    });
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: clsWrapper,
      style: style
    }, this.getDataAttr(rest)), header ? (/*#__PURE__*/_react.default.createElement("div", {
      className: clsHeader
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${clsHeader}-title`,
      "x-semi-prop": this.props['x-semi-header-alias'] || "header"
    }, header), /*#__PURE__*/_react.default.createElement("div", {
      className: `${clsWrapper}-line`
    }))) : null, /*#__PURE__*/_react.default.createElement("div", {
      className: `${clsWrapper}-body`,
      style: {
        height: bodyHeight ? bodyHeight : ''
      },
      "x-semi-prop": "children"
    }, children), footer ? (/*#__PURE__*/_react.default.createElement("div", {
      className: `${clsWrapper}-footer`,
      "x-semi-prop": this.props['x-semi-footer-alias'] || "footer"
    }, footer)) : null);
  }
}
ScrollList.Item = _scrollItem.default;
ScrollList.propTypes = {
  className: _propTypes.default.string,
  header: _propTypes.default.node,
  footer: _propTypes.default.node,
  children: _propTypes.default.node,
  bodyHeight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
var _default = exports.default = ScrollList;