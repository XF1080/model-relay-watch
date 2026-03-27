"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Animation", {
  enumerable: true,
  get: function () {
    return _Animation.default;
  }
});
Object.defineProperty(exports, "KeyFrames", {
  enumerable: true,
  get: function () {
    return _KeyFrames.default;
  }
});
Object.defineProperty(exports, "StyledAnimation", {
  enumerable: true,
  get: function () {
    return _StyledAnimation.default;
  }
});
Object.defineProperty(exports, "StyledTransition", {
  enumerable: true,
  get: function () {
    return _StyledTransition.default;
  }
});
Object.defineProperty(exports, "Transition", {
  enumerable: true,
  get: function () {
    return _Transition.default;
  }
});
Object.defineProperty(exports, "interpolate", {
  enumerable: true,
  get: function () {
    return _semiAnimation.interpolate;
  }
});
Object.defineProperty(exports, "presets", {
  enumerable: true,
  get: function () {
    return _semiAnimation.presets;
  }
});
var _StyledAnimation = _interopRequireDefault(require("./src/StyledAnimation"));
var _StyledTransition = _interopRequireDefault(require("./src/StyledTransition"));
var _Animation = _interopRequireDefault(require("./src/Animation"));
var _KeyFrames = _interopRequireDefault(require("./src/KeyFrames"));
var _Transition = _interopRequireDefault(require("./src/Transition"));
var _semiAnimation = require("@douyinfe/semi-animation");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }