import BaseFoundation, { DefaultAdapter } from "../base/foundation";
export interface CropperAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getContainer: () => HTMLElement;
    notifyZoomChange: (zoom: number) => void;
    getImg: () => HTMLImageElement;
}
interface Point {
    x: number;
    y: number;
}
export interface ImageData {
    originalWidth: number;
    originalHeight: number;
    scale: number;
}
export interface ImageDataState {
    width: number;
    height: number;
    centerPoint: Point;
}
export interface CropperBox {
    width: number;
    height: number;
    centerPoint: Point;
}
export interface ContainerData {
    width: number;
    height: number;
}
export interface CropperBoxBorder {
    borderTop: number;
    borderLeft: number;
}
export default class CropperFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<CropperAdapter<P, S>, P, S> {
    imgData: ImageData;
    containerData: ContainerData;
    boxMoveDir: string;
    cropperBoxMoveStart: Point;
    imgMoveStart: Point;
    moveRange: {
        xMax: number;
        xMin: number;
        yMax: number;
        yMin: number;
    };
    boxMoveParam: {
        paramX: number;
        paramY: number;
    };
    cropperBox: CropperBoxBorder;
    rangeX: [number, number];
    rangeY: [number, number];
    initial: boolean;
    previewImg: HTMLImageElement;
    previewContainer: HTMLElement;
    previewContainerInitSize: {
        width: number;
        height: number;
    };
    constructor(adapter: CropperAdapter<P, S>);
    init(): void;
    destroy(): void;
    getImgDataWhenResize: (ratio: number) => {
        width: number;
        height: number;
        centerPoint: {
            x: number;
            y: number;
        };
    };
    getCropperBoxWhenResize: (ratio: number, newContainerData: ContainerData) => {
        width: number;
        height: number;
        centerPoint: {
            x: number;
            y: number;
        };
    };
    handleResize: () => void;
    handleImageLoad: (e: any) => void;
    renderPreview: () => void;
    updatePreview: (props: {
        width: number;
        height: number;
        translateX: number;
        translateY: number;
        rotate: number;
    }) => void;
    removePreview: () => void;
    handleWheel: (e: any) => void;
    getMoveParamByDir(dir: string): {
        paramX: number;
        paramY: number;
    };
    getRangeForAspectChange: () => void;
    handleCornerMouseDown: (e: any) => void;
    bindResizeEvent: () => void;
    unBindResizeEvent: () => void;
    viewIMGDragStart: (e: any) => void;
    handleCornerAspectMouseMove: (e: any) => void;
    changeDir: () => void;
    handleCornerMouseMove: (e: any) => void;
    handleCornerMouseUp: (e: any) => void;
    handleCropperBoxMouseDown: (e: any) => void;
    bindMoveEvent: () => void;
    unBindMoveEvent: () => void;
    handleCropperBoxMouseMove: (e: any) => void;
    handleCropperBoxMouseUp: (e: any) => void;
    handleMaskMouseDown: (e: any) => void;
    bindImgMoveEvent: () => void;
    unBindImgMoveEvent: () => void;
    handleImgMove: (e: any) => void;
    handleImgMoveUp: (e: any) => void;
    getCropperCanvas: () => HTMLCanvasElement;
}
export {};
