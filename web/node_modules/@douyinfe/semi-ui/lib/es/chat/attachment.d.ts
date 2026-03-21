import React from "react";
import { FileItem } from '../upload/interface';
interface AttachmentProps {
    className?: string;
    attachment?: FileItem[];
    onClear?: (item: FileItem) => void;
    showClear?: boolean;
}
interface FileItemProps {
    url?: string;
    name?: string;
    size?: string;
    type?: string;
}
export declare const FileAttachment: React.MemoExoticComponent<(props: FileItemProps) => React.JSX.Element>;
export declare const ImageAttachment: React.MemoExoticComponent<(props: {
    src: string;
}) => React.JSX.Element>;
declare const Attachment: React.MemoExoticComponent<(props: AttachmentProps) => React.JSX.Element>;
export default Attachment;
