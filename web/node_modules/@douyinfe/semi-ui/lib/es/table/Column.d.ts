import React from 'react';
import { ColumnProps, Data } from './interface';
export default class Column<RecordType extends Record<string, any> = Data> extends React.PureComponent<ColumnProps<RecordType>> {
    static propTypes: {
        align: import("prop-types").Requireable<"center" | "left" | "right">;
        className: import("prop-types").Requireable<string>;
        colSpan: import("prop-types").Requireable<number>;
        dataIndex: import("prop-types").Requireable<string>;
        defaultSortOrder: import("prop-types").Requireable<"ascend" | "descend">;
        filterChildrenRecord: import("prop-types").Requireable<boolean>;
        filterDropdownProps: import("prop-types").Requireable<object>;
        filterDropdown: import("prop-types").Requireable<import("prop-types").ReactNodeLike>;
        filterDropdownVisible: import("prop-types").Requireable<boolean>;
        filterIcon: import("prop-types").Requireable<(...args: any[]) => any>;
        filterMultiple: import("prop-types").Requireable<boolean>;
        filteredValue: import("prop-types").Requireable<any[]>;
        filters: import("prop-types").Requireable<any[]>;
        fixed: import("prop-types").Requireable<boolean | "left" | "right">;
        onCell: import("prop-types").Requireable<(...args: any[]) => any>;
        onFilter: import("prop-types").Requireable<(...args: any[]) => any>;
        onFilterDropdownVisibleChange: import("prop-types").Requireable<(...args: any[]) => any>;
        onHeaderCell: import("prop-types").Requireable<(...args: any[]) => any>;
        onSorterChange: import("prop-types").Requireable<(...args: any[]) => any>;
        render: import("prop-types").Requireable<(...args: any[]) => any>;
        renderFilterDropdownItem: import("prop-types").Requireable<(...args: any[]) => any>;
        sortChildrenRecord: import("prop-types").Requireable<boolean>;
        sortDirections: import("prop-types").Requireable<string[]>;
        sortOrder: import("prop-types").Requireable<NonNullable<string | boolean>>;
        sorter: import("prop-types").Requireable<NonNullable<boolean | ((...args: any[]) => any)>>;
        title: import("prop-types").Requireable<NonNullable<import("prop-types").ReactNodeLike | ((...args: any[]) => any)>>;
        useFullRender: import("prop-types").Requireable<boolean>;
        width: import("prop-types").Requireable<NonNullable<string | number>>;
        showSortTip: import("prop-types").Requireable<boolean>;
    };
    static elementType: string;
    constructor(props?: ColumnProps);
    render(): null;
}
