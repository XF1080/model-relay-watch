import getEasing from './getEasing';
import presets from './presets';
import shouldUseBezier from './shouldUseBezier';
const defaultConfig = Object.assign(Object.assign({}, presets.default), {
  precision: 0.01
});
export default function wrapValue(val) {
  let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (shouldUseBezier(config)) {
    const easing = getEasing(config.easing);
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
    if (shouldUseBezier(val)) {
      const easing = getEasing(val.easing);
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