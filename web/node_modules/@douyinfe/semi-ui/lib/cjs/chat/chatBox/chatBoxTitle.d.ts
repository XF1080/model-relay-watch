import React, { ReactNode } from 'react';
import { Message, Metadata, RenderTitleProps } from '../interface';
interface ChatBoxTitleProps {
    children?: ReactNode | undefined | any;
    role?: Metadata;
    message?: Message;
    customRenderFunc?: (props: RenderTitleProps) => ReactNode;
}
declare const ChatBoxTitle: React.MemoExoticComponent<(props: ChatBoxTitleProps) => React.JSX.Element>;
export default ChatBoxTitle;
