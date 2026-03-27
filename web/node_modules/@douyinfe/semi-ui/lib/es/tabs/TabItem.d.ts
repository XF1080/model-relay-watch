import React, { ReactNode, MouseEvent } from 'react';
import { TabType, TabSize, TabPosition } from './interface';
export interface TabItemProps {
    tab?: ReactNode;
    icon?: ReactNode;
    size?: TabSize;
    type?: TabType;
    tabPosition?: TabPosition;
    selected?: boolean;
    closable?: boolean;
    disabled?: boolean;
    itemKey?: string;
    handleKeyDown?: (event: React.KeyboardEvent, itemKey: string, closable: boolean) => void;
    deleteTabItem?: (tabKey: string, event: MouseEvent<Element>) => void;
    onClick?: (itemKey: string, e: MouseEvent<Element>) => void;
}
declare const ForwardTabItem: React.ForwardRefExoticComponent<TabItemProps & React.RefAttributes<HTMLDivElement>>;
export default ForwardTabItem;
