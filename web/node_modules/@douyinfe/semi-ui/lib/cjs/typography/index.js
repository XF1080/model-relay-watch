"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _typography = _interopRequireDefault(require("./typography"));
var _text = _interopRequireDefault(require("./text"));
var _title = _interopRequireDefault(require("./title"));
var _paragraph = _interopRequireDefault(require("./paragraph"));
var _numeral = _interopRequireDefault(require("./numeral"));
var _interface = require("./interface");
Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interface[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Typography = _typography.default;
Typography.Text = _text.default;
Typography.Title = _title.default;
Typography.Paragraph = _paragraph.default;
Typography.Numeral = _numeral.default;
var _default = exports.default = Typography;