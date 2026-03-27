import _isObject from "lodash/isObject";
import warning from './warning';
import copy from "fast-copy";
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
export default function getMotionObjFromProps(props) {
  if (typeof props !== 'object' || props === null) {
    throw new TypeError(`props should be object type, got ${typeof props}`);
  }
  const MOTION_PROPS = ['willEnter', 'didEnter', 'willLeave', 'didLeave', 'onStart', 'onRest', 'state'];
  const {
    motion: motionProp = {}
  } = props;
  let motion = {};
  if (_isObject(motionProp)) {
    motion = copy(motionProp);
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
        warning(true, `[Semi] duplicate motion key '${key}' from motion prop and props`);
      }
    }
  } else if (typeof motionProp === 'function') {
    const motionFnResult = motionProp(props);
    motion = _isObject(motionFnResult) ? motionFnResult : {};
  }
  if (_isObject(motion)) {
    for (const key of MOTION_PROPS) {
      if (key in props && !(key in motion)) {
        motion[key] = props[key];
      }
    }
  }
  return motion;
}