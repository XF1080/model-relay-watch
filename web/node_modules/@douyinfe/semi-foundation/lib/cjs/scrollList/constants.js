"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-scrolllist`,
  SELECTED: `${_constants.BASE_CLASS_PREFIX}-scrolllist-item-selected`
};
const strings = exports.strings = {
  MODE: ['normal', 'wheel']
};
const numbers = exports.numbers = {
  DEFAULT_ITEM_HEIGHT: 36,
  DEFAULT_SCROLL_DURATION: 120
};