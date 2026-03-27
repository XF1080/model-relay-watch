import React from 'react';
import { MarkdownRenderProps } from '../../../aiChatDialogue/interface';
export interface ReasoningWidgetProps {
    status?: string;
    summary?: {
        text?: string;
        type?: string;
    }[];
    content?: {
        text?: string;
        type?: string;
    }[];
    markdownRenderProps?: MarkdownRenderProps;
    customRenderer?: (props: ReasoningWidgetProps) => React.ReactNode;
}
export declare const ReasoningWidget: (props: ReasoningWidgetProps) => React.JSX.Element;
