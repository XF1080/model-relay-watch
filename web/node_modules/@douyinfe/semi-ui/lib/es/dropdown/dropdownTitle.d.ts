import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { DropdownContextType } from './context';
import { BaseProps } from '../_base/baseComponent';
export type DropdownTitleProps = BaseProps;
declare class DropdownTitle extends PureComponent<DropdownTitleProps> {
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
    };
    static contextType: React.Context<DropdownContextType>;
    context: DropdownContextType;
    render(): React.JSX.Element;
}
export default DropdownTitle;
