"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const PREFIX = `${_constants.BASE_CLASS_PREFIX}-upload`;
const FILE_LIST_PIC = 'picture';
const FILE_LIST_DEFAULT = 'list';
const FILE_LIST_NONE = 'none';
const PROGRESS_COEFFICIENT = 0.95;
const cssClasses = exports.cssClasses = {
  PREFIX,
  // WRAPPER: `${PREFIX}-wrapper`,
  LIST: `${PREFIX}-list`
};
const TRIGGER_AUTO = 'auto';
const TRIGGER_CUSTOM = 'custom';
const strings = exports.strings = {
  FILE_STATUS_UPLOADING: 'uploading',
  FILE_STATUS_SUCCESS: 'success',
  FILE_STATUS_UPLOAD_FAIL: 'uploadFail',
  FILE_STATUS_VALIDATING: 'validating',
  FILE_STATUS_VALID_FAIL: 'validateFail',
  FILE_STATUS_WAIT_UPLOAD: 'wait',
  FILE_LIST_PIC,
  FILE_LIST_DEFAULT,
  LIST_TYPE: [FILE_LIST_PIC, FILE_LIST_DEFAULT, FILE_LIST_NONE],
  imageTypes: ['image', 'webp', 'png', 'svg', 'gif', 'jpg', 'jpeg', 'bmp', 'dpg'],
  DRAG_AREA_DEFAULT: 'default',
  DRAG_AREA_LEGAL: 'legal',
  DRAG_AREA_ILLEGAL: 'illegal',
  TRIGGER_AUTO,
  TRIGGER_CUSTOM,
  UPLOAD_TRIGGER: [TRIGGER_AUTO, TRIGGER_CUSTOM],
  VALIDATE_STATUS: _constants.VALIDATE_STATUS,
  PROMPT_POSITION: ['left', 'right', 'bottom']
};
const numbers = exports.numbers = {
  PROGRESS_COEFFICIENT
};