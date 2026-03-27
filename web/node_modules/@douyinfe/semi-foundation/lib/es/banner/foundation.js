import BaseFoundation from '../base/foundation';
export default class BannerFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, BannerFoundation.defaultAdapter), adapter));
  }
  removeBanner(e) {
    this._adapter.notifyClose(e);
    this._adapter.setVisible();
  }
}