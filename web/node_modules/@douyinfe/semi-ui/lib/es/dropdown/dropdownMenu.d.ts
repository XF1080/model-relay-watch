import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent, { BaseProps } from '../_base/baseComponent';
export interface DropdownMenuProps extends BaseProps {
    children: React.ReactNode;
}
declare class DropdownMenu extends BaseComponent<DropdownMenuProps> {
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
    };
    static contextType: React.Context<import("./context").DropdownContextType>;
    constructor(props: DropdownMenuProps);
    get adapter(): {
        getContext(key: string): any;
        getContexts(): any;
        getProp(key: string): any;
        getProps(): DropdownMenuProps;
        getState(key: string): any;
        getStates(): {};
        setState<K extends never>(s: Pick<{}, K>, callback?: any): void;
        getCache(c: string): any;
        getCaches(): any;
        setCache(key: any, value: any): void;
        stopPropagation(e: any): void;
        persistEvent: (event: any) => void;
    };
    render(): React.JSX.Element;
}
export default DropdownMenu;
