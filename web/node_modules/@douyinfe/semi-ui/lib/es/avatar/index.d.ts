import React from 'react';
import PropTypes from 'prop-types';
import AvatarFoundation, { AvatarAdapter } from '@douyinfe/semi-foundation/lib/es/avatar/foundation';
import '@douyinfe/semi-foundation/lib/es/avatar/avatar.css';
import BaseComponent from '../_base/baseComponent';
import { AvatarProps } from './interface';
export * from './interface';
export interface AvatarState {
    isImgExist: boolean;
    hoverContent: React.ReactNode;
    focusVisible: boolean;
    scale: number;
}
export default class Avatar extends BaseComponent<AvatarProps, AvatarState> {
    static __SemiComponentName__: string;
    static defaultProps: any;
    static elementType: string;
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        color: PropTypes.Requireable<string>;
        shape: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<string>;
        hoverMask: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        gap: PropTypes.Requireable<number>;
        imgAttr: PropTypes.Requireable<object>;
        src: PropTypes.Requireable<string>;
        srcSet: PropTypes.Requireable<string>;
        alt: PropTypes.Requireable<string>;
        onError: PropTypes.Requireable<(...args: any[]) => any>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
        bottomSlot: PropTypes.Requireable<PropTypes.InferProps<{
            render: PropTypes.Requireable<(...args: any[]) => any>;
            shape: PropTypes.Requireable<string>;
            text: PropTypes.Requireable<PropTypes.ReactNodeLike>;
            bgColor: PropTypes.Requireable<string>;
            textColor: PropTypes.Requireable<string>;
            className: PropTypes.Requireable<string>;
            style: PropTypes.Requireable<object>;
        }>>;
        topSlot: PropTypes.Requireable<PropTypes.InferProps<{
            render: PropTypes.Requireable<(...args: any[]) => any>;
            gradientStart: PropTypes.Requireable<string>;
            gradientEnd: PropTypes.Requireable<string>;
            text: PropTypes.Requireable<PropTypes.ReactNodeLike>;
            textColor: PropTypes.Requireable<string>;
            className: PropTypes.Requireable<string>;
            style: PropTypes.Requireable<object>;
        }>>;
        border: PropTypes.Requireable<NonNullable<boolean | PropTypes.InferProps<{
            color: PropTypes.Requireable<string>;
            motion: PropTypes.Requireable<boolean>;
        }>>>;
        contentMotion: PropTypes.Requireable<boolean>;
    };
    foundation: AvatarFoundation;
    avatarRef: React.RefObject<HTMLElement | null>;
    constructor(props: AvatarProps);
    get adapter(): AvatarAdapter<AvatarProps, AvatarState>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: AvatarProps): void;
    componentWillUnmount(): void;
    onEnter(e: React.MouseEvent): void;
    onLeave(e: React.MouseEvent): void;
    handleError(): void;
    handleKeyDown(event: any): void;
    handleFocusVisible: (event: React.FocusEvent) => void;
    handleBlur: (event: React.FocusEvent) => void;
    getContent: () => React.ReactNode;
    renderBottomSlot: () => string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element;
    renderTopSlot: () => string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element;
    render(): React.JSX.Element;
}
