import React, { PureComponent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import '@douyinfe/semi-foundation/lib/cjs/button/button.css';
import { noop } from '@douyinfe/semi-foundation/lib/cjs/utils/function';
export type HtmlType = 'button' | 'reset' | 'submit';
export type Size = 'default' | 'small' | 'large';
export type Theme = 'solid' | 'borderless' | 'light' | 'outline';
export type Type = 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    id?: string;
    block?: boolean;
    circle?: boolean;
    children?: ReactNode;
    disabled?: boolean;
    className?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    htmlType?: HtmlType;
    size?: Size;
    style?: React.CSSProperties;
    theme?: Theme;
    type?: Type;
    prefixCls?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
    'aria-label'?: React.AriaAttributes['aria-label'];
    contentClassName?: string;
    colorful?: boolean;
}
export default class Button extends PureComponent<ButtonProps> {
    static defaultProps: {
        disabled: boolean;
        size: string;
        type: string;
        theme: string;
        block: boolean;
        htmlType: string;
        onMouseDown: typeof noop;
        onClick: typeof noop;
        onMouseEnter: typeof noop;
        onMouseLeave: typeof noop;
        colorful: boolean;
        prefixCls: string;
    };
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        disabled: PropTypes.Requireable<boolean>;
        prefixCls: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        size: PropTypes.Requireable<"default" | "small" | "large">;
        type: PropTypes.Requireable<"warning" | "primary" | "secondary" | "danger" | "tertiary">;
        block: PropTypes.Requireable<boolean>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseDown: PropTypes.Requireable<(...args: any[]) => any>;
        circle: PropTypes.Requireable<boolean>;
        loading: PropTypes.Requireable<boolean>;
        htmlType: PropTypes.Requireable<"button" | "reset" | "submit">;
        theme: PropTypes.Requireable<"outline" | "solid" | "light" | "borderless">;
        className: PropTypes.Requireable<string>;
        onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
        'aria-label': PropTypes.Requireable<string>;
        contentClassName: PropTypes.Requireable<string>;
    };
    render(): React.JSX.Element;
}
