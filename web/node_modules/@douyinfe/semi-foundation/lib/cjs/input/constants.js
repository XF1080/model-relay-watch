"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-input`
};
const strings = exports.strings = {
  SIZE: ['small', 'large', 'default'],
  DEFAULT_SIZE: 'default',
  STATUS: ['default', 'error', 'warning', 'success'],
  CLEARBTN_CLICKED_EVENT_FLAG: '__fromClearBtn',
  MODE: ['password']
};
const numbers = exports.numbers = {};