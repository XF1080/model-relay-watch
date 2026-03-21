"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shouldUseBezier;
function shouldUseBezier(config) {
  return Boolean(config && typeof config === 'object' && (config.duration > 0 || typeof config.easing === 'string' || typeof config.easing === 'function'));
}