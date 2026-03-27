import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import '@douyinfe/semi-foundation/lib/cjs/navigation/navigation.css';
import { NavContextType } from './nav-context';
import { BaseProps } from '../_base/baseComponent';
export interface NavFooterProps extends BaseProps {
    collapseButton?: React.ReactNode;
    collapseText?: (collapsed?: boolean) => React.ReactNode;
    onClick?: (event: React.MouseEvent) => void;
}
export default class NavFooter extends PureComponent<NavFooterProps> {
    static contextType: React.Context<NavContextType>;
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        collapseButton: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike>>;
        collapseText: PropTypes.Requireable<(...args: any[]) => any>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        collapseButton: boolean;
        onClick: (...args: any[]) => void;
    };
    context: NavContextType;
    static elementType: string;
    renderCollapseButton: () => React.JSX.Element;
    render(): React.JSX.Element;
}
