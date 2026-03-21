import BaseFoundation, { DefaultAdapter } from "../base/foundation";
import ColorPickerFoundation, { ColorPickerProps } from "./foundation";
import { HsvaColor, RgbaColor } from "./interface";
type Value = ColorPickerProps['value'];
export interface DataPartBaseProps {
    currentColor: Value;
    defaultFormat: 'hex' | 'rgba' | 'hsva';
    width: number;
    alpha?: boolean;
    foundation: ColorPickerFoundation;
    eyeDropper: boolean;
}
export interface DataPartBaseState {
    format: 'hex' | 'rgba' | 'hsva';
    inputValue: string;
}
export interface DataPartAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getColorPickerFoundation: () => ColorPickerFoundation;
}
declare class DataPartFoundation extends BaseFoundation<DataPartAdapter<DataPartBaseProps, DataPartBaseState>, DataPartBaseProps, DataPartBaseState> {
    constructor(adapter: DataPartAdapter<DataPartBaseProps, DataPartBaseState>);
    getInputValue: () => string;
    getValueByInputValue: (value: string) => string | false | HsvaColor | RgbaColor;
    handlePickValueWithStraw: () => Promise<void>;
    handleInputValueChange: (value: string) => void;
    handleFormatChange: (format: DataPartBaseState['format']) => void;
}
export default DataPartFoundation;
