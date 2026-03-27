import { ReactNode } from "react";
export interface PreviewContextProps {
    isGroup: boolean;
    lazyLoad: boolean;
    previewSrc: string[];
    titles: ReactNode[];
    currentIndex: number;
    visible: boolean;
    previewObserver: IntersectionObserver;
    setCurrentIndex: (current: number) => void;
    handleVisibleChange: (visible: boolean, preVisible?: boolean) => void;
    setDownloadName: (src: string) => string;
}
export declare const PreviewContext: import("react").Context<PreviewContextProps>;
