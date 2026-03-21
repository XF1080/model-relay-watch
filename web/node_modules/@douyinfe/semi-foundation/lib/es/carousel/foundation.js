import _get from "lodash/get";
import _isObject from "lodash/isObject";
import BaseFoundation from '../base/foundation';
import { numbers } from './constants';
class CarouselFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this._interval = null;
    this._forcePlay = false;
  }
  setForcePlay(forcePlay) {
    this._forcePlay = forcePlay;
  }
  play(interval) {
    if (this._interval) {
      clearInterval(this._interval);
    }
    this._interval = setInterval(() => {
      this.next();
    }, interval);
  }
  stop() {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }
  goTo(activeIndex) {
    const {
      activeIndex: stateActiveIndex
    } = this.getStates();
    const targetIndex = this.getValidIndex(activeIndex);
    this._adapter.setIsReverse(stateActiveIndex > targetIndex);
    if (this.getIsControlledComponent()) {
      this._notifyChange(targetIndex);
    } else {
      this._notifyChange(targetIndex);
      this.handleNewActiveIndex(targetIndex);
    }
  }
  next() {
    this.stop();
    const {
      activeIndex: stateActiveIndex
    } = this.getStates();
    const targetIndex = this.getValidIndex(stateActiveIndex + 1);
    this._adapter.setIsReverse(false);
    if (this.getIsControlledComponent()) {
      this._notifyChange(targetIndex);
    } else {
      this._notifyChange(targetIndex);
      this.handleNewActiveIndex(targetIndex);
    }
    this.handleAutoPlay();
  }
  prev() {
    this.stop();
    const {
      activeIndex: stateActiveIndex
    } = this.getStates();
    const targetIndex = this.getValidIndex(stateActiveIndex - 1);
    this._adapter.setIsReverse(true);
    if (this.getIsControlledComponent()) {
      this._notifyChange(targetIndex);
    } else {
      this._notifyChange(targetIndex);
      this.handleNewActiveIndex(targetIndex);
    }
    this.handleAutoPlay();
  }
  destroy() {
    this._unregisterInterval();
  }
  _unregisterInterval() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }
  _notifyChange(activeIndex) {
    const {
      activeIndex: stateActiveIndex,
      isInit
    } = this.getStates();
    if (isInit) {
      this._adapter.setIsInit(false);
    }
    if (stateActiveIndex !== activeIndex) {
      this._adapter.setPreActiveIndex(stateActiveIndex);
      this._adapter.notifyChange(activeIndex, stateActiveIndex);
    }
  }
  getValidIndex(index) {
    const children = this._adapter.getChildren();
    return (index + children.length) % children.length;
  }
  getSwitchingTime() {
    const {
      autoPlay,
      speed
    } = this.getProps();
    const autoPlayType = typeof autoPlay;
    if (autoPlayType === 'boolean') {
      return numbers.DEFAULT_INTERVAL + speed;
    }
    if (_isObject(autoPlay)) {
      return _get(autoPlay, 'interval', numbers.DEFAULT_INTERVAL) + speed;
    }
    return speed;
  }
  getIsControlledComponent() {
    return this._isInProps('activeIndex');
  }
  handleAutoPlay() {
    const {
      autoPlay
    } = this.getProps();
    const children = this._adapter.getChildren();
    const autoPlayType = typeof autoPlay;
    // when user manually call the play function, force play
    // only when carousel children length > 1 to start play
    if (children.length > 1 && (autoPlay === true || _isObject(autoPlay) || this._forcePlay)) {
      this.play(this.getSwitchingTime());
    }
  }
  handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      this.prev();
    }
    if (event.key === 'ArrowRight') {
      this.next();
    }
  }
  onIndicatorChange(activeIndex) {
    const {
      activeIndex: stateActiveIndex
    } = this.getStates();
    this._adapter.setIsReverse(stateActiveIndex > activeIndex);
    this._notifyChange(activeIndex);
    if (!this.getIsControlledComponent()) {
      this.handleNewActiveIndex(activeIndex);
    }
  }
  handleNewActiveIndex(activeIndex) {
    const {
      activeIndex: stateActiveIndex
    } = this.getStates();
    if (stateActiveIndex !== activeIndex) {
      this._adapter.setNewActiveIndex(activeIndex);
    }
  }
  getDefaultActiveIndex() {
    let activeIndex;
    const props = this.getProps();
    if ('activeIndex' in props) {
      activeIndex = props.activeIndex;
    } else if ('defaultActiveIndex' in props) {
      activeIndex = props.defaultActiveIndex;
    }
    return activeIndex;
  }
}
export default CarouselFoundation;