"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = require("../../index");
var _getConfigureItem = _interopRequireDefault(require("./getConfigureItem"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/aiChatInput/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _getConfigureItem.default)(_index.Select, {
  className: `${_constants.cssClasses.PREFIX}-footer-configure-select`
});