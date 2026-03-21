"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-timeline`,
  ITEM: `${_constants.BASE_CLASS_PREFIX}-timeline-item`
};
const strings = exports.strings = {
  MODE: ['left', 'alternate', 'right', 'center'],
  ITEM_POS: ['left', 'right'],
  ITEM_TYPE: ['ongoing', 'success', 'warning', 'error', 'default']
};