"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: _constants.BASE_CLASS_PREFIX + '-overflow-list'
};
const MODE_MAP = {
  COLLAPSE: 'collapse',
  SCROLL: 'scroll'
};
const BOUNDARY_MAP = {
  START: 'start',
  END: 'end'
};
const OVERFLOW_DIR = {
  NONE: 0,
  GROW: 1,
  SHRINK: 2
};
const strings = exports.strings = {
  BOUNDARY_SET: Object.values(BOUNDARY_MAP),
  POSITION_SET: ['vertical', 'horizontal'],
  MODE_SET: Object.values(MODE_MAP),
  MODE_MAP,
  BOUNDARY_MAP,
  OVERFLOW_DIR
};
const numbers = exports.numbers = {
  MINIMUM_HTML_ELEMENT_WIDTH: 4
};