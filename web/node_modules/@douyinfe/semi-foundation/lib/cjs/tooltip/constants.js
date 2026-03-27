"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-tooltip`
};
const strings = exports.strings = {
  POSITION_SET: ['top', 'topLeft', 'topRight', 'left', 'leftTop', 'leftBottom', 'right', 'rightTop', 'rightBottom', 'bottom', 'bottomLeft', 'bottomRight', 'leftTopOver', 'rightTopOver', 'leftBottomOver', 'rightBottomOver'],
  TRIGGER_SET: ['hover', 'focus', 'click', 'custom', 'contextMenu'],
  STATUS_DISABLED: 'disabled',
  STATUS_LOADING: 'loading'
};
const numbers = exports.numbers = {
  ARROW_BOUNDING: {
    offsetX: 0,
    offsetY: 2,
    width: 24,
    height: 7
  },
  DEFAULT_Z_INDEX: 1060,
  MOUSE_ENTER_DELAY: 50,
  MOUSE_LEAVE_DELAY: 50,
  SPACING: 8,
  MARGIN: 0
};