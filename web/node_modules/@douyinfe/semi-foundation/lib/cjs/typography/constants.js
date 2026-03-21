"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-typography`
};
const strings = exports.strings = {
  WEIGHT: ['light', 'regular', 'medium', 'semibold', 'bold', "default"],
  TYPE: ['primary', 'secondary', 'danger', 'warning', 'success', 'tertiary', 'quaternary'],
  SIZE: ['normal', 'small', "inherit"],
  SPACING: ['normal', 'extended'],
  HEADING: [1, 2, 3, 4, 5, 6],
  RULE: ['text', 'numbers', 'bytes-decimal', 'bytes-binary', 'percentages', 'exponential'],
  TRUNCATE: ['ceil', 'floor', 'round']
};