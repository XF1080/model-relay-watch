"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-button`
};
const strings = exports.strings = {
  sizes: ['default', 'small', 'large'],
  iconPositions: ['left', 'right'],
  htmlTypes: ['button', 'reset', 'submit'],
  btnTypes: ['primary', 'secondary', 'tertiary', 'warning', 'danger'],
  themes: ['solid', 'borderless', 'light', 'outline'],
  DEFAULT_ICON_SIZE: 'default',
  DEFAULT_ICON_POSITION: 'left'
};
const numbers = exports.numbers = {};