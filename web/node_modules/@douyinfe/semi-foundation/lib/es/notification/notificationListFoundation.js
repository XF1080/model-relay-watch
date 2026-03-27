import BaseFoundation from '../base/foundation';
export default class NotificationListFoundation extends BaseFoundation {
  addNotice(opts) {
    // let notices = this._adapter.getNotices();
    const notices = this._adapter.getNotices();
    // opts = { ...opts, id };
    // if (opts.duration) {
    //     setTimeout(() => {
    //         this.removeNotice(opts.id);
    //     }, opts.duration * 1000);
    // }
    this._adapter.updateNotices([opts, ...notices]);
    // return id;
  }
  has(id) {
    return this._adapter.getNotices().some(notice => notice.id === id);
  }
  update(id, noticeOpts) {
    let notices = this._adapter.getNotices();
    notices = notices.map(notice => notice.id === id ? Object.assign(Object.assign({}, notice), noticeOpts) : notice);
    const updatedItems = notices.filter(notice => notice.id === id);
    this._adapter.updateNotices(notices, [], updatedItems);
  }
  removeNotice(id) {
    let notices = this._adapter.getNotices();
    // let notices = this._adapter.getNotices();
    const removedItems = [];
    notices = notices.filter(notice => {
      if (notice.id === id) {
        removedItems.push(notice);
        return false;
      }
      return true;
    });
    this._adapter.updateNotices(notices, removedItems); // This must be updated at the same time https://github.com/facebook/react/issues/12312
  }
  destroyAll() {
    const notices = this._adapter.getNotices();
    if (notices.length > 0) {
      this._adapter.updateNotices([], notices);
    }
  }
}