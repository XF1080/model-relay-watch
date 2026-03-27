"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.radioGroupClasses = exports.radioClasses = exports.numbers = void 0;
var _constants = require("../base/constants");
const radioClasses = exports.radioClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-radio`,
  INNER: `${_constants.BASE_CLASS_PREFIX}-radio-inner`,
  TEXT: `${_constants.BASE_CLASS_PREFIX}-radio-text`,
  INPUT: `${_constants.BASE_CLASS_PREFIX}-radio-input`,
  CHECKED: `${_constants.BASE_CLASS_PREFIX}-radio-checked`,
  DISABLED: `${_constants.BASE_CLASS_PREFIX}-radio-disabled`,
  BUTTON: `${_constants.BASE_CLASS_PREFIX}-radio-button`
};
const radioGroupClasses = exports.radioGroupClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-radioGroup`,
  INNER: `${_constants.BASE_CLASS_PREFIX}-radioGroup-inner`,
  TEXT: `${_constants.BASE_CLASS_PREFIX}-radioGroup-text`,
  INPUT: `${_constants.BASE_CLASS_PREFIX}-radioGroup-input`,
  CHECKED: `${_constants.BASE_CLASS_PREFIX}-radioGroup-checked`,
  DISABLED: `${_constants.BASE_CLASS_PREFIX}-radioGroup-disabled`
};
const strings = exports.strings = {
  DIRECTION_SET: ['horizontal', 'vertical'],
  DEFAULT_DIRECTION: 'horizontal',
  MODE: ['advanced', ''],
  TYPE_DEFAULT: 'default',
  TYPE_BUTTON: 'button',
  TYPE_CARD: 'card',
  TYPE_PURECARD: 'pureCard',
  BUTTON_SIZE: ['middle', 'small', 'large']
};
const numbers = exports.numbers = {};