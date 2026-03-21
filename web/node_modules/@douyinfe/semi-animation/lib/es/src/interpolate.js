/**
 *
 * @param {number|number[]|string|string[]} from
 * @param {number|number[]|string|string[]} to
 * @param {number} ratio
 * @param {Function} [parser]
 * @param {Function} [formatter]
 * @returns {any}
*/
export default function interpolate(from, to) {
  let ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  let parser = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  let formatter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  if (typeof parser === 'function') {
    from = parser(from);
    to = parser(to);
  }
  if (typeof from === 'string' || typeof from === 'number') {
    from = [parseFloat(from)];
  }
  if (typeof to === 'string' || typeof to === 'number') {
    to = [parseFloat(to)];
  }
  const result = [];
  if (Array.isArray(from) && Array.isArray(to)) {
    from.forEach((fromVal, idx) => {
      fromVal = parseFloat(fromVal);
      const toVal = parseFloat(to[idx]);
      result.push((toVal - fromVal) * ratio + fromVal);
    });
  }
  if (typeof formatter === 'function') {
    return formatter(result);
  } else {
    return result;
  }
}