"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _semiAnimation = require("@douyinfe/semi-animation");
const scrollTo = (element, to, duration) => {
  const animation = new _semiAnimation.Animation({
    from: {
      scrollTop: element.scrollTop
    },
    to: {
      scrollTop: to
    }
  }, {
    duration
  });
  animation.on('frame', _ref => {
    let {
      scrollTop
    } = _ref;
    element.scrollTop = scrollTop;
  });
  // animation.start();
  return animation;
};
var _default = exports.default = scrollTo;