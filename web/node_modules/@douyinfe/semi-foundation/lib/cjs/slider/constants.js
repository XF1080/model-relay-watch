"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-slider`,
  DISABLED: `${_constants.BASE_CLASS_PREFIX}-slider-disabled`,
  VERTICAL: `${_constants.BASE_CLASS_PREFIX}-slider-vertical`,
  TRACK: `${_constants.BASE_CLASS_PREFIX}-slider-track`,
  DOTS: `${_constants.BASE_CLASS_PREFIX}-slider-dots`,
  MARKS: `${_constants.BASE_CLASS_PREFIX}-slider-marks`,
  HANDLE: `${_constants.BASE_CLASS_PREFIX}-slider-handle`,
  HANDLE_DOT: `${_constants.BASE_CLASS_PREFIX}-slider-handle-dot`
};
const strings = exports.strings = {
  SIZE: ['small', 'large', 'default'],
  POSITION: ['top', 'bottom'],
  OPTIONS: ['children', 'option']
};