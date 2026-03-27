"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warning;
function warning(flag, info) {
  if (flag) {
    console.warn(`Warning: ${info}`);
  }
}