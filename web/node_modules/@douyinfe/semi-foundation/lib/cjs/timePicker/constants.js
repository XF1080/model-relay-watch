"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
var _constants2 = require("../input/constants");
const TYPE_TIME_PICKER = 'time';
const TYPE_TIME_RANGE_PICKER = 'timeRange';
const DEFAULT_RANGE_SEPARATOR = ' ~ ';
const DEFAULT_MULTIPLE_SEPARATOR = ',';
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-timepicker`,
  RANGE_PICKER: `${_constants.BASE_CLASS_PREFIX}-timepicker-range-panel`,
  RANGE_PANEL_LISTS: `${_constants.BASE_CLASS_PREFIX}-timepicker-lists`
};
const strings = exports.strings = {
  TYPES: [TYPE_TIME_PICKER, TYPE_TIME_RANGE_PICKER],
  TYPE_TIME_PICKER,
  TYPE_TIME_RANGE_PICKER,
  DEFAULT_TYPE: TYPE_TIME_PICKER,
  DEFAULT_RANGE_SEPARATOR,
  DEFAULT_MULTIPLE_SEPARATOR,
  SIZE: _constants2.strings.SIZE,
  DEFAULT_FORMAT: 'HH:mm:ss',
  DEFAULT_FORMAT_A: 'a h:mm:ss',
  STATUS: _constants.VALIDATE_STATUS,
  DEFAULT_POSITION: {
    [TYPE_TIME_PICKER]: 'bottomLeft',
    [TYPE_TIME_RANGE_PICKER]: 'bottomLeft'
  }
};
const numbers = exports.numbers = {};