import React, { PureComponent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { PlainTab, TabContextValue, TabPaneProps } from './interface';
declare class TabPane extends PureComponent<TabPaneProps> {
    static isTabPane: boolean;
    static contextType: React.Context<TabContextValue>;
    static propTypes: {
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        disabled: PropTypes.Requireable<boolean>;
        itemKey: PropTypes.Requireable<string>;
        tab: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        closable: PropTypes.Requireable<boolean>;
    };
    ref: React.RefObject<HTMLDivElement>;
    _active: boolean;
    context: TabContextValue;
    getDirection: (activeKey: string, itemKey: string, panes: Array<PlainTab>, lastActiveKey: string) => boolean;
    shouldRender: () => boolean;
    render(): ReactNode;
}
export default TabPane;
