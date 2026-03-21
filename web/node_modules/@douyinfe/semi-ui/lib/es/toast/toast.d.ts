import React, { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { ContextValue } from '../configProvider/context';
import { ToastAdapter, ToastState, ToastProps } from '@douyinfe/semi-foundation/lib/es/toast/toastFoundation';
import BaseComponent from '../_base/baseComponent';
export interface ToastReactProps extends ToastProps {
    style?: CSSProperties;
    icon?: React.ReactNode;
    content: React.ReactNode;
    stack?: boolean;
    stackExpanded?: boolean;
    onAnimationEnd?: (e: React.AnimationEvent) => void;
    onAnimationStart?: (e: React.AnimationEvent) => void;
    positionInList?: {
        index: number;
        length: number;
    };
}
declare class Toast extends BaseComponent<ToastReactProps, ToastState> {
    toastEle: React.RefObject<HTMLDivElement>;
    static contextType: React.Context<ContextValue>;
    static propTypes: {
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        content: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        close: PropTypes.Requireable<(...args: any[]) => any>;
        duration: PropTypes.Requireable<number>;
        theme: PropTypes.Requireable<string>;
        type: PropTypes.Requireable<string>;
        textMaxWidth: PropTypes.Requireable<NonNullable<string | number>>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        showClose: PropTypes.Requireable<boolean>;
        stack: PropTypes.Requireable<boolean>;
        stackExpanded: PropTypes.Requireable<boolean>;
        icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        direction: PropTypes.Requireable<string>;
    };
    static __SemiComponentName__: string;
    static defaultProps: any;
    constructor(props: ToastReactProps);
    context: ContextValue;
    get adapter(): ToastAdapter;
    componentDidMount(): void;
    componentWillUnmount(): void;
    close(e: React.MouseEvent): void;
    clearCloseTimer: () => void;
    startCloseTimer: () => void;
    restartCloseTimer: () => void;
    renderIcon(): string | number | true | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>;
    render(): React.JSX.Element;
}
export default Toast;
