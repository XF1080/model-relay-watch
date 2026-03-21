"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-aiChatInput`
};
const strings = exports.strings = {
  TOPS_SLOT_POSITION_DEFAULT: "top",
  ZERO_WIDTH_CHAR: '\uFEFF',
  PIC_PREFIX: 'image/',
  PIC_SUFFIX_ARRAY: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'],
  DELETABLE: 'skipCustomTransactionPlugin',
  SEND_HOTKEY: {
    'ENTER': 'enter',
    'SHIFT_ENTER': 'shift+enter'
  }
};
const numbers = exports.numbers = {
  SCROLL_AMOUNT: 300,
  SKILL_MAX_HEIGHT: 270,
  TEMPLATE_MAX_HEIGHT: 500,
  SUGGESTION_MAX_HEIGHT: 270
};