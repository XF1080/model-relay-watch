import _debounce from "lodash/debounce";
import { getItemDirection, getPixelSize } from "../utils";
import BaseFoundation from '../../base/foundation';
import { adjustNewSize, judgeConstraint, getOffset } from "../utils";
export class ResizeHandlerFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    this._adapter.registerEvents();
  }
  destroy() {
    this._adapter.unregisterEvents();
  }
}
export class ResizeItemFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {}
  destroy() {}
}
export class ResizeGroupFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.registerEvents = () => {
      this._adapter.registerEvents(this.type);
    };
    this.unregisterEvents = () => {
      this._adapter.unregisterEvents(this.type);
    };
    this.onResizeStart = (handlerIndex, e, type) => {
      this.type = type;
      let {
        clientX,
        clientY
      } = e;
      let lastItem = this._adapter.getItem(handlerIndex),
        nextItem = this._adapter.getItem(handlerIndex + 1);
      let lastOffset, nextOffset;
      // offset caused by padding and border
      const lastStyle = this.window.getComputedStyle(lastItem);
      const nextStyle = this.window.getComputedStyle(nextItem);
      lastOffset = getOffset(lastStyle, this.direction) + this.itemMinusMap.get(handlerIndex);
      nextOffset = getOffset(nextStyle, this.direction) + this.itemMinusMap.get(handlerIndex + 1);
      let lastItemSize = (this.direction === 'horizontal' ? lastItem.offsetWidth : lastItem.offsetHeight) + this.itemMinusMap.get(handlerIndex),
        nextItemSize = (this.direction === 'horizontal' ? nextItem.offsetWidth : nextItem.offsetHeight) + this.itemMinusMap.get(handlerIndex + 1);
      const states = this.getStates();
      this.setState({
        isResizing: true,
        originalPosition: {
          x: clientX,
          y: clientY,
          lastItemSize,
          nextItemSize,
          lastOffset,
          nextOffset
        },
        backgroundStyle: Object.assign(Object.assign({}, states.backgroundStyle), {
          cursor: this.window.getComputedStyle(e.target).cursor || 'auto'
        }),
        curHandler: handlerIndex
      });
      this.registerEvents();
      let lastStart = this._adapter.getItemStart(handlerIndex),
        nextStart = this._adapter.getItemStart(handlerIndex + 1);
      let [lastDir, nextDir] = getItemDirection(this.direction);
      if (lastStart) {
        lastStart(e, lastDir);
      }
      if (nextStart) {
        nextStart(e, nextDir);
      }
    };
    this.onMouseMove = e => {
      this.onResizing(e);
    };
    this.onTouchMove = e => {
      // prevent page move in mobile
      e.preventDefault();
      this.onResizing(e);
    };
    this.onResizing = e => {
      const state = this.getStates();
      if (!state.isResizing) {
        return;
      }
      const {
        curHandler,
        originalPosition
      } = state;
      let {
        x: initX,
        y: initY,
        lastItemSize,
        nextItemSize,
        lastOffset,
        nextOffset
      } = originalPosition;
      let {
        clientX,
        clientY
      } = this.type === 'mouse' ? e : e.targetTouches[0];
      const props = this.getProps();
      const {
        direction
      } = props;
      let lastItem = this._adapter.getItem(curHandler),
        nextItem = this._adapter.getItem(curHandler + 1);
      let parentSize = this.groupSize;
      let delta = direction === 'horizontal' ? clientX - initX : clientY - initY;
      let lastNewSize = lastItemSize + delta;
      let nextNewSize = nextItemSize - delta;
      // 判断是否超出限制
      let lastFlag = judgeConstraint(lastNewSize, this._adapter.getItemMin(curHandler), this._adapter.getItemMax(curHandler), parentSize, lastOffset),
        nextFlag = judgeConstraint(nextNewSize, this._adapter.getItemMin(curHandler + 1), this._adapter.getItemMax(curHandler + 1), parentSize, nextOffset);
      if (lastFlag) {
        lastNewSize = adjustNewSize(lastNewSize, this._adapter.getItemMin(curHandler), this._adapter.getItemMax(curHandler), parentSize, lastOffset);
        nextNewSize = lastItemSize + nextItemSize - lastNewSize;
      }
      if (nextFlag) {
        nextNewSize = adjustNewSize(nextNewSize, this._adapter.getItemMin(curHandler + 1), this._adapter.getItemMax(curHandler + 1), parentSize, nextOffset);
        lastNewSize = lastItemSize + nextItemSize - nextNewSize;
      }
      let lastItemPercent = this.itemPercentMap.get(curHandler),
        nextItemPercent = this.itemPercentMap.get(curHandler + 1);
      let lastNewPercent = lastNewSize / parentSize * 100;
      let nextNewPercent = lastItemPercent + nextItemPercent - lastNewPercent; // 消除浮点误差
      this.itemPercentMap.set(curHandler, lastNewPercent);
      this.itemPercentMap.set(curHandler + 1, nextNewPercent);
      if (direction === 'horizontal') {
        lastItem.style.width = `calc(${lastNewPercent}% - ${this.itemMinusMap.get(curHandler)}px)`;
        nextItem.style.width = `calc(${nextNewPercent}% - ${this.itemMinusMap.get(curHandler + 1)}px)`;
      } else if (direction === 'vertical') {
        lastItem.style.height = `calc(${lastNewPercent}% - ${this.itemMinusMap.get(curHandler)}px)`;
        nextItem.style.height = `calc(${nextNewPercent}% - ${this.itemMinusMap.get(curHandler + 1)}px)`;
      }
      let lastFunc = this._adapter.getItemChange(curHandler),
        nextFunc = this._adapter.getItemChange(curHandler + 1);
      let [lastDir, nextDir] = getItemDirection(this.direction);
      if (lastFunc) {
        lastFunc({
          width: lastItem.offsetWidth,
          height: lastItem.offsetHeight
        }, e, lastDir);
      }
      if (nextFunc) {
        nextFunc({
          width: nextItem.offsetWidth,
          height: nextItem.offsetHeight
        }, e, nextDir);
      }
    };
    this.onResizeEnd = e => {
      const {
        curHandler
      } = this.getStates();
      let lastItem = this._adapter.getItem(curHandler),
        nextItem = this._adapter.getItem(curHandler + 1);
      let lastFunc = this._adapter.getItemEnd(curHandler),
        nextFunc = this._adapter.getItemEnd(curHandler + 1);
      let [lastDir, nextDir] = getItemDirection(this.direction);
      if (lastFunc) {
        lastFunc({
          width: lastItem.offsetWidth,
          height: lastItem.offsetHeight
        }, e, lastDir);
      }
      if (nextFunc) {
        nextFunc({
          width: nextItem.offsetWidth,
          height: nextItem.offsetHeight
        }, e, nextDir);
      }
      this.setState({
        isResizing: false,
        curHandler: null
      });
      this.unregisterEvents();
    };
    this.initSpace = () => {
      const props = this.getProps();
      const {
        direction
      } = props;
      // calculate accurate space for group item
      let handlerSizes = new Array(this._adapter.getHandlerCount()).fill(0);
      let parentSize = this.groupSize;
      this.totalMinus = 0;
      for (let i = 0; i < this._adapter.getHandlerCount(); i++) {
        let handlerSize = direction === 'horizontal' ? this._adapter.getHandler(i).offsetWidth : this._adapter.getHandler(i).offsetHeight;
        handlerSizes[i] = handlerSize;
        this.totalMinus += handlerSize;
      }
      // allocate size for items which don't have default size
      let totalSizePercent = 0;
      let undefineLoc = new Map(),
        undefinedTotal = 0; // proportion
      for (let i = 0; i < this._adapter.getItemCount(); i++) {
        if (i === 0) {
          this.itemMinusMap.set(i, handlerSizes[i] / 2);
        } else if (i === this._adapter.getItemCount() - 1) {
          this.itemMinusMap.set(i, handlerSizes[i - 1] / 2);
        } else {
          this.itemMinusMap.set(i, handlerSizes[i - 1] / 2 + handlerSizes[i] / 2);
        }
        const child = this._adapter.getItem(i);
        let minSize = this._adapter.getItemMin(i),
          maxSize = this._adapter.getItemMax(i);
        let minSizePercent = minSize ? getPixelSize(minSize, parentSize) / parentSize * 100 : 0,
          maxSizePercent = maxSize ? getPixelSize(maxSize, parentSize) / parentSize * 100 : 100;
        if (minSizePercent > maxSizePercent) {
          console.warn('[Semi ResizableItem]: min size bigger than max size');
        }
        let defaultSize = this._adapter.getItemDefaultSize(i);
        if (defaultSize) {
          let itemSizePercent;
          if (typeof defaultSize === 'string') {
            if (defaultSize.endsWith('%')) {
              itemSizePercent = parseFloat(defaultSize.slice(0, -1));
              this.itemPercentMap.set(i, itemSizePercent);
            } else if (defaultSize.endsWith('px')) {
              itemSizePercent = parseFloat(defaultSize.slice(0, -2)) / parentSize * 100;
              this.itemPercentMap.set(i, itemSizePercent);
            } else if (/^-?\d+(\.\d+)?$/.test(defaultSize)) {
              // 仅由数字组成，表示按比例分配剩下空间
              undefineLoc.set(i, parseFloat(defaultSize));
              undefinedTotal += parseFloat(defaultSize);
              continue;
            }
          } else if (typeof defaultSize === 'number') {
            undefineLoc.set(i, defaultSize);
            undefinedTotal += defaultSize;
            continue;
          }
          totalSizePercent += itemSizePercent;
          if (direction === 'horizontal') {
            child.style.width = `calc(${itemSizePercent}% - ${this.itemMinusMap.get(i)}px)`;
          } else {
            child.style.height = `calc(${itemSizePercent}% - ${this.itemMinusMap.get(i)}px)`;
          }
          if (itemSizePercent < minSizePercent) {
            console.warn('[Semi ResizableGroup]: item size smaller than min size');
          }
          if (itemSizePercent > maxSizePercent) {
            console.warn('[Semi ResizableGroup]: item size bigger than max size');
          }
        } else {
          undefineLoc.set(i, 1);
          undefinedTotal += 1;
        }
      }
      let undefineSizePercent = 100 - totalSizePercent;
      if (totalSizePercent > 100) {
        console.warn('[Semi ResizableGroup]: total Size bigger than 100%');
        undefineSizePercent = 10; // 如果总和超过100%，则保留10%的空间均分给未定义的item
      }
      undefineLoc.forEach((value, key) => {
        const child = this._adapter.getItem(key);
        const percent = value / undefinedTotal * undefineSizePercent;
        this.itemPercentMap.set(key, percent);
        if (direction === 'horizontal') {
          child.style.width = `calc(${percent}% - ${this.itemMinusMap.get(key)}px)`;
        } else {
          child.style.height = `calc(${percent}% - ${this.itemMinusMap.get(key)}px)`;
        }
      });
    };
    this.ensureConstraint = _debounce(() => {
      // 浏览器拖拽时保证px值最大最小仍生效
      const {
        direction
      } = this.getProps();
      const itemCount = this._adapter.getItemCount();
      let continueFlag = true;
      for (let i = 0; i < itemCount; i++) {
        const child = this._adapter.getItem(i);
        const childSize = direction === 'horizontal' ? child.offsetWidth : child.offsetHeight;
        // 判断由非鼠标拖拽导致item的size变化过程中是否有超出限制的情况
        const childFlag = judgeConstraint(childSize, this._adapter.getItemMin(i), this._adapter.getItemMax(i), this.groupSize, this.itemMinusMap.get(i));
        if (childFlag) {
          const childNewSize = adjustNewSize(childSize, this._adapter.getItemMin(i), this._adapter.getItemMax(i), this.groupSize, this.itemMinusMap.get(i));
          for (let j = i + 1; j < itemCount; j++) {
            // 找到下一个没有超出限制的item
            const item = this._adapter.getItem(j);
            const itemSize = direction === 'horizontal' ? item.offsetWidth : item.offsetHeight;
            const itemFlag = judgeConstraint(itemSize, this._adapter.getItemMin(j), this._adapter.getItemMax(j), this.groupSize, this.itemMinusMap.get(j));
            if (!itemFlag) {
              let childPercent = this.itemPercentMap.get(i),
                itemPercent = this.itemPercentMap.get(j);
              let childNewPercent = childNewSize / this.groupSize * 100;
              let itemNewPercent = childPercent + itemPercent - childNewPercent;
              this.itemPercentMap.set(i, childNewPercent);
              this.itemPercentMap.set(j, itemNewPercent);
              if (direction === 'horizontal') {
                child.style.width = `calc(${childNewPercent}% - ${this.itemMinusMap.get(i)}px)`;
                item.style.width = `calc(${itemNewPercent}% - ${this.itemMinusMap.get(j)}px)`;
              } else {
                child.style.height = `calc(${childNewPercent}% - ${this.itemMinusMap.get(i)}px)`;
                item.style.height = `calc(${itemNewPercent}% - ${this.itemMinusMap.get(j)}px)`;
              }
              break;
            } else {
              if (j === itemCount - 1) {
                continueFlag = false;
                console.warn('[Semi ResizableGroup]: no enough space to adjust min/max size');
              }
            }
          }
        }
        if (!continueFlag) {
          break;
        }
      }
    }, 200);
  }
  get groupRef() {
    return this._adapter.getGroupRef();
  }
  get groupSize() {
    const {
      direction
    } = this.getProps();
    let groupSize = direction === 'horizontal' ? this.groupRef.offsetWidth : this.groupRef.offsetHeight;
    return groupSize;
  }
  init() {
    this.direction = this.getProp('direction');
    this.itemMinusMap = new Map();
    this.itemPercentMap = new Map();
    this.initSpace();
  }
  get window() {
    var _a;
    return (_a = this.groupRef.ownerDocument.defaultView) !== null && _a !== void 0 ? _a : null;
  }
  destroy() {}
}