import React, { ReactNode } from 'react';
import type { AnnotationItem } from './item';
export interface ContentProps {
    style?: React.CSSProperties;
    className?: string;
    activeKey?: string | string[];
    info?: {
        header: React.ReactNode;
        key: string;
        annotations: AnnotationItem[];
    }[];
    renderItem?: (annotation: AnnotationItem) => ReactNode;
    onChange?: (key: string | string[]) => void;
    onClick?: (e: React.MouseEvent, item: AnnotationItem) => void;
}
declare const Content: React.MemoExoticComponent<(props: ContentProps) => React.JSX.Element>;
export default Content;
