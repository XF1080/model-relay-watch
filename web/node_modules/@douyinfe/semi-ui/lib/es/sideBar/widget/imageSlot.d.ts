import React from 'react';
import { Node } from "@tiptap/react";
import { UploadProps } from '../../upload';
export declare const ImageUploadNodeComponent: (props: any) => React.JSX.Element;
export interface ImageUploadNodeOptions extends UploadProps {
    HTMLAttributes?: any;
    getUploadImageSrc?: (uploadProps: any) => string;
}
export declare const ImageUploadNode: Node<ImageUploadNodeOptions, any>;
