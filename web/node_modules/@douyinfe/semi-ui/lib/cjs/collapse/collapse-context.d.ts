import React from 'react';
export interface CollapseContextType {
    activeSet: Set<string>;
    expandIcon: React.ReactNode;
    collapseIcon: React.ReactNode;
    clickHeaderToExpand: boolean;
    keepDOM: boolean;
    expandIconPosition: 'left' | 'right';
    onClick: (activeKey: string, e: React.MouseEvent) => void;
    motion: boolean;
    lazyRender: boolean;
}
declare const CollapseContext: React.Context<CollapseContextType>;
export default CollapseContext;
