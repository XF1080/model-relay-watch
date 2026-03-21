"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-badge`
};
const strings = exports.strings = {
  TYPE_SET: ['success', 'primary', 'secondary', 'tertiary', 'warning', 'danger'],
  THEME_SET: ['solid', 'light', 'inverted'],
  POS_SET: ['leftTop', 'leftBottom', 'rightTop', 'rightBottom']
};
const numbers = exports.numbers = {};