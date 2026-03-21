import React, { ReactNode, RefObject } from 'react';
import { ResizeGroupFoundation, ResizeGroupAdapter } from '@douyinfe/semi-foundation/lib/cjs/resizable/foundation';
import BaseComponent from '../../_base/baseComponent';
import { ResizeContextProps } from './resizeContext';
import { ResizeCallback, ResizeEventType, ResizeStartCallback } from '@douyinfe/semi-foundation/lib/cjs/resizable/types';
import '@douyinfe/semi-foundation/lib/cjs/resizable/resizable.css';
export interface ResizeGroupProps {
    children: ReactNode;
    direction: 'horizontal' | 'vertical';
    className?: string;
}
export interface ResizeGroupState {
    isResizing: boolean;
    originalPosition: {
        x: number;
        y: number;
        lastItemSize: number;
        nextItemSize: number;
        lastOffset: number;
        nextOffset: number;
    };
    backgroundStyle: React.CSSProperties;
    curHandler: number;
    contextValue: ResizeContextProps;
}
declare class ResizeGroup extends BaseComponent<ResizeGroupProps, ResizeGroupState> {
    static propTypes: {};
    static defaultProps: Partial<ResizeGroupProps>;
    constructor(props: ResizeGroupProps);
    foundation: ResizeGroupFoundation;
    groupRef: React.RefObject<HTMLDivElement>;
    groupSize: number;
    availableSize: number;
    static contextType: React.Context<ResizeContextProps>;
    context: ResizeGroupProps;
    itemRefs: Map<number, RefObject<HTMLDivElement>>;
    itemMinMap: Map<number, string>;
    itemMaxMap: Map<number, string>;
    itemMinusMap: Map<number, number>;
    itemDefaultSizeList: Map<number, (string | number)>;
    itemResizeStart: Map<number, ResizeStartCallback>;
    itemResizing: Map<number, ResizeCallback>;
    itemResizeEnd: Map<number, ResizeCallback>;
    handlerRefs: Map<number, RefObject<HTMLDivElement>>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: ResizeGroupProps): void;
    componentWillUnmount(): void;
    get adapter(): ResizeGroupAdapter<ResizeGroupProps, ResizeGroupState>;
    get window(): Window | null;
    registerEvent: (type?: ResizeEventType) => void;
    unregisterEvent: (type?: ResizeEventType) => void;
    registerItem: (ref: RefObject<HTMLDivElement>, min: string, max: string, defaultSize: string | number, onResizeStart: ResizeStartCallback, onChange: ResizeCallback, onResizeEnd: ResizeCallback) => number;
    registerHandler: (ref: RefObject<HTMLDivElement>) => number;
    getGroupSize: () => number;
    render(): React.JSX.Element;
}
export default ResizeGroup;
