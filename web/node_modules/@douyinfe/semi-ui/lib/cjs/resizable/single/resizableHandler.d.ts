import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ResizableHandlerFoundation, ResizableHandlerAdapter } from '@douyinfe/semi-foundation/lib/cjs/resizable/foundation';
import { Direction, HandlerCallback } from '@douyinfe/semi-foundation/lib/cjs/resizable/types';
import BaseComponent from '../../_base/baseComponent';
export interface ResizableHandlerProps {
    children?: ReactNode;
    direction?: Direction;
    onResizeStart?: HandlerCallback;
    className?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
}
export interface ResizableHandlerState {
    direction: Direction;
}
declare class ResizableHandler extends BaseComponent<ResizableHandlerProps, ResizableHandlerState> {
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        direction: PropTypes.Requireable<string>;
        onResizeStart: PropTypes.Requireable<(...args: any[]) => any>;
        className: PropTypes.Requireable<string>;
        disabled: PropTypes.Requireable<boolean>;
        style: PropTypes.Requireable<object>;
    };
    static defaultProps: Partial<ResizableHandlerProps>;
    constructor(props: ResizableHandlerProps);
    componentDidMount(): void;
    componentDidUpdate(_prevProps: ResizableHandlerProps): void;
    componentWillUnmount(): void;
    foundation: ResizableHandlerFoundation;
    get adapter(): ResizableHandlerAdapter<ResizableHandlerProps, ResizableHandlerState>;
    resizeHandlerRef: React.RefObject<HTMLDivElement>;
    render(): React.JSX.Element;
}
export default ResizableHandler;
