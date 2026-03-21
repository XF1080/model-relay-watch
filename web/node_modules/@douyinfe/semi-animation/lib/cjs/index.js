"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Animation", {
  enumerable: true,
  get: function () {
    return _Animation.default;
  }
});
Object.defineProperty(exports, "easingMap", {
  enumerable: true,
  get: function () {
    return _getEasing.easingMap;
  }
});
Object.defineProperty(exports, "events", {
  enumerable: true,
  get: function () {
    return _constants.events;
  }
});
Object.defineProperty(exports, "getEasing", {
  enumerable: true,
  get: function () {
    return _getEasing.default;
  }
});
Object.defineProperty(exports, "interpolate", {
  enumerable: true,
  get: function () {
    return _interpolate.default;
  }
});
Object.defineProperty(exports, "presets", {
  enumerable: true,
  get: function () {
    return _presets.default;
  }
});
var _getEasing = _interopRequireWildcard(require("./src/getEasing"));
var _constants = require("./src/constants");
var _Animation = _interopRequireDefault(require("./src/Animation"));
var _interpolate = _interopRequireDefault(require("./src/interpolate"));
var _presets = _interopRequireDefault(require("./src/presets"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }