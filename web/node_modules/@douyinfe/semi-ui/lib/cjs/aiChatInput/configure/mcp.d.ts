import React from 'react';
import { DropdownProps } from '../../dropdown';
export interface McpOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
    [key: string]: any;
}
export interface McpProps extends DropdownProps {
    options: McpOption[];
    num?: number;
    showConfigure: boolean;
    onConfigureButtonClick: () => void;
}
declare const Mcp: React.MemoExoticComponent<(props: McpProps) => React.JSX.Element>;
export default Mcp;
