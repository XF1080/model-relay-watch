import React, { ReactNode } from 'react';
import type { UniqueIdentifier, PointerActivationConstraint, CollisionDetection } from '@dnd-kit/core';
import type { SortingStrategy, AnimateLayoutChanges, NewIndexGetter } from '@dnd-kit/sortable';
import type { SortableTransition } from '@dnd-kit/sortable/dist/hooks/types';
interface OnSortEndProps {
    oldIndex: number;
    newIndex: number;
}
export type OnSortEnd = (props: OnSortEndProps) => void;
export interface RenderItemProps {
    id?: string | number;
    sortableHandle?: any;
    [x: string]: any;
}
export interface SortableProps {
    onSortEnd?: OnSortEnd;
    activationConstraint?: PointerActivationConstraint;
    collisionDetection?: CollisionDetection;
    items?: any[];
    renderItem?: (props: RenderItemProps) => React.ReactNode;
    strategy?: SortingStrategy;
    useDragOverlay?: boolean;
    container?: any;
    adjustScale?: boolean;
    transition?: SortableTransition | null;
    prefix?: string;
    dragOverlayCls?: string;
}
interface SortableItemProps {
    animateLayoutChanges?: AnimateLayoutChanges;
    getNewIndex?: NewIndexGetter;
    id: UniqueIdentifier;
    index: number;
    useDragOverlay?: boolean;
    renderItem?: (props: RenderItemProps) => ReactNode;
    prefix?: string;
    transition?: SortableTransition | null;
}
export declare function Sortable({ items, onSortEnd, adjustScale, renderItem, transition, collisionDetection, strategy, useDragOverlay, dragOverlayCls, container: Container, prefix, }: SortableProps): React.JSX.Element;
export declare function SortableItem({ animateLayoutChanges, id, renderItem, prefix, transition: animation, }: SortableItemProps): React.JSX.Element;
export {};
