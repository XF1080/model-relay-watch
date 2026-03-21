"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAspectHW = getAspectHW;
exports.getMiddle = getMiddle;
function getMiddle(value, _ref) {
  let [min, max] = _ref;
  return Math.min(Math.max(value, min), max);
}
function getAspectHW(width, height, aspect) {
  if (width / height > aspect) {
    width = height * aspect;
  } else {
    height = width / aspect;
  }
  return [width, height];
}