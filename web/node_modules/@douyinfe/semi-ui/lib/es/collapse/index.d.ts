import React, { CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { CollapseAdapter, CollapseProps, CollapseState } from '@douyinfe/semi-foundation/lib/es/collapse/foundation';
import BaseComponent from '../_base/baseComponent';
import CollapsePanel from './item';
import '@douyinfe/semi-foundation/lib/es/collapse/collapse.css';
export type { CollapsePanelProps } from './item';
export interface CollapseReactProps extends CollapseProps {
    expandIcon?: React.ReactNode;
    collapseIcon?: React.ReactNode;
    children?: React.ReactNode;
    style?: CSSProperties;
    onChange?: (activeKey: CollapseProps['activeKey'], e: React.MouseEvent) => void;
    lazyRender?: boolean;
}
export type { CollapseState };
declare class Collapse extends BaseComponent<CollapseReactProps, CollapseState> {
    static Panel: typeof CollapsePanel;
    static propTypes: {
        activeKey: PropTypes.Requireable<NonNullable<string | any[]>>;
        defaultActiveKey: PropTypes.Requireable<NonNullable<string | any[]>>;
        accordion: PropTypes.Requireable<boolean>;
        clickHeaderToExpand: PropTypes.Requireable<boolean>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
        expandIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        collapseIcon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        keepDOM: PropTypes.Requireable<boolean>;
        motion: PropTypes.Requireable<NonNullable<boolean | object>>;
        expandIconPosition: PropTypes.Requireable<string>;
        lazyRender: PropTypes.Requireable<boolean>;
    };
    static __SemiComponentName__: string;
    static defaultProps: any;
    constructor(props: CollapseReactProps);
    get adapter(): CollapseAdapter;
    static getDerivedStateFromProps(props: CollapseReactProps, state: CollapseState): CollapseState;
    componentWillUnmount(): void;
    onChange: (activeKey: string, e: React.MouseEvent) => void;
    render(): React.JSX.Element;
}
export default Collapse;
