import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
export interface LabelProps {
    /** text-align of label */
    align?: string;
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    id?: string;
    /** Whether to display the required * symbol */
    required?: boolean;
    /** Content of label */
    text?: React.ReactNode;
    /** Used to configure the htmlFor attribute of the label tag */
    name?: string;
    /** width of label */
    width?: number | string;
    style?: React.CSSProperties;
    extra?: React.ReactNode;
    optional?: boolean;
}
export default class Label extends PureComponent<LabelProps> {
    static defaultProps: {
        required: boolean;
        name: string;
        align: string;
        className: string;
        optional: boolean;
    };
    static propTypes: {
        id: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        required: PropTypes.Requireable<boolean>;
        text: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        disabled: PropTypes.Requireable<boolean>;
        name: PropTypes.Requireable<string>;
        align: PropTypes.Requireable<string>;
        width: PropTypes.Requireable<NonNullable<string | number>>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        extra: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        optional: PropTypes.Requireable<boolean>;
    };
    render(): React.JSX.Element;
}
