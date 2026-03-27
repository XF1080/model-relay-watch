import * as React from 'react';
import LottieFoundation, { LottieAdapter, LottieBaseProps, LottieBaseState } from '@douyinfe/semi-foundation/lib/es/lottie/foundation';
import BaseComponent from '../_base/baseComponent';
import { CSSProperties } from "react";
import PropTypes from "prop-types";
export interface LottieProps extends LottieBaseProps {
    className?: string;
    style?: CSSProperties;
}
export interface LottieState extends LottieBaseState {
}
declare class Lottie extends BaseComponent<LottieProps, LottieState> {
    container: React.RefObject<HTMLDivElement>;
    foundation: LottieFoundation;
    static __SemiComponentName__: string;
    constructor(props: LottieProps);
    static getLottie: () => import("lottie-web").LottiePlayer;
    static defaultProps: any;
    static propTypes: {
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        width: PropTypes.Requireable<string>;
        height: PropTypes.Requireable<string>;
        params: PropTypes.Requireable<object>;
        getAnimationInstance: PropTypes.Requireable<(...args: any[]) => any>;
    };
    get adapter(): LottieAdapter<LottieProps, LottieState>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<LottieProps>, prevState: Readonly<LottieState>, snapshot?: any): void;
    private get wrapperStyle();
    private get wrapperClassName();
    render(): React.JSX.Element;
}
export default Lottie;
