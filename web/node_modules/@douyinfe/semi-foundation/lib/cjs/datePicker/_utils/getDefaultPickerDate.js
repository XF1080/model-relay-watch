"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDefaultPickerDate;
var _dateFns = require("date-fns");
var _isValidDate = _interopRequireDefault(require("./isValidDate"));
var _parser = require("./parser");
var _isTimestamp = _interopRequireDefault(require("./isTimestamp"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * get left panel picker date and right panel picker date
 */
function getDefaultPickerDate(options) {
  const {
    defaultPickerValue,
    format,
    dateFnsLocale
  } = options;
  let nowDate = Array.isArray(defaultPickerValue) ? defaultPickerValue[0] : defaultPickerValue;
  let nextDate = Array.isArray(defaultPickerValue) ? defaultPickerValue[1] : undefined;
  switch (true) {
    case (0, _isValidDate.default)(nowDate):
      break;
    case (0, _isTimestamp.default)(nowDate):
      nowDate = new Date(nowDate);
      break;
    case typeof nowDate === 'string':
      nowDate = (0, _parser.compatibleParse)(nowDate, format, undefined, dateFnsLocale);
      break;
    default:
      nowDate = new Date();
      break;
  }
  switch (true) {
    case (0, _isValidDate.default)(nextDate):
      break;
    case (0, _isTimestamp.default)(nextDate):
      nextDate = new Date(nextDate);
      break;
    case typeof nextDate === 'string':
      nextDate = (0, _parser.compatibleParse)(nextDate, format, undefined, dateFnsLocale);
      break;
    default:
      nextDate = (0, _dateFns.addMonths)(nowDate, 1);
      break;
  }
  return {
    nowDate: nowDate,
    nextDate: nextDate
  };
}