import React, { CSSProperties, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ResizableFoundation, ResizableAdapter } from '@douyinfe/semi-foundation/lib/es/resizable/foundation';
import { Direction, Size, Enable, ResizeStartCallback, ResizeCallback, HandleClassName } from '@douyinfe/semi-foundation/lib/es/resizable/types';
import BaseComponent from '../../_base/baseComponent';
import '@douyinfe/semi-foundation/lib/es/resizable/resizable.css';
export interface HandleComponent {
    top?: ReactNode;
    right?: ReactNode;
    bottom?: ReactNode;
    left?: ReactNode;
    topRight?: ReactNode;
    bottomRight?: ReactNode;
    bottomLeft?: ReactNode;
    topLeft?: ReactNode;
}
export interface HandleStyle {
    top?: CSSProperties;
    right?: CSSProperties;
    bottom?: CSSProperties;
    left?: CSSProperties;
    topRight?: CSSProperties;
    bottomRight?: CSSProperties;
    bottomLeft?: CSSProperties;
    topLeft?: CSSProperties;
}
export interface ResizableProps {
    style?: React.CSSProperties;
    className?: string;
    grid?: [number, number];
    snap?: {
        x?: number[];
        y?: number[];
    };
    snapGap?: number;
    boundElement?: 'parent' | 'window' | HTMLElement;
    boundsByDirection?: boolean;
    size?: Size;
    minWidth?: string | number;
    minHeight?: string | number;
    maxWidth?: string | number;
    maxHeight?: string | number;
    lockAspectRatio?: boolean | number;
    lockAspectRatioExtraWidth?: number;
    lockAspectRatioExtraHeight?: number;
    enable?: Enable | false;
    handleStyle?: HandleStyle;
    handleClass?: HandleClassName;
    handleWrapperStyle?: React.CSSProperties;
    handleWrapperClass?: string;
    handleNode?: HandleComponent;
    children?: React.ReactNode;
    onResizeStart?: ResizeStartCallback;
    onChange?: ResizeCallback;
    onResizeEnd?: ResizeCallback;
    defaultSize?: Size;
    scale?: number;
    ratio?: number | [number, number];
}
export interface ResizableState {
    isResizing: boolean;
    direction: Direction;
    original: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    width: number | string;
    height: number | string;
    backgroundStyle: React.CSSProperties;
    flexBasis?: string | number;
}
declare class Resizable extends BaseComponent<ResizableProps, ResizableState> {
    static propTypes: {
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        grid: PropTypes.Requireable<number[]>;
        snap: PropTypes.Requireable<PropTypes.InferProps<{
            x: PropTypes.Requireable<number[]>;
            y: PropTypes.Requireable<number[]>;
        }>>;
        snapGap: PropTypes.Requireable<number>;
        bounds: PropTypes.Requireable<string | PropTypes.Requireable<PropTypes.ReactNodeLike>>;
        boundsByDirection: PropTypes.Requireable<boolean>;
        size: PropTypes.Requireable<object>;
        minWidth: PropTypes.Requireable<NonNullable<string | number>>;
        minHeight: PropTypes.Requireable<NonNullable<string | number>>;
        maxWidth: PropTypes.Requireable<NonNullable<string | number>>;
        maxHeight: PropTypes.Requireable<NonNullable<string | number>>;
        lockAspectRatio: PropTypes.Requireable<NonNullable<number | boolean>>;
        lockAspectRatioExtraWidth: PropTypes.Requireable<number>;
        lockAspectRatioExtraHeight: PropTypes.Requireable<number>;
        enable: PropTypes.Requireable<object>;
        handleStyle: PropTypes.Requireable<object>;
        handleClass: PropTypes.Requireable<object>;
        handleWrapperStyle: PropTypes.Requireable<object>;
        handleWrapperClass: PropTypes.Requireable<string>;
        handleNode: PropTypes.Requireable<object>;
        children: PropTypes.Requireable<object>;
        onResizeStart: PropTypes.Requireable<(...args: any[]) => any>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onResizeEnd: PropTypes.Requireable<(...args: any[]) => any>;
        defaultSize: PropTypes.Requireable<object>;
        scale: PropTypes.Requireable<number>;
        ratio: PropTypes.Requireable<NonNullable<number | number[]>>;
    };
    static defaultProps: Partial<ResizableProps>;
    foundation: ResizableFoundation;
    resizableRef: React.RefObject<HTMLDivElement | null>;
    constructor(props: ResizableProps);
    componentDidMount(): void;
    componentDidUpdate(_prevProps: ResizableProps): void;
    componentWillUnmount(): void;
    getResizable: () => HTMLDivElement;
    get adapter(): ResizableAdapter<ResizableProps, ResizableState>;
    renderResizeHandler: () => React.JSX.Element;
    render(): React.JSX.Element;
}
export default Resizable;
