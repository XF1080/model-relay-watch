"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const PREFIX = `${_constants.BASE_CLASS_PREFIX}-toast`;
const cssClasses = exports.cssClasses = {
  PREFIX,
  WRAPPER: `${PREFIX}-wrapper`,
  LIST: `${PREFIX}-list`
};
const strings = exports.strings = {
  types: ['warning', 'success', 'info', 'error', 'default'],
  themes: ['normal', 'light'],
  directions: ['ltr', 'rtl']
};
const numbers = exports.numbers = {
  duration: 3 // default close time, unit: s
};