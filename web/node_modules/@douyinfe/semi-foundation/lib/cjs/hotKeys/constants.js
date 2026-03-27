"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cssClasses = exports.Keys = void 0;
exports.keyToCode = keyToCode;
exports.strings = void 0;
var _constants = require("../base/constants");
const cssClasses = exports.cssClasses = {
  PREFIX: `${_constants.BASE_CLASS_PREFIX}-hotKeys`
};
const strings = exports.strings = {};
const keyCodeMap = {
  // alpha
  'a': 'KeyA',
  'b': 'KeyB',
  'c': 'KeyC',
  'd': 'KeyD',
  'e': 'KeyE',
  'f': 'KeyF',
  'g': 'KeyG',
  'h': 'KeyH',
  'i': 'KeyI',
  'j': 'KeyJ',
  'k': 'KeyK',
  'l': 'KeyL',
  'm': 'KeyM',
  'n': 'KeyN',
  'o': 'KeyO',
  'p': 'KeyP',
  'q': 'KeyQ',
  'r': 'KeyR',
  's': 'KeyS',
  't': 'KeyT',
  'u': 'KeyU',
  'v': 'KeyV',
  'w': 'KeyW',
  'x': 'KeyX',
  'y': 'KeyY',
  'z': 'KeyZ',
  // digit
  '0': 'Digit0',
  '1': 'Digit1',
  '2': 'Digit2',
  '3': 'Digit3',
  '4': 'Digit4',
  '5': 'Digit5',
  '6': 'Digit6',
  '7': 'Digit7',
  '8': 'Digit8',
  '9': 'Digit9',
  // punctuation
  ' ': 'Space',
  'enter': 'Enter',
  'escape': 'Escape',
  'backspace': 'Backspace',
  'tab': 'Tab',
  '-': 'Minus',
  '=': 'Equal',
  '[': 'BracketLeft',
  ']': 'BracketRight',
  '\\': 'Backslash',
  ';': 'Semicolon',
  "'": 'Quote',
  '`': 'Backquote',
  ',': 'Comma',
  '.': 'Period',
  '/': 'Slash',
  '?': 'Slash',
  '!': 'Digit1',
  '@': 'Digit2',
  '#': 'Digit3',
  '$': 'Digit4',
  '%': 'Digit5',
  '^': 'Digit6',
  '&': 'Digit7',
  '*': 'Digit8',
  '(': 'Digit9',
  ')': 'Digit0',
  // arrow
  'arrowup': 'ArrowUp',
  'arrowdown': 'ArrowDown',
  'arrowleft': 'ArrowLeft',
  'arrowright': 'ArrowRight',
  // function
  'shift': 'ShiftLeft',
  'control': 'ControlLeft',
  'alt': 'AltLeft',
  'meta': 'MetaLeft',
  'capslock': 'CapsLock',
  'f1': 'F1',
  'f2': 'F2',
  'f3': 'F3',
  'f4': 'F4',
  'f5': 'F5',
  'f6': 'F6',
  'f7': 'F7',
  'f8': 'F8',
  'f9': 'F9',
  'f10': 'F10',
  'f11': 'F11',
  'f12': 'F12',
  'insert': 'Insert',
  'delete': 'Delete',
  'home': 'Home',
  'end': 'End',
  'pageup': 'PageUp',
  'pagedown': 'PageDown',
  'numlock': 'NumLock',
  'scrolllock': 'ScrollLock',
  'pause': 'Pause',
  // numpad
  'numpad0': 'Numpad0',
  'numpad1': 'Numpad1',
  'numpad2': 'Numpad2',
  'numpad3': 'Numpad3',
  'numpad4': 'Numpad4',
  'numpad5': 'Numpad5',
  'numpad6': 'Numpad6',
  'numpad7': 'Numpad7',
  'numpad8': 'Numpad8',
  'numpad9': 'Numpad9',
  'numpaddecimal': 'NumpadDecimal',
  'numpaddivide': 'NumpadDivide',
  'numpadmultiply': 'NumpadMultiply',
  'numpadsubtract': 'NumpadSubtract',
  'numpadadd': 'NumpadAdd',
  'numpadenter': 'NumpadEnter'
};
function keyToCode(key) {
  return keyCodeMap[key.toLowerCase()] || undefined;
}
var Keys;
(function (Keys) {
  Keys["A"] = "a";
  Keys["B"] = "b";
  Keys["C"] = "c";
  Keys["D"] = "d";
  Keys["E"] = "e";
  Keys["F"] = "f";
  Keys["G"] = "g";
  Keys["H"] = "h";
  Keys["I"] = "i";
  Keys["J"] = "j";
  Keys["K"] = "k";
  Keys["L"] = "l";
  Keys["M"] = "m";
  Keys["N"] = "n";
  Keys["O"] = "o";
  Keys["P"] = "p";
  Keys["Q"] = "q";
  Keys["R"] = "r";
  Keys["S"] = "s";
  Keys["T"] = "t";
  Keys["U"] = "u";
  Keys["V"] = "v";
  Keys["W"] = "w";
  Keys["X"] = "x";
  Keys["Y"] = "y";
  Keys["Z"] = "z";
  Keys["Digit0"] = "0";
  Keys["Digit1"] = "1";
  Keys["Digit2"] = "2";
  Keys["Digit3"] = "3";
  Keys["Digit4"] = "4";
  Keys["Digit5"] = "5";
  Keys["Digit6"] = "6";
  Keys["Digit7"] = "7";
  Keys["Digit8"] = "8";
  Keys["Digit9"] = "9";
  Keys["Space"] = " ";
  Keys["Enter"] = "enter";
  Keys["Escape"] = "escape";
  Keys["Backspace"] = "backspace";
  Keys["Tab"] = "tab";
  Keys["Minus"] = "-";
  Keys["Equal"] = "=";
  Keys["BracketLeft"] = "[";
  Keys["BracketRight"] = "]";
  Keys["Backslash"] = "\\";
  Keys["Semicolon"] = ";";
  Keys["Quote"] = "'";
  Keys["Backquote"] = "`";
  Keys["Comma"] = ",";
  Keys["Period"] = ".";
  Keys["Slash"] = "/";
  Keys["Exclamation"] = "!";
  Keys["At"] = "@";
  Keys["Hash"] = "#";
  Keys["Dollar"] = "$";
  Keys["Percent"] = "%";
  Keys["Caret"] = "^";
  Keys["Ampersand"] = "&";
  Keys["Asterisk"] = "*";
  Keys["LeftParenthesis"] = "(";
  Keys["RightParenthesis"] = ")";
  Keys["ArrowUp"] = "arrowup";
  Keys["ArrowDown"] = "arrowdown";
  Keys["ArrowLeft"] = "arrowleft";
  Keys["ArrowRight"] = "arrowright";
  Keys["Shift"] = "shift";
  Keys["Control"] = "control";
  Keys["Alt"] = "alt";
  Keys["Meta"] = "meta";
  Keys["CapsLock"] = "capslock";
  Keys["F1"] = "f1";
  Keys["F2"] = "f2";
  Keys["F3"] = "f3";
  Keys["F4"] = "f4";
  Keys["F5"] = "f5";
  Keys["F6"] = "f6";
  Keys["F7"] = "f7";
  Keys["F8"] = "f8";
  Keys["F9"] = "f9";
  Keys["F10"] = "f10";
  Keys["F11"] = "f11";
  Keys["F12"] = "f12";
  Keys["Insert"] = "insert";
  Keys["Delete"] = "delete";
  Keys["Home"] = "home";
  Keys["End"] = "end";
  Keys["PageUp"] = "pageup";
  Keys["PageDown"] = "pagedown";
  Keys["NumLock"] = "numlock";
  Keys["ScrollLock"] = "scrolllock";
  Keys["Pause"] = "pause";
  Keys["Numpad0"] = "numpad0";
  Keys["Numpad1"] = "numpad1";
  Keys["Numpad2"] = "numpad2";
  Keys["Numpad3"] = "numpad3";
  Keys["Numpad4"] = "numpad4";
  Keys["Numpad5"] = "numpad5";
  Keys["Numpad6"] = "numpad6";
  Keys["Numpad7"] = "numpad7";
  Keys["Numpad8"] = "numpad8";
  Keys["Numpad9"] = "numpad9";
  Keys["NumpadDecimal"] = "numpaddecimal";
  Keys["NumpadDivide"] = "numpaddivide";
  Keys["NumpadMultiply"] = "numpadmultiply";
  Keys["NumpadSubtract"] = "numpadsubtract";
  Keys["NumpadAdd"] = "numpadadd";
  Keys["NumpadEnter"] = "numpadenter";
})(Keys || (exports.Keys = Keys = {}));