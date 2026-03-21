"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMotionObjFromProps;
var _isObject2 = _interopRequireDefault(require("lodash/isObject"));
var _warning = _interopRequireDefault(require("./warning"));
var _fastCopy = _interopRequireDefault(require("fast-copy"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * get motion object from props
 *
 * example:
 *
 * ```
 *  props = { didLeave: componentHandler, motion: { didLeave: userHandler } };
 *  return { didLeave: () => { componentHandler(); userHandler(); }};
 * ```
 *
 * @param { props: Object }
 * @returns { motion: Object }
 */
function getMotionObjFromProps(props) {
  if (typeof props !== 'object' || props === null) {
    throw new TypeError(`props should be object type, got ${typeof props}`);
  }
  const MOTION_PROPS = ['willEnter', 'didEnter', 'willLeave', 'didLeave', 'onStart', 'onRest', 'state'];
  const {
    motion: motionProp = {}
  } = props;
  let motion = {};
  if ((0, _isObject2.default)(motionProp)) {
    motion = (0, _fastCopy.default)(motionProp);
    for (const key of Object.keys(motionProp)) {
      const handler = motionProp[key];
      if (typeof handler === 'function') {
        if (key in props) {
          motion[key] = () => {
            props[key](); // call handler function of semi build-in components firstly
            handler(); // call user given handler function
          };
        }
      } else {
        (0, _warning.default)(true, `[Semi] duplicate motion key '${key}' from motion prop and props`);
      }
    }
  } else if (typeof motionProp === 'function') {
    const motionFnResult = motionProp(props);
    motion = (0, _isObject2.default)(motionFnResult) ? motionFnResult : {};
  }
  if ((0, _isObject2.default)(motion)) {
    for (const key of MOTION_PROPS) {
      if (key in props && !(key in motion)) {
        motion[key] = props[key];
      }
    }
  }
  return motion;
}