import _pick from "lodash/pick"; // Reference to https://github.com/andreypopp/react-textarea-autosize/
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
  const sizingStyle = _pick(style, SIZING_STYLE);
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
export default getSizingData;