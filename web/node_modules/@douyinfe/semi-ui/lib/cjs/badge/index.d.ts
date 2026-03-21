import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ContextValue } from '../configProvider/context';
import '@douyinfe/semi-foundation/lib/cjs/badge/badge.css';
export type BadgeType = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success';
export type BadgeTheme = 'solid' | 'light' | 'inverted';
export type BadgePosition = 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
export interface BadgeProps {
    count?: React.ReactNode;
    dot?: boolean;
    type?: BadgeType;
    theme?: BadgeTheme;
    position?: BadgePosition;
    overflowCount?: number;
    style?: React.CSSProperties;
    className?: string;
    onMouseEnter?: (e: React.MouseEvent) => any;
    onMouseLeave?: (e: React.MouseEvent) => any;
    onClick?: (e: React.MouseEvent) => any;
    children?: React.ReactNode;
    countClassName?: string;
    countStyle?: React.CSSProperties;
}
export default class Badge extends PureComponent<BadgeProps> {
    static contextType: React.Context<ContextValue>;
    static propTypes: {
        count: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        dot: PropTypes.Requireable<boolean>;
        type: PropTypes.Requireable<string>;
        theme: PropTypes.Requireable<string>;
        position: PropTypes.Requireable<string>;
        overflowCount: PropTypes.Requireable<number>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
        countClassName: PropTypes.Requireable<string>;
        countStyle: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        dot: boolean;
        type: string;
        theme: string;
        className: string;
        onClick: () => (...args: any[]) => void;
        onMouseEnter: () => (...args: any[]) => void;
        onMouseLeave: () => (...args: any[]) => void;
    };
    context: ContextValue;
    render(): React.JSX.Element;
}
