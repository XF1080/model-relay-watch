import React from 'react';
import BaseComponent, { BaseProps } from '../_base/baseComponent';
import PropTypes from 'prop-types';
import { Type, Size } from './Button';
import '@douyinfe/semi-foundation/lib/es/button/button.css';
export type Theme = 'solid' | 'borderless' | 'light' | 'outline';
export interface ButtonGroupProps extends BaseProps {
    disabled?: boolean;
    type?: Type;
    size?: Size;
    theme?: Theme;
    className?: string;
    children?: React.ReactNode;
    'aria-label'?: React.AriaAttributes['aria-label'];
}
export default class ButtonGroup extends BaseComponent<ButtonGroupProps> {
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        disabled: PropTypes.Requireable<boolean>;
        type: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<"default" | "small" | "large">;
        theme: PropTypes.Requireable<"outline" | "solid" | "light" | "borderless">;
        'aria-label': PropTypes.Requireable<string>;
    };
    static defaultProps: {
        size: string;
    };
    getInnerWithLine(inner: any): any;
    render(): React.JSX.Element;
}
