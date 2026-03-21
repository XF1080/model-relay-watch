"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  SIDEBAR: `${_constants.BASE_CLASS_PREFIX}-sidebar`,
  COLLAPSE: `${_constants.BASE_CLASS_PREFIX}-sidebar-collapse`,
  SIDEBAR_CONTENT: `${_constants.BASE_CLASS_PREFIX}-sidebar-content`,
  MCP_CONFIGURE_CONTENT: `${_constants.BASE_CLASS_PREFIX}-sidebar-mcp-configure-content`,
  ANNOTATION_CONTENT: `${_constants.BASE_CLASS_PREFIX}-sidebar-annotation_content`,
  ANNOTATION_ITEM: `${_constants.BASE_CLASS_PREFIX}-sidebar-annotation-item`,
  ANNOTATION: `${_constants.BASE_CLASS_PREFIX}-sidebar-annotation`,
  OPTIONS: `${_constants.BASE_CLASS_PREFIX}-sidebar-options`,
  FILE: `${_constants.BASE_CLASS_PREFIX}-sidebar-file`
};
const strings = exports.strings = {
  MODE: {
    MAIN: 'main',
    CODE: 'code',
    FILE: 'file'
  },
  MCP_MODE: {
    INNER: 'inner',
    CUSTOM: 'custom'
  },
  DIRECTION: {
    left: true,
    right: false,
    top: false,
    bottom: false,
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false
  },
  JSON_VIEWER_OPTIONS: {
    readOnly: true,
    autoWrap: true
  }
};