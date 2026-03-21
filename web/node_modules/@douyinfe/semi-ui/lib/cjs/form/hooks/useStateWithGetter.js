"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useStateWithGetter;
var _react = require("react");
// https://github.com/facebook/react/issues/14543
function useStateWithGetter(initial) {
  const ref = (0, _react.useRef)(undefined);
  const [state, setState] = (0, _react.useState)(initial);
  ref.current = state;
  const set = value => {
    ref.current = value;
    setState(value);
  };
  const get = () => ref.current;
  return [state, set, get];
}