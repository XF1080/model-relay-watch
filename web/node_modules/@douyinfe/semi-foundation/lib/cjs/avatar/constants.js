"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-avatar`
};
const strings = exports.strings = {
  SHAPE: ['circle', 'square'],
  SIZE: ['extra-extra-small', 'extra-small', 'small', 'default', 'medium', 'large', 'extra-large'],
  COLOR: ['grey', 'red', 'pink', 'purple', 'violet', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'white'],
  OVERLAP_FROM: ['start', 'end']
};