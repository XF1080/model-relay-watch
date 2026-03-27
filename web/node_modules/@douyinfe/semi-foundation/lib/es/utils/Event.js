import isNullOrUndefined from "./isNullOrUndefined";
export default class Event {
  constructor() {
    this._eventMap = new Map();
  }
  on(event, callback) {
    if (event && typeof callback === 'function') {
      this._eventMap.has(event) || this._eventMap.set(event, []);
      this._eventMap.get(event).push(callback);
    }
    return this;
  }
  once(event, callback) {
    var _this = this;
    if (event && typeof callback === 'function') {
      const fn = function () {
        callback(...arguments);
        _this.off(event, fn);
      };
      this.on(event, fn);
    }
  }
  off(event, callback) {
    if (event) {
      if (typeof callback === 'function') {
        const callbacks = this._eventMap.get(event);
        if (Array.isArray(callbacks) && callbacks.length) {
          let index = -1;
          while ((index = callbacks.findIndex(cb => cb === callback)) > -1) {
            callbacks.splice(index, 1);
          }
        }
      } else if (isNullOrUndefined(callback)) {
        this._eventMap.delete(event);
      }
    }
    return this;
  }
  emit(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (!this._eventMap.has(event)) {
      return false;
    }
    const callbacks = [...this._eventMap.get(event)];
    // clone to avoid someone writing  the logic of deleting callback in callbacks into his or her callback code, for example the once func above
    callbacks.forEach(callback => callback(...args));
    return true;
  }
}