import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ResizeHandlerFoundation, ResizeHandlerAdapter } from '@douyinfe/semi-foundation/lib/cjs/resizable/foundation';
import { Direction, HandlerCallback } from '@douyinfe/semi-foundation/lib/cjs/resizable/types';
import BaseComponent from '../../_base/baseComponent';
import { ResizeContextProps } from './resizeContext';
export interface ResizeHandlerProps {
    children?: ReactNode;
    direction?: Direction;
    onResizeStart?: HandlerCallback;
    className?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
}
export interface ResizeHandlerState {
}
declare class ResizeHandler extends BaseComponent<ResizeHandlerProps, ResizeHandlerState> {
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        direction: PropTypes.Requireable<string>;
        onResizeStart: PropTypes.Requireable<(...args: any[]) => any>;
        className: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        style: PropTypes.Requireable<object>;
    };
    static defaultProps: Partial<ResizeHandlerProps>;
    constructor(props: ResizeHandlerProps);
    componentDidMount(): void;
    componentDidUpdate(_prevProps: ResizeHandlerProps): void;
    componentWillUnmount(): void;
    foundation: ResizeHandlerFoundation;
    onMouseDown: (e: MouseEvent) => void;
    onTouchStart: (e: TouchEvent) => void;
    get adapter(): ResizeHandlerAdapter<ResizeHandlerProps, ResizeHandlerState>;
    getHandler: () => HTMLElement;
    static contextType: React.Context<ResizeContextProps>;
    context: ResizeContextProps;
    handlerRef: React.RefObject<HTMLDivElement>;
    handlerIndex: number;
    render(): React.JSX.Element;
}
export default ResizeHandler;
