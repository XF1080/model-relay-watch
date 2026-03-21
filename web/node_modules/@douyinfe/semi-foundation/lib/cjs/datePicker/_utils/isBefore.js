"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBefore;
var _dateFns = require("date-fns");
var _isString = _interopRequireDefault(require("../../utils/isString"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isBefore(date, dateToCompare) {
  const dayOne = (0, _isString.default)(date) ? (0, _dateFns.parseISO)(date) : date;
  const dayTwo = (0, _isString.default)(dateToCompare) ? (0, _dateFns.parseISO)(dateToCompare) : dateToCompare;
  return (0, _dateFns.isBefore)(dayOne, dayTwo);
}