"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Checkbox", {
  enumerable: true,
  get: function () {
    return _checkbox.default;
  }
});
exports.default = exports.CheckboxWithGroup = void 0;
var _checkbox = _interopRequireDefault(require("./checkbox"));
var _checkboxGroup = _interopRequireDefault(require("./checkboxGroup"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CheckboxWithGroup extends _checkbox.default {}
exports.CheckboxWithGroup = CheckboxWithGroup;
CheckboxWithGroup.Group = _checkboxGroup.default;
var _default = exports.default = CheckboxWithGroup;