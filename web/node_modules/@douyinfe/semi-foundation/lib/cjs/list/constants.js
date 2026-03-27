"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-list`
};
const strings = exports.strings = {
  SIZE: ['large', 'small', 'default'],
  LAYOUT: ['vertical', 'horizontal'],
  ALIGN: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch']
};