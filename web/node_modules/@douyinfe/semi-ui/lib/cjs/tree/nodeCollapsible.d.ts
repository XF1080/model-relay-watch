import React, { ReactNode } from 'react';
interface NodeCollapsibleProps {
    key?: string;
    open?: boolean;
    motion?: boolean;
    duration?: number;
    onMotionEnd?: () => void;
    children?: ReactNode;
}
declare function NodeCollapsible(props: NodeCollapsibleProps): React.JSX.Element;
export default NodeCollapsible;
