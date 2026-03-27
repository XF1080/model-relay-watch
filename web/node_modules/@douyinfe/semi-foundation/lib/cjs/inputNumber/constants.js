"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../input/constants");
const cssClasses = exports.cssClasses = Object.assign({}, _constants.cssClasses);
const numbers = exports.numbers = Object.assign(Object.assign({}, _constants.numbers), {
  DEFAULT_STEP: 1,
  DEFAULT_SHIFT_STEP: 10,
  DEFAULT_PRESS_TIMEOUT: 250,
  DEFAULT_PRESS_INTERVAL: 0,
  MOUSE_BUTTON_LEFT: 0
});
const strings = exports.strings = Object.assign({}, _constants.strings);