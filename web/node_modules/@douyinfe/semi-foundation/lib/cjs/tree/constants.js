"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-tree`,
  PREFIX_OPTION: `${_constants.BASE_CLASS_PREFIX}-tree-option`
};
const strings = exports.strings = {
  EXPAND_ACTION: [false, 'click', 'doubleClick'],
  JSON_KEY_SPLIT: '_SEMI_TREE_SPLIT_'
};
const numbers = exports.numbers = {};