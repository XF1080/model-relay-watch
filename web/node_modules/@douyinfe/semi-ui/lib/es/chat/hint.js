import React from "react";
import { IconArrowRight } from "@douyinfe/semi-icons";
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/chat/constants';
const {
  PREFIX_HINT
} = cssClasses;
const Hint = /*#__PURE__*/React.memo(props => {
  const {
    value,
    onHintClick,
    renderHintBox,
    className,
    style
  } = props;
  return /*#__PURE__*/React.createElement("section", {
    className: cls(`${PREFIX_HINT}s`, {
      [className]: !!className
    }),
    style: style
  }, value.map((item, index) => {
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
      className: `${PREFIX_HINT}-item`,
      key: index,
      onClick: () => {
        onHintClick === null || onHintClick === void 0 ? void 0 : onHintClick(item);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: `${PREFIX_HINT}-content`
    }, item), /*#__PURE__*/React.createElement(IconArrowRight, {
      className: `${PREFIX_HINT}-icon`
    }));
  }));
});
export default Hint;