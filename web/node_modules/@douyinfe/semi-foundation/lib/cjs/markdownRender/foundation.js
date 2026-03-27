"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _mdx = require("@mdx-js/mdx");
var _remarkGfm = _interopRequireDefault(require("remark-gfm"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class MarkdownRenderFoundation extends _foundation.default {
  constructor() {
    super(...arguments);
    this.getOptions = () => {
      var _a, _b, _c;
      const enableRemarkGfm = this._adapter.getProp("remarkGfm");
      const remarkPlugins = [...((_a = this.getProp("remarkPlugins")) !== null && _a !== void 0 ? _a : [])];
      if (enableRemarkGfm) {
        remarkPlugins.unshift(_remarkGfm.default);
      }
      return {
        evaluateOptions: {
          remarkPlugins: remarkPlugins,
          rehypePlugins: (_b = this.getProp("rehypePlugins")) !== null && _b !== void 0 ? _b : [],
          format: this.getProp("format")
        },
        compileOptions: {
          format: this.getProp("format"),
          remarkPlugins: remarkPlugins,
          rehypePlugins: (_c = this.getProp("rehypePlugins")) !== null && _c !== void 0 ? _c : []
        },
        runOptions: {}
      };
    };
    this.compile = mdxRaw => __awaiter(this, void 0, void 0, function* () {
      return yield (0, _mdx.compile)(mdxRaw, this.getOptions().compileOptions);
    });
    this.evaluate = mdxRaw => __awaiter(this, void 0, void 0, function* () {
      return (yield (0, _mdx.evaluate)(mdxRaw, Object.assign(Object.assign(Object.assign({}, this.getOptions().runOptions), this.getOptions().evaluateOptions), this._adapter.getRuntime()))).default;
    });
    this.evaluateSync = mdxRaw => {
      return (0, _mdx.evaluateSync)(mdxRaw, Object.assign(Object.assign(Object.assign({}, this.getOptions().runOptions), this.getOptions().evaluateOptions), this._adapter.getRuntime())).default;
    };
  }
}
var _default = exports.default = MarkdownRenderFoundation;