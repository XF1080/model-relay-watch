"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.checkboxGroupClasses = exports.checkboxClasses = void 0;
var _constants = require("../base/constants");
const checkboxClasses = exports.checkboxClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-checkbox`,
  INNER: `${_constants.BASE_CLASS_PREFIX}-checkbox-inner`,
  TEXT: `${_constants.BASE_CLASS_PREFIX}-checkbox-text`,
  INPUT: `${_constants.BASE_CLASS_PREFIX}-checkbox-input`,
  CHECKED: `${_constants.BASE_CLASS_PREFIX}-checkbox-checked`,
  DISABLED: `${_constants.BASE_CLASS_PREFIX}-checkbox-disabled`,
  BUTTON: `${_constants.BASE_CLASS_PREFIX}-checkbox-button`,
  WRAPPER: ''
};
const checkboxGroupClasses = exports.checkboxGroupClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-checkboxGroup`,
  INNER: `${_constants.BASE_CLASS_PREFIX}-checkboxGroup-inner`,
  TEXT: `${_constants.BASE_CLASS_PREFIX}-checkboxGroup-text`,
  INPUT: `${_constants.BASE_CLASS_PREFIX}-checkboxGroup-input`,
  CHECKED: `${_constants.BASE_CLASS_PREFIX}-checkboxGroup-checked`,
  DISABLED: `${_constants.BASE_CLASS_PREFIX}-checkboxGroup-disabled`
};
const strings = exports.strings = {
  DIRECTION_SET: ['horizontal', 'vertical'],
  TYPE_DEFAULT: 'default',
  TYPE_CARD: 'card',
  TYPE_PURECARD: 'pureCard',
  DEFAULT_DIRECTION: 'vertical'
};
const numbers = exports.numbers = {};