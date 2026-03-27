import BaseComponent, { BaseProps } from '../_base/baseComponent';
import React, { ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import NavigationFoundation, { NavigationAdapter } from '@douyinfe/semi-foundation/lib/cjs/navigation/foundation';
import SubNav, { SubNavProps } from './SubNav';
import Item, { NavItemProps, ItemKey } from './Item';
import Footer, { NavFooterProps } from './Footer';
import Header, { NavHeaderProps } from './Header';
import '@douyinfe/semi-foundation/lib/cjs/navigation/navigation.css';
import { DropdownProps } from '../dropdown';
export type { CollapseButtonProps } from './CollapseButton';
export type { NavFooterProps } from './Footer';
export type { NavHeaderProps } from './Header';
export type { NavItemProps, ItemKey } from './Item';
export type { SubNavProps } from './SubNav';
export type Mode = 'vertical' | 'horizontal';
export interface OnSelectedData {
    itemKey: ItemKey;
    selectedKeys: React.ReactText[];
    selectedItems: (NavItemProps | SubNavProps)[];
    domEvent: React.MouseEvent;
    isOpen: boolean;
}
export interface SubNavPropsWithItems extends SubNavProps {
    items?: (SubNavPropsWithItems | string)[];
}
export interface NavItemPropsWithItems extends NavItemProps {
    items?: (NavItemPropsWithItems | string)[];
}
export type NavItems = (string | SubNavPropsWithItems | NavItemPropsWithItems)[];
export interface NavProps extends BaseProps {
    bodyStyle?: React.CSSProperties;
    children?: React.ReactNode;
    defaultIsCollapsed?: boolean;
    defaultOpenKeys?: React.ReactText[];
    defaultSelectedKeys?: React.ReactText[];
    subDropdownProps?: DropdownProps;
    expandIcon?: React.ReactNode;
    footer?: React.ReactNode | NavFooterProps;
    header?: React.ReactNode | NavHeaderProps;
    isCollapsed?: boolean;
    items?: NavItems;
    limitIndent?: boolean;
    mode?: Mode;
    multiple?: boolean;
    openKeys?: React.ReactText[];
    prefixCls?: string;
    selectedKeys?: React.ReactText[];
    subNavCloseDelay?: number;
    subNavMotion?: boolean;
    subNavOpenDelay?: number;
    toggleIconPosition?: string;
    tooltipHideDelay?: number;
    tooltipShowDelay?: number;
    getPopupContainer?: () => HTMLElement;
    onClick?: (data: {
        itemKey?: ItemKey;
        domEvent?: MouseEvent;
        isOpen?: boolean;
    }) => void;
    onCollapseChange?: (isCollapse: boolean) => void;
    onDeselect?: (data?: any) => void;
    onOpenChange?: (data: {
        itemKey?: ItemKey;
        openKeys?: ItemKey[];
        domEvent?: MouseEvent;
        isOpen?: boolean;
    }) => void;
    onSelect?: (data: OnSelectedData) => void;
    renderWrapper?: ({ itemElement, isSubNav, isInSubNav, props }: {
        itemElement: ReactElement<any>;
        isInSubNav: boolean;
        isSubNav: boolean;
        props: NavItemProps | SubNavProps;
    }) => ReactNode;
}
export interface NavState {
    isCollapsed: boolean;
    openKeys: ItemKey[];
    items: any[];
    itemKeysMap: {
        [itemKey: string]: ItemKey[];
    };
    selectedKeys: ItemKey[];
}
declare class Nav extends BaseComponent<NavProps, NavState> {
    static Sub: typeof SubNav;
    static Item: typeof Item;
    static Header: typeof Header;
    static Footer: typeof Footer;
    static propTypes: {
        collapseIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        defaultOpenKeys: PropTypes.Requireable<NonNullable<string | number>[]>;
        openKeys: PropTypes.Requireable<NonNullable<string | number>[]>;
        defaultSelectedKeys: PropTypes.Requireable<NonNullable<string | number>[]>;
        expandIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        selectedKeys: PropTypes.Requireable<NonNullable<string | number>[]>;
        mode: PropTypes.Requireable<string>;
        onSelect: PropTypes.Requireable<(...args: any[]) => any>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        onOpenChange: PropTypes.Requireable<(...args: any[]) => any>;
        items: PropTypes.Requireable<any[]>;
        isCollapsed: PropTypes.Requireable<boolean>;
        defaultIsCollapsed: PropTypes.Requireable<boolean>;
        onCollapseChange: PropTypes.Requireable<(...args: any[]) => any>;
        multiple: PropTypes.Requireable<boolean>;
        onDeselect: PropTypes.Requireable<(...args: any[]) => any>;
        subNavMotion: PropTypes.Requireable<NonNullable<boolean | object>>;
        subNavCloseDelay: PropTypes.Requireable<number>;
        subNavOpenDelay: PropTypes.Requireable<number>;
        tooltipShowDelay: PropTypes.Requireable<number>;
        tooltipHideDelay: PropTypes.Requireable<number>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        bodyStyle: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        toggleIconPosition: PropTypes.Requireable<string>;
        prefixCls: PropTypes.Requireable<string>;
        header: PropTypes.Requireable<NonNullable<object | PropTypes.ReactNodeLike>>;
        footer: PropTypes.Requireable<NonNullable<object | PropTypes.ReactNodeLike>>;
        limitIndent: PropTypes.Requireable<boolean>;
        getPopupContainer: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static __SemiComponentName__: string;
    static defaultProps: any;
    itemsChanged: boolean;
    foundation: NavigationFoundation;
    constructor(props: NavProps);
    static getDerivedStateFromProps(props: NavProps, state: NavState): Partial<NavState>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: NavProps): void;
    get adapter(): NavigationAdapter<NavProps, NavState>;
    /**
     * Render navigation items recursively
     *
     * @param {NavItem[]} items
     * @returns {JSX.Element}
     */
    renderItems(items?: (SubNavPropsWithItems | NavItemPropsWithItems)[], level?: number): React.JSX.Element;
    onCollapseChange: () => void;
    render(): React.JSX.Element;
}
export default Nav;
