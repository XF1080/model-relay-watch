"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapValue;
var _getEasing = _interopRequireDefault(require("./getEasing"));
var _presets = _interopRequireDefault(require("./presets"));
var _shouldUseBezier = _interopRequireDefault(require("./shouldUseBezier"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultConfig = Object.assign(Object.assign({}, _presets.default.default), {
  precision: 0.01
});
function wrapValue(val) {
  let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if ((0, _shouldUseBezier.default)(config)) {
    const easing = (0, _getEasing.default)(config.easing);
    const duration = typeof config.duration === 'number' && config.duration > 0 ? config.duration : 1000;
    config = Object.assign(Object.assign({}, config), {
      easing,
      duration
    });
  }
  let wrapped = Object.assign(Object.assign(Object.assign({}, defaultConfig), config), {
    done: false
  });
  if (val && typeof val === 'object' && 'val' in val) {
    if ((0, _shouldUseBezier.default)(val)) {
      const easing = (0, _getEasing.default)(val.easing);
      const duration = typeof val.duration === 'number' && val.duration > 0 ? val.duration : parseInt(config.duration) || 1000;
      val = Object.assign(Object.assign({}, val), {
        easing,
        duration
      });
    }
    wrapped = Object.assign(Object.assign({}, wrapped), val);
  } else {
    wrapped = Object.assign(Object.assign({}, wrapped), {
      val
    });
  }
  return wrapped;
}