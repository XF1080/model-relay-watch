"use strict";

var _client = require("react-dom/client");
var _semiGlobal = _interopRequireDefault(require("./_utils/semi-global"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * React 19 adapter for Semi Design.
 *
 * Usage: import this module before using any Semi components in React 19.
 *
 * ```js
 * import '@douyinfe/semi-ui/react19-adapter';
 * ```
 *
 * For details, see: https://semi.design/zh-CN/ecosystem/react19
 */

_semiGlobal.default.config.createRoot = _client.createRoot;