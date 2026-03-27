export default function invokeFns(fns) {
  let args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (Array.isArray(fns) && fns.length) {
    fns.forEach(fn => {
      if (typeof fn === 'function') {
        fn(...args);
      }
    });
  }
}