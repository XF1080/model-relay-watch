import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
export type CardGroupType = 'grid';
export interface CardGroupProps {
    /** Card group style class name */
    className?: string;
    children?: React.ReactNode;
    /** Card Spacing */
    spacing?: number | number[];
    /** Card group inline style */
    style?: React.CSSProperties;
    /** Card set type */
    type?: CardGroupType;
}
declare class CardGroup extends PureComponent<CardGroupProps> {
    static propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        className: PropTypes.Requireable<string>;
        spacing: PropTypes.Requireable<NonNullable<number | any[]>>;
        style: PropTypes.Requireable<object>;
        type: PropTypes.Requireable<string>;
    };
    static defaultProps: {
        spacing: number;
    };
    render(): React.JSX.Element;
}
export default CardGroup;
