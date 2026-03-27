import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface MarkerListItem {
    start: number;
    end: number;
    title: string;
    width: string;
    left: string;
}
export interface Marker {
    start: number;
    title: string;
}
export interface VideoProgressAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getSliderRef: () => HTMLDivElement | null;
    getMarkersList: () => MarkerListItem[];
    setIsDragging: (isDragging: boolean) => void;
    setIsHandleHovering: (isHandleHovering: boolean) => void;
    setActiveIndex: (activeIndex: number) => void;
    setMovingInfo: (movingInfo: {
        progress: number;
        offset: number;
        value: number;
    } | null) => void;
}
export default class VideoProgressFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<VideoProgressAdapter<P, S>, P, S> {
    constructor(adapter: VideoProgressAdapter<P, S>);
    handleDocumentMouseMove: (e: MouseEvent) => void;
    handleDocumentMouseUp: () => void;
    handleMouseDown: (e: any) => void;
    handleMouseUp: () => void;
    handleMouseEvent: (e: any, shouldSetValue?: boolean) => void;
    handleSliderMouseEnter: (index: number) => void;
    handleSliderMouseLeave: (index: number) => void;
    setActiveIndex: (currentValue: number) => void;
    getValueWidth: (marker: MarkerListItem, value: number) => string;
    getPlayedWidth: (marker: MarkerListItem) => string;
    getLoadedWidth: (marker: MarkerListItem) => string;
}
