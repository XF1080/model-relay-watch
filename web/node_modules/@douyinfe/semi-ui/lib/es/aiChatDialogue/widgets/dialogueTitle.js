import React, { useMemo } from 'react';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/aiChatDialogue/constants';
const {
  PREFIX
} = cssClasses;
const DialogueTitle = /*#__PURE__*/React.memo(props => {
  const {
    role,
    message,
    customRenderFunc
  } = props;
  const title = useMemo(() => {
    return /*#__PURE__*/React.createElement("span", {
      className: `${PREFIX}-title`
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
export default DialogueTitle;