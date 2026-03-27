import React, { useMemo } from 'react';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/chat/constants';
const {
  PREFIX_CHAT_BOX
} = cssClasses;
const ChatBoxTitle = /*#__PURE__*/React.memo(props => {
  const {
    role,
    message,
    customRenderFunc
  } = props;
  const title = useMemo(() => {
    return /*#__PURE__*/React.createElement("span", {
      className: `${PREFIX_CHAT_BOX}-title`
    }, role === null || role === void 0 ? void 0 : role.name);
  }, [role]);
  if (customRenderFunc && typeof customRenderFunc === 'function') {
    return customRenderFunc({
      role,
      message,
      defaultTitle: title
    });
  }
  return title;
});
export default ChatBoxTitle;