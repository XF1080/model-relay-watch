import React, { useCallback } from 'react';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/aiChatInput/constants';
const prefixCls = cssClasses.PREFIX;
const SkillItem = /*#__PURE__*/React.memo(props => {
  const {
    skill,
    onClick,
    isActive,
    renderSkillItem,
    onMouseEnter,
    index
  } = props;
  const className = cls(`${prefixCls}-skill-item`, {
    [`${prefixCls}-skill-item-active`]: isActive
  });
  const handleClick = useCallback(() => {
    onClick(skill);
  }, [onClick, skill]);
  const handleMouseEnter = useCallback(() => {
    onMouseEnter === null || onMouseEnter === void 0 ? void 0 : onMouseEnter(index);
  }, [index, onMouseEnter]);
  if (renderSkillItem) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, renderSkillItem({
      skill: skill,
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
  }, skill.icon, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-skill-item-content`
  }, skill.label));
});
export default SkillItem;