"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-space`
};
const strings = exports.strings = {
  ALIGN_SET: ['start', 'end', 'center', 'baseline'],
  SPACING_LOOSE: 'loose',
  SPACING_MEDIUM: 'medium',
  SPACING_TIGHT: 'tight'
};