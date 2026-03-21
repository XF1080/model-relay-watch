"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-form`
};
const strings = exports.strings = {
  LAYOUT: ['horizontal', 'vertical'],
  LABEL_POS: ['left', 'top', 'inset'],
  LABEL_ALIGN: ['left', 'right'],
  EXTRA_POS: ['middle', 'bottom'],
  DEFAULT_TRIGGER: 'change'
};
const numbers = exports.numbers = {};