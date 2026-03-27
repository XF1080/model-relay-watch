"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ToastListFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, ToastListFoundation.defaultAdapter), adapter));
    this.handleMouseInSideChange = mouseInSideChange => {
      this._adapter.handleMouseInSideChange(mouseInSideChange);
    };
    this.getInputWrapperRect = () => {
      return this._adapter.getInputWrapperRect();
    };
  }
  hasToast(id) {
    const toastList = this._adapter.getState('list');
    return toastList.map(_ref => {
      let {
        id
      } = _ref;
      return id;
    }).includes(id);
  }
  addToast(toastOpts) {
    const toastList = this._adapter.getState('list');
    // const id = getUuid('toast');
    // let toastOpts = { ...opts, id };
    // console.log(toastOpts);
    toastList.push(toastOpts);
    this._adapter.updateToast(toastList, [], []);
    // return id;
  }
  updateToast(id, toastOpts) {
    let toastList = this._adapter.getState('list');
    toastList = toastList.map(toast => toast.id === id ? Object.assign(Object.assign({}, toast), toastOpts) : toast);
    const updatedItems = toastList.filter(toast => toast.id === id);
    this._adapter.updateToast(toastList, [], updatedItems);
  }
  removeToast(id) {
    let toastList = this._adapter.getState('list');
    const removedItems = [];
    toastList = toastList.filter(toastOpts => {
      if (toastOpts.id === id) {
        removedItems.push(toastOpts);
        return false;
      }
      return true;
    });
    this._adapter.updateToast(toastList, removedItems, []);
  }
  destroyAll() {
    const toastList = this._adapter.getState('list');
    if (toastList.length > 0) {
      this._adapter.updateToast([], toastList, []);
    }
  }
}
exports.default = ToastListFoundation;