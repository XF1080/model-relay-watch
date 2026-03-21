"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateNodeHeight;
// Reference to https://github.com/andreypopp/react-textarea-autosize/
let hiddenTextarea = null;
const HIDDEN_TEXTAREA_STYLE = {
  'min-height': '0',
  'max-height': 'none',
  height: '0',
  visibility: 'hidden',
  overflow: 'hidden',
  position: 'absolute',
  'z-index': '-1000',
  top: '0',
  right: '0'
};
const forceHiddenStyles = node => {
  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach(key => {
    node.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key], 'important');
  });
};
const getContentHeight = (node, sizingData) => {
  const height = node.scrollHeight;
  if (sizingData.sizingStyle.boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    return height + sizingData.borderSize;
  }
  // remove padding, since height = content
  return height - sizingData.paddingSize;
};
function calculateNodeHeight(sizingData, value) {
  let minRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  let maxRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Infinity;
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('tab-index', '-1');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    forceHiddenStyles(hiddenTextarea);
  }
  if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  }
  const {
    paddingSize,
    borderSize,
    sizingStyle
  } = sizingData;
  const {
    boxSizing
  } = sizingStyle;
  Object.keys(sizingStyle).forEach(key => {
    hiddenTextarea.style[key] = sizingStyle[key];
  });
  forceHiddenStyles(hiddenTextarea);
  hiddenTextarea.value = value;
  let height = getContentHeight(hiddenTextarea, sizingData);
  // measure height of a textarea with a single row
  hiddenTextarea.value = 'x';
  // calc single row need to remove padding and border to avoid duplicated calc
  const rowHeight = getContentHeight(hiddenTextarea, sizingData) - paddingSize - borderSize;
  let minHeight = rowHeight * minRows;
  if (boxSizing === 'border-box') {
    minHeight = minHeight + paddingSize + borderSize;
  }
  height = Math.max(minHeight, height);
  let maxHeight = rowHeight * maxRows;
  if (boxSizing === 'border-box') {
    maxHeight = maxHeight + paddingSize + borderSize;
  }
  height = Math.min(maxHeight, height);
  return height;
}