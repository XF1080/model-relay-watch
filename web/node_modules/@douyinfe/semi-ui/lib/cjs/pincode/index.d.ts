import React, { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import PinCodeFoundation, { PinCodeAdapter, PinCodeBaseProps, PinCodeBaseState } from '@douyinfe/semi-foundation/lib/cjs/pincode/foundation';
import BaseComponent from '../_base/baseComponent';
import { InputProps } from '../input';
import '@douyinfe/semi-foundation/lib/cjs/pincode/pincode.css';
export interface PinCodeProps extends PinCodeBaseProps {
    className?: string;
    style?: CSSProperties;
    size?: InputProps['size'];
}
export interface PinCodeState extends PinCodeBaseState {
}
declare class PinCode extends BaseComponent<PinCodeProps, PinCodeState> {
    static __SemiComponentName__: string;
    static propTypes: {
        value: PropTypes.Requireable<string>;
        format: PropTypes.Requireable<NonNullable<string | object>>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        defaultValue: PropTypes.Requireable<string>;
        count: PropTypes.Requireable<number>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        autoFocus: PropTypes.Requireable<boolean>;
        onComplete: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: any;
    inputDOMList: HTMLInputElement[];
    foundation: PinCodeFoundation;
    constructor(props: PinCodeProps);
    componentDidUpdate(prevProps: Readonly<PinCodeProps>, prevState: Readonly<PinCodeState>, snapshot?: any): void;
    get adapter(): PinCodeAdapter<PinCodeProps, PinCodeState>;
    focus: (index: number) => void;
    blur: (index: number) => void;
    renderSingleInput: (index: number) => React.JSX.Element;
    render(): React.JSX.Element;
}
export default PinCode;
