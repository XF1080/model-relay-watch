"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTime = void 0;
const formatTime = time => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
exports.formatTime = formatTime;