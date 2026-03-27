import React from 'react';
import PropTypes from 'prop-types';
import { ResizeItemAdapter } from '@douyinfe/semi-foundation/lib/cjs/resizable/foundation';
import BaseComponent from '../../_base/baseComponent';
import { ResizeCallback, ResizeStartCallback } from '@douyinfe/semi-foundation/lib/cjs/resizable/types';
import { ResizeContextProps } from './resizeContext';
export interface ResizeItemProps {
    style?: React.CSSProperties;
    className?: string;
    min?: string;
    max?: string;
    children?: React.ReactNode;
    onResizeStart?: ResizeStartCallback;
    onChange?: ResizeCallback;
    onResizeEnd?: ResizeCallback;
    defaultSize?: string | number;
}
export interface ResizeItemState {
}
declare class ResizeItem extends BaseComponent<ResizeItemProps, ResizeItemState> {
    static propTypes: {
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        min: PropTypes.Requireable<string>;
        max: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<object>;
        onResizeStart: PropTypes.Requireable<(...args: any[]) => any>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onResizeEnd: PropTypes.Requireable<(...args: any[]) => any>;
        defaultSize: PropTypes.Requireable<NonNullable<string | number>>;
    };
    static defaultProps: Partial<ResizeItemProps>;
    constructor(props: ResizeItemProps);
    componentDidMount(): void;
    componentDidUpdate(_prevProps: ResizeItemProps): void;
    componentWillUnmount(): void;
    get adapter(): ResizeItemAdapter<ResizeItemProps, ResizeItemState>;
    static contextType: React.Context<ResizeContextProps>;
    context: ResizeContextProps;
    direction: 'horizontal' | 'vertical';
    itemRef: React.RefObject<HTMLDivElement | null>;
    itemIndex: number;
    render(): React.JSX.Element;
}
export default ResizeItem;
