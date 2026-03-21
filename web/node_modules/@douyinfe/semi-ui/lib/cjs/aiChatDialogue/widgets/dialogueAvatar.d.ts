import React, { ReactNode } from 'react';
import { RenderAvatarProps } from '../interface';
interface DialogueAvatarProps extends RenderAvatarProps {
    continueSend?: boolean;
    customRenderFunc?: (props: RenderAvatarProps) => ReactNode;
}
declare const DialogueAvatar: React.MemoExoticComponent<(props: DialogueAvatarProps) => React.JSX.Element>;
export default DialogueAvatar;
