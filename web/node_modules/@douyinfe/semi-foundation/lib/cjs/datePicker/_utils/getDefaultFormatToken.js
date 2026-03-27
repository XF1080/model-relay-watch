"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getDefaultFormatTokenByType = getDefaultFormatTokenByType;
var _constants = require("../constants");
const defaultFormatTokens = {
  date: _constants.strings.FORMAT_FULL_DATE,
  dateTime: _constants.strings.FORMAT_DATE_TIME,
  dateRange: _constants.strings.FORMAT_FULL_DATE,
  dateTimeRange: _constants.strings.FORMAT_DATE_TIME,
  month: _constants.strings.FORMAT_YEAR_MONTH,
  monthRange: _constants.strings.FORMAT_YEAR_MONTH
};
const getDefaultFormatToken = type => defaultFormatTokens;
function getDefaultFormatTokenByType(type) {
  return type && defaultFormatTokens[type];
}
var _default = exports.default = getDefaultFormatToken;