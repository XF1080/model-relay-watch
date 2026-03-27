import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import UserGuideFoundation, { UserGuideAdapter } from '@douyinfe/semi-foundation/lib/es/userGuide/foundation';
import { Position } from '../tooltip/index';
import BaseComponent from '../_base/baseComponent';
import { ButtonProps } from '../button';
import '@douyinfe/semi-foundation/lib/es/userGuide/userGuide.css';
import { BaseProps } from '../_base/baseComponent';
export interface UserGuideProps extends BaseProps {
    className?: string;
    current?: number;
    finishText?: string;
    mask?: boolean;
    mode?: 'popup' | 'modal';
    nextButtonProps?: ButtonProps;
    onChange?: (current: number) => void;
    onFinish?: () => void;
    onNext?: (current: number) => void;
    onPrev?: (current: number) => void;
    onSkip?: () => void;
    position?: Position;
    prevButtonProps?: ButtonProps;
    showPrevButton?: boolean;
    showSkipButton?: boolean;
    spotlightPadding?: number;
    steps: StepItem[];
    style?: React.CSSProperties;
    theme?: 'default' | 'primary';
    visible?: boolean;
    getPopupContainer?: () => HTMLElement;
    zIndex?: number;
}
export interface StepItem {
    className?: string;
    cover?: ReactNode;
    target?: (() => Element) | Element;
    title?: string | ReactNode;
    description?: React.ReactNode;
    mask?: boolean;
    showArrow?: boolean;
    spotlightPadding?: number;
    theme?: 'default' | 'primary';
    position?: Position;
}
export interface UserGuideState {
    current: number;
    spotlightRect: DOMRect | null;
}
declare class UserGuide extends BaseComponent<UserGuideProps, UserGuideState> {
    static propTypes: {
        mask: PropTypes.Requireable<boolean>;
        mode: PropTypes.Requireable<string>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        onFinish: PropTypes.Requireable<(...args: any[]) => any>;
        onNext: PropTypes.Requireable<(...args: any[]) => any>;
        onPrev: PropTypes.Requireable<(...args: any[]) => any>;
        onSkip: PropTypes.Requireable<(...args: any[]) => any>;
        position: PropTypes.Requireable<string>;
        showPrevButton: PropTypes.Requireable<boolean>;
        showSkipButton: PropTypes.Requireable<boolean>;
        theme: PropTypes.Requireable<string>;
        visible: PropTypes.Requireable<boolean>;
        getPopupContainer: PropTypes.Requireable<(...args: any[]) => any>;
        zIndex: PropTypes.Requireable<number>;
    };
    static defaultProps: UserGuideProps;
    private bodyOverflow;
    private scrollBarWidth;
    private originBodyWidth;
    foundation: UserGuideFoundation;
    userGuideId: string;
    constructor(props: UserGuideProps);
    get adapter(): UserGuideAdapter<UserGuideProps, UserGuideState>;
    static getDerivedStateFromProps(props: UserGuideProps, state: UserGuideState): Partial<UserGuideState>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: UserGuideProps, prevStates: UserGuideState): void;
    componentWillUnmount(): void;
    scrollTargetIntoViewIfNeeded(target: Element): void;
    updateSpotlightRect(): Promise<void>;
    renderPopupContent(step: StepItem, index: number): React.JSX.Element;
    renderStep: (step: StepItem, index: number) => React.JSX.Element;
    renderSpotlight(): React.JSX.Element;
    renderIndicator: () => React.ReactNode[];
    renderModal: () => React.JSX.Element;
    render(): React.JSX.Element;
}
export default UserGuide;
