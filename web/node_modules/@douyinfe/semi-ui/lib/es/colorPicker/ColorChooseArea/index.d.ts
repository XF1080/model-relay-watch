import React, { CSSProperties, PropsWithChildren } from 'react';
import { ColorChooseAreaAdapter, ColorChooseAreaBaseProps, ColorChooseAreaBaseState } from '@douyinfe/semi-foundation/lib/es/colorPicker/ColorChooseAreaFoundation';
import BaseComponent from "../../_base/baseComponent";
export interface ColorChooseAreaProps extends ColorChooseAreaBaseProps {
    className?: string;
    style?: CSSProperties;
}
export interface ColorChooseAreaState extends ColorChooseAreaBaseState {
}
declare class ColorChooseArea extends BaseComponent<PropsWithChildren<ColorChooseAreaProps>, ColorChooseAreaState> {
    ref: React.RefObject<HTMLDivElement>;
    constructor(props: any);
    get adapter(): ColorChooseAreaAdapter<ColorChooseAreaProps, ColorChooseAreaState>;
    componentDidUpdate(prevProps: Readonly<ColorChooseAreaProps>, prevState: Readonly<ColorChooseAreaState>, snapshot?: any): void;
    handleClick: (e: React.MouseEvent) => void;
    render(): React.JSX.Element;
}
export default ColorChooseArea;
