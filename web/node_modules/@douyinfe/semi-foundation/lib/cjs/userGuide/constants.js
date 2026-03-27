"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-userGuide`,
  PREFIX_MODAL: `${_constants.BASE_CLASS_PREFIX}-userGuide-modal`
};
const strings = exports.strings = {
  MODE: ['popup', 'modal'],
  POSITION_SET: ['top', 'topLeft', 'topRight', 'left', 'leftTop', 'leftBottom', 'right', 'rightTop', 'rightBottom', 'bottom', 'bottomLeft', 'bottomRight', 'leftTopOver', 'rightTopOver'],
  THEME: ['default', 'primary']
};
const numbers = exports.numbers = {
  DEFAULT_CURRENT: 0,
  DEFAULT_SPOTLIGHT_PADDING: 5,
  DEFAULT_Z_INDEX: 1030
};