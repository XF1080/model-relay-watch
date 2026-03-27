import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SortIcon, SortOrder } from './interface';
export interface ColumnSorterProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    prefixCls?: string;
    sortOrder?: SortOrder;
    title?: React.ReactNode;
    sortIcon?: SortIcon;
    showTooltip?: boolean;
}
export default class ColumnSorter extends PureComponent<ColumnSorterProps> {
    static propTypes: {
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        prefixCls: PropTypes.Requireable<string>;
        sortOrder: PropTypes.Requireable<NonNullable<string | boolean>>;
        sortIcon: PropTypes.Requireable<(...args: any[]) => any>;
        showTooltip: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        prefixCls: "semi-table";
        onClick: (...args: any[]) => void;
        sortOrder: boolean;
        showTooltip: boolean;
    };
    render(): React.JSX.Element;
}
