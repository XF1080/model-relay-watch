import React from 'react';
import '@douyinfe/semi-foundation/lib/cjs/videoPlayer/videoPlayer.css';
import VideoProgressFoundation, { Marker, MarkerListItem, VideoProgressAdapter } from '@douyinfe/semi-foundation/lib/cjs/videoPlayer/progressFoundation';
import BaseComponent from '../_base/baseComponent';
export interface VideoProgressProps {
    value: number;
    onChange: (value: number) => void;
    className?: string;
    max: number;
    showTooltip?: boolean;
    markers?: Marker[];
    bufferedValue: number;
}
export interface VideoProgressState {
    isDragging: boolean;
    isHandleHovering: boolean;
    movingInfo: {
        progress: number;
        offset: number;
        value: number;
    } | null;
    activeIndex: number;
}
export default class VideoProgress extends BaseComponent<VideoProgressProps, VideoProgressState> {
    static defaultProps: {
        value: number;
        onChange: (...args: any[]) => void;
        max: number;
        showTooltip: boolean;
    };
    private sliderRef;
    private handleRef;
    private markersList;
    foundation: VideoProgressFoundation;
    constructor(props: VideoProgressProps);
    get adapter(): VideoProgressAdapter<VideoProgressProps, VideoProgressState>;
    initMarkerList: () => MarkerListItem[];
    handleMouseEnter: (e: any) => void;
    handleMouseMove: (e: any) => void;
    renderTooltipContent: () => string | React.JSX.Element;
    render(): React.JSX.Element;
}
