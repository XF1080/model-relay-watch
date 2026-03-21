import React from 'react';
import PropTypes from 'prop-types';
import { ContextValue } from '../configProvider/context';
import { NoticeAdapter, NoticeProps, NoticeState } from '@douyinfe/semi-foundation/lib/es/notification/notificationFoundation';
import BaseComponent from '../_base/baseComponent';
export interface NoticeReactProps extends NoticeProps {
    style?: React.CSSProperties;
    title?: React.ReactNode;
    content?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    onAnimationEnd?: (e: React.AnimationEvent) => void;
    onAnimationStart?: (e: React.AnimationEvent) => void;
}
declare class Notice extends BaseComponent<NoticeReactProps, NoticeState> {
    static contextType: React.Context<ContextValue>;
    static propTypes: {
        duration: PropTypes.Requireable<number>;
        id: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        content: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        type: PropTypes.Requireable<string>;
        theme: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        onCloseClick: PropTypes.Requireable<(...args: any[]) => any>;
        showClose: PropTypes.Requireable<boolean>;
        close: PropTypes.Requireable<(...args: any[]) => any>;
        direction: PropTypes.Requireable<"ltr" | "rtl">;
    };
    static __SemiComponentName__: string;
    static defaultProps: any;
    get adapter(): NoticeAdapter;
    constructor(props: NoticeReactProps);
    context: ContextValue;
    componentWillUnmount(): void;
    renderTypeIcon(): React.JSX.Element;
    clearCloseTimer: () => void;
    startCloseTimer: () => void;
    close: (e: React.MouseEvent) => void;
    notifyClick: (e: React.MouseEvent) => void;
    render(): React.JSX.Element;
}
export default Notice;
