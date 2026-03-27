"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const split = (str, mode) => {
  // 12,32,43 => [12,32,43]
  const reg = /^\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,?\s*([\d.]*)\s*$/;
  const res = str.match(reg);
  const result = [];
  result[0] = Number(res === null || res === void 0 ? void 0 : res[1]);
  result[1] = Number(res === null || res === void 0 ? void 0 : res[2]);
  result[2] = Number(res === null || res === void 0 ? void 0 : res[3]);
  result[3] = Number((res === null || res === void 0 ? void 0 : res[4]) === undefined || (res === null || res === void 0 ? void 0 : res[4]) === '' ? 1 : res === null || res === void 0 ? void 0 : res[4]);
  const check = (a, max) => {
    return !(isNaN(a) || a < 0 || a > max);
  };
  const ok = check(result[0], mode === 'rgba' ? 255 : 360) && check(result[1], mode === 'rgba' ? 255 : 100) && check(result[2], mode === 'rgba' ? 255 : 100) && check(result[3], 1);
  if (ok) {
    if (mode === 'rgba') {
      return {
        r: result[0],
        g: result[1],
        b: result[2],
        a: result[3]
      };
    } else {
      return {
        h: result[0],
        s: result[1],
        v: result[2],
        a: result[3]
      };
    }
  } else {
    return false;
  }
};
var _default = exports.default = split;