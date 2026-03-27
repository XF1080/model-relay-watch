import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export declare function clampValueInRange(value: number, min: number, max: number): number;
export interface DragMoveAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getDragElement: () => HTMLElement;
    getConstrainer: () => HTMLElement | null;
    getHandler: () => HTMLElement;
    notifyMouseDown?: (e: MouseEvent) => void;
    notifyMouseMove?: (e: MouseEvent) => void;
    notifyMouseUp?: (e: MouseEvent) => void;
    notifyTouchStart?: (e: TouchEvent) => void;
    notifyTouchMove?: (e: TouchEvent) => void;
    notifyTouchEnd?: (e: TouchEvent) => void;
    notifyTouchCancel?: (e: TouchEvent) => void;
}
export default class DragMoveFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<DragMoveAdapter<P, S>, P, S> {
    element: HTMLElement;
    xMax: number;
    xMin: number;
    yMax: number;
    yMin: number;
    startOffsetX: number;
    startOffsetY: number;
    get constrainer(): HTMLElement;
    get handler(): HTMLElement;
    constructor(adapter: DragMoveAdapter<P, S>);
    init(): void;
    _registerStartEvent: () => void;
    _unRegisterStartEvent: () => void;
    destroy(): void;
    _registerDocMouseEvent: () => void;
    _unRegisterDocMouseEvent: () => void;
    _registerDocTouchEvent: () => void;
    _unRegisterDocTouchEvent: () => void;
    _unRegisterEvent(): void;
    _calcMoveRange(): void;
    _allowMove(e: MouseEvent | TouchEvent): any;
    _calcOffset: (e: Touch | MouseEvent) => void;
    _preventDefault: (e: MouseEvent | TouchEvent) => void;
    onMouseDown: (e: MouseEvent) => void;
    onTouchStart: (e: TouchEvent) => void;
    _changePos: (e: Touch | MouseEvent) => void;
    _onMouseMove: (e: MouseEvent) => void;
    _onTouchMove: (e: TouchEvent) => void;
    _onMouseUp: (e: MouseEvent) => void;
    _onTouchEnd: (e: TouchEvent) => void;
    _onTouchCancel: (e: TouchEvent) => void;
}
