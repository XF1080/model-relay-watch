import { HsvaColor, RgbaColor } from './interface';
import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export type ColorValue = {
    hsva: HsvaColor;
    rgba: RgbaColor;
    hex: string;
};
export interface ColorPickerProps {
    eyeDropper?: boolean;
    defaultValue?: ColorValue;
    value?: ColorValue;
    onChange: (value: ColorValue) => void;
    alpha: boolean;
    width?: number;
    height?: number;
    defaultFormat: 'hex' | 'rgba' | 'hsva';
}
export interface ColorPickerState {
    currentColor: ColorValue;
}
export interface ColorPickerAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    notifyChange: (value: ColorValue) => void;
}
declare class ColorPickerFoundation extends BaseFoundation<ColorPickerAdapter<ColorPickerProps, ColorPickerState>, ColorPickerProps, ColorPickerState> {
    constructor(adapter: ColorPickerAdapter<ColorPickerProps, ColorPickerState>);
    static hsvaToRgba: ({ h, s, v, a }: HsvaColor) => RgbaColor;
    static rgbaToHsva: ({ r, g, b, a }: RgbaColor) => HsvaColor;
    static rgbaToHex: ({ r, g, b, a }: RgbaColor) => string;
    static hsvaToHex: (hsva: HsvaColor) => string;
    static hexToRgba: (hex: string) => RgbaColor;
    static hexToHsva: (hex: string) => HsvaColor;
    static hsvaToHslaString: (hsva: HsvaColor) => string;
    static hsvaToHslString: (hsva: HsvaColor) => string;
    static rgbaStringToHsva: (rgbaString: string) => HsvaColor;
    static rgbaStringToRgba: (rgbaString: string) => RgbaColor;
    handleChangeH: (currentColor: ColorValue, newH: number) => void;
    handleChangeA: (currentColor: ColorValue, newAlpha: number) => void;
    getCurrentColor: () => any;
    handleChange: (color: HsvaColor | RgbaColor | string, format: 'hex' | 'rgba' | 'hsva') => void;
    handleAlphaChangeByHandle: (newAlpha: {
        a: number;
    }) => void;
    handleColorChangeByHandle: (newHue: {
        h: number;
    }) => void;
    getHandlePositionByHSVA: (hsva: HsvaColor, { width, height }: {
        width: number;
        height: number;
    }, handleSize: number) => {
        x: number;
        y: number;
    };
    getHandlePositionByMousePosition: (mousePosition: {
        x: number;
        y: number;
    }, { width, height }: {
        width: number;
        height: number;
    }, handleSize: number) => {
        x: number;
        y: number;
    };
    getAlphaHandlePositionByMousePosition: (mousePosition: number, width: number, handleSize: number) => number;
    getColorHandlePositionByMousePosition: (mousePosition: number, width: number, handleSize: number) => number;
}
export default ColorPickerFoundation;
