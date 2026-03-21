import React from 'react';
export interface ResizableHeaderCellProps {
    [x: string]: any;
    onResize?: ResizeFn;
    onResizeStart?: ResizeFn;
    onResizeStop?: ResizeFn;
    width?: number | string;
    /** For compatibility with previous versions, the default value is true. If you don't want to resize, set it to false */
    resize?: boolean;
}
declare class ResizableHeaderCell extends React.PureComponent<ResizableHeaderCellProps> {
    render(): React.JSX.Element;
}
export type ResizeFn = (e: React.SyntheticEvent) => any;
export default ResizableHeaderCell;
