import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import HotKeysFoudation, { HotKeysAdapter } from '@douyinfe/semi-foundation/lib/cjs/hotKeys/foundation';
import { Keys } from '@douyinfe/semi-foundation/lib/cjs/hotKeys/constants';
import BaseComponent from '../_base/baseComponent';
import '@douyinfe/semi-foundation/lib/cjs/hotKeys/hotKeys.css';
export interface HotKeysProps {
    preventDefault?: boolean;
    hotKeys?: KeyboardEvent["key"][];
    content?: string[];
    onClick?: () => void;
    onHotKey?: (e: KeyboardEvent) => void;
    mergeMetaCtrl?: boolean;
    render?: () => ReactNode | ReactNode;
    getListenerTarget?: () => HTMLElement;
    className?: string;
    style?: React.CSSProperties;
}
export interface HotKeysState {
}
declare class HotKeys extends BaseComponent<HotKeysProps, HotKeysState> {
    static propTypes: {
        preventDefault: PropTypes.Requireable<boolean>;
        hotKeys: PropTypes.Requireable<string[]>;
        content: PropTypes.Requireable<string[]>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        onHotKey: PropTypes.Requireable<(...args: any[]) => any>;
        mergeMetaCtrl: PropTypes.Requireable<boolean>;
        render: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike | ((...args: any[]) => any)>>;
        getListenerTarget: PropTypes.Requireable<(...args: any[]) => any>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
    };
    static defaultProps: Partial<HotKeysProps>;
    static Keys: typeof Keys;
    constructor(props: HotKeysProps);
    componentDidMount(): void;
    componentDidUpdate(_prevProps: HotKeysProps): void;
    componentWillUnmount(): void;
    foundation: HotKeysFoudation;
    get adapter(): HotKeysAdapter<HotKeysProps, HotKeysState>;
    render(): React.JSX.Element;
}
export default HotKeys;
