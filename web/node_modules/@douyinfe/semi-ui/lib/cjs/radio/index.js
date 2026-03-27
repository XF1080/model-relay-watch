"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Radio", {
  enumerable: true,
  get: function () {
    return _radio.default;
  }
});
exports.default = exports.RadioWithGroup = void 0;
var _radioGroup = _interopRequireDefault(require("./radioGroup"));
var _radio = _interopRequireDefault(require("./radio"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class RadioWithGroup extends _radio.default {}
exports.RadioWithGroup = RadioWithGroup;
RadioWithGroup.Group = _radioGroup.default;
var _default = exports.default = RadioWithGroup;