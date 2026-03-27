import React, { CSSProperties, PropsWithChildren } from 'react';
import { ColorSliderAdapter, ColorSliderBaseProps, ColorSliderBaseState } from '@douyinfe/semi-foundation/lib/cjs/colorPicker/ColorSliderFoundation';
import BaseComponent from "../../_base/baseComponent";
export interface ColorSliderProps extends ColorSliderBaseProps {
    className?: string;
    style?: CSSProperties;
}
export interface ColorSliderState extends ColorSliderBaseState {
}
declare class ColorSlider extends BaseComponent<PropsWithChildren<ColorSliderProps>, ColorSliderState> {
    private readonly ref;
    constructor(props: ColorSliderProps);
    get adapter(): ColorSliderAdapter<ColorSliderProps, ColorSliderState>;
    componentDidUpdate(prevProps: Readonly<ColorSliderProps>, prevState: Readonly<ColorSliderState>, snapshot?: any): void;
    handleClick: (e: React.MouseEvent) => void;
    render(): React.JSX.Element;
}
export default ColorSlider;
