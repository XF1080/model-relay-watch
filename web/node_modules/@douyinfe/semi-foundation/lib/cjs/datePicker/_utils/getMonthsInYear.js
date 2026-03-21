"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const getMonthsInYear = year => Array.from({
  length: 12
}, (v, i) => `${year}-${i + 1}`);
var _default = exports.default = getMonthsInYear;