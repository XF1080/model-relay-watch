export declare const isTargetEmit: (event: any, targetClasses: any) => boolean;
export declare const downloadImage: (src: string, filename: string, downloadErrorCb: (src: string) => void) => Promise<void>;
export declare const crossMerge: (leftArr?: any[], rightArr?: any[]) => any[];
export declare const getPreloadImagArr: (imgSrc: string[], currentIndex: number, preLoadGap: number, infinite: boolean) => any[];
