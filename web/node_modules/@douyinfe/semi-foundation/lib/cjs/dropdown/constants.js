"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../tooltip/constants");
var _constants2 = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants2.BASE_CLASS_PREFIX}-dropdown`,
  SELECTED: `${_constants2.BASE_CLASS_PREFIX}-dropdown-item-selected`,
  DISABLED: `${_constants2.BASE_CLASS_PREFIX}-dropdown-item-disabled`
};
const strings = exports.strings = {
  POSITION_SET: _constants.strings.POSITION_SET,
  TRIGGER_SET: ['hover', 'focus', 'click', 'custom', 'contextMenu'],
  DEFAULT_LEAVE_DELAY: 100,
  ITEM_TYPE: ['primary', 'secondary', 'tertiary', 'warning', 'danger']
};
const numbers = exports.numbers = {
  SPACING: 4,
  NESTED_SPACING: 2
};