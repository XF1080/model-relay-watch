import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import type { ChatBoxProps, RenderActionProps } from '../interface';
import { BaseComponent } from '../../index';
import ChatBoxActionFoundation, { ChatBoxActionAdapter } from '@douyinfe/semi-foundation/lib/cjs/chat/chatBoxActionFoundation';
interface ChatBoxActionProps extends ChatBoxProps {
    customRenderFunc?: (props: RenderActionProps) => ReactNode;
}
interface ChatBoxActionState {
    visible: boolean;
    showAction: boolean;
}
declare class ChatBoxAction extends BaseComponent<ChatBoxActionProps, ChatBoxActionState> {
    static propTypes: {
        role: PropTypes.Requireable<object>;
        message: PropTypes.Requireable<object>;
        showReset: PropTypes.Requireable<boolean>;
        onMessageBadFeedback: PropTypes.Requireable<(...args: any[]) => any>;
        onMessageGoodFeedback: PropTypes.Requireable<(...args: any[]) => any>;
        onMessageCopy: PropTypes.Requireable<(...args: any[]) => any>;
        onChatsChange: PropTypes.Requireable<(...args: any[]) => any>;
        onMessageDelete: PropTypes.Requireable<(...args: any[]) => any>;
        onMessageReset: PropTypes.Requireable<(...args: any[]) => any>;
        customRenderFunc: PropTypes.Requireable<(...args: any[]) => any>;
    };
    copySuccessNode: ReactNode;
    foundation: ChatBoxActionFoundation;
    containerRef: React.RefObject<HTMLDivElement>;
    popconfirmTriggerRef: React.RefObject<HTMLSpanElement>;
    clickOutsideHandler: any;
    constructor(props: ChatBoxProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    get adapter(): ChatBoxActionAdapter<ChatBoxActionProps, ChatBoxActionState>;
    copyNode: () => React.JSX.Element;
    likeNode: () => React.JSX.Element;
    dislikeNode: () => React.JSX.Element;
    resetNode: () => React.JSX.Element;
    deleteNode: () => React.JSX.Element;
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element;
}
export default ChatBoxAction;
