import React from 'react';
import '@douyinfe/semi-foundation/lib/cjs/floatButton/floatButton.css';
import BaseComponent from '../_base/baseComponent';
import { FloatButtonProps } from './interface';
export interface FloatButtonGroupItem extends FloatButtonProps {
    value?: string;
    content?: string | React.ReactNode;
}
export interface FloatButtonGroupProps {
    disabled?: boolean;
    items: FloatButtonGroupItem[];
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onClick?: (value: string, e: React.MouseEvent) => void;
}
interface FloatButtonGroupState {
}
export default class FloatButtonGroup extends BaseComponent<FloatButtonGroupProps, FloatButtonGroupState> {
    static defaultProps: {
        shape: string;
        type: string;
        size: string;
    };
    constructor(props: FloatButtonGroupProps);
    handleClick: (e: any) => void;
    render(): JSX.Element;
}
export {};
