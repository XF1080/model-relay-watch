import React from 'react';
export type Status = 'wait' | 'process' | 'finish' | 'error' | 'warning';
export interface FillStepProps {
    description?: React.ReactNode;
    icon?: React.ReactNode;
    status?: Status;
    title?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    prefixCls?: string;
    stepNumber?: string;
    onChange?: () => void;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    "role"?: React.AriaRole;
    "aria-label"?: React.AriaAttributes["aria-label"];
}
declare const FillStep: (props: FillStepProps) => React.JSX.Element;
export default FillStep;
