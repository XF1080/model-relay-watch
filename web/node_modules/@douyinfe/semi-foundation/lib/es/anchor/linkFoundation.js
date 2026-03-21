import BaseFoundation from '../base/foundation';
export default class LinkFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    // this.setInitValue();
  }
  destroy() {}
  handleAddLink() {
    const href = this._adapter.getProp('href');
    this._adapter.addLink(href);
  }
  handleUpdateLink(href, prevHref) {
    if (href !== prevHref) {
      this._adapter.removeLink(prevHref);
      this._adapter.addLink(href);
    }
  }
  handleRemoveLink() {
    const href = this._adapter.getProp('href');
    this._adapter.removeLink(href);
  }
}