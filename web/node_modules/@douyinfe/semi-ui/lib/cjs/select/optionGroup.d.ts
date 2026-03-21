import React from 'react';
import PropTypes from 'prop-types';
import BaseComponent from '../_base/baseComponent';
export interface OptionGroupProps {
    children?: React.ReactNode;
    label?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
declare class OptionGroup extends BaseComponent<OptionGroupProps> {
    static isSelectOptionGroup: boolean;
    static propTypes: {
        children: PropTypes.Requireable<NonNullable<any[] | PropTypes.ReactNodeLike>>;
        label: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
    };
    render(): React.JSX.Element;
}
export default OptionGroup;
