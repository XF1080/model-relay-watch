import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface AudioPlayerAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    init: () => void;
    resetAudioState: () => void;
    handleStatusClick: () => void;
    handleTimeUpdate: () => void;
    handleTrackChange: (direction: 'next' | 'prev') => void;
    getAudioRef: () => HTMLAudioElement;
    handleTimeChange: (value: number) => void;
    handleSpeedChange: (value: {
        label: string;
        value: number;
    }) => void;
    handleSeek: (direction: number) => void;
    handleRefresh: () => void;
    handleVolumeChange: (value: number) => void;
    destroy: () => void;
}
declare class AudioPlayerFoundation extends BaseFoundation<AudioPlayerAdapter> {
    constructor(adapter: AudioPlayerAdapter);
    initAudioState(): void;
    endHandler(): void;
    errorHandler(): void;
    init(): void;
    destroy(): void;
    resetAudioState(): void;
    handleStatusClick(): void;
    handleTimeUpdate(): void;
    handleTrackChange(direction: 'next' | 'prev'): void;
    getAudioRef(): HTMLAudioElement;
    handleTimeChange(value: number): void;
    handleSpeedChange(value: {
        label: string;
        value: number;
    }): void;
    handleSeek(direction: number): void;
    handleRefresh(): void;
    handleVolumeChange(value: number): void;
}
export default AudioPlayerFoundation;
