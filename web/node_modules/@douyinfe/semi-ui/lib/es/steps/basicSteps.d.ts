import React from 'react';
export type Direction = 'horizontal' | 'vertical';
export type Status = 'wait' | 'process' | 'finish' | 'error' | 'warning';
export type Size = 'default' | 'small';
export interface BasicStepsProps {
    prefixCls?: string;
    className?: string;
    direction?: Direction;
    current?: number;
    initial?: number;
    status?: Status;
    style?: React.CSSProperties;
    size?: Size;
    hasLine?: boolean;
    children?: React.ReactNode;
    onChange?: (current: number) => void;
    "aria-label"?: string;
}
declare const Steps: (props: BasicStepsProps) => React.JSX.Element;
export default Steps;
