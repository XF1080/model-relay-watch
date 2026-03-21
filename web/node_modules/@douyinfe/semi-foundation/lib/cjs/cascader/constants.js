"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = exports.VALUE_SPLIT = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-cascader`,
  PREFIX_OPTION: `${_constants.BASE_CLASS_PREFIX}-cascader-option`
};
const strings = exports.strings = {
  SIZE_SET: ['small', 'large', 'default'],
  VALIDATE_STATUS: ['success', 'default', 'error', 'warning'],
  IS_KEY: 'isKey',
  IS_VALUE: 'isValue',
  SHOW_NEXT_BY_CLICK: 'click',
  SHOW_NEXT_BY_HOVER: 'hover',
  /* Merge Type */
  LEAF_ONLY_MERGE_TYPE: 'leafOnly',
  AUTO_MERGE_VALUE_MERGE_TYPE: 'autoMergeValue',
  NONE_MERGE_TYPE: 'none',
  SEARCH_POSITION_TRIGGER: 'trigger',
  SEARCH_POSITION_CUSTOM: 'custom',
  RELATED: 'related',
  UN_RELATED: 'unRelated'
};
const numbers = exports.numbers = {};
const VALUE_SPLIT = exports.VALUE_SPLIT = '_SEMI_CASCADER_SPLIT_';