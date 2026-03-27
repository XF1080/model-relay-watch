"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClassesGroup = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-floatButton`
};
const cssClassesGroup = exports.cssClassesGroup = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-floatButtonGroup`
};
const strings = exports.strings = {
  SHAPE: ['square', 'round'],
  SIZE: ['small', 'default', 'large']
};