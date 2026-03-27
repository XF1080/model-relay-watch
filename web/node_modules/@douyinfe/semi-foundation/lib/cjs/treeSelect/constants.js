"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-tree-select`,
  PREFIX_TREE: `${_constants.BASE_CLASS_PREFIX}-tree`,
  PREFIX_OPTION: `${_constants.BASE_CLASS_PREFIX}-tree-select-option`
};
const strings = exports.strings = {
  SIZE_SET: ['small', 'large', 'default'],
  SEARCH_POSITION_DROPDOWN: 'dropdown',
  SEARCH_POSITION_TRIGGER: 'trigger',
  STATUS: _constants.VALIDATE_STATUS
};
const numbers = exports.numbers = {};