"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  DIALOG: `${_constants.BASE_CLASS_PREFIX}-modal`
};
const strings = exports.strings = {
  cancelKey: 'cancel',
  confirmKey: 'confirm',
  SIZE: ['small', 'medium', 'large', 'full-width'],
  directions: ['ltr', 'rtl']
};