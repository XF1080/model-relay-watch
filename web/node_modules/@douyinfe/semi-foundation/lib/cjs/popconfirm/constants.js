"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-popconfirm`,
  POPOVER: `${_constants.BASE_CLASS_PREFIX}-popconfirm-popover`
};
const strings = exports.strings = {
  POSITION_SET: ['top', 'topLeft', 'topRight', 'left', 'leftTop', 'leftBottom', 'right', 'rightTop', 'rightBottom', 'bottom', 'bottomLeft', 'bottomRight', 'leftTopOver', 'rightTopOver'],
  TRIGGER_SET: ['hover', 'focus', 'click', 'custom']
};
const numbers = exports.numbers = {
  SPACING: 4,
  DEFAULT_Z_INDEX: 1030
};