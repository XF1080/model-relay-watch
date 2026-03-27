import React from 'react';
import { Annotation } from '@douyinfe/semi-foundation/lib/es/aiChatDialogue/foundation';
export interface AnnotationItemProps {
    title?: string;
    logo?: string;
    url?: string;
    detail?: string;
}
export interface AnnotationWidgetProps {
    maxCount: number;
    annotation: AnnotationItemProps[] | Annotation[];
    onClick?: (e: React.MouseEvent<HTMLDivElement>, item: AnnotationItemProps[]) => void;
    description?: string;
}
export declare const AnnotationWidget: (props: AnnotationWidgetProps) => React.JSX.Element;
