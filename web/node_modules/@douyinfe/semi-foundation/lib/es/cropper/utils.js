export function getMiddle(value, _ref) {
  let [min, max] = _ref;
  return Math.min(Math.max(value, min), max);
}
export function getAspectHW(width, height, aspect) {
  if (width / height > aspect) {
    width = height * aspect;
  } else {
    height = width / aspect;
  }
  return [width, height];
}