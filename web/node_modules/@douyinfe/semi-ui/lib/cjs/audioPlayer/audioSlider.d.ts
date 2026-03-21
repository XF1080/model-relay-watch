import React from 'react';
import '@douyinfe/semi-foundation/lib/cjs/audioPlayer/audioPlayer.css';
import { AudioPlayerTheme } from './index';
interface AudioSliderProps {
    value: number;
    onChange?: (value: number) => void;
    className?: string;
    max?: number;
    vertical?: boolean;
    width?: number;
    height?: number;
    showTooltip?: boolean;
    disabled?: boolean;
    theme?: AudioPlayerTheme;
}
interface AudioSliderState {
    isDragging: boolean;
    movingInfo: {
        progress: number;
        offset: number;
    } | null;
    isHovering: boolean;
}
export default class AudioSlider extends React.Component<AudioSliderProps, AudioSliderState> {
    static defaultProps: {
        value: number;
        onChange: (...args: any[]) => void;
        max: number;
        vertical: boolean;
        width: string;
        height: number;
        showTooltip: boolean;
        disabled: boolean;
        theme: string;
    };
    private sliderRef;
    private handleRef;
    constructor(props: AudioSliderProps);
    handleMouseEnter: (e: React.MouseEvent) => void;
    handleMouseDown: (e: React.MouseEvent) => void;
    handleMouseUp: () => void;
    handleMouseEvent: (e: React.MouseEvent, shouldSetValue?: boolean) => void;
    handleMouseMove: (e: React.MouseEvent) => void;
    handleMouseLeave: () => void;
    render(): React.JSX.Element;
}
export {};
