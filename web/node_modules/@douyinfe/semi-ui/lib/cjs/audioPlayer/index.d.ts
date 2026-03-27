import BaseComponent, { BaseProps } from '../_base/baseComponent';
import React from 'react';
import '@douyinfe/semi-foundation/lib/cjs/audioPlayer/audioPlayer.css';
import AudioPlayerFoundation from '@douyinfe/semi-foundation/lib/cjs/audioPlayer/foundation';
import { AudioPlayerAdapter } from '@douyinfe/semi-foundation/lib/cjs/audioPlayer/foundation';
type AudioSrc = string;
type AudioInfo = {
    title?: string;
    cover?: string;
    src: string;
};
type AudioUrlArray = (AudioInfo | string)[];
type AudioUrl = AudioSrc | AudioInfo | AudioUrlArray;
export type AudioPlayerTheme = 'dark' | 'light';
export interface AudioPlayerProps extends BaseProps {
    audioUrl: AudioUrl;
    autoPlay: boolean;
    showToolbar?: boolean;
    skipDuration?: number;
    theme?: AudioPlayerTheme;
    className?: string;
    style?: React.CSSProperties;
}
export interface AudioPlayerState {
    isPlaying: boolean;
    currentIndex: number;
    totalTime: number;
    currentTime: number;
    currentRate: {
        label: string;
        value: number;
    };
    volume: number;
    error: boolean;
}
declare class AudioPlayer extends BaseComponent<AudioPlayerProps, AudioPlayerState> {
    audioRef: React.RefObject<HTMLAudioElement>;
    static defaultProps: Partial<AudioPlayerProps>;
    rateOptions: {
        label: string;
        value: number;
    }[];
    foundation: AudioPlayerFoundation;
    constructor(props: AudioPlayerProps);
    get adapter(): AudioPlayerAdapter<AudioPlayerProps, AudioPlayerState>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleStatusClick: () => void;
    handleTrackChange: (direction: 'next' | 'prev') => void;
    handleTimeChange: (value: number) => void;
    handleRefresh: () => void;
    handleSpeedChange: (value: {
        label: string;
        value: number;
    }) => void;
    handleSeek: (direction: number) => void;
    handleTimeUpdate: () => void;
    handleVolumeChange: (value: number) => void;
    handleVolumeSilent: () => void;
    getAudioInfo: (audioUrl: AudioUrl) => {
        src: string;
        audioTitle: string;
        audioCover: string;
    };
    renderControl: () => React.JSX.Element;
    renderInfo: () => React.JSX.Element;
    renderToolbar: () => React.JSX.Element;
    renderError: () => React.JSX.Element;
    render(): React.JSX.Element;
}
export default AudioPlayer;
