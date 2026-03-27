import React from 'react';
import { SideBarProps } from './interface';
import BaseComponent from '../_base/baseComponent';
import PropTypes from 'prop-types';
import Container from './container';
import { Locale } from '../locale/interface';
interface SideBarState {
}
declare class Sidebar extends BaseComponent<SideBarProps, SideBarState> {
    static propTypes: {
        mode: PropTypes.Requireable<string>;
        activeKey: PropTypes.Requireable<string>;
        options: PropTypes.Requireable<any[]>;
        onActiveOptionChange: PropTypes.Requireable<(...args: any[]) => any>;
        renderMainContent: PropTypes.Requireable<(...args: any[]) => any>;
        renderDetailHeader: PropTypes.Requireable<(...args: any[]) => any>;
        renderDetailContent: PropTypes.Requireable<(...args: any[]) => any>;
        fileEditable: PropTypes.Requireable<boolean>;
        onFileContentChange: PropTypes.Requireable<(...args: any[]) => any>;
        onBackWard: PropTypes.Requireable<(...args: any[]) => any>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        visible: PropTypes.Requireable<boolean>;
        motion: PropTypes.Requireable<boolean>;
        minWidth: PropTypes.Requireable<NonNullable<string | number>>;
        maxWidth: PropTypes.Requireable<NonNullable<string | number>>;
        onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        afterVisibleChange: PropTypes.Requireable<(...args: any[]) => any>;
        resizable: PropTypes.Requireable<boolean>;
        defaultSize: PropTypes.Requireable<object>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        className: PropTypes.Requireable<string>;
        renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
        showClose: PropTypes.Requireable<boolean>;
    };
    static FileContent: React.MemoExoticComponent<(props: import("./widget/file").FileContentProps) => React.JSX.Element>;
    static CodeContent: React.MemoExoticComponent<(props: import("./widget/code").CodeContentProps) => React.JSX.Element>;
    static FileItem: React.MemoExoticComponent<(props: import("./widget/file").FileItemProps) => React.JSX.Element>;
    static CodeItem: React.MemoExoticComponent<(props: import("./widget/code").CodeItemProps) => React.JSX.Element>;
    static Container: typeof Container;
    static defaultProps: {
        mode: string;
        fileEditable: boolean;
    };
    containerRef: React.RefObject<HTMLDivElement>;
    ToastInCustomContainer: any;
    constructor(props: SideBarProps);
    renderOption: () => React.JSX.Element;
    renderMain: () => React.JSX.Element;
    renderDetail: () => string | number | true | Iterable<React.ReactNode> | React.JSX.Element;
    renderContent: () => string | number | true | Iterable<React.ReactNode> | React.JSX.Element;
    renderTitle: () => React.ReactNode;
    onDetailClose: (e: any) => void;
    handleCopyDetailContent: (e: React.MouseEvent, locale: Locale['Sidebar']) => void;
    renderHeader: () => string | number | true | Iterable<React.ReactNode> | React.JSX.Element;
    render(): React.JSX.Element;
}
export default Sidebar;
