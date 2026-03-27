import React, { ReactNode } from 'react';
import { Message, Metadata, RenderAvatarProps } from '../interface';
interface ChatBoxAvatarProps {
    children?: string;
    role?: Metadata;
    continueSend?: boolean;
    message?: Message;
    customRenderFunc?: (props: RenderAvatarProps) => ReactNode;
}
declare const ChatBoxAvatar: React.MemoExoticComponent<(props: ChatBoxAvatarProps) => React.JSX.Element>;
export default ChatBoxAvatar;
