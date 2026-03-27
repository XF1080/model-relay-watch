import React from 'react';
import BaseComponent from '../../_base/baseComponent';
import PropTypes from 'prop-types';
import '@douyinfe/semi-foundation/lib/cjs/sidebar/sidebar.css';
import { ContainerAdapter, ContainerProps, ContainerState } from '@douyinfe/semi-foundation/lib/cjs/sidebar/containerFoundation';
import { Enable } from '@douyinfe/semi-foundation/lib/cjs/resizable/types';
import { ContainerReactProps } from '../interface';
declare class Container extends BaseComponent<ContainerReactProps, ContainerState> {
    static propTypes: {
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
    static defaultProps: {
        motion: boolean;
        minWidth: number;
        showClose: boolean;
        resizable: boolean;
    };
    directionEnable: Enable;
    constructor(props: ContainerProps);
    get adapter(): ContainerAdapter;
    static getDerivedStateFromProps(props: ContainerReactProps, prevState: ContainerState): Partial<ContainerState>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: ContainerProps, prevState: ContainerState, snapshot: any): void;
    componentWillUnmount(): void;
    handleKeyDown: (e: KeyboardEvent) => void;
    handleCancel: (e: React.MouseEvent) => void;
    renderHeader: () => string | number | true | Iterable<React.ReactNode> | React.JSX.Element;
    innerContent: (props: any) => React.JSX.Element;
    renderContent: () => React.JSX.Element;
    render(): React.JSX.Element;
}
export default Container;
