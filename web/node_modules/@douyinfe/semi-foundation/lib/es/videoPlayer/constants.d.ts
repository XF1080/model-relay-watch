declare const cssClasses: {
    readonly PREFIX: "semi-videoPlayer";
    readonly PREFIX_CONTROLS: "semi-videoPlayer-controls";
    readonly PREFIX_PROGRESS: "semi-videoPlayer-progress";
};
declare const strings: {
    readonly DARK: "dark";
    readonly LIGHT: "light";
    readonly PLAY: "play";
    readonly NEXT: "next";
    readonly TIME: "time";
    readonly VOLUME: "volume";
    readonly PLAYBACK_RATE: "playbackRate";
    readonly QUALITY: "quality";
    readonly ROUTE: "route";
    readonly MIRROR: "mirror";
    readonly FULLSCREEN: "fullscreen";
    readonly PICTURE_IN_PICTURE: "pictureInPicture";
};
declare const numbers: {
    readonly DEFAULT_VOLUME: 100;
    readonly DEFAULT_SEEK_TIME: 10;
    readonly DEFAULT_VOLUME_STEP: 10;
    readonly DEFAULT_PLAYBACK_RATE: 1;
};
declare const DEFAULT_PLAYBACK_RATE: {
    label: string;
    value: number;
}[];
export { cssClasses, strings, numbers, DEFAULT_PLAYBACK_RATE };
