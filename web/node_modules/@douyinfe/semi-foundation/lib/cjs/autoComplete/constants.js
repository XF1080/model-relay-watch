"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../tooltip/constants");
var _constants2 = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants2.BASE_CLASS_PREFIX}-autocomplete`,
  PREFIX_OPTION: `${_constants2.BASE_CLASS_PREFIX}-autocomplete-option`,
  PREFIX_GROUP: `${_constants2.BASE_CLASS_PREFIX}-autocomplete-group`
};
const strings = exports.strings = {
  SIZE: ['small', 'large', 'default'],
  POSITION: _constants.strings.POSITION_SET,
  OPTIONS: ['children', 'value'],
  STATUS: _constants2.VALIDATE_STATUS
};