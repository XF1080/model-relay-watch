/// <reference types="lodash" />
import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface MCPOption {
    icon?: any;
    label?: string;
    value?: string;
    desc?: any;
    active?: boolean;
    disabled?: boolean;
    configure?: boolean;
}
export interface MCPConfigureContentProps {
    className?: string;
    options?: MCPOption[];
    customOptions?: MCPOption[];
    filter?: (inputValue: string, option: MCPOption) => boolean;
    placeholder?: string;
    style?: any;
    onStatusChange?: (options: MCPOption[], custom: boolean) => void;
    onSearch?: (inputValue: string, custom: boolean) => void;
    onAddClick?: (e: any) => void;
    onConfigureClick?: (e: any, option: MCPOption) => void;
    onEditClick?: (e: any, option: MCPOption) => void;
    renderItem?: (props: {
        option: MCPOption;
        custom: boolean;
    }) => any;
}
export type MCPConfigureMode = 'inner' | 'custom';
export interface MCPConfigureContentState {
    mode: MCPConfigureMode;
    inputValue: string;
    showOptions: MCPOption[];
    cachedOptions: MCPOption[];
    cachedCustomOptions: MCPOption[];
}
export interface MCPConfigureContentAdapter extends DefaultAdapter<MCPConfigureContentProps, MCPConfigureContentState> {
    notifyConfigureClick: (e: any, option: MCPOption) => void;
    notifyEditClick: (e: any, option: MCPOption) => void;
    notifyStatusChange?: (options: MCPOption[], custom: boolean) => void;
    notifyAddClick?: (e: any) => void;
}
export default class MCPConfigureContentFoundation extends BaseFoundation<MCPConfigureContentAdapter> {
    constructor(adapter: MCPConfigureContentAdapter);
    handleSearch: (value: string) => void;
    updateShowOptions: import("lodash").DebouncedFuncLeading<(value: string, mode?: MCPConfigureMode) => void>;
    handleModeChange: (e: any) => void;
    onConfigureButtonClick: (e: React.MouseEvent<HTMLButtonElement>, option: MCPOption) => void;
    onEditButtonClick: (e: React.MouseEvent<HTMLButtonElement>, option: MCPOption) => void;
    handleStatusChange: (item: MCPOption, checked: boolean) => void;
    handleAddClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
