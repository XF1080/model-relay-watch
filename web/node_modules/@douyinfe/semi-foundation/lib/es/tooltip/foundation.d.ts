import { DOMRectLikeType } from '../utils/dom';
import BaseFoundation, { DefaultAdapter } from '../base/foundation';
import { ArrayElement } from '../utils/type';
import { strings } from './constants';
export interface TooltipAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    registerPortalEvent(portalEventSet: any): void;
    registerResizeHandler(onResize: () => void): void;
    unregisterResizeHandler(onResize?: () => void): void;
    on(arg0: string, arg1: () => void): void;
    notifyVisibleChange(isVisible: any): void;
    getPopupContainerRect(): PopupContainerDOMRect;
    containerIsBody(): boolean;
    off(arg0: string, arg1?: () => void): void;
    canMotion(): boolean;
    registerScrollHandler(arg: () => Record<string, any>): void;
    unregisterScrollHandler(): void;
    insertPortal(...args: any[]): void;
    removePortal(...args: any[]): void;
    setDisplayNone: (displayNone: boolean, cb?: () => void) => void;
    getEventName(): {
        mouseEnter: string;
        mouseLeave: string;
        mouseOut: string;
        mouseOver: string;
        click: string;
        focus: string;
        blur: string;
        keydown: string;
        contextMenu: string;
    };
    registerTriggerEvent(...args: any[]): void;
    getTriggerBounding(...args: any[]): DOMRect;
    getWrapperBounding(...args: any[]): DOMRect;
    setPosition(...args: any[]): void;
    togglePortalVisible(...args: any[]): void;
    registerClickOutsideHandler(...args: any[]): void;
    unregisterClickOutsideHandler(...args: any[]): void;
    containerIsRelative(): boolean;
    containerIsRelativeOrAbsolute(): boolean;
    getDocumentElementBounding(): DOMRect;
    updateContainerPosition(): void;
    updatePlacementAttr(placement: Position): void;
    getContainerPosition(): string;
    getFocusableElements(node: any): any[];
    getActiveElement(): any;
    getContainer(): any;
    setInitialFocus(): void;
    notifyEscKeydown(event: any): void;
    getTriggerNode(): any;
    setId(): void;
    getTriggerDOM(): HTMLElement | null;
    getAnimatingState(): boolean;
}
export type Position = ArrayElement<typeof strings.POSITION_SET>;
export interface PopupContainerDOMRect extends DOMRectLikeType {
    scrollLeft?: number;
    scrollTop?: number;
}
export default class Tooltip<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<TooltipAdapter<P, S>, P, S> {
    _timer: ReturnType<typeof setTimeout>;
    _mounted: boolean;
    constructor(adapter: TooltipAdapter<P, S>);
    init(): void;
    destroy(): void;
    _bindEvent(): void;
    unBindEvent(): void;
    _bindTriggerEvent(triggerEventSet: Record<string, any>): void;
    _bindPortalEvent(portalEventSet: Record<string, any>): void;
    _bindResizeEvent(): void;
    unBindResizeEvent(): void;
    removePortal: () => void;
    setDisplayNone: (displayNone: boolean, cb?: () => void) => void;
    _adjustPos(position?: string, isVertical?: boolean, adjustType?: string, concatPos?: any): string;
    _reversePos(position?: string, isVertical?: boolean): string;
    _expandPos(position: string, concatPos: string): string;
    _reducePos(position?: string): string;
    clearDelayTimer(): void;
    updateStateIfCursorOnTrigger: (trigger: HTMLElement) => void;
    _generateEvent(types: ArrayElement<typeof strings.TRIGGER_SET>): {
        triggerEventSet: {
            [x: string]: (event: any) => void;
        };
        portalEventSet: {};
    };
    onResize: () => void;
    _shouldShow(): void;
    delayShow: () => void;
    show: () => void;
    _togglePortalVisible(isVisible: boolean): void;
    _roundPixel(pixel: number): number;
    calcTransformOrigin(position: Position, triggerRect: DOMRect, translateX: number, translateY: number): string;
    calcPosStyle(props: {
        triggerRect: DOMRect;
        wrapperRect: DOMRect;
        containerRect: PopupContainerDOMRect;
        position?: Position;
        spacing?: number;
        isOverFlow?: [boolean, boolean];
    }): Record<string, string | number>;
    /**
     * 耦合的东西比较多，稍微罗列一下：
     *
     * - 根据 trigger 和 wrapper 的 boundingClient 计算当前的 left、top、transform-origin
     * - 根据当前的 position 和 wrapper 的 boundingClient 决定是否需要自动调整位置
     * - 根据当前的 position、trigger 的 boundingClient 以及 motion.handleStyle 调整当前的 style
     *
     * There are many coupling things, a little list:
     *
     * - calculate the current left, top, and transfer-origin according to the boundingClient of trigger and wrapper
     * - decide whether to automatically adjust the position according to the current position and the boundingClient of wrapper
     * - adjust the current style according to the current position, the boundingClient of trigger and motion.handle Style
     */
    calcPosition: (triggerRect?: DOMRect, wrapperRect?: DOMRect, containerRect?: PopupContainerDOMRect, shouldUpdatePos?: boolean) => Record<string, string | number>;
    isLR(position?: string): boolean;
    isTB(position?: string): boolean;
    isReverse(rowSpace: number, reverseSpace: number, size: number): boolean;
    isOverFlow(rowSpace: number, reverseSpace: number, size: number): boolean;
    isHalfOverFlow(posSpace: number, negSpace: number, size: number): boolean;
    isHalfAllEnough(posSpace: number, negSpace: number, size: number): boolean;
    getReverse(viewOverFlow: boolean, containerOverFlow: boolean, shouldReverseView: boolean, shouldReverseContainer: boolean): boolean;
    adjustPosIfNeed(position: Position | string, style: Record<string, any>, triggerRect: DOMRect, wrapperRect: DOMRect, containerRect: PopupContainerDOMRect): {
        position: string;
        isHeightOverFlow: boolean;
        isWidthOverFlow: boolean;
    };
    delayHide: () => void;
    hide: () => void;
    _bindScrollEvent(): void;
    unBindScrollEvent(): void;
    _initContainerPosition(): void;
    handleContainerKeydown: (event: any) => void;
    _handleTriggerKeydown(event: any): void;
    /**
     * focus trigger
     *
     * when trigger is 'focus' or 'hover', onFocus is bind to show popup
     * if we focus trigger, popup will show again
     *
     * 如果 trigger 是 focus 或者 hover，则它绑定了 onFocus，这里我们如果重新 focus 的话，popup 会再次打开
     * 因此 returnFocusOnClose 只支持 click trigger
     */
    focusTrigger(): void;
    _handleEscKeyDown(event: any): void;
    _handleContainerTabKeyDown(focusableElements: any[], event: any): void;
    _handleContainerShiftTabKeyDown(focusableElements: any[], event: any): void;
    _handleTriggerArrowDownKeydown(focusableElements: any[], event: any): void;
    _handleTriggerArrowUpKeydown(focusableElements: any[], event: any): void;
}
