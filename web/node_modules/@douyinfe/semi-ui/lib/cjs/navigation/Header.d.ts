import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import '@douyinfe/semi-foundation/lib/cjs/navigation/navigation.css';
import { NavContextType } from './nav-context';
import { BaseProps } from '../_base/baseComponent';
export type Logo = React.ReactNode;
export interface NavHeaderProps extends BaseProps {
    link?: string;
    linkOptions?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
    logo?: Logo;
    prefixCls?: string;
    text?: React.ReactNode;
}
export default class NavHeader extends PureComponent<NavHeaderProps> {
    static contextType: React.Context<NavContextType>;
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        logo: PropTypes.Requireable<NonNullable<object | PropTypes.ReactNodeLike>>;
        text: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike>>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        link: PropTypes.Requireable<string>;
        linkOptions: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        prefixCls: string;
    };
    static elementType: string;
    context: NavContextType;
    renderLogo(logo: React.ReactNode): React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
    render(): React.JSX.Element;
}
