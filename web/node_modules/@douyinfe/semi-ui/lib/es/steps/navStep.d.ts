import React from 'react';
export interface NavStepProps {
    title?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    index?: number;
    active?: boolean;
    total?: number;
    prefixCls?: string;
    onChange?: () => void;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    "role"?: React.AriaRole;
    "aria-label"?: React.AriaAttributes["aria-label"];
}
declare const NavStep: (props: NavStepProps) => React.JSX.Element;
export default NavStep;
