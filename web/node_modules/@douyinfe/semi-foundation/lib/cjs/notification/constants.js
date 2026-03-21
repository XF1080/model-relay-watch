"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  WRAPPER: `${_constants.BASE_CLASS_PREFIX}-notification-wrapper`,
  LIST: `${_constants.BASE_CLASS_PREFIX}-notification-list`,
  NOTICE: `${_constants.BASE_CLASS_PREFIX}-notification-notice`
};
const strings = exports.strings = {
  types: ['warning', 'success', 'info', 'error', 'default'],
  themes: ['normal', 'light'],
  directions: ['ltr', 'rtl']
};
const numbers = exports.numbers = {
  duration: 3 // default close time, unit: s
};