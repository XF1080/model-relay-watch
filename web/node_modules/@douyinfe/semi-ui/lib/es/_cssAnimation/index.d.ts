import React, { CSSProperties, ReactNode } from 'react';
interface AnimationEventsNeedBind {
    onAnimationStart?: (e: React.AnimationEvent) => void;
    onAnimationEnd?: (e: React.AnimationEvent) => void;
    [key: string]: (e: any) => void;
}
interface AnimationProps {
    startClassName?: string;
    endClassName?: string;
    children: ({}: {
        animationClassName: string;
        animationStyle: CSSProperties;
        animationEventsNeedBind: AnimationEventsNeedBind;
        isAnimating: boolean;
    }) => ReactNode;
    animationState: "enter" | "leave";
    onAnimationEnd?: (stoppedByAnother: boolean) => void;
    onAnimationStart?: () => void;
    motion?: boolean;
    replayKey?: string;
    fillMode?: "backwards" | "both" | "forwards" | "none";
}
interface AnimationState {
    currentClassName: string;
    extraStyle: CSSProperties;
    isAnimating: boolean;
}
declare class CSSAnimation extends React.Component<AnimationProps, AnimationState> {
    static defaultProps: {
        motion: boolean;
        replayKey: string;
    };
    constructor(props: any);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<AnimationProps>, prevState: Readonly<AnimationState>, snapshot?: any): void;
    handleAnimationStart: () => void;
    handleAnimationEnd: () => void;
    render(): React.ReactNode;
}
export default CSSAnimation;
