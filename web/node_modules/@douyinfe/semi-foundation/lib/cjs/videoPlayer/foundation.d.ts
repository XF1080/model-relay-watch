/// <reference types="lodash" />
import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface VideoPlayerAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getVideo: () => HTMLVideoElement | null;
    getVideoWrapper: () => HTMLDivElement | null;
    notifyPause: () => void;
    notifyPlay: () => void;
    notifyQualityChange: (quality: string) => void;
    notifyRateChange: (rate: number) => void;
    notifyRouteChange: (route: string) => void;
    notifyVolumeChange: (volume: number) => void;
    setBufferedValue: (bufferedValue: number) => void;
    setCurrentTime: (currentTime: number) => void;
    setIsError: (isError: boolean) => void;
    setIsMirror: (isMirror: boolean) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setMuted: (muted: boolean) => void;
    setNotificationContent: (content: string) => void;
    setPlaybackRate: (rate: number) => void;
    setQuality: (quality: string) => void;
    setRoute: (route: string) => void;
    setShowControls: (showControls: boolean) => void;
    setShowNotification: (showNotification: boolean) => void;
    setTotalTime: (totalTime: number) => void;
    setVolume: (volume: number) => void;
}
export default class VideoPlayerFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<VideoPlayerAdapter<P, S>, P, S> {
    constructor(adapter: VideoPlayerAdapter<P, S>);
    private controlsTimer;
    private scrollPosition;
    init(): void;
    destroy(): void;
    shouldShowControlItem(name: string): boolean;
    clearTimer(): void;
    handleMouseMove: import("lodash").DebouncedFuncLeading<() => void>;
    handleTimeChange(value: number): void;
    handleTimeUpdate(): void;
    handleDurationChange(): void;
    handleError(): void;
    handlePlayOrPause(): void;
    handlePlay(): void;
    handlePause(): void;
    handleVideoPlay: () => void;
    handleVideoPause: () => void;
    handleCanPlay: () => void;
    handleWaiting: (locale: any) => void;
    handleStalled: (locale: any) => void;
    handleProgress: () => void;
    handleEnded: () => void;
    handleVolumeChange(value: number): void;
    handleVolumeSilent: () => void;
    checkFullScreen(): boolean;
    handleFullscreen: () => void;
    handleRateChange(rate: {
        label: string;
        value: number;
    }, locale: any): void;
    handleQualityChange(quality: {
        label: string;
        value: string;
    }, locale: any): void;
    handleRouteChange(route: {
        label: string;
        value: string;
    }, locale: any): void;
    handleMirror: (locale: any) => void;
    handlePictureInPicture: () => void;
    handleLeavePictureInPicture: () => void;
    handleTemporaryNotification: (content: string) => void;
    restorePlayPosition(): void;
    handleMouseEnterWrapper: () => void;
    handleMouseLeaveWrapper: () => void;
    handleFullscreenChange: () => void;
    registerEvent: () => void;
    unregisterEvent: () => void;
    handleBodyKeyDown(e: KeyboardEvent): void;
}
