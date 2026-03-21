import React from 'react';
export interface CustomExpandIconProps {
    expanded?: boolean;
    componentType?: 'tree' | 'expand';
    onClick?: (nextExpand: boolean, e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter?: (e: React.MouseEvent<HTMLSpanElement>) => void;
    onMouseLeave?: (e: React.MouseEvent<HTMLSpanElement>) => void;
    expandIcon?: ((expanded?: boolean) => React.ReactNode) | React.ReactNode;
    prefixCls?: string;
    motion?: boolean;
}
/**
 * render expand icon
 */
export default function CustomExpandIcon(props: CustomExpandIconProps): React.JSX.Element;
