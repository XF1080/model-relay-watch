import _nth from "lodash/nth";
import * as React from 'react';
import CodeHighlight from "../../codeHighlight";
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/markdownRender/constants';
const pre = props => {
  var _a;
  const language = _nth((_a = props.className) === null || _a === void 0 ? void 0 : _a.split("-"), -1);
  if (language) {
    return /*#__PURE__*/React.createElement(CodeHighlight, {
      code: props.children,
      language: language,
      lineNumber: true
    });
  } else {
    return /*#__PURE__*/React.createElement("span", {
      className: `${cssClasses.PREFIX}-simple-code`
    }, props.children);
  }
};
export default pre;