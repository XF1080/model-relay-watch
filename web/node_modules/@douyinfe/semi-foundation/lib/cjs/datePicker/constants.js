"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strings = exports.numbers = exports.cssClasses = void 0;
var _constants = require("../base/constants");
var _constants2 = require("../popover/constants");
const dayItemClasses = {
  DAY_TODAY: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-today`,
  DAY_IN_RANGE: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-inrange`,
  DAY_HOVER: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-inhover`,
  DAY_SELECTED: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-selected`,
  DAY_SELECTED_START: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-selected-start`,
  DAY_SELECTED_END: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-selected-end`,
  DAY_DISABLED: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-disabled`,
  DAY_HOVER_DAY: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-hoverday`,
  DAY_HOVER_DAY_OFFSET: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-hoverday-offset`,
  DAY_IN_OFFSET_RANGE: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-inoffsetrange`,
  DAY_SELECTED_RANGE_HOVER: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-selectedrange-hover`,
  DAY_OFFSET_RANGE_START: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-offsetrange-start`,
  DAY_OFFSET_RANGE_END: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-offsetrange-end`,
  DAY_SELECTED_START_AFTER_HOVER: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-selected-start-afterhover`,
  DAY_SELECTED_END_BEFORE_HOVER: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-selected-end-beforehover`,
  DAY_HOVER_DAY_BEFORE_RANGE: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-hoverday-beforerange`,
  DAY_HOVER_DAY_AFTER_RANGE: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-hoverday-afterrange`,
  DAY_HOVER_DAY_IN_RANGE: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-hoverday-inrange`,
  DAY_HOVER_DAY_AROUND_SINGLE_SELECTED: `${_constants.BASE_CLASS_PREFIX}-datepicker-day-hoverday-around-singleselected`
};
const cssClasses = exports.cssClasses = Object.assign({
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-datepicker`,
  NAVIGATION: `${_constants.BASE_CLASS_PREFIX}-datepicker-navigation`,
  PANEL_YAM: `${_constants.BASE_CLASS_PREFIX}-datepicker-panel-yam`,
  MONTH: `${_constants.BASE_CLASS_PREFIX}-datepicker-month`,
  WEEKDAY: `${_constants.BASE_CLASS_PREFIX}-datepicker-weekday`,
  WEEKS: `${_constants.BASE_CLASS_PREFIX}-datepicker-weeks`,
  WEEK: `${_constants.BASE_CLASS_PREFIX}-datepicker-week`,
  DAY: `${_constants.BASE_CLASS_PREFIX}-datepicker-day`
}, dayItemClasses);
const formatToken = {
  FORMAT_FULL_DATE: 'yyyy-MM-dd',
  FORMAT_TIME_PICKER: 'HH:mm:ss',
  FORMAT_DATE_TIME: 'yyyy-MM-dd HH:mm:ss',
  FORMAT_YEAR_MONTH: 'yyyy-MM'
};
const strings = exports.strings = Object.assign({
  DEFAULT_SEPARATOR_MULTIPLE: ',',
  DEFAULT_SEPARATOR_RANGE: ' ~ ',
  SIZE_SET: ['small', 'default', 'large'],
  TYPE_SET: ['date', 'dateRange', 'year', 'month', 'monthRange', 'dateTime', 'dateTimeRange'],
  PRESET_POSITION_SET: ['left', 'right', 'top', 'bottom'],
  DENSITY_SET: ['default', 'compact'],
  PANEL_TYPE_LEFT: 'left',
  PANEL_TYPE_RIGHT: 'right',
  STATUS: _constants.VALIDATE_STATUS,
  POSITION_SET: _constants2.strings.POSITION_SET,
  POSITION_INLINE_INPUT: 'leftTopOver'
}, formatToken);
const numbers = exports.numbers = {
  WEEK_START_ON: 0,
  WEEK_HEIGHT: 36,
  SPACING: _constants2.numbers.SPACING,
  SPACING_INSET_INPUT: 1
};