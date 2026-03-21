import React, { useMemo } from 'react';
import Avatar from '../../avatar';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/aiChatDialogue/constants';
import cls from 'classnames';
const {
  PREFIX
} = cssClasses;
const DialogueAvatar = /*#__PURE__*/React.memo(props => {
  const {
    role,
    customRenderFunc,
    continueSend,
    message
  } = props;
  const node = useMemo(() => {
    const {
      avatar
    } = role;
    return /*#__PURE__*/React.createElement(Avatar, {
      className: cls(`${PREFIX}-avatar`, {
        [`${PREFIX}-avatar-hidden`]: continueSend
      }),
      src: avatar,
      size: "extra-small"
    });
  }, [continueSend, role]);
  if (customRenderFunc && typeof customRenderFunc === 'function') {
    return customRenderFunc({
      role,
      defaultAvatar: node,
      message: message
    });
  }
  return node;
});
export default DialogueAvatar;