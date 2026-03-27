import React, { PropsWithChildren } from 'react';
import { HsvaColor, RgbaColor } from '@douyinfe/semi-foundation/lib/cjs/colorPicker/interface';
import BaseComponent from "../../_base/baseComponent";
import { DataPartAdapter, DataPartBaseProps, DataPartBaseState } from '@douyinfe/semi-foundation/lib/cjs/colorPicker/DataPartFoundation';
export interface DataPartProps extends DataPartBaseProps {
}
export interface DataPartState extends DataPartBaseState {
}
declare class DataPart extends BaseComponent<PropsWithChildren<DataPartProps>, DataPartState> {
    constructor(props: DataPartProps);
    get adapter(): DataPartAdapter<DataPartBaseProps, DataPartBaseState>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<DataPartProps>, prevState: Readonly<DataPartState>, snapshot?: any): void;
    handleChange: (newColor: RgbaColor | HsvaColor | string) => void;
    render(): React.JSX.Element;
}
export default DataPart;
