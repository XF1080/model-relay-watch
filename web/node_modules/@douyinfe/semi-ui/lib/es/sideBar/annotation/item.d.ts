import React from 'react';
export interface AnnotationItem {
    type?: 'video' | 'text';
    title?: string;
    url?: string;
    detail?: string;
    logo?: string;
    siteName?: string;
    order?: number;
    onClick?: (event: React.MouseEvent<HTMLDivElement>, item: AnnotationItem) => void;
    img?: string;
    duration?: number;
}
export declare function VideoItem(props: AnnotationItem): React.JSX.Element;
export default function Item(props: AnnotationItem): React.JSX.Element;
