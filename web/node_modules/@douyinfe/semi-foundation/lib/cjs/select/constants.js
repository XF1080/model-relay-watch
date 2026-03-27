"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
var _constants2 = require("../tooltip/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-select`,
  PREFIX_OPTION: `${_constants.BASE_CLASS_PREFIX}-select-option`,
  PREFIX_GROUP: `${_constants.BASE_CLASS_PREFIX}-select-group`
};
const strings = exports.strings = {
  SIZE_SET: ['small', 'large', 'default'],
  POSITION_SET: _constants2.strings.POSITION_SET,
  MODE_SELECT: 'select',
  MODE_AUTOCOMPLETE: 'autoComplete',
  // MODE_TAGS: 'tags',
  STATUS: _constants.VALIDATE_STATUS,
  SEARCH_POSITION_TRIGGER: 'trigger',
  SEARCH_POSITION_DROPDOWN: 'dropdown'
};
const numbers = exports.numbers = {
  LIST_HEIGHT: 270
};