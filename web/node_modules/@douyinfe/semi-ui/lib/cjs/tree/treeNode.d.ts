import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TreeContextValue } from './treeContext';
import { TreeNodeProps, TreeNodeState } from './interface';
export default class TreeNode extends PureComponent<TreeNodeProps, TreeNodeState> {
    static contextType: React.Context<TreeContextValue>;
    static propTypes: {
        expanded: PropTypes.Requireable<boolean>;
        selected: PropTypes.Requireable<boolean>;
        checked: PropTypes.Requireable<boolean>;
        halfChecked: PropTypes.Requireable<boolean>;
        active: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
        loaded: PropTypes.Requireable<boolean>;
        loading: PropTypes.Requireable<boolean>;
        isLeaf: PropTypes.Requireable<boolean>;
        pos: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<object>;
        icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        directory: PropTypes.Requireable<boolean>;
        keyword: PropTypes.Requireable<string>;
        treeNodeFilterProp: PropTypes.Requireable<string>;
        selectedKey: PropTypes.Requireable<string>;
        motionKey: PropTypes.Requireable<NonNullable<string | string[]>>;
        isEnd: PropTypes.Requireable<boolean[]>;
        showLine: PropTypes.Requireable<boolean>;
        expandIcon: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike | ((...args: any[]) => any)>>;
    };
    static defaultProps: {
        selectedKey: string;
        motionKey: string;
    };
    debounceSelect: any;
    refNode: HTMLElement;
    context: TreeContextValue;
    constructor(props: TreeNodeProps);
    onSelect: (e: React.MouseEvent | React.KeyboardEvent) => void;
    onExpand: (e: React.MouseEvent | React.KeyboardEvent) => void;
    onCheck: (e: React.MouseEvent | React.KeyboardEvent) => void;
    /**
     * A11y: simulate checkbox click
     */
    handleCheckEnterPress: (e: React.KeyboardEvent) => void;
    onContextMenu: (e: React.MouseEvent) => void;
    onClick: (e: React.MouseEvent | React.KeyboardEvent) => void;
    /**
     * A11y: simulate li click
     */
    handleliEnterPress: (e: React.KeyboardEvent) => void;
    onDoubleClick: (e: React.MouseEvent) => void;
    onDragStart: (e: React.DragEvent<HTMLLIElement>) => void;
    onDragEnter: (e: React.DragEvent<HTMLLIElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLLIElement>) => void;
    onDragEnd: (e: React.DragEvent<HTMLLIElement>) => void;
    onDrop: (e: React.DragEvent<HTMLLIElement>) => void;
    getNodeChildren: () => import("./interface").TreeNodeData[];
    isLeaf: () => boolean;
    isDisabled: () => boolean;
    renderArrow(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element;
    renderCheckbox(): React.JSX.Element;
    renderSwitcher: () => React.JSX.Element;
    renderIcon(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element;
    renderEmptyNode(): React.JSX.Element;
    renderRealLabel: () => any;
    setRef: (node: HTMLElement) => void;
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element;
}
