"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDate;
function isDate(date) {
  return Object.prototype.toString.call(date) === '[object Date]';
}