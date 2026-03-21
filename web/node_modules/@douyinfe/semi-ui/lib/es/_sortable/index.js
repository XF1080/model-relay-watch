import _isNull from "lodash/isNull";
import React, { useState, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { CSS as cssDndKit } from '@dnd-kit/utilities';
import cls from 'classnames';
import { closestCenter, DragOverlay, DndContext, MouseSensor, TouchSensor, useSensor, useSensors, KeyboardSensor, TraversalOrder } from '@dnd-kit/core';
import { useSortable, SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
const defaultPrefix = 'semi-sortable';
function DefaultContainer(props) {
  return /*#__PURE__*/React.createElement("div", Object.assign({
    style: {
      overflow: 'auto'
    }
  }, props));
}
const defaultKeyBoardOptions = {
  coordinateGetter: sortableKeyboardCoordinates
};
export function Sortable(_ref) {
  let {
    items,
    onSortEnd,
    adjustScale,
    renderItem,
    transition,
    collisionDetection = closestCenter,
    strategy = rectSortingStrategy,
    useDragOverlay = true,
    dragOverlayCls,
    container: Container = DefaultContainer,
    prefix = defaultPrefix
  } = _ref;
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor, defaultKeyBoardOptions));
  const getIndex = useCallback(id => items.indexOf(id), [items]);
  const activeIndex = useMemo(() => activeId ? getIndex(activeId) : -1, [getIndex, activeId]);
  const onDragStart = useCallback(_ref2 => {
    let {
      active
    } = _ref2;
    if (!active) {
      return;
    }
    setActiveId(active.id);
  }, []);
  const onDragEnd = useCallback(_ref3 => {
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
  const onDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);
  return /*#__PURE__*/React.createElement(DndContext, {
    sensors: sensors,
    collisionDetection: collisionDetection,
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
    onDragCancel: onDragCancel,
    autoScroll: {
      order: TraversalOrder.ReversedTreeOrder
    }
  }, /*#__PURE__*/React.createElement(SortableContext, {
    items: items,
    strategy: strategy
  }, /*#__PURE__*/React.createElement(Container, null, items.map((value, index) => (/*#__PURE__*/React.createElement(SortableItem, {
    key: value,
    id: value,
    index: index,
    renderItem: renderItem,
    useDragOverlay: useDragOverlay,
    prefix: prefix,
    transition: transition
  }))))), useDragOverlay ? /*#__PURE__*/createPortal(/*#__PURE__*/React.createElement(DragOverlay, {
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
export function SortableItem(_ref4) {
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
  } = useSortable({
    id,
    animateLayoutChanges,
    transition: animation
  });
  const sortableHandle = useCallback(WrapperComponent => {
    // console.log('listeners', listeners);
    // 保证给出的接口的一致性，使用 span 包一层，保证用户能够通过同样的方式使用 handler
    // To ensure the consistency of the given interface
    // use a span package layer to ensure that users can use the handler in the same way
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    return () => /*#__PURE__*/React.createElement("span", Object.assign({}, listeners, {
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
    }), /*#__PURE__*/React.createElement(WrapperComponent, null));
  }, [listeners]);
  const itemCls = cls(`${prefix}-sortable-item`, {
    [`${prefix}-sortable-item-over`]: isOver,
    [`${prefix}-sortable-item-active`]: (active === null || active === void 0 ? void 0 : active.id) === id
  });
  const wrapperStyle = useMemo(() => {
    return !_isNull(animation) ? {
      transform: cssDndKit.Transform.toString(Object.assign(Object.assign({}, transform), {
        scaleX: 1,
        scaleY: 1
      })),
      transition: transition
    } : undefined;
  }, [animation, transform, transition]);
  return /*#__PURE__*/React.createElement("div", Object.assign({
    ref: setNodeRef,
    style: wrapperStyle,
    className: itemCls
  }, attributes), renderItem({
    id,
    sortableHandle
  }));
}