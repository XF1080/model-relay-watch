import React, { CSSProperties, PureComponent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { CollapseContextType } from './collapse-context';
export interface CollapsePanelProps {
    itemKey: string;
    extra?: ReactNode;
    header?: ReactNode;
    className?: string;
    children?: React.ReactNode;
    reCalcKey?: number | string;
    style?: CSSProperties;
    showArrow?: boolean;
    disabled?: boolean;
    onMotionEnd?: () => void;
}
export default class CollapsePanel extends PureComponent<CollapsePanelProps> {
    static contextType: React.Context<CollapseContextType>;
    headerExpandIconTriggerRef: React.RefObject<HTMLElement>;
    private ariaID;
    static propTypes: {
        itemKey: PropTypes.Requireable<string>;
        extra: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        header: PropTypes.Requireable<NonNullable<PropTypes.ReactNodeLike>>;
        className: PropTypes.Requireable<string>;
        reCalcKey: PropTypes.Requireable<NonNullable<string | number>>;
        showArrow: PropTypes.Requireable<boolean>;
        disabled: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        showArrow: boolean;
        disabled: boolean;
    };
    context: CollapseContextType;
    componentDidMount(): void;
    renderHeader(active: boolean, expandIconEnable?: boolean): React.JSX.Element;
    handleClick: (itemKey: string, e: React.MouseEvent) => void;
    render(): React.JSX.Element;
}
