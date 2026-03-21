"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-switch`,
  FOCUS: `${_constants.BASE_CLASS_PREFIX}-switch-focus`,
  LARGE: `${_constants.BASE_CLASS_PREFIX}-switch-large`,
  SMALL: `${_constants.BASE_CLASS_PREFIX}-switch-small`,
  CHECKED: `${_constants.BASE_CLASS_PREFIX}-switch-checked`,
  DISABLED: `${_constants.BASE_CLASS_PREFIX}-switch-disabled`,
  ACTIVE: `${_constants.BASE_CLASS_PREFIX}-switch-active`,
  KNOB: `${_constants.BASE_CLASS_PREFIX}-switch-knob`,
  NATIVE_CONTROL: `${_constants.BASE_CLASS_PREFIX}-switch-native-control`,
  CHECKED_TEXT: `${_constants.BASE_CLASS_PREFIX}-switch-checked-text`,
  UNCHECKED_TEXT: `${_constants.BASE_CLASS_PREFIX}-switch-unchecked-text`,
  LOADING_SPIN: `${_constants.BASE_CLASS_PREFIX}-switch-loading-spin`,
  LOADING: `${_constants.BASE_CLASS_PREFIX}-switch-loading`
};
const strings = exports.strings = {
  SIZE_MAP: ['default', 'small', 'large']
};