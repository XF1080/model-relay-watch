import React from 'react';
import BaseComponent from '../_base/baseComponent';
import PropTypes from 'prop-types';
import TableSelectionCellFoundation, { TableSelectionCellAdapter, TableSelectionCellEvent } from '@douyinfe/semi-foundation/lib/cjs/table/tableSelectionCellFoundation';
import { CheckboxEvent, CheckboxProps } from '../checkbox';
export interface TableSelectionCellProps {
    columnTitle?: string;
    getCheckboxProps?: () => CheckboxProps;
    type?: string;
    onChange?: (checked: boolean, e: TableSelectionCellEvent) => void;
    selected?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    prefixCls?: string;
    className?: string;
    'aria-label'?: React.AriaAttributes['aria-label'];
}
/**
 * render selection cell
 */
export default class TableSelectionCell extends BaseComponent<TableSelectionCellProps, Record<string, any>> {
    static propTypes: {
        columnTitle: PropTypes.Requireable<string>;
        getCheckboxProps: PropTypes.Requireable<(...args: any[]) => any>;
        type: PropTypes.Requireable<string>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        selected: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        indeterminate: PropTypes.Requireable<boolean>;
        prefixCls: PropTypes.Requireable<string>;
        className: PropTypes.Requireable<string>;
        'aria-label': PropTypes.Requireable<string>;
    };
    static defaultProps: {
        disabled: boolean;
        onChange: (...args: any[]) => void;
        prefixCls: "semi-table";
    };
    get adapter(): TableSelectionCellAdapter;
    foundation: TableSelectionCellFoundation;
    constructor(props: TableSelectionCellProps);
    handleChange: (e: CheckboxEvent) => void;
    render(): React.JSX.Element;
}
