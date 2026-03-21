import BaseFoundation, { DefaultAdapter } from '../../base/foundation';
import { Size, NumberSize, Direction, ResizeEventType } from "../types";
export interface ResizableHandlerAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    registerEvent: () => void;
    unregisterEvent: () => void;
}
export declare class ResizableHandlerFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<ResizableHandlerAdapter<P, S>, P, S> {
    constructor(adapter: ResizableHandlerAdapter<P, S>);
    init(): void;
    onMouseDown: (e: MouseEvent) => void;
    onTouchStart: (e: TouchEvent) => void;
    destroy(): void;
}
export interface ResizableAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getResizable: () => HTMLDivElement | null;
    registerEvent: (type: ResizeEventType) => void;
    unregisterEvent: (type: ResizeEventType) => void;
}
export declare class ResizableFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<ResizableAdapter<P, S>, P, S> {
    constructor(adapter: ResizableAdapter<P, S>);
    init(): void;
    flexDirection?: 'row' | 'column';
    type?: ResizeEventType;
    lockAspectRatio: number;
    resizable: HTMLElement | null;
    parentLeft: number;
    parentTop: number;
    boundaryLeft: number;
    boundaryRight: number;
    boundaryTop: number;
    boundaryBottom: number;
    targetLeft: number;
    targetTop: number;
    get parent(): HTMLElement | null;
    get window(): Window | null;
    get propSize(): Size;
    get size(): NumberSize;
    get sizeStyle(): {
        width: string;
        height: string;
    };
    getParentSize(): {
        width: number;
        height: number;
    };
    registerEvents(): void;
    unregisterEvents(): void;
    getCssPropertySize(newSize: number | string, property: 'width' | 'height'): number | string;
    calBoundaryMax(maxWidth?: number, maxHeight?: number): {
        maxWidth: number;
        maxHeight: number;
    };
    calDirectionSize(clientX: number, clientY: number): {
        newWidth: any;
        newHeight: any;
    };
    calAspectRatioSize(newWidth: number, newHeight: number, max: {
        width?: number;
        height?: number;
    }, min: {
        width?: number;
        height?: number;
    }): {
        newWidth: number;
        newHeight: number;
    };
    setBoundary(): void;
    onResizeStart: (e: MouseEvent, direction: Direction, type: ResizeEventType) => void;
    onMouseMove: (event: MouseEvent) => void;
    onTouchMove: (event: TouchEvent) => void;
    changePosition: (event: Touch | MouseEvent) => void;
    onMouseUp: (event: MouseEvent | TouchEvent) => void;
    destroy(): void;
}
