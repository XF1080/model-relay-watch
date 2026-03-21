import React, { useCallback } from 'react';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/aiChatInput/constants';
const prefixCls = cssClasses.PREFIX;
const SuggestionItem = /*#__PURE__*/React.memo(props => {
  const {
    suggestion,
    onClick,
    isActive,
    renderSuggestionItem,
    onMouseEnter,
    index
  } = props;
  const content = typeof suggestion === 'string' ? suggestion : suggestion === null || suggestion === void 0 ? void 0 : suggestion.content;
  const className = cls(`${prefixCls}-suggestion-item`, {
    [`${prefixCls}-suggestion-item-active`]: isActive
  });
  const handleClick = useCallback(() => {
    onClick === null || onClick === void 0 ? void 0 : onClick(suggestion);
  }, [onClick, suggestion]);
  const handleMouseEnter = useCallback(() => {
    onMouseEnter === null || onMouseEnter === void 0 ? void 0 : onMouseEnter(index);
  }, [index, onMouseEnter]);
  if (renderSuggestionItem) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, renderSuggestionItem({
      suggestion,
      className,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter
    }));
  }
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter
  }, content);
});
export default SuggestionItem;