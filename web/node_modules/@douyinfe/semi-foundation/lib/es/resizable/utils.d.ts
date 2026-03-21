export declare const clamp: (n: number, min: number, max: number) => number;
export declare const snap: (n: number, size: number) => number;
export declare const has: (dir: 'top' | 'right' | 'bottom' | 'left', target: string) => boolean;
export declare const findNextSnap: (n: number, snapArray: number[], snapGap?: number) => number;
export declare const getStringSize: (n: number | string) => string;
export declare const getNumberSize: (size: undefined | string | number, parentSize: number, innerWidth: number, innerHeight: number) => number;
export declare const calculateNewMax: (parentSize: {
    width: number;
    height: number;
}, innerWidth: number, innerHeight: number, maxWidth?: string | number, maxHeight?: string | number, minWidth?: string | number, minHeight?: string | number) => {
    maxWidth: number;
    maxHeight: number;
    minWidth: number;
    minHeight: number;
};
export declare const getItemDirection: (dir: 'vertical' | 'horizontal') => string[];
export declare const getPixelSize: (size: string, parentSize: number) => number;
export declare const judgeConstraint: (newSize: number, min: string, max: string, parentSize: number, offset?: number) => boolean;
export declare const adjustNewSize: (newSize: number, min: string, max: string, parentSize: number, offset: number) => number;
export declare const getOffset: (style: CSSStyleDeclaration, direction: 'horizontal' | 'vertical') => number;
