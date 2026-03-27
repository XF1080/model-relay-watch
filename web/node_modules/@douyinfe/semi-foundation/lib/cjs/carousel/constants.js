"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  CAROUSEL: `${_constants.BASE_CLASS_PREFIX}-carousel`,
  CAROUSEL_INDICATOR: `${_constants.BASE_CLASS_PREFIX}-carousel-indicator`,
  CAROUSEL_INDICATOR_LINE: `${_constants.BASE_CLASS_PREFIX}-carousel-indicator-line`,
  CAROUSEL_INDICATOR_DOT: `${_constants.BASE_CLASS_PREFIX}-carousel-indicator-dot`,
  CAROUSEL_INDICATOR_COLUMNAR: `${_constants.BASE_CLASS_PREFIX}-carousel-indicator-columnar`,
  CAROUSEL_INDICATOR_INACTIVE: `${_constants.BASE_CLASS_PREFIX}-carousel-indicator-inactive`,
  CAROUSEL_INDICATOR_ACTIVE: `${_constants.BASE_CLASS_PREFIX}-carousel-indicator-active`,
  CAROUSEL_CONTENT: `${_constants.BASE_CLASS_PREFIX}-carousel-content`,
  CAROUSEL_ARROW: `${_constants.BASE_CLASS_PREFIX}-carousel-arrow`
};
const numbers = exports.numbers = {
  DEFAULT_ACTIVE_INDEX: 0,
  DEFAULT_INTERVAL: 2000,
  DEFAULT_SPEED: 300
};
const strings = exports.strings = {
  ANIMATION_MAP: ['slide', 'fade'],
  DIRECTION: ['left', 'right'],
  TYPE_MAP: ['columnar', 'line', 'dot'],
  THEME_MAP: ['dark', 'primary', 'light'],
  POSITION_MAP: ['left', 'center', 'right'],
  ARROW_MAP: ['always', 'hover'],
  SIZE: ['small', 'medium'],
  TRIGGER: ['click', 'hover']
};