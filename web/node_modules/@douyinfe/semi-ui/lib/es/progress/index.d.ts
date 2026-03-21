import React, { ReactNode, Component } from 'react';
import PropTypes from 'prop-types';
import '@douyinfe/semi-foundation/lib/es/progress/progress.css';
import { Animation } from '@douyinfe/semi-animation';
import { Motion } from '../_base/base';
import { StrokeArr } from '@douyinfe/semi-foundation/lib/es/progress/generates';
export interface ProgressProps {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-valuetext'?: string;
    className?: string;
    direction?: 'horizontal' | 'vertical';
    format?: (percent: number) => React.ReactNode;
    id?: string;
    motion?: Motion;
    orbitStroke?: string;
    percent?: number;
    showInfo?: boolean;
    size?: 'default' | 'small' | 'large';
    stroke?: string | StrokeArr;
    strokeGradient?: boolean;
    strokeLinecap?: 'round' | 'square';
    strokeWidth?: number;
    style?: React.CSSProperties;
    type?: 'line' | 'circle';
    width?: number;
}
export interface ProgressState {
    percentNumber: number;
}
declare class Progress extends Component<ProgressProps, ProgressState> {
    static propTypes: {
        'aria-label': PropTypes.Requireable<string>;
        'aria-labelledby': PropTypes.Requireable<string>;
        'aria-valuetext': PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        direction: PropTypes.Requireable<string>;
        format: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike | ((...args: any[]) => any)>>;
        id: PropTypes.Requireable<string>;
        motion: PropTypes.Requireable<NonNullable<boolean | object>>;
        orbitStroke: PropTypes.Requireable<string>;
        percent: PropTypes.Requireable<number>;
        scale: PropTypes.Requireable<number>;
        showInfo: PropTypes.Requireable<boolean>;
        size: PropTypes.Requireable<string>;
        stroke: PropTypes.Requireable<NonNullable<string | PropTypes.InferProps<{
            percent: PropTypes.Requireable<number>;
            color: PropTypes.Requireable<string>;
        }>[]>>;
        strokeGradient: PropTypes.Requireable<boolean>;
        strokeLinecap: PropTypes.Requireable<string>;
        strokeWidth: PropTypes.Requireable<number>;
        style: PropTypes.Requireable<object>;
        type: PropTypes.Requireable<string>;
        width: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        className: string;
        direction: string;
        format: (text: string) => string;
        motion: boolean;
        percent: number;
        showInfo: boolean;
        size: string;
        strokeGradient: boolean;
        strokeLinecap: string;
        strokeWidth: number;
        style: {};
        type: string;
    };
    _mounted: boolean;
    animation: Animation;
    constructor(props: ProgressProps);
    componentDidUpdate(prevProps: ProgressProps): void;
    componentWillUnmount(): void;
    renderCircleProgress(): ReactNode;
    calcPercent(percent: number): number;
    selectStroke(stroke: string | StrokeArr, percent: number, strokeGradient: any): string;
    renderLineProgress(): ReactNode;
    render(): ReactNode;
}
export default Progress;
