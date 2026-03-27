import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '@douyinfe/semi-foundation/lib/cjs/utils/function';
import { BaseProps } from '../_base/baseComponent';
import { CopyableConfig } from './title';
export interface CopyableProps extends BaseProps {
    content?: string;
    copyTip?: React.ReactNode;
    duration?: number;
    forwardRef?: React.RefObject<any>;
    successTip?: React.ReactNode;
    icon?: React.ReactNode;
    onCopy?: (e: React.MouseEvent, content: string, res: boolean) => void;
    render?: (copied: boolean, doCopy: (e: React.MouseEvent) => void, configs: CopyableConfig) => React.ReactNode;
}
interface CopyableState {
    copied: boolean;
    item: string;
}
export declare class Copyable extends React.PureComponent<CopyableProps, CopyableState> {
    static propTypes: {
        content: PropTypes.Requireable<string>;
        onCopy: PropTypes.Requireable<(...args: any[]) => any>;
        successTip: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        copyTip: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        duration: PropTypes.Requireable<number>;
        style: PropTypes.Requireable<object>;
        className: PropTypes.Requireable<string>;
        icon: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        content: string;
        onCopy: typeof noop;
        duration: number;
        style: {};
        className: string;
    };
    _timeId: ReturnType<typeof setTimeout>;
    constructor(props: CopyableProps);
    componentWillUnmount(): void;
    copy: (e: React.MouseEvent) => void;
    setCopied: (item: string, timer: number) => void;
    resetCopied: () => void;
    renderSuccessTip: () => string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element;
    renderCopyIcon: () => React.JSX.Element;
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element;
}
export default Copyable;
