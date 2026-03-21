import React from 'react';
export type Status = 'wait' | 'process' | 'finish' | 'error' | 'warning';
export type Size = 'default' | 'small';
export interface BasicStepProps {
    description?: React.ReactNode;
    icon?: React.ReactNode;
    status?: Status;
    title?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    active?: boolean;
    prefixCls?: string;
    stepNumber?: string;
    size?: Size;
    done?: boolean;
    onChange?: () => void;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    "role"?: React.AriaRole;
    "aria-label"?: React.AriaAttributes["aria-label"];
}
export declare enum stepSizeMapIconSize {
    small = "large",
    default = "extra-large"
}
declare const BasicStep: (props: BasicStepProps) => React.JSX.Element;
export default BasicStep;
