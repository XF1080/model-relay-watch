import React, { CSSProperties, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { SideSheetProps } from '@douyinfe/semi-foundation/lib/es/sideSheet/sideSheetFoundation';
export interface SideSheetContentProps {
    onClose?: (e: React.MouseEvent) => void;
    closeIcon?: ReactNode;
    mask?: boolean;
    maskStyle?: CSSProperties;
    maskClosable?: boolean;
    maskClassName?: string;
    title?: React.ReactNode;
    closable?: boolean;
    headerStyle?: CSSProperties;
    width?: CSSProperties['width'];
    height: CSSProperties['height'];
    style: CSSProperties;
    size: SideSheetProps['size'];
    bodyStyle?: CSSProperties;
    className: string;
    dialogClassName?: string;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    'aria-label'?: string;
    maskExtraProps?: {
        [key: string]: any;
    };
    wrapperExtraProps?: {
        [key: string]: any;
    };
}
export default class SideSheetContent extends React.PureComponent<SideSheetContentProps> {
    static propTypes: {
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        closeIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        onClose: (...args: any[]) => void;
    };
    private sideSheetId;
    private timeoutId;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onMaskClick: (e: React.MouseEvent) => void;
    close: (e: React.MouseEvent) => void;
    getMaskElement(): React.JSX.Element;
    renderHeader(): React.JSX.Element;
    getDialogElement(): React.JSX.Element;
    render(): React.JSX.Element;
}
