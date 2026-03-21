import React from 'react';
import '@douyinfe/semi-foundation/lib/cjs/floatButton/floatButton.css';
import BaseComponent from '../_base/baseComponent';
import { FloatButtonProps } from './interface';
interface FloatButtonState {
}
export default class FloatButton extends BaseComponent<FloatButtonProps, FloatButtonState> {
    static defaultProps: {
        shape: string;
        colorful: boolean;
        size: string;
    };
    constructor(props: FloatButtonProps);
    handleClick: (e: React.MouseEvent) => void;
    render(): JSX.Element;
}
export {};
