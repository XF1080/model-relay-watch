import BaseFoundation, { DefaultAdapter } from "../base/foundation";
export interface ImageAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getIsInGroup: () => boolean;
}
export default class ImageFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<ImageAdapter<P, S>, P, S> {
    constructor(adapter: ImageAdapter<P, S>);
    handleClick: (e: any) => void;
    handleLoaded: (e: any) => void;
    handleError: (e: any) => void;
    handlePreviewVisibleChange: (newVisible: boolean) => void;
}
