import { BASE_CLASS_PREFIX } from '../base/constants';
const cssClasses = {
  PREFIX: `${BASE_CLASS_PREFIX}-feedback`
};
const strings = {
  MODE: ['modal', 'popup'],
  TYPE: ['text', 'emoji', 'radio', 'checkbox', 'custom'],
  Emoji: {
    bad: '😞',
    normal: '😐',
    good: '😃'
  }
};
export { cssClasses, strings };