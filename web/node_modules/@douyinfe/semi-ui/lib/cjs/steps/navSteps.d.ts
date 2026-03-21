import React from 'react';
export type Size = 'default' | 'small';
export interface NavStepsProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    current?: number;
    initial?: number;
    size?: Size;
    children?: React.ReactNode;
    onChange?: (current: number) => void;
    "aria-label"?: string;
}
declare const Steps: (props: NavStepsProps) => React.JSX.Element;
export default Steps;
