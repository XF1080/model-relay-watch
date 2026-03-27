import _get from "lodash/get";
import BaseFoundation from '../base/foundation';
import NavItem from './NavItem';
import { strings } from './constants';
import isNullOrUndefined from '../utils/isNullOrUndefined';
export default class NavigationFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  /* istanbul ignore next */
  static getZeroParentKeys() {
    let itemKeysMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const willAddKeys = [];
    for (var _len = arguments.length, itemKeys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      itemKeys[_key - 1] = arguments[_key];
    }
    if (itemKeys.length) {
      for (const itemKey of itemKeys) {
        if (Array.isArray(itemKeysMap[itemKey]) && itemKeysMap[itemKey].length) {
          const levelZeroParentKey = itemKeysMap[itemKey][0];
          if (!isNullOrUndefined(levelZeroParentKey)) {
            willAddKeys.push(levelZeroParentKey);
          }
        }
      }
    }
    return willAddKeys;
  }
  static buildItemKeysMap() {
    let items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let keysMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let parentKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    let keyPropName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'itemKey';
    var _a;
    if (Array.isArray(items) && items.length) {
      for (const item of items) {
        if (Array.isArray(item)) {
          NavigationFoundation.buildItemKeysMap(item, keysMap, [...parentKeys], keyPropName);
        } else {
          let itemKey;
          if (item && typeof item === 'object') {
            itemKey = item[keyPropName] || item.props && item.props[keyPropName];
          }
          if (itemKey) {
            keysMap[itemKey] = [...parentKeys];
            // Children is not a recommended usage and may cause some bug-like performance, but some users have already used it, so here we only delete the ts definition instead of deleting the actual code
            // children 并不是我们推荐的用法，可能会导致一些像 bug的表现，但是有些用户已经用了，所以此处仅作删除 ts 定义而非删除实际代码的操作
            // refer https://github.com/DouyinFE/semi-design/issues/2710
            // @ts-ignore  
            const itemChildren = (_a = item.props) === null || _a === void 0 ? void 0 : _a.children;
            if (Array.isArray(item.items) && item.items.length) {
              NavigationFoundation.buildItemKeysMap(item.items, keysMap, [...parentKeys, itemKey], keyPropName);
            } else if (itemChildren) {
              const children = Array.isArray(itemChildren) ? itemChildren : [itemChildren];
              NavigationFoundation.buildItemKeysMap(children, keysMap, [...parentKeys, itemKey], keyPropName);
            }
          }
        }
      }
    }
    return keysMap;
  }
  /**
   * init is called in constructor and componentDidMount.
   * if you want to update state in constructor, please add it to return object;
   * if you want to update state in componentDidMount, please call adapter in else logic.
   * @param {*} lifecycle
   * @returns
   */
  init(lifecycle) {
    const {
      defaultSelectedKeys,
      selectedKeys
    } = this.getProps();
    let willSelectedKeys = selectedKeys || defaultSelectedKeys || [];
    const {
      itemKeysMap,
      willOpenKeys,
      formattedItems
    } = this.getCalcState();
    const parentSelectKeys = this.selectLevelZeroParentKeys(itemKeysMap, willSelectedKeys);
    willSelectedKeys = willSelectedKeys.concat(parentSelectKeys);
    if (lifecycle === 'constructor') {
      return {
        selectedKeys: willSelectedKeys,
        itemKeysMap,
        openKeys: willOpenKeys,
        items: formattedItems
      };
    } else {
      // already include parentSelectKeys, set second parameter to false
      this._adapter.updateSelectedKeys(willSelectedKeys, false);
      this._adapter.setItemKeysMap(itemKeysMap);
      this._adapter.updateOpenKeys(willOpenKeys);
      this._adapter.updateItems(formattedItems);
      this._adapter.setItemsChanged(true);
    }
    return undefined;
  }
  /**
   * Get the state to be calculated
   */
  getCalcState() {
    const {
      itemKeysMap,
      formattedItems
    } = this.getFormattedItems();
    const willOpenKeys = this.getWillOpenKeys(itemKeysMap);
    return {
      itemKeysMap,
      willOpenKeys,
      formattedItems
    };
  }
  /**
   * Calculate formatted items and itemsKeyMap
   */
  getFormattedItems() {
    const {
      items,
      children
    } = this.getProps();
    const formattedItems = this.formatItems(items);
    const willHandleItems = Array.isArray(items) && items.length ? formattedItems : children;
    const itemKeysMap = NavigationFoundation.buildItemKeysMap(willHandleItems);
    return {
      itemKeysMap,
      formattedItems
    };
  }
  /**
   * Calculate the keys that will need to be opened soon
   * @param {*} itemKeysMap
   */
  getWillOpenKeys(itemKeysMap) {
    const {
      defaultOpenKeys,
      openKeys,
      defaultSelectedKeys,
      selectedKeys,
      mode
    } = this.getProps();
    const {
      openKeys: stateOpenKeys = []
    } = this.getStates();
    let willOpenKeys = openKeys || defaultOpenKeys || [];
    if (!(Array.isArray(defaultOpenKeys) || Array.isArray(openKeys)) && mode === strings.MODE_VERTICAL && (Array.isArray(defaultSelectedKeys) || Array.isArray(selectedKeys))) {
      const currentSelectedKeys = Array.isArray(selectedKeys) ? selectedKeys : defaultSelectedKeys;
      willOpenKeys = stateOpenKeys.concat(this.getShouldOpenKeys(itemKeysMap, currentSelectedKeys));
      willOpenKeys = Array.from(new Set(willOpenKeys));
    }
    return [...willOpenKeys];
  }
  getShouldOpenKeys() {
    let itemKeysMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let selectedKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    const willOpenKeySet = new Set();
    if (Array.isArray(selectedKeys) && selectedKeys.length) {
      selectedKeys.forEach(item => {
        if (item) {
          const parentKeys = _get(itemKeysMap, item);
          if (Array.isArray(parentKeys)) {
            parentKeys.forEach(k => willOpenKeySet.add(k));
          }
        }
      });
    }
    return [...willOpenKeySet];
  }
  destroy() {}
  selectLevelZeroParentKeys(itemKeysMap, itemKeys) {
    const _itemKeysMap = isNullOrUndefined(itemKeysMap) ? this.getState('itemKeysMap') : itemKeysMap;
    // console.log(itemKeysMap);
    const willAddKeys = [];
    if (itemKeys.length) {
      for (const itemKey of itemKeys) {
        if (Array.isArray(_itemKeysMap[itemKey]) && _itemKeysMap[itemKey].length) {
          const levelZeroParentKey = _itemKeysMap[itemKey][0];
          if (!isNullOrUndefined(levelZeroParentKey)) {
            willAddKeys.push(levelZeroParentKey);
          }
        }
      }
    }
    if (willAddKeys.length) {
      return willAddKeys;
    }
    return [];
  }
  formatItems() {
    let items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const formattedItems = [];
    for (const item of items) {
      formattedItems.push(new NavItem(item));
    }
    return formattedItems;
  }
  handleSelect(data) {
    this._adapter.notifySelect(data);
  }
  /* istanbul ignore next */
  judgeIfOpen(openKeys, items) {
    let shouldBeOpen = false;
    const _openKeys = Array.isArray(openKeys) ? openKeys : openKeys && [openKeys];
    if (_openKeys && Array.isArray(items) && items.length) {
      for (const item of items) {
        shouldBeOpen = _openKeys.includes(item.itemKey) || this.judgeIfOpen(_openKeys, item.items);
        if (shouldBeOpen) {
          break;
        }
      }
    }
    return shouldBeOpen;
  }
  handleCollapseChange() {
    const isCollapsed = !this.getState('isCollapsed');
    if (!this._isControlledComponent('isCollapsed')) {
      this._adapter.setIsCollapsed(isCollapsed);
    }
    this._adapter.notifyCollapseChange(isCollapsed);
  }
  handleItemsChange(isChanged) {
    this._adapter.setItemsChanged(isChanged);
  }
}