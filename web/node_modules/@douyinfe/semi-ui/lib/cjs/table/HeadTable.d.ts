import React from 'react';
import { Fixed, TableComponents, Scroll, BodyScrollEvent, ColumnProps, OnHeaderRow, Sticky } from './interface';
export interface HeadTableProps {
    tableLayout?: 'fixed' | 'auto';
    bodyHasScrollBar?: boolean;
    columns?: ColumnProps[];
    components?: TableComponents;
    dataSource?: Record<string, any>[];
    fixed?: Fixed;
    handleBodyScroll?: React.EventHandler<BodyScrollEvent>;
    prefixCls?: string;
    forwardedRef?: React.MutableRefObject<HTMLDivElement> | ((instance: any) => void);
    scroll?: Scroll;
    selectedRowKeysSet: Set<any>;
    showHeader?: boolean;
    onDidUpdate?: (ref: React.MutableRefObject<any>) => void;
    onHeaderRow?: OnHeaderRow<any>;
    sticky?: Sticky;
}
declare const _default: React.ForwardRefExoticComponent<HeadTableProps & React.RefAttributes<HTMLDivElement>>;
export default _default;
