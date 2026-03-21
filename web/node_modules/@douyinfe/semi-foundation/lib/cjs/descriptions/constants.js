"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-descriptions`
};
const strings = exports.strings = {
  ALIGN_SET: ['left', 'justify', 'plain', 'center'],
  SIZE_SET: ['small', 'medium', 'large'],
  LAYOUT_SET: ['horizontal', 'vertical']
};
const numbers = exports.numbers = {};