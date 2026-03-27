"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  TABS: `${_constants.BASE_CLASS_PREFIX}-tabs`,
  TABS_BAR: `${_constants.BASE_CLASS_PREFIX}-tabs-bar`,
  TABS_BAR_LINE: `${_constants.BASE_CLASS_PREFIX}-tabs-bar-line`,
  TABS_BAR_CARD: `${_constants.BASE_CLASS_PREFIX}-tabs-bar-card`,
  TABS_BAR_BUTTON: `${_constants.BASE_CLASS_PREFIX}-tabs-bar-button`,
  TABS_BAR_SLASH: `${_constants.BASE_CLASS_PREFIX}-tabs-bar-slash`,
  TABS_BAR_EXTRA: `${_constants.BASE_CLASS_PREFIX}-tabs-bar-extra`,
  TABS_TAB: `${_constants.BASE_CLASS_PREFIX}-tabs-tab`,
  TABS_TAB_ACTIVE: `${_constants.BASE_CLASS_PREFIX}-tabs-tab-active`,
  TABS_TAB_DISABLED: `${_constants.BASE_CLASS_PREFIX}-tabs-tab-disabled`,
  TABS_CONTENT: `${_constants.BASE_CLASS_PREFIX}-tabs-content`,
  TABS_CONTENT_ANIMATED: `${_constants.BASE_CLASS_PREFIX}-tabs-content-animated`,
  TABS_CONTENT_NO_ANIMATED: `${_constants.BASE_CLASS_PREFIX}-tabs-content-no-animated`,
  TABS_PANE: `${_constants.BASE_CLASS_PREFIX}-tabs-pane`,
  TABS_PANE_INACTIVE: `${_constants.BASE_CLASS_PREFIX}-tabs-pane-inactive`,
  TABS_PANE_ACTIVE: `${_constants.BASE_CLASS_PREFIX}-tabs-pane-active`,
  TABS_PANE_MOTION_OVERLAY: `${_constants.BASE_CLASS_PREFIX}-tabs-pane-motion-overlay`,
  TABS_PANE_ANIMATING: `${_constants.BASE_CLASS_PREFIX}-tabs-pane-animating`,
  "TABS_PANE_ANIMATE_LEFT_SHOW": `${_constants.BASE_CLASS_PREFIX}-tabs-pane-animate-leftShow`,
  "TABS_PANE_ANIMATE_RIGHT_SHOW": `${_constants.BASE_CLASS_PREFIX}-tabs-pane-animate-rightShow`,
  "TABS_PANE_ANIMATE_TOP_SHOW": `${_constants.BASE_CLASS_PREFIX}-tabs-pane-animate-topShow`,
  "TABS_PANE_ANIMATE_BOTTOM_SHOW": `${_constants.BASE_CLASS_PREFIX}-tabs-pane-animate-bottomShow`
};
const numbers = exports.numbers = {
  DEFAULT_ACTIVE_KEY: 1
};
const strings = exports.strings = {
  TYPE_MAP: ['line', 'card', 'button', 'slash'],
  SIZE: ['small', 'medium', 'large'],
  POSITION_MAP: ['top', 'left']
};