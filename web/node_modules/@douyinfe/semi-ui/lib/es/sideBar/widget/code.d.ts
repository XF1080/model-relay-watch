import React from 'react';
import { SideBarCollapseProps } from '../interface';
import { JsonViewerProps } from '../../jsonViewer';
import { CodeHighlightProps } from '../../codeHighlight';
export interface CodeItemProps {
    name?: string;
    key?: string;
    isJson?: boolean;
    language?: string;
    content?: string;
    jsonViewerProps?: JsonViewerProps;
    codeHighlightProps?: CodeHighlightProps;
}
export interface CodeContentProps extends SideBarCollapseProps {
    style?: React.CSSProperties;
    className?: string;
    codes?: CodeItemProps[];
    onExpand?: (e: React.MouseEvent, code: CodeItemProps, mode: string) => void;
}
export declare const CodeItem: React.MemoExoticComponent<(props: CodeItemProps) => React.JSX.Element>;
export declare const CollapseHeader: React.MemoExoticComponent<(props: {
    content: CodeItemProps;
    mode: string;
    onExpand: (e: React.MouseEvent, code: CodeItemProps, mode: string) => void;
}) => React.JSX.Element>;
declare const CodeContent: React.MemoExoticComponent<(props: CodeContentProps) => React.JSX.Element>;
export default CodeContent;
