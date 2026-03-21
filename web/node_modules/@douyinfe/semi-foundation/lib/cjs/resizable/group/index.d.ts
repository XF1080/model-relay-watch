/// <reference types="lodash" />
import BaseFoundation, { DefaultAdapter } from '../../base/foundation';
import { ResizeStartCallback, ResizeCallback, ResizeEventType } from "../types";
export interface ResizeHandlerAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    registerEvents: () => void;
    unregisterEvents: () => void;
}
export declare class ResizeHandlerFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<ResizeHandlerAdapter<P, S>, P, S> {
    constructor(adapter: ResizeHandlerAdapter<P, S>);
    init(): void;
    destroy(): void;
}
export interface ResizeItemAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
}
export declare class ResizeItemFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<ResizeItemAdapter<P, S>, P, S> {
    constructor(adapter: ResizeItemAdapter<P, S>);
    init(): void;
    destroy(): void;
}
export interface ResizeGroupAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getGroupRef: () => HTMLDivElement | null;
    getItem: (index: number) => HTMLDivElement;
    getItemCount: () => number;
    getHandler: (index: number) => HTMLDivElement;
    getHandlerCount: () => number;
    getItemMin: (index: number) => string;
    getItemMax: (index: number) => string;
    getItemStart: (index: number) => ResizeStartCallback;
    getItemChange: (index: number) => ResizeCallback;
    getItemEnd: (index: number) => ResizeCallback;
    getItemDefaultSize: (index: number) => string | number;
    registerEvents: (type: ResizeEventType) => void;
    unregisterEvents: (type: ResizeEventType) => void;
}
export declare class ResizeGroupFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<ResizeGroupAdapter<P, S>, P, S> {
    constructor(adapter: ResizeGroupAdapter<P, S>);
    get groupRef(): HTMLDivElement | null;
    get groupSize(): number;
    direction: 'horizontal' | 'vertical';
    itemMinusMap: Map<number, number>;
    totalMinus: number;
    itemPercentMap: Map<number, number>;
    type?: ResizeEventType;
    init(): void;
    get window(): Window | null;
    registerEvents: () => void;
    unregisterEvents: () => void;
    onResizeStart: (handlerIndex: number, e: MouseEvent | Touch, type: ResizeEventType) => void;
    onMouseMove: (e: MouseEvent) => void;
    onTouchMove: (e: TouchEvent) => void;
    onResizing: (e: MouseEvent | TouchEvent) => void;
    onResizeEnd: (e: MouseEvent | TouchEvent) => void;
    initSpace: () => void;
    ensureConstraint: import("lodash").DebouncedFunc<() => void>;
    destroy(): void;
}
