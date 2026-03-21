import BaseComponent, { BaseProps } from '../_base/baseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import ItemFoundation, { ItemAdapter, ItemProps, ItemKey, SelectedItemProps } from '@douyinfe/semi-foundation/lib/es/navigation/itemFoundation';
import { NavContextType } from './nav-context';
interface NavItemProps extends ItemProps, Omit<BaseProps, 'children'> {
    disabled?: boolean;
    forwardRef?: (ele: HTMLLIElement) => void;
    icon?: React.ReactNode;
    itemKey?: ItemKey;
    level?: number;
    link?: string;
    linkOptions?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
    tabIndex?: number;
    text?: React.ReactNode;
    tooltipHideDelay?: number;
    tooltipShowDelay?: number;
    onClick?(clickItems: SelectedData): void;
    onMouseEnter?: React.MouseEventHandler<HTMLLIElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLLIElement>;
}
interface SelectedData extends SelectedItemProps<NavItemProps> {
    text?: React.ReactNode;
}
interface NavItemState {
    tooltipShow: boolean;
}
export type { NavItemProps, ItemKey, NavItemState, SelectedData };
export default class NavItem extends BaseComponent<NavItemProps, NavItemState> {
    static contextType: React.Context<NavContextType>;
    static propTypes: {
        text: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike>>;
        itemKey: PropTypes.Requireable<NonNullable<string | number>>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
        icon: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike>>;
        className: PropTypes.Requireable<string>;
        toggleIcon: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        forwardRef: PropTypes.Requireable<(...args: any[]) => any>;
        indent: PropTypes.Requireable<NonNullable<number | boolean>>;
        isCollapsed: PropTypes.Requireable<boolean>;
        isSubNav: PropTypes.Requireable<boolean>;
        link: PropTypes.Requireable<string>;
        linkOptions: PropTypes.Requireable<object>;
        disabled: PropTypes.Requireable<boolean>;
        tabIndex: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        isSubNav: boolean;
        indent: boolean;
        forwardRef: (...args: any[]) => void;
        isCollapsed: boolean;
        onClick: (...args: any[]) => void;
        onMouseEnter: (...args: any[]) => void;
        onMouseLeave: (...args: any[]) => void;
        disabled: boolean;
        tabIndex: number;
    };
    foundation: ItemFoundation;
    context: NavContextType;
    constructor(props: NavItemProps);
    _invokeContextFunc(funcName: string, ...args: any[]): any;
    get adapter(): ItemAdapter<NavItemProps, NavItemState>;
    renderIcon(icon: React.ReactNode, pos: string, isToggleIcon?: boolean, key?: number | string): React.JSX.Element;
    setItemRef: (ref: HTMLLIElement) => void;
    wrapTooltip: (node: React.ReactNode) => React.JSX.Element;
    handleClick: (e: React.MouseEvent) => void;
    handleKeyPress: (e: React.KeyboardEvent) => void;
    render(): React.ReactNode;
}
