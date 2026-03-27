import React, { CSSProperties, PropsWithChildren } from 'react';
import BaseComponent from "../../_base/baseComponent";
import { AlphaSliderAdapter, AlphaSliderBaseProps, AlphaSliderBaseState } from '@douyinfe/semi-foundation/lib/es/colorPicker/AlphaSliderFoundation';
export interface AlphaSliderProps extends AlphaSliderBaseProps {
    className?: string;
    style?: CSSProperties;
}
export interface AlphaSliderState extends AlphaSliderBaseState {
}
declare class AlphaSlider extends BaseComponent<PropsWithChildren<AlphaSliderProps>, AlphaSliderState> {
    private ref;
    constructor(props: any);
    get adapter(): AlphaSliderAdapter<AlphaSliderProps, AlphaSliderState>;
    componentDidUpdate(prevProps: Readonly<AlphaSliderBaseProps>, prevState: Readonly<AlphaSliderBaseState>, snapshot?: any): void;
    handleClick: (e: React.MouseEvent) => void;
    render(): React.JSX.Element;
}
export default AlphaSlider;
