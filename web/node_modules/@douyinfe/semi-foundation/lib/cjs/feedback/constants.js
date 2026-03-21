"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-feedback`
};
const strings = exports.strings = {
  MODE: ['modal', 'popup'],
  TYPE: ['text', 'emoji', 'radio', 'checkbox', 'custom'],
  Emoji: {
    bad: '😞',
    normal: '😐',
    good: '😃'
  }
};