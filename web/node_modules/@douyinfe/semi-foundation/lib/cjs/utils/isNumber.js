"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumber;
function isNumber(value) {
  return typeof value === 'number' || Object.prototype.toString.call(value) === '[object Number]';
}