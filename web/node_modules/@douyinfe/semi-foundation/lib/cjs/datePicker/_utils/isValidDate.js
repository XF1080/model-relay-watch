"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValidDate;
function isValidDate(date) {
  return date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);
}