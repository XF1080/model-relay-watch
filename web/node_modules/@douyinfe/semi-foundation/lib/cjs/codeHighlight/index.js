"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _prismjs = _interopRequireDefault(require("prismjs"));
var _classnames = _interopRequireDefault(require("classnames"));
require("prismjs/plugins/line-numbers/prism-line-numbers.min.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_prismjs.default.manual = true;
class CodeHighlightFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.highlightCode = (ele, language) => {
      let className = ele.className;
      const languageClassName = `language-${language}`;
      if (!className.includes(languageClassName)) {
        className = (0, _classnames.default)(className, languageClassName);
      }
      if (this.getProp("lineNumber")) {
        className = (0, _classnames.default)(className, "line-numbers");
      }
      ele.className = className;
      _prismjs.default.highlightElement(ele, false);
    };
  }
}
var _default = exports.default = CodeHighlightFoundation;