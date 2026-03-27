"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-progress`
};
const strings = exports.strings = {
  types: ['line', 'circle'],
  DEFAULT_TYPE: 'line',
  STROKE_DEFAULT: 'var(--semi-color-success)',
  strokeLineCap: ['square', 'round'],
  DEFAULT_LINECAP: 'round',
  sizes: ['default', 'small', 'large'],
  DEFAULT_SIZE: 'default',
  directions: ['vertical', 'horizontal'],
  DEFAULT_DIRECTION: 'horizontal'
};
const numbers = {};