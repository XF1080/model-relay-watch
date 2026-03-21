import React from 'react';
import PropTypes from 'prop-types';
import PopconfirmFoundation, { PopconfirmAdapter } from '@douyinfe/semi-foundation/lib/es/popconfirm/popconfirmFoundation';
import BaseComponent from '../_base/baseComponent';
import Popover, { PopoverProps } from '../popover';
import { Position, Trigger, RenderContentProps } from '../tooltip';
import { ButtonProps } from '../button';
import { Type as ButtonType } from '../button/Button';
import { ContextValue } from '../configProvider/context';
import '@douyinfe/semi-foundation/lib/es/popconfirm/popconfirm.css';
export interface PopconfirmProps extends PopoverProps {
    cancelText?: string;
    cancelButtonProps?: ButtonProps;
    cancelType?: ButtonType;
    defaultVisible?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    okText?: string;
    okType?: ButtonType;
    okButtonProps?: ButtonProps;
    motion?: boolean;
    title?: React.ReactNode;
    visible?: boolean;
    prefixCls?: string;
    zIndex?: number;
    trigger?: Trigger;
    showCloseIcon?: boolean;
    position?: Position;
    onCancel?: (e: React.MouseEvent) => Promise<any> | void;
    onConfirm?: (e: React.MouseEvent) => Promise<any> | void;
    onVisibleChange?: (visible: boolean) => void;
    onClickOutSide?: (e: React.MouseEvent) => void;
}
export interface PopconfirmState {
    visible: boolean;
    cancelLoading: boolean;
    confirmLoading: boolean;
}
export default class Popconfirm extends BaseComponent<PopconfirmProps, PopconfirmState> {
    static contextType: React.Context<ContextValue>;
    static propTypes: {
        motion: PropTypes.Requireable<NonNullable<boolean | object>>;
        disabled: PropTypes.Requireable<boolean>;
        content: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike | ((...args: any[]) => any)>>;
        title: PropTypes.Requireable<any>;
        prefixCls: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        okText: PropTypes.Requireable<string>;
        okType: PropTypes.Requireable<string>;
        cancelText: PropTypes.Requireable<string>;
        cancelType: PropTypes.Requireable<string>;
        onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        onConfirm: PropTypes.Requireable<(...args: any[]) => any>;
        onClickOutSide: PropTypes.Requireable<(...args: any[]) => any>;
        onVisibleChange: PropTypes.Requireable<(...args: any[]) => any>;
        visible: PropTypes.Requireable<boolean>;
        defaultVisible: PropTypes.Requireable<boolean>;
        okButtonProps: PropTypes.Requireable<object>;
        cancelButtonProps: PropTypes.Requireable<object>;
        stopPropagation: PropTypes.Requireable<NonNullable<string | boolean>>;
        showCloseIcon: PropTypes.Requireable<boolean>;
        zIndex: PropTypes.Requireable<number>;
        trigger: PropTypes.Requireable<string>;
        position: PropTypes.Requireable<string>;
    };
    static __SemiComponentName__: string;
    static defaultProps: any;
    footerRef: React.RefObject<HTMLDivElement | null>;
    popoverRef: React.RefObject<Popover | null>;
    foundation: PopconfirmFoundation;
    constructor(props: PopconfirmProps);
    context: ContextValue;
    static getDerivedStateFromProps(props: PopconfirmProps, state: PopconfirmState): Partial<PopconfirmState>;
    get adapter(): PopconfirmAdapter<PopconfirmProps, PopconfirmState>;
    handleCancel: (e: React.MouseEvent) => void;
    handleConfirm: (e: React.MouseEvent) => void;
    handleVisibleChange: (visible: boolean) => void;
    handleClickOutSide: (e: React.MouseEvent) => void;
    stopImmediatePropagation: (e: React.SyntheticEvent) => void;
    renderControls(): React.JSX.Element;
    renderConfirmPopCard: ({ initialFocusRef }: {
        initialFocusRef?: RenderContentProps<any>['initialFocusRef'];
    }) => React.JSX.Element;
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element;
}
