"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactResizable = require("react-resizable");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
class ResizableHeaderCell extends _react.default.PureComponent {
  render() {
    const _a = this.props,
      {
        onResize,
        onResizeStart,
        onResizeStop,
        width,
        resize
      } = _a,
      restProps = __rest(_a, ["onResize", "onResizeStart", "onResizeStop", "width", "resize"]);
    if (typeof width !== 'number' || resize === false) {
      return /*#__PURE__*/_react.default.createElement("th", Object.assign({}, restProps));
    }
    let {
      children
    } = restProps;
    // Fragment must be used here, otherwise there will be an error (seemingly a react-resizable@1.9.0 problem)
    children = _react.default.Children.map(children, (child, index) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: index
    }, child));
    return /*#__PURE__*/_react.default.createElement(_reactResizable.Resizable, {
      width: width,
      height: 0,
      onResize: onResize,
      onResizeStart: onResizeStart,
      onResizeStop: onResizeStop,
      draggableOpts: {
        enableUserSelectHack: false
      },
      axis: 'x'
    }, /*#__PURE__*/_react.default.createElement("th", Object.assign({}, restProps), children));
  }
}
var _default = exports.default = ResizableHeaderCell;