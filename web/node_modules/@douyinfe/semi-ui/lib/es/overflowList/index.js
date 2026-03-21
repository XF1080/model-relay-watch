import _get from "lodash/get";
import _isFunction from "lodash/isFunction";
import _isEqual from "lodash/isEqual";
import React from 'react';
import cls from 'classnames';
import BaseComponent from '../_base/baseComponent';
import PropTypes from 'prop-types';
import { cssClasses, strings, numbers } from '@douyinfe/semi-foundation/lib/es/overflowList/constants';
import ResizeObserver from '../resizeObserver';
import IntersectionObserver from './intersectionObserver';
import OverflowListFoundation from '@douyinfe/semi-foundation/lib/es/overflowList/foundation';
import '@douyinfe/semi-foundation/lib/es/overflowList/overflowList.css';
import { getDefaultPropsFromGlobalConfig } from '../_utils';
import copy from 'fast-copy';
const prefixCls = cssClasses.PREFIX;
const Boundary = strings.BOUNDARY_MAP;
const OverflowDirection = strings.OVERFLOW_DIR;
const RenderMode = strings.MODE_MAP;
// reference to https://github.com/palantir/blueprint/blob/1aa71605/packages/core/src/components/overflow-list/overflowList.tsx#L34
class OverflowList extends BaseComponent {
  constructor(props) {
    var _this;
    super(props);
    _this = this;
    this.scroller = null;
    this.spacer = null;
    this.isScrollMode = () => {
      const {
        renderMode
      } = this.props;
      return renderMode === RenderMode.SCROLL;
    };
    this.resize = function () {
      let entries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _a;
      const containerWidth = (_a = entries[0]) === null || _a === void 0 ? void 0 : _a.target.clientWidth;
      _this.setState({
        containerWidth,
        overflowStatus: 'calculating'
      });
    };
    this.reintersect = entries => {
      this.foundation.handleIntersect(entries);
    };
    this.mergeRef = (ref, node, key) => {
      this.itemRefs[key] = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (typeof ref === 'object' && ref && 'current' in ref) {
        ref.current = node;
      }
    };
    this.renderOverflow = () => {
      const overflow = this.foundation.getOverflowItem();
      return this.props.overflowRenderer(overflow);
    };
    this.getItemKey = (item, defaultKey) => {
      const {
        itemKey
      } = this.props;
      if (_isFunction(itemKey)) {
        return itemKey(item);
      }
      return _get(item, itemKey || 'key', defaultKey);
    };
    this.renderItemList = () => {
      const {
        className,
        wrapperClassName,
        wrapperStyle,
        style,
        visibleItemRenderer,
        renderMode,
        collapseFrom
      } = this.props;
      const {
        visible,
        overflowStatus
      } = this.state;
      let overflow = this.renderOverflow();
      if (!this.isScrollMode()) {
        if (Array.isArray(overflow)) {
          overflow = /*#__PURE__*/React.createElement(React.Fragment, null, overflow);
        }
        if (/*#__PURE__*/React.isValidElement(overflow)) {
          const child = /*#__PURE__*/React.cloneElement(overflow);
          overflow = /*#__PURE__*/React.createElement(ResizeObserver, {
            onResize: _ref => {
              let [entry] = _ref;
              this.setState({
                overflowWidth: entry.target.clientWidth,
                overflowStatus: 'calculating'
              });
            }
          }, /*#__PURE__*/React.createElement("div", {
            className: `${prefixCls}-overflow`
          }, child));
        }
      }
      const inner = renderMode === RenderMode.SCROLL ? (() => {
        const list = [/*#__PURE__*/React.createElement("div", {
          className: cls(wrapperClassName, `${prefixCls}-scroll-wrapper`),
          ref: ref => {
            this.scroller = ref;
          },
          style: Object.assign({}, wrapperStyle),
          key: `${prefixCls}-scroll-wrapper`
        }, visible.map(visibleItemRenderer).map(item => {
          const {
            forwardRef,
            key
          } = item;
          return /*#__PURE__*/React.cloneElement(item, {
            ref: node => this.mergeRef(forwardRef, node, key),
            'data-scrollkey': `${key}`,
            key
          });
        }))];
        if (this.props.overflowRenderDirection === "both") {
          list.unshift(overflow[0]);
          list.push(overflow[1]);
        } else if (this.props.overflowRenderDirection === "start") {
          list.unshift(overflow[1]);
          list.unshift(overflow[0]);
        } else {
          list.push(overflow[0]);
          list.push(overflow[1]);
        }
        return list;
      })() : [collapseFrom === Boundary.START ? overflow : null, visible.map((item, idx) => {
        const {
          key
        } = item;
        const element = visibleItemRenderer(item, idx);
        const child = /*#__PURE__*/React.cloneElement(element);
        return /*#__PURE__*/React.createElement(ResizeObserver, {
          key: key !== null && key !== void 0 ? key : idx,
          onResize: _ref2 => {
            let [entry] = _ref2;
            return this.onItemResize(entry, item, idx);
          }
        }, /*#__PURE__*/React.createElement("div", {
          key: key !== null && key !== void 0 ? key : idx,
          className: `${prefixCls}-item`
        }, child));
      }), collapseFrom === Boundary.END ? overflow : null];
      const list = /*#__PURE__*/React.createElement('div', {
        className: cls(`${prefixCls}`, className),
        style: Object.assign(Object.assign({}, style), renderMode === RenderMode.COLLAPSE ? {
          maxWidth: '100%',
          visibility: overflowStatus === "calculating" ? "hidden" : "visible"
        } : null)
      }, ...inner);
      return list;
    };
    this.onItemResize = (entry, item, idx) => {
      const key = this.getItemKey(item, idx);
      const width = this.itemSizeMap.get(key);
      if (!width) {
        this.itemSizeMap.set(key, entry.target.clientWidth);
      } else if (width !== entry.target.clientWidth) {
        // 某个item发生resize后，重新计算
        this.itemSizeMap.set(key, entry.target.clientWidth);
        this.setState({
          overflowStatus: 'calculating'
        });
      }
      const {
        maxCount
      } = this.state;
      // 已经按照最大值maxCount渲染完毕，触发真正的渲染
      // Already rendered maxCount items, trigger the real rendering
      if (this.itemSizeMap.size === maxCount) {
        this.setState({
          overflowStatus: 'calculating'
        });
      }
    };
    this.state = {
      direction: OverflowDirection.GROW,
      lastOverflowCount: 0,
      overflow: [],
      visible: [],
      containerWidth: 0,
      visibleState: new Map(),
      itemSizeMap: new Map(),
      overflowStatus: "calculating",
      pivot: -1,
      overflowWidth: 0,
      maxCount: 0
    };
    this.foundation = new OverflowListFoundation(this.adapter);
    this.previousWidths = new Map();
    this.itemRefs = {};
    this.itemSizeMap = new Map();
  }
  static getDerivedStateFromProps(props, prevState) {
    const {
      prevProps
    } = prevState;
    const newState = {};
    newState.prevProps = props;
    const needUpdate = name => {
      return !prevProps && name in props || prevProps && !_isEqual(prevProps[name], props[name]);
    };
    if (needUpdate('items') || needUpdate('style')) {
      // reset visible state if the above props change.
      newState.direction = OverflowDirection.GROW;
      newState.lastOverflowCount = 0;
      newState.maxCount = 0;
      if (props.renderMode === RenderMode.SCROLL) {
        newState.visible = props.items;
        newState.overflow = [];
      } else {
        let maxCount = props.items.length;
        if (Math.floor(prevState.containerWidth / numbers.MINIMUM_HTML_ELEMENT_WIDTH) !== 0) {
          maxCount = Math.min(maxCount, Math.floor(prevState.containerWidth / numbers.MINIMUM_HTML_ELEMENT_WIDTH));
        }
        const isCollapseFromStart = props.collapseFrom === Boundary.START;
        const visible = isCollapseFromStart ? copy(props.items).reverse().slice(0, maxCount) : props.items.slice(0, maxCount);
        const overflow = isCollapseFromStart ? copy(props.items).reverse().slice(maxCount) : props.items.slice(maxCount);
        newState.visible = visible;
        newState.overflow = overflow;
        newState.maxCount = maxCount;
      }
      newState.pivot = -1;
      newState.overflowStatus = "calculating";
    }
    return newState;
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      updateVisibleState: visibleState => {
        this.setState({
          visibleState
        }, () => {
          var _a, _b;
          (_b = (_a = this.props).onVisibleStateChange) === null || _b === void 0 ? void 0 : _b.call(_a, visibleState);
        });
      },
      updateStates: states => {
        this.setState(Object.assign({}, states));
      },
      notifyIntersect: res => {
        this.props.onIntersect && this.props.onIntersect(res);
      },
      getItemSizeMap: () => this.itemSizeMap
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const prevItemsKeys = prevProps.items.map(item => item.key);
    const nowItemsKeys = this.props.items.map(item => item.key);
    // Determine whether to update by comparing key values
    if (!_isEqual(prevItemsKeys, nowItemsKeys)) {
      this.itemRefs = {};
      this.setState({
        visibleState: new Map()
      });
    }
    const {
      overflow,
      containerWidth,
      visible,
      overflowStatus
    } = this.state;
    if (this.isScrollMode() || overflowStatus !== "calculating") {
      return;
    }
    this.foundation.handleCollapseOverflow();
  }
  render() {
    const list = this.renderItemList();
    const {
      renderMode
    } = this.props;
    if (renderMode === RenderMode.SCROLL) {
      return /*#__PURE__*/React.createElement(IntersectionObserver, {
        onIntersect: this.reintersect,
        root: this.scroller,
        threshold: this.props.threshold,
        items: this.itemRefs
      }, list);
    }
    return /*#__PURE__*/React.createElement(ResizeObserver, {
      onResize: this.resize
    }, list);
  }
}
OverflowList.__SemiComponentName__ = "OverflowList";
OverflowList.defaultProps = getDefaultPropsFromGlobalConfig(OverflowList.__SemiComponentName__, {
  collapseFrom: 'end',
  minVisibleItems: 0,
  overflowRenderer: () => null,
  renderMode: 'collapse',
  threshold: 0.75,
  visibleItemRenderer: () => null,
  onOverflow: () => null,
  overflowRenderDirection: "both"
});
OverflowList.propTypes = {
  // if render in scroll mode, key is required in items
  className: PropTypes.string,
  collapseFrom: PropTypes.oneOf(strings.BOUNDARY_SET),
  direction: PropTypes.oneOf(strings.POSITION_SET),
  items: PropTypes.array,
  minVisibleItems: PropTypes.number,
  onIntersect: PropTypes.func,
  onOverflow: PropTypes.func,
  overflowRenderer: PropTypes.func,
  renderMode: PropTypes.oneOf(strings.MODE_SET),
  style: PropTypes.object,
  threshold: PropTypes.number,
  visibleItemRenderer: PropTypes.func,
  wrapperClassName: PropTypes.string,
  wrapperStyle: PropTypes.object,
  collapseMask: PropTypes.object,
  overflowRenderDirection: PropTypes.string
};
export default OverflowList;