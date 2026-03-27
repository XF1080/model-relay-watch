"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-page`
};
const strings = exports.strings = {};
const numbers = exports.numbers = {
  PAGE_SHOW_MAX: 7,
  REST_PAGE_SHOW_MAX: 5,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTION: [10, 20, 40, 100],
  REST_PAGE_MAX_SIZE: 1000000
};