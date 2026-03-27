"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundHsva = exports.rgbaToRgb = exports.rgbaToHsva = exports.rgbaToHex = exports.rgbaStringToRgba = exports.rgbaStringToHsva = exports.rgbStringToRgba = exports.rgbStringToHsva = exports.parseHue = exports.hsvaToRgbaString = exports.hsvaToRgba = exports.hsvaToRgbString = exports.hsvaToHsvaString = exports.hsvaToHsvString = exports.hsvaToHsv = exports.hsvaToHslaString = exports.hsvaToHsla = exports.hsvaToHslString = exports.hsvaToHex = exports.hsvaStringToHsva = exports.hsvStringToHsva = exports.hslaToHsva = exports.hslaToHsl = exports.hslaStringToHsva = exports.hslStringToHsva = exports.hexToRgba = exports.hexToHsva = void 0;
var _round = require("./round");
/**
 * Valid CSS <angle> units.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/angle
 */
/**
 *  Referrer from https://github.com/web-padawan/vanilla-colorful/blob/master/src/lib/utils/convert.ts
 */
const angleUnits = {
  grad: 360 / 400,
  turn: 360,
  rad: 360 / (Math.PI * 2)
};
const hexToHsva = hex => rgbaToHsva(hexToRgba(hex));
exports.hexToHsva = hexToHsva;
const hexToRgba = hex => {
  if (hex[0] === "#") hex = hex.substring(1);
  const hexToPercent = str => {
    const decimal = parseInt(str, 16);
    if (!isNaN(decimal)) {
      const percent = decimal / 255;
      return percent;
    }
    return 1;
  };
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
    a: hexToPercent(hex.substring(6, 8))
  };
};
exports.hexToRgba = hexToRgba;
const parseHue = function (value) {
  let unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "deg";
  return Number(value) * (angleUnits[unit] || 1);
};
exports.parseHue = parseHue;
const hslaStringToHsva = hslString => {
  const matcher = /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
  const match = matcher.exec(hslString);
  if (!match) return {
    h: 0,
    s: 0,
    v: 0,
    a: 1
  };
  return hslaToHsva({
    h: parseHue(match[1], match[2]),
    s: Number(match[3]),
    l: Number(match[4]),
    a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1)
  });
};
exports.hslaStringToHsva = hslaStringToHsva;
const hslStringToHsva = exports.hslStringToHsva = hslaStringToHsva;
const hslaToHsva = _ref => {
  let {
    h,
    s,
    l,
    a
  } = _ref;
  s *= (l < 50 ? l : 100 - l) / 100;
  return {
    h: h,
    s: s > 0 ? 2 * s / (l + s) * 100 : 0,
    v: l + s,
    a
  };
};
exports.hslaToHsva = hslaToHsva;
const hsvaToHex = hsva => rgbaToHex(hsvaToRgba(hsva));
exports.hsvaToHex = hsvaToHex;
const hsvaToHsla = _ref2 => {
  let {
    h,
    s,
    v,
    a
  } = _ref2;
  const hh = (200 - s) * v / 100;
  return {
    h: (0, _round.round)(h),
    s: (0, _round.round)(hh > 0 && hh < 200 ? s * v / 100 / (hh <= 100 ? hh : 200 - hh) * 100 : 0),
    l: (0, _round.round)(hh / 2),
    a: (0, _round.round)(a, 2)
  };
};
exports.hsvaToHsla = hsvaToHsla;
const hsvaToHslString = hsva => {
  const {
    h,
    s,
    l
  } = hsvaToHsla(hsva);
  return `hsl(${h}, ${s}%, ${l}%)`;
};
exports.hsvaToHslString = hsvaToHslString;
const hsvaToHsvString = hsva => {
  const {
    h,
    s,
    v
  } = roundHsva(hsva);
  return `hsv(${h}, ${s}%, ${v}%)`;
};
exports.hsvaToHsvString = hsvaToHsvString;
const hsvaToHsvaString = hsva => {
  const {
    h,
    s,
    v,
    a
  } = roundHsva(hsva);
  return `hsva(${h}, ${s}%, ${v}%, ${a})`;
};
exports.hsvaToHsvaString = hsvaToHsvaString;
const hsvaToHslaString = hsva => {
  const {
    h,
    s,
    l,
    a
  } = hsvaToHsla(hsva);
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
};
exports.hsvaToHslaString = hsvaToHslaString;
const hsvaToRgba = _ref3 => {
  let {
    h,
    s,
    v,
    a
  } = _ref3;
  h = h / 360 * 6;
  s = s / 100;
  v = v / 100;
  const hh = Math.floor(h),
    b = v * (1 - s),
    c = v * (1 - (h - hh) * s),
    d = v * (1 - (1 - h + hh) * s),
    module = hh % 6;
  return {
    r: (0, _round.round)([v, c, b, b, d, v][module] * 255),
    g: (0, _round.round)([d, v, v, c, b, b][module] * 255),
    b: (0, _round.round)([b, b, d, v, v, c][module] * 255),
    a: (0, _round.round)(a, 2)
  };
};
exports.hsvaToRgba = hsvaToRgba;
const hsvaToRgbString = hsva => {
  const {
    r,
    g,
    b
  } = hsvaToRgba(hsva);
  return `rgb(${r}, ${g}, ${b})`;
};
exports.hsvaToRgbString = hsvaToRgbString;
const hsvaToRgbaString = hsva => {
  const {
    r,
    g,
    b,
    a
  } = hsvaToRgba(hsva);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
exports.hsvaToRgbaString = hsvaToRgbaString;
const hsvaStringToHsva = hsvString => {
  const matcher = /hsva?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
  const match = matcher.exec(hsvString);
  if (!match) return {
    h: 0,
    s: 0,
    v: 0,
    a: 1
  };
  return roundHsva({
    h: parseHue(match[1], match[2]),
    s: Number(match[3]),
    v: Number(match[4]),
    a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1)
  });
};
exports.hsvaStringToHsva = hsvaStringToHsva;
const hsvStringToHsva = exports.hsvStringToHsva = hsvaStringToHsva;
const rgbaStringToHsva = rgbaString => {
  return rgbaToHsva(rgbaStringToRgba(rgbaString));
};
exports.rgbaStringToHsva = rgbaStringToHsva;
const rgbaStringToRgba = rgbaString => {
  const matcher = /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;
  const match = matcher.exec(rgbaString);
  if (!match) return {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
  return {
    r: Number(match[1]) / (match[2] ? 100 / 255 : 1),
    g: Number(match[3]) / (match[4] ? 100 / 255 : 1),
    b: Number(match[5]) / (match[6] ? 100 / 255 : 1),
    a: match[7] === undefined ? 1 : Number(match[7]) / (match[8] ? 100 : 1)
  };
};
exports.rgbaStringToRgba = rgbaStringToRgba;
const rgbStringToRgba = exports.rgbStringToRgba = rgbaStringToRgba;
const rgbStringToHsva = exports.rgbStringToHsva = rgbaStringToHsva;
const format = number => {
  const hex = number.toString(16);
  return hex.length < 2 ? "0" + hex : hex;
};
const rgbaToHex = _ref4 => {
  let {
    r,
    g,
    b,
    a
  } = _ref4;
  const percentToHex = p => {
    //const percent = Math.max(0, Math.min(100, p)); // bound percent from 0 to 100
    const intValue = Math.round(p / 100 * 255); // map percent to nearest integer (0 - 255)
    const hexValue = intValue.toString(16); // get hexadecimal representation
    return hexValue.padStart(2, '0').toLowerCase(); // format with leading 0 and upper case characters
  };
  if (a === undefined || a === 1) {
    return "#" + format(r) + format(g) + format(b);
  } else {
    return "#" + format(r) + format(g) + format(b) + percentToHex(a * 100);
  }
};
exports.rgbaToHex = rgbaToHex;
const rgbaToHsva = _ref5 => {
  let {
    r,
    g,
    b,
    a
  } = _ref5;
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);
  // prettier-ignore
  const hh = delta ? max === r ? (g - b) / delta : max === g ? 2 + (b - r) / delta : 4 + (r - g) / delta : 0;
  return {
    h: (0, _round.round)(60 * (hh < 0 ? hh + 6 : hh)),
    s: (0, _round.round)(max ? delta / max * 100 : 0),
    v: (0, _round.round)(max / 255 * 100),
    a
  };
};
exports.rgbaToHsva = rgbaToHsva;
const roundHsva = hsva => ({
  h: (0, _round.round)(hsva.h),
  s: (0, _round.round)(hsva.s),
  v: (0, _round.round)(hsva.v),
  a: (0, _round.round)(hsva.a, 2)
});
exports.roundHsva = roundHsva;
const rgbaToRgb = _ref6 => {
  let {
    r,
    g,
    b
  } = _ref6;
  return {
    r,
    g,
    b
  };
};
exports.rgbaToRgb = rgbaToRgb;
const hslaToHsl = _ref7 => {
  let {
    h,
    s,
    l
  } = _ref7;
  return {
    h,
    s,
    l
  };
};
exports.hslaToHsl = hslaToHsl;
const hsvaToHsv = hsva => {
  const {
    h,
    s,
    v
  } = roundHsva(hsva);
  return {
    h,
    s,
    v
  };
};
exports.hsvaToHsv = hsvaToHsv;