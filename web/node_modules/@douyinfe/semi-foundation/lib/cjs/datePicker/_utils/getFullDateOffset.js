"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _constants = require("../constants");
var _dateFns = require("date-fns");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Calculate the date string offset from the date
 * @param {*} fn
 * @param {*} date
 */
const getFullDateOffset = (fn, date) => {
  if (!date) {
    return '';
  }
  const getDate = new Date(date);
  const offsetDate = (0, _isFunction2.default)(fn) ? fn(getDate) : getDate;
  return (0, _dateFns.format)(new Date(offsetDate), _constants.strings.FORMAT_FULL_DATE);
};
var _default = exports.default = getFullDateOffset;