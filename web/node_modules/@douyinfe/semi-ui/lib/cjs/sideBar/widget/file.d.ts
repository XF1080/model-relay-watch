import React from 'react';
import { Extension } from '@tiptap/react';
import { SideBarCollapseProps } from '../interface';
import { ImageUploadNodeOptions } from './imageSlot';
export interface FileItemProps {
    key?: string;
    className?: string;
    name?: string;
    style?: React.CSSProperties;
    editable?: boolean;
    content?: string;
    onContentChange?: (content: string) => void;
    extensions?: Extension[];
    imgUploadProps?: ImageUploadNodeOptions;
}
export declare const FileItem: React.MemoExoticComponent<(props: FileItemProps) => React.JSX.Element>;
export interface FileContentProps extends SideBarCollapseProps {
    files?: FileItemProps[];
    onExpand?: (e: React.MouseEvent, file: FileItemProps) => void;
}
declare const FileContent: React.MemoExoticComponent<(props: FileContentProps) => React.JSX.Element>;
export default FileContent;
