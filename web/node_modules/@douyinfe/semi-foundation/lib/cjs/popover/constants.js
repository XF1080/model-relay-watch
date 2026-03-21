"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../tooltip/constants");
var _constants2 = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants2.BASE_CLASS_PREFIX}-popover`,
  ARROW: `${_constants2.BASE_CLASS_PREFIX}-popover-icon-arrow`
};
const strings = exports.strings = {
  POSITION_SET: ['top', 'topLeft', 'topRight', 'left', 'leftTop', 'leftBottom', 'right', 'rightTop', 'rightBottom', 'bottom', 'bottomLeft', 'bottomRight', 'leftTopOver', 'rightTopOver'],
  TRIGGER_SET: ['hover', 'focus', 'click', 'custom', 'contextMenu'],
  DEFAULT_ARROW_STYLE: {
    borderOpacity: '1',
    backgroundColor: 'var(--semi-color-bg-3)',
    // borderColor: 'var(--semi-color-shadow)',
    borderColor: 'var(--semi-color-border)'
  }
};
const numbers = exports.numbers = {
  ARROW_BOUNDING: Object.assign(Object.assign({}, _constants.numbers.ARROW_BOUNDING), {
    offsetY: 6,
    offsetX: 0,
    height: 8
  }),
  SPACING: 4,
  SPACING_WITH_ARROW: 10,
  DEFAULT_Z_INDEX: 1030
};