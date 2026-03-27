"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-sidesheet`,
  DIALOG: `${_constants.BASE_CLASS_PREFIX}-modal`
};
const strings = exports.strings = {
  PLACEMENT: ['top', 'right', 'bottom', 'left'],
  SIZE: ['small', 'medium', 'large'],
  WIDTH: {
    small: 448,
    medium: 684,
    large: 920
  },
  HEIGHT: 448
};