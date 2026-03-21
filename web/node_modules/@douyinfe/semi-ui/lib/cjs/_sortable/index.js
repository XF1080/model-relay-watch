"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sortable = Sortable;
exports.SortableItem = SortableItem;
var _isNull2 = _interopRequireDefault(require("lodash/isNull"));
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _utilities = require("@dnd-kit/utilities");
var _classnames = _interopRequireDefault(require("classnames"));
var _core = require("@dnd-kit/core");
var _sortable = require("@dnd-kit/sortable");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const defaultPrefix = 'semi-sortable';
function DefaultContainer(props) {
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    style: {
      overflow: 'auto'
    }
  }, props));
}
const defaultKeyBoardOptions = {
  coordinateGetter: _sortable.sortableKeyboardCoordinates
};
function Sortable(_ref) {
  let {
    items,
    onSortEnd,
    adjustScale,
    renderItem,
    transition,
    collisionDetection = _core.closestCenter,
    strategy = _sortable.rectSortingStrategy,
    useDragOverlay = true,
    dragOverlayCls,
    container: Container = DefaultContainer,
    prefix = defaultPrefix
  } = _ref;
  const [activeId, setActiveId] = (0, _react.useState)(null);
  const sensors = (0, _core.useSensors)((0, _core.useSensor)(_core.MouseSensor), (0, _core.useSensor)(_core.TouchSensor), (0, _core.useSensor)(_core.KeyboardSensor, defaultKeyBoardOptions));
  const getIndex = (0, _react.useCallback)(id => items.indexOf(id), [items]);
  const activeIndex = (0, _react.useMemo)(() => activeId ? getIndex(activeId) : -1, [getIndex, activeId]);
  const onDragStart = (0, _react.useCallback)(_ref2 => {
    let {
      active
    } = _ref2;
    if (!active) {
      return;
    }
    setActiveId(active.id);
  }, []);
  const onDragEnd = (0, _react.useCallback)(_ref3 => {
    let {
      over
    } = _ref3;
    setActiveId(null);
    if (over) {
      const overIndex = getIndex(over.id);
      if (activeIndex !== overIndex) {
        onSortEnd({
          oldIndex: activeIndex,
          newIndex: overIndex
        });
      }
    }
  }, [activeIndex, getIndex, onSortEnd]);
  const onDragCancel = (0, _react.useCallback)(() => {
    setActiveId(null);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_core.DndContext, {
    sensors: sensors,
    collisionDetection: collisionDetection,
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
    onDragCancel: onDragCancel,
    autoScroll: {
      order: _core.TraversalOrder.ReversedTreeOrder
    }
  }, /*#__PURE__*/_react.default.createElement(_sortable.SortableContext, {
    items: items,
    strategy: strategy
  }, /*#__PURE__*/_react.default.createElement(Container, null, items.map((value, index) => (/*#__PURE__*/_react.default.createElement(SortableItem, {
    key: value,
    id: value,
    index: index,
    renderItem: renderItem,
    useDragOverlay: useDragOverlay,
    prefix: prefix,
    transition: transition
  }))))), useDragOverlay ? /*#__PURE__*/(0, _reactDom.createPortal)(/*#__PURE__*/_react.default.createElement(_core.DragOverlay, {
    adjustScale: adjustScale,
    // Set zIndex in style to undefined to override the default zIndex in DragOverlay, 
    // So that the zIndex of DragOverlay can be set by className
    style: {
      zIndex: undefined
    },
    className: dragOverlayCls
  }, activeId ? renderItem({
    id: activeId,
    sortableHandle: WrapperComponent => WrapperComponent
  }) : null), document.body) : null);
}
function SortableItem(_ref4) {
  let {
    animateLayoutChanges,
    id,
    renderItem,
    prefix,
    transition: animation
  } = _ref4;
  const {
    listeners,
    setNodeRef,
    transform,
    transition,
    active,
    isOver,
    attributes
  } = (0, _sortable.useSortable)({
    id,
    animateLayoutChanges,
    transition: animation
  });
  const sortableHandle = (0, _react.useCallback)(WrapperComponent => {
    // console.log('listeners', listeners);
    // 保证给出的接口的一致性，使用 span 包一层，保证用户能够通过同样的方式使用 handler
    // To ensure the consistency of the given interface
    // use a span package layer to ensure that users can use the handler in the same way
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    return () => /*#__PURE__*/_react.default.createElement("span", Object.assign({}, listeners, {
      style: {
        lineHeight: 0
      },
      onMouseDown: e => {
        listeners.onMouseDown(e);
        // 阻止onMousedown的事件传递，
        // 防止元素在点击后被卸载导致tooltip/popover的弹出层意外关闭
        // Prevent the onMousedown event from being delivered, 
        // preventing the element from being unloaded after being clicked, 
        // causing the tooltip/popover pop-up layer to close unexpectedly
        e.preventDefault();
        e.stopPropagation();
      }
    }), /*#__PURE__*/_react.default.createElement(WrapperComponent, null));
  }, [listeners]);
  const itemCls = (0, _classnames.default)(`${prefix}-sortable-item`, {
    [`${prefix}-sortable-item-over`]: isOver,
    [`${prefix}-sortable-item-active`]: (active === null || active === void 0 ? void 0 : active.id) === id
  });
  const wrapperStyle = (0, _react.useMemo)(() => {
    return !(0, _isNull2.default)(animation) ? {
      transform: _utilities.CSS.Transform.toString(Object.assign(Object.assign({}, transform), {
        scaleX: 1,
        scaleY: 1
      })),
      transition: transition
    } : undefined;
  }, [animation, transform, transition]);
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    ref: setNodeRef,
    style: wrapperStyle,
    className: itemCls
  }, attributes), renderItem({
    id,
    sortableHandle
  }));
}