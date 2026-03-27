import BaseFoundation from '../base/foundation';
export function clampValueInRange(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
export default class DragMoveFoundation extends BaseFoundation {
  get constrainer() {
    return this._adapter.getConstrainer();
  }
  get handler() {
    return this._adapter.getHandler();
  }
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this._registerStartEvent = () => {
      this.handler.addEventListener('mousedown', this.onMouseDown);
      this.handler.addEventListener('touchstart', this.onTouchStart);
    };
    this._unRegisterStartEvent = () => {
      this.handler.removeEventListener('mousedown', this.onMouseDown);
      this.handler.removeEventListener('touchstart', this.onTouchStart);
    };
    this._registerDocMouseEvent = () => {
      document.addEventListener('mousemove', this._onMouseMove);
      document.addEventListener('mouseup', this._onMouseUp);
    };
    this._unRegisterDocMouseEvent = () => {
      document.removeEventListener('mousemove', this._onMouseMove);
      document.removeEventListener('mouseup', this._onMouseUp);
    };
    this._registerDocTouchEvent = () => {
      document.addEventListener('touchend', this._onTouchEnd);
      document.addEventListener('touchmove', this._onTouchMove);
      document.addEventListener('touchcancel', this._onTouchCancel);
    };
    this._unRegisterDocTouchEvent = () => {
      document.removeEventListener('touchend', this._onTouchEnd);
      document.removeEventListener('touchmove', this._onTouchMove);
      document.removeEventListener('touchcancel', this._onTouchCancel);
    };
    this._calcOffset = e => {
      this.startOffsetX = e.clientX - this.element.offsetLeft;
      this.startOffsetY = e.clientY - this.element.offsetTop;
    };
    this._preventDefault = e => {
      // prevent default behavior, avoid other element(like img, text) be selected
      e.preventDefault();
    };
    this.onMouseDown = e => {
      this._calcMoveRange();
      this._adapter.notifyMouseDown(e);
      if (!this._allowMove(e)) {
        return;
      }
      this._registerDocMouseEvent();
      // store origin offset
      this._calcOffset(e);
      this._preventDefault(e);
    };
    this.onTouchStart = e => {
      this._calcMoveRange();
      this._adapter.notifyTouchStart(e);
      if (!this._allowMove(e)) {
        return;
      }
      this._registerDocTouchEvent();
      const touch = e.targetTouches[0];
      this._calcOffset(touch);
      this._preventDefault(e);
    };
    this._changePos = e => {
      const {
        customMove
      } = this.getProps();
      let newLeft = e.clientX - this.startOffsetX;
      let newTop = e.clientY - this.startOffsetY;
      if (this.constrainer) {
        newLeft = clampValueInRange(newLeft, this.xMin, this.xMax);
        newTop = clampValueInRange(newTop, this.yMin, this.yMax);
      }
      requestAnimationFrame(() => {
        if (customMove) {
          customMove(this.element, newTop, newLeft);
          return;
        }
        this.element.style.top = newTop + 'px';
        this.element.style.left = newLeft + 'px';
      });
    };
    this._onMouseMove = e => {
      this._adapter.notifyMouseMove(e);
      this._changePos(e);
    };
    this._onTouchMove = e => {
      this._adapter.notifyTouchMove(e);
      const touch = e.targetTouches[0];
      this._changePos(touch);
    };
    this._onMouseUp = e => {
      this._adapter.notifyMouseUp(e);
      this._unRegisterDocMouseEvent();
    };
    this._onTouchEnd = e => {
      this._adapter.notifyTouchEnd(e);
      this._unRegisterDocTouchEvent();
    };
    this._onTouchCancel = e => {
      this._adapter.notifyTouchCancel(e);
      this._unRegisterDocTouchEvent();
    };
  }
  init() {
    const element = this._adapter.getDragElement();
    if (!element) {
      throw new Error('drag element must be a valid element');
    }
    this.element = element;
    this.element.style.position = 'absolute';
    this.handler.style.cursor = 'move';
    this._registerStartEvent();
  }
  destroy() {
    this._unRegisterStartEvent();
    this._unRegisterEvent();
  }
  _unRegisterEvent() {
    this._unRegisterDocMouseEvent();
    this._unRegisterDocTouchEvent();
  }
  _calcMoveRange() {
    // Calculate the range within which an element can move
    if (this.constrainer) {
      let node = this.element.offsetParent;
      let startX = 0;
      let startY = 0;
      while (node !== this.constrainer && node !== null) {
        startX -= node.offsetLeft;
        startY -= node.offsetTop;
        node = node.offsetParent;
      }
      this.xMin = startX;
      this.xMax = startX + this.constrainer.offsetWidth - this.element.offsetWidth;
      this.yMin = startY;
      this.yMax = startY + this.constrainer.offsetHeight - this.element.offsetHeight;
    }
  }
  _allowMove(e) {
    const {
      allowMove,
      allowInputDrag
    } = this.getProps();
    // When the clicked object is an input or textarea, clicking should be allowed but dragging should not be allowed.
    if (!allowInputDrag) {
      let target = e.target.tagName.toLowerCase();
      if (target === 'input' || target === 'textarea') {
        return;
      }
    }
    if (allowMove) {
      return allowMove(e, this.element);
    }
    return true;
  }
}