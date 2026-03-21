"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _interface = require("@douyinfe/semi-foundation/lib/cjs/aiChatInput/interface");
Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interface[key];
    }
  });
});