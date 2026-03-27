import React, { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import ColorPickerFoundation, { ColorPickerProps, ColorPickerState } from '@douyinfe/semi-foundation/lib/es/colorPicker/foundation';
import BaseComponent from '../_base/baseComponent';
import { PopoverProps } from '../popover';
import { ColorPickerAdapter, ColorValue } from '@douyinfe/semi-foundation/lib/es/colorPicker/foundation';
import '@douyinfe/semi-foundation/lib/es/colorPicker/colorPicker.css';
export interface ColorPickerReactProps extends ColorPickerProps {
    usePopover?: boolean;
    popoverProps?: PopoverProps;
    className?: string;
    style?: CSSProperties;
    bottomSlot?: ReactNode;
    topSlot?: ReactNode;
}
export interface ColorPickerReactState extends ColorPickerState {
}
declare class ColorPicker extends BaseComponent<PropsWithChildren<ColorPickerReactProps>, ColorPickerReactState> {
    static __SemiComponentName__: string;
    foundation: ColorPickerFoundation;
    constructor(props: ColorPickerReactProps);
    static defaultProps: {
        defaultValue: {
            hsva: {
                h: number;
                s: number;
                v: number;
                a: number;
            };
            rgba: {
                r: number;
                g: number;
                b: number;
                a: number;
            };
            hex: string;
        };
        eyeDropper: boolean;
        defaultFormat: string;
    };
    get adapter(): ColorPickerAdapter<ColorPickerReactProps, ColorPickerReactState>;
    static colorStringToValue: (raw: string) => {
        hsva: import("@douyinfe/semi-foundation/lib/es/colorPicker/interface").HsvaColor;
        rgba: import("@douyinfe/semi-foundation/lib/es/colorPicker/interface").RgbaColor;
        hex: string;
    };
    renderPicker(): React.JSX.Element;
    render(): React.JSX.Element;
}
export type { ColorValue };
export * from '@douyinfe/semi-foundation/lib/es/colorPicker/interface';
export default ColorPicker;
