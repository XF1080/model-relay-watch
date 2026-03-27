import React from 'react';
export type Status = 'wait' | 'process' | 'finish' | 'error' | 'warning';
export interface StepProps {
    description?: React.ReactNode;
    icon?: React.ReactNode;
    status?: Status;
    title?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
declare const Step: (props: StepProps) => React.JSX.Element;
export default Step;
