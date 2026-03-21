import BaseFoundation, { DefaultAdapter } from "../base/foundation";
export interface PreviewFooterAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
}
export default class PreviewFooterFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<PreviewFooterAdapter<P, S>, P, S> {
    changeSliderValue: (type: string) => void;
    handleValueChange: (value: number) => void;
    handleRatioClick: () => void;
    handleRotate: (direction: string) => void;
}
