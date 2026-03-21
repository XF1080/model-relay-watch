"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-icon`
};
const strings = exports.strings = {
  SIZE: ['extra-small', 'small', 'default', 'large', 'extra-large', 'custom'],
  // use in svg xhref. No need to respond to the change of prefixCls, always constant
  ICON_PREFIX: 'semi-icon-'
};
const numbers = exports.numbers = {};