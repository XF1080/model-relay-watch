import BaseFoundation, { DefaultAdapter } from "../base/foundation";
import ColorPickerFoundation from "./foundation";
export interface ColorSliderBaseProps {
    width: number;
    height: number;
    hue: number;
    handleSize: number;
    foundation: ColorPickerFoundation;
}
export interface ColorSliderBaseState {
    handlePosition: number;
    isHandleGrabbing: boolean;
}
export interface ColorSliderAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    handleMouseDown: (e: any) => void;
    handleMouseUp: (e: any) => void;
    getColorPickerFoundation: () => ColorPickerFoundation;
    getDOM: () => HTMLDivElement;
}
declare class ColorSliderFoundation extends BaseFoundation<ColorSliderAdapter<ColorSliderBaseProps, ColorSliderBaseState>, ColorSliderBaseProps, ColorSliderBaseState> {
    constructor(adapter: ColorSliderAdapter<ColorSliderBaseProps, ColorSliderBaseState>);
    handleMouseDown: (e: any) => void;
    handleMouseUp: (e: any) => void;
    setHandlePositionByMousePosition: (e: MouseEvent) => void;
}
export default ColorSliderFoundation;
