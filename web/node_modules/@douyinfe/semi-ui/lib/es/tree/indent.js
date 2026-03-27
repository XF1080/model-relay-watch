import * as React from 'react';
import classNames from 'classnames';
const Indent = _ref => {
  let {
    prefixcls,
    level,
    isEnd,
    showLine
  } = _ref;
  const baseClassName = `${prefixcls}-indent-unit`;
  const list = [];
  for (let i = 0; i < level; i += 1) {
    list.push(/*#__PURE__*/React.createElement("span", {
      key: i,
      className: classNames(baseClassName, {
        [`${baseClassName}-end`]: isEnd[i]
      })
    }));
  }
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: classNames(`${prefixcls}-indent`, {
      [`${prefixcls}-indent-show-line`]: showLine
    })
  }, list);
};
export default /*#__PURE__*/React.memo(Indent);