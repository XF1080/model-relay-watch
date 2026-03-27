import React, { CSSProperties, ReactNode } from 'react';
import BaseComponent from '../../_base/baseComponent';
import PropTypes from 'prop-types';
import MCPConfigureContentFoundation, { MCPOption, MCPConfigureContentProps, MCPConfigureContentState, MCPConfigureContentAdapter } from '@douyinfe/semi-foundation/lib/cjs/sidebar/mcpCofContentFoundation';
export interface MCPReactOption extends MCPOption {
    icon?: ReactNode;
    desc?: ReactNode;
}
export interface MCPConfigureContentReactProps extends MCPConfigureContentProps {
    options?: MCPReactOption[];
    customOptions?: MCPReactOption[];
    filter?: (inputValue: string, option: MCPReactOption) => boolean;
    style?: CSSProperties;
    onStatusChange?: (options: MCPReactOption[], custom: boolean) => void;
    onAddClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onConfigureClick?: (e: React.MouseEvent<HTMLButtonElement>, option: MCPReactOption) => void;
    onEditClick?: (e: React.MouseEvent<HTMLButtonElement>, option: MCPReactOption) => void;
    renderItem?: (props: {
        option: MCPReactOption;
        custom: boolean;
    }) => ReactNode;
}
interface MCPConfigureContentReactState extends MCPConfigureContentState {
    showOptions: MCPReactOption[];
    cachedOptions: MCPReactOption[];
    cachedCustomOptions: MCPReactOption[];
}
declare class MCPConfigureContent extends BaseComponent<MCPConfigureContentReactProps, MCPConfigureContentReactState> {
    static propTypes: {
        className: PropTypes.Requireable<string>;
        options: PropTypes.Requireable<any[]>;
        customOptions: PropTypes.Requireable<any[]>;
        filter: PropTypes.Requireable<(...args: any[]) => any>;
        placeholder: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        onStatusChange: PropTypes.Requireable<(...args: any[]) => any>;
        onSearch: PropTypes.Requireable<(...args: any[]) => any>;
        onAddClick: PropTypes.Requireable<(...args: any[]) => any>;
        onConfigureClick: PropTypes.Requireable<(...args: any[]) => any>;
        onEditClick: PropTypes.Requireable<(...args: any[]) => any>;
        renderItem: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static __SemiComponentName__: string;
    static defaultProps: {};
    foundation: MCPConfigureContentFoundation;
    constructor(props: MCPConfigureContentReactProps);
    get adapter(): MCPConfigureContentAdapter;
    static getDerivedStateFromProps(nextProps: MCPConfigureContentReactProps, prevState: MCPConfigureContentReactState): Partial<MCPConfigureContentReactState>;
    renderContent: () => React.JSX.Element;
    renderStatusButton: (option: MCPOption) => React.JSX.Element;
    renderSearch: () => React.JSX.Element;
    render(): React.JSX.Element;
}
export default MCPConfigureContent;
