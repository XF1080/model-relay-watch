"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isObject;
function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}