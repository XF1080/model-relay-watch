"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isWithinInterval;
var _dateFns = require("date-fns");
var _isString = _interopRequireDefault(require("../../utils/isString"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isWithinInterval(day, _ref) {
  let {
    start,
    end
  } = _ref;
  const d = (0, _isString.default)(day) ? (0, _dateFns.parseISO)(day) : day;
  const s = (0, _isString.default)(start) ? (0, _dateFns.parseISO)(start) : start;
  const e = (0, _isString.default)(end) ? (0, _dateFns.parseISO)(end) : end;
  return (0, _dateFns.isWithinInterval)(d, {
    start: s,
    end: e
  });
}