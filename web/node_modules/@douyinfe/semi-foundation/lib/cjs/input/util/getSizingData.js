"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pick2 = _interopRequireDefault(require("lodash/pick"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Reference to https://github.com/andreypopp/react-textarea-autosize/

const SIZING_STYLE = ['borderBottomWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'boxSizing', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'letterSpacing', 'lineHeight', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop',
// non-standard
'tabSize', 'textIndent',
// non-standard
'textRendering', 'textTransform', 'width'];
const getSizingData = node => {
  const style = window.getComputedStyle(node);
  if (style === null) {
    return null;
  }
  const sizingStyle = (0, _pick2.default)(style, SIZING_STYLE);
  const {
    boxSizing
  } = sizingStyle;
  // probably node is detached from DOM, can't read computed dimensions
  if (boxSizing === '') {
    return null;
  }
  const paddingSize = parseFloat(sizingStyle.paddingBottom) + parseFloat(sizingStyle.paddingTop);
  const borderSize = parseFloat(sizingStyle.borderBottomWidth) + parseFloat(sizingStyle.borderTopWidth);
  return {
    sizingStyle,
    paddingSize,
    borderSize
  };
};
var _default = exports.default = getSizingData;