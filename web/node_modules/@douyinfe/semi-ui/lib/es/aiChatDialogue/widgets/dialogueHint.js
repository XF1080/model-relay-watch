import React from "react";
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/aiChatDialogue/constants';
const {
  PREFIX_HINT
} = cssClasses;
const Hint = /*#__PURE__*/React.memo(props => {
  const {
    hints,
    onHintClick,
    renderHintBox,
    className,
    style,
    selecting
  } = props;
  return /*#__PURE__*/React.createElement("section", {
    className: cls(`${PREFIX_HINT}s`, {
      [className]: !!className,
      [`${PREFIX_HINT}s-selecting`]: selecting
    }),
    style: style
  }, hints.map((item, index) => {
    if (renderHintBox) {
      return renderHintBox({
        content: item,
        index: index,
        onHintClick: () => {
          onHintClick === null || onHintClick === void 0 ? void 0 : onHintClick(item);
        }
      });
    }
    return /*#__PURE__*/React.createElement("div", {
      role: "button",
      tabIndex: 0,
      className: `${PREFIX_HINT}-item`,
      key: index,
      onClick: () => {
        onHintClick === null || onHintClick === void 0 ? void 0 : onHintClick(item);
      },
      onKeyDown: e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onHintClick === null || onHintClick === void 0 ? void 0 : onHintClick(item);
        }
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `${PREFIX_HINT}-content`
    }, item));
  }));
});
export default Hint;