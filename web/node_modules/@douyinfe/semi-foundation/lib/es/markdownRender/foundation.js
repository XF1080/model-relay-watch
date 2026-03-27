var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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
import BaseFoundation from '../base/foundation';
import { evaluate, compile, evaluateSync } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
class MarkdownRenderFoundation extends BaseFoundation {
  constructor() {
    super(...arguments);
    this.getOptions = () => {
      var _a, _b, _c;
      const enableRemarkGfm = this._adapter.getProp("remarkGfm");
      const remarkPlugins = [...((_a = this.getProp("remarkPlugins")) !== null && _a !== void 0 ? _a : [])];
      if (enableRemarkGfm) {
        remarkPlugins.unshift(remarkGfm);
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
      return yield compile(mdxRaw, this.getOptions().compileOptions);
    });
    this.evaluate = mdxRaw => __awaiter(this, void 0, void 0, function* () {
      return (yield evaluate(mdxRaw, Object.assign(Object.assign(Object.assign({}, this.getOptions().runOptions), this.getOptions().evaluateOptions), this._adapter.getRuntime()))).default;
    });
    this.evaluateSync = mdxRaw => {
      return evaluateSync(mdxRaw, Object.assign(Object.assign(Object.assign({}, this.getOptions().runOptions), this.getOptions().evaluateOptions), this._adapter.getRuntime())).default;
    };
  }
}
export default MarkdownRenderFoundation;