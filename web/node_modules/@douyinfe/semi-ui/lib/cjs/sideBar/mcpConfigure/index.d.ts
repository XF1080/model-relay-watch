import React from 'react';
import BaseComponent from '../../_base/baseComponent';
import PropTypes from 'prop-types';
import type { MCPConfigureContentReactProps } from './content';
import { ContainerReactProps } from '../interface';
interface MCPConfigureProps extends ContainerReactProps, MCPConfigureContentReactProps {
}
interface MCPConfigureState {
}
declare class MCPConfigure extends BaseComponent<MCPConfigureProps, MCPConfigureState> {
    static propTypes: {
        options: PropTypes.Requireable<any[]>;
        customOptions: PropTypes.Requireable<any[]>;
        onStatusChange: PropTypes.Requireable<(...args: any[]) => any>;
        onSearch: PropTypes.Requireable<(...args: any[]) => any>;
        onAddClick: PropTypes.Requireable<(...args: any[]) => any>;
        renderItem: PropTypes.Requireable<(...args: any[]) => any>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        visible: PropTypes.Requireable<boolean>;
        motion: PropTypes.Requireable<boolean>;
        minWidth: PropTypes.Requireable<NonNullable<string | number>>;
        maxWidth: PropTypes.Requireable<NonNullable<string | number>>;
        onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        afterVisibleChange: PropTypes.Requireable<(...args: any[]) => any>;
        resizable: PropTypes.Requireable<boolean>;
        defaultSize: PropTypes.Requireable<object>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        className: PropTypes.Requireable<string>;
        renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
        showClose: PropTypes.Requireable<boolean>;
    };
    static __SemiComponentName__: string;
    render(): React.JSX.Element;
}
export default MCPConfigure;
