import { cssClasses as inputCssClasses, numbers as inputNumbers, strings as inputStrings } from '../input/constants';
const cssClasses = Object.assign({}, inputCssClasses);
const numbers = Object.assign(Object.assign({}, inputNumbers), {
  DEFAULT_STEP: 1,
  DEFAULT_SHIFT_STEP: 10,
  DEFAULT_PRESS_TIMEOUT: 250,
  DEFAULT_PRESS_INTERVAL: 0,
  MOUSE_BUTTON_LEFT: 0
});
const strings = Object.assign({}, inputStrings);
export { cssClasses, numbers, strings };