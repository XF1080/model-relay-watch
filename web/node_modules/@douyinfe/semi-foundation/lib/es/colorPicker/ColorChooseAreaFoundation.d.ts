import BaseFoundation, { DefaultAdapter } from "../base/foundation";
import ColorPickerFoundation from "./foundation";
import { HsvaColor } from "./interface";
export interface ColorChooseAreaBaseProps {
    hsva: HsvaColor;
    onChange: (newColor: {
        s: number;
        v: number;
    }) => void;
    handleSize: number;
    width: number;
    height: number;
    foundation: ColorPickerFoundation;
}
export interface ColorChooseAreaBaseState {
    handlePosition: {
        x: number;
        y: number;
    };
    isHandleGrabbing: boolean;
}
export interface ColorChooseAreaAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getColorPickerFoundation: () => ColorPickerFoundation;
    handleMouseDown: (e: any) => void;
    handleMouseUp: (e: any) => void;
    getDOM: () => HTMLDivElement;
    notifyChange: (newColor: {
        s: number;
        v: number;
    }) => void;
}
declare class ColorChooseAreaFoundation extends BaseFoundation<ColorChooseAreaAdapter<ColorChooseAreaBaseProps, ColorChooseAreaBaseState>, ColorChooseAreaBaseProps, ColorChooseAreaBaseState> {
    constructor(adapter: ColorChooseAreaAdapter<ColorChooseAreaBaseProps, ColorChooseAreaBaseState>);
    getHandlePositionByHSVA: () => {
        x: number;
        y: number;
    };
    handleMouseDown: (e: any) => void;
    handleMouseUp: (e: any) => void;
    setHandlePositionByMousePosition: (e: globalThis.MouseEvent) => void;
}
export default ColorChooseAreaFoundation;
