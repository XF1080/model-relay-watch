import React from 'react';
export type Status = 'wait' | 'process' | 'finish' | 'error' | 'warning';
export type Direction = 'horizontal' | 'vertical';
export interface FillStepsProps {
    prefixCls?: string;
    className?: string;
    current?: number;
    direction?: Direction;
    initial?: number;
    status?: Status;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onChange?: (current: number) => void;
    "aria-label"?: string;
}
declare const Steps: (props: FillStepsProps) => React.JSX.Element;
export default Steps;
