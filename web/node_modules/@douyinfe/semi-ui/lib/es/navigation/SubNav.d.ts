import BaseComponent, { BaseProps } from '../_base/baseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import '@douyinfe/semi-foundation/lib/es/navigation/navigation.css';
import SubNavFoundation, { SubNavAdapter } from '@douyinfe/semi-foundation/lib/es/navigation/subNavFoundation';
import { DropdownProps } from '../dropdown';
import { NavContextType } from './nav-context';
export interface SubNavProps extends BaseProps {
    disabled?: boolean;
    dropdownStyle?: React.CSSProperties;
    icon?: React.ReactNode;
    indent?: boolean | number;
    isCollapsed?: boolean;
    isOpen?: boolean;
    itemKey?: string | number;
    level?: number;
    maxHeight?: number;
    onMouseEnter?: React.MouseEventHandler<HTMLLIElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLLIElement>;
    text?: React.ReactNode;
    expandIcon?: React.ReactNode;
    dropdownProps?: DropdownProps;
    subDropdownProps?: DropdownProps;
}
export interface SubNavState {
    isHovered: boolean;
}
export default class SubNav extends BaseComponent<SubNavProps, SubNavState> {
    static contextType: React.Context<NavContextType>;
    static propTypes: {
        /**
         * Unique identification
         */
        itemKey: PropTypes.Requireable<NonNullable<string | number>>;
        /**
         * Copywriting
         */
        text: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike>>;
        /**
         * Whether child navigation is expanded
         */
        isOpen: PropTypes.Requireable<boolean>;
        /**
         * Whether it is in the state of being stowed to the sidebar
         */
        isCollapsed: PropTypes.Requireable<boolean>;
        /**
         * Whether to keep the left Icon placeholder
         */
        indent: PropTypes.Requireable<NonNullable<number | boolean>>;
        /**
         * Nested child elements
         */
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        /**
         * Icon name on the left
         */
        icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /**
         * Maximum height (for animation)
         */
        maxHeight: PropTypes.Requireable<number>;
        onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
        onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
        disabled: PropTypes.Requireable<boolean>;
        level: PropTypes.Requireable<number>;
    };
    static defaultProps: {
        level: number;
        indent: boolean;
        isCollapsed: boolean;
        isOpen: boolean;
        maxHeight: number;
        disabled: boolean;
    };
    titleRef: React.RefObject<HTMLDivElement>;
    itemRef: React.RefObject<HTMLLIElement>;
    foundation: SubNavFoundation;
    context: NavContextType;
    constructor(props: SubNavProps);
    setItemRef: (ref: HTMLLIElement | React.RefObject<HTMLLIElement>) => void;
    setTitleRef: (ref: HTMLDivElement | React.RefObject<HTMLDivElement>) => void;
    _invokeContextFunc(funcName: string, ...args: any[]): any;
    get adapter(): SubNavAdapter<SubNavProps, SubNavState>;
    handleClick: (e: React.MouseEvent) => void;
    handleKeyPress: (e: React.KeyboardEvent) => void;
    handleDropdownVisible: (visible: boolean) => void;
    renderIcon(icon: React.ReactNode, pos: string, withTransition?: boolean, isToggleIcon?: boolean, key?: number | string): React.JSX.Element;
    renderTitleDiv(): React.JSX.Element;
    renderSubUl(): React.JSX.Element;
    wrapDropdown(elem?: React.ReactNode): React.ReactNode;
    render(): React.JSX.Element;
}
