"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 *
 * @param {number} weekStartsOn
 * the index of the first day of the week （0-Sunday，1-Monday, etc）
 *
 */
const getDayofWeek = _ref => {
  let {
    weekStartsOn = 0
  } = _ref;
  const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let index = 0; index < weekStartsOn; index++) {
    weekDay.push(weekDay.shift());
  }
  return weekDay;
};
var _default = exports.default = getDayofWeek;