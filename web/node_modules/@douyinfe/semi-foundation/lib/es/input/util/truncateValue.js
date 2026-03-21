import _isFunction from "lodash/isFunction";
export default function truncateValue(options) {
  const {
    value,
    maxLength,
    getValueLength
  } = options;
  if (_isFunction(getValueLength)) {
    let left = 0;
    let right = value.length;
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      const currentValue = value.slice(0, mid + 1);
      if (getValueLength(currentValue) > maxLength) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return value.slice(0, left);
  } else {
    return value.slice(0, maxLength);
  }
}