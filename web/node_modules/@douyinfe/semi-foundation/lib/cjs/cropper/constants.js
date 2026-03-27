"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const moduleName = `${_constants.BASE_CLASS_PREFIX}-cropper`;
const cssClasses = exports.cssClasses = {
  PREFIX: `${moduleName}`,
  IMG: `${moduleName}-img`,
  IMG_WRAPPER: `${moduleName}-img-wrapper`,
  CROPPER_BOX: `${moduleName}-box`,
  CROPPER_VIEW_BOX: `${moduleName}-view-box`,
  CROPPER_VIEW_BOX_ROUND: `${moduleName}-view-box-round`,
  CROPPER_IMG: `${moduleName}-view-img`,
  MASK: `${moduleName}-mask`,
  CORNER: `${moduleName}-box-corner`
};
const strings = exports.strings = {
  shape: ['rect', 'round', 'roundRect'],
  corner: ['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br'],
  roundCorner: ['tm', 'ml', 'mr', 'bm']
};