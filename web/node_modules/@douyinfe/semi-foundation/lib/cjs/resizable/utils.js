"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.snap = exports.judgeConstraint = exports.has = exports.getStringSize = exports.getPixelSize = exports.getOffset = exports.getNumberSize = exports.getItemDirection = exports.findNextSnap = exports.clamp = exports.calculateNewMax = exports.adjustNewSize = void 0;
const clamp = (n, min, max) => Math.max(Math.min(n, max), min);
exports.clamp = clamp;
const snap = (n, size) => Math.round(n / size) * size;
exports.snap = snap;
const has = (dir, target) => new RegExp(dir, 'i').test(target);
exports.has = has;
const findNextSnap = function (n, snapArray) {
  let snapGap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  const closestGapIndex = snapArray.reduce((prev, curr, index) => Math.abs(curr - n) < Math.abs(snapArray[prev] - n) ? index : prev, 0);
  const gap = Math.abs(snapArray[closestGapIndex] - n);
  return snapGap === 0 || gap < snapGap ? snapArray[closestGapIndex] : n;
};
exports.findNextSnap = findNextSnap;
const getStringSize = n => {
  n = n.toString();
  if (n === 'auto') {
    return n;
  }
  if (n.endsWith('px')) {
    return n;
  }
  if (n.endsWith('%')) {
    return n;
  }
  if (n.endsWith('vh')) {
    return n;
  }
  if (n.endsWith('vw')) {
    return n;
  }
  if (n.endsWith('vmax')) {
    return n;
  }
  if (n.endsWith('vmin')) {
    return n;
  }
  return `${n}px`;
};
exports.getStringSize = getStringSize;
const getNumberSize = (size, parentSize, innerWidth, innerHeight) => {
  if (size && typeof size === 'string') {
    if (size.endsWith('px')) {
      return Number(size.replace('px', ''));
    }
    if (size.endsWith('%')) {
      const ratio = Number(size.replace('%', '')) / 100;
      return parentSize * ratio;
    }
    if (size.endsWith('vw')) {
      const ratio = Number(size.replace('vw', '')) / 100;
      return innerWidth * ratio;
    }
    if (size.endsWith('vh')) {
      const ratio = Number(size.replace('vh', '')) / 100;
      return innerHeight * ratio;
    }
  }
  return typeof size === 'undefined' ? size : Number(size);
};
exports.getNumberSize = getNumberSize;
const calculateNewMax = (parentSize, innerWidth, innerHeight, maxWidth, maxHeight, minWidth, minHeight) => {
  maxWidth = getNumberSize(maxWidth, parentSize.width, innerWidth, innerHeight);
  maxHeight = getNumberSize(maxHeight, parentSize.height, innerWidth, innerHeight);
  minWidth = getNumberSize(minWidth, parentSize.width, innerWidth, innerHeight);
  minHeight = getNumberSize(minHeight, parentSize.height, innerWidth, innerHeight);
  return {
    maxWidth,
    maxHeight,
    minWidth,
    minHeight
  };
};
exports.calculateNewMax = calculateNewMax;
const getItemDirection = dir => {
  if (dir === 'vertical') {
    return ['bottom', 'top'];
  } else {
    return ['right', 'left'];
  }
};
exports.getItemDirection = getItemDirection;
const getPixelSize = (size, parentSize) => {
  if (size.endsWith('px')) {
    return Number(size.replace('px', ''));
  }
  if (size.endsWith('%')) {
    return Number(size.replace('%', '')) / 100 * parentSize;
  }
  return typeof size === 'undefined' ? size : Number(size);
};
exports.getPixelSize = getPixelSize;
const judgeConstraint = function (newSize, min, max, parentSize) {
  let offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  min = min !== null && min !== void 0 ? min : "0%";
  max = max !== null && max !== void 0 ? max : "100%";
  const minSize = getPixelSize(min, parentSize);
  const maxSize = getPixelSize(max, parentSize);
  if (newSize < minSize + offset) {
    return true;
  }
  if (newSize > maxSize) {
    return true;
  }
  return false;
};
exports.judgeConstraint = judgeConstraint;
const adjustNewSize = (newSize, min, max, parentSize, offset) => {
  min = min !== null && min !== void 0 ? min : "0%";
  max = max !== null && max !== void 0 ? max : "100%";
  const minSize = getPixelSize(min, parentSize);
  const maxSize = getPixelSize(max, parentSize);
  if (newSize < minSize + offset) {
    return minSize + offset;
  }
  if (newSize > maxSize) {
    return maxSize;
  }
  return newSize;
};
exports.adjustNewSize = adjustNewSize;
const getOffset = (style, direction) => {
  if (direction === 'horizontal') {
    const paddingLeft = parseFloat(style.paddingLeft);
    const paddingRight = parseFloat(style.paddingRight);
    const borderLeftWidth = parseFloat(style.borderLeftWidth);
    const borderRightWidth = parseFloat(style.borderRightWidth);
    return paddingLeft + paddingRight + borderLeftWidth + borderRightWidth;
  } else {
    const paddingTop = parseFloat(style.paddingTop);
    const paddingBottom = parseFloat(style.paddingBottom);
    const borderTopWidth = parseFloat(style.borderTopWidth);
    const borderBottomWidth = parseFloat(style.borderBottomWidth);
    return paddingTop + paddingBottom + borderTopWidth + borderBottomWidth;
  }
};
exports.getOffset = getOffset;