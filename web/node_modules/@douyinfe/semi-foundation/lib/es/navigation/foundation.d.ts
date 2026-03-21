import BaseFoundation, { DefaultAdapter } from '../base/foundation';
import { ItemProps, ItemKey } from './itemFoundation';
export interface ItemKey2ParentKeysMap {
    [key: string]: (string | number)[];
}
export interface OnClickData {
    itemKey: ItemKey;
    domEvent: any;
    isOpen: boolean;
}
export interface OnSelectData extends OnClickData {
    selectedKeys: ItemKey[];
    selectedItems: ItemProps[];
}
export interface OnOpenChangeData extends OnClickData {
    openKeys: ItemKey[];
}
export interface NavItemType {
    props?: ItemProps;
    items?: NavItemType[];
    [key: string]: any;
}
export interface NavigationAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    notifySelect(data: OnSelectData): void;
    notifyOpenChange(data: OnOpenChangeData): void;
    setIsCollapsed(isCollapsed: boolean): void;
    notifyCollapseChange(isCollapsed: boolean): void;
    updateItems(items: ItemProps[]): void;
    setItemKeysMap(map: {
        [key: string]: (string | number)[];
    }): void;
    addSelectedKeys(...keys: (string | number)[]): void;
    removeSelectedKeys(...keys: (string | number)[]): void;
    updateSelectedKeys(keys: (string | number)[], includeParentKeys?: boolean): void;
    updateOpenKeys(keys: (string | number)[]): void;
    addOpenKeys(...keys: (string | number)[]): void;
    removeOpenKeys(...keys: (string | number)[]): void;
    setItemsChanged(isChanged: boolean): void;
}
export default class NavigationFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<NavigationAdapter<P, S>, P, S> {
    constructor(adapter: NavigationAdapter<P, S>);
    static getZeroParentKeys(itemKeysMap?: {}, ...itemKeys: ItemKey[]): any[];
    static buildItemKeysMap(items?: NavItemType[], keysMap?: {}, parentKeys?: (string | number)[], keyPropName?: string): {};
    /**
     * init is called in constructor and componentDidMount.
     * if you want to update state in constructor, please add it to return object;
     * if you want to update state in componentDidMount, please call adapter in else logic.
     * @param {*} lifecycle
     * @returns
     */
    init(lifecycle?: string): {
        selectedKeys: any;
        itemKeysMap: {};
        openKeys: any[];
        items: any[];
    };
    /**
     * Get the state to be calculated
     */
    getCalcState(): {
        itemKeysMap: {};
        willOpenKeys: any[];
        formattedItems: any[];
    };
    /**
     * Calculate formatted items and itemsKeyMap
     */
    getFormattedItems(): {
        itemKeysMap: {};
        formattedItems: any[];
    };
    /**
     * Calculate the keys that will need to be opened soon
     * @param {*} itemKeysMap
     */
    getWillOpenKeys(itemKeysMap: ItemKey2ParentKeysMap): any[];
    getShouldOpenKeys(itemKeysMap?: ItemKey2ParentKeysMap, selectedKeys?: ItemKey[]): unknown[];
    destroy(): void;
    selectLevelZeroParentKeys(itemKeysMap: ItemKey2ParentKeysMap, itemKeys: ItemKey[]): any[];
    formatItems(items?: ItemProps[]): any[];
    handleSelect(data: OnSelectData): void;
    judgeIfOpen(openKeys: ItemKey[], items: NavItemType[]): boolean;
    handleCollapseChange(): void;
    handleItemsChange(isChanged: boolean): void;
}
