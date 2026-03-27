import BaseFoundation from '../base/foundation';
import Prism from 'prismjs';
import cls from "classnames";
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js";
Prism.manual = true;
class CodeHighlightFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.highlightCode = (ele, language) => {
      let className = ele.className;
      const languageClassName = `language-${language}`;
      if (!className.includes(languageClassName)) {
        className = cls(className, languageClassName);
      }
      if (this.getProp("lineNumber")) {
        className = cls(className, "line-numbers");
      }
      ele.className = className;
      Prism.highlightElement(ele, false);
    };
  }
}
export default CodeHighlightFoundation;