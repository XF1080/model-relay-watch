import BaseFoundation, { DefaultAdapter } from "../base/foundation";
import ColorPickerFoundation from "./foundation";
import { HsvaColor } from "./interface";
export interface AlphaSliderBaseProps {
    width: number;
    height: number;
    hsva: HsvaColor;
    handleSize: number;
    foundation: ColorPickerFoundation;
}
export interface AlphaSliderBaseState {
    handlePosition: number;
    isHandleGrabbing: boolean;
}
export interface AlphaSliderAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    handleMouseDown: (e: any) => void;
    handleMouseUp: (e: any) => void;
    getColorPickerFoundation: () => ColorPickerFoundation;
    getDOM: () => HTMLDivElement;
}
declare class AlphaSliderFoundation extends BaseFoundation<AlphaSliderAdapter<AlphaSliderBaseProps, AlphaSliderBaseState>, AlphaSliderBaseProps, AlphaSliderBaseState> {
    constructor(adapter: AlphaSliderAdapter<AlphaSliderBaseProps, AlphaSliderBaseState>);
    handleMouseDown: (e: any) => void;
    handleMouseUp: (e: any) => void;
    setHandlePositionByMousePosition: (e: MouseEvent) => void;
}
export default AlphaSliderFoundation;
