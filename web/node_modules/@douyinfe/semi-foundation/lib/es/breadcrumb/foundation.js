import BaseFoundation from '../base/foundation';
import isEnterPress from '../utils/isEnterPress';
export default class BreadcrumbFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  handleClick(info, event) {
    this._adapter.notifyClick(info, event);
  }
  handleExpand(clickEvent) {
    this._adapter.expandCollapsed(clickEvent);
  }
  /**
   * A11y: simulate clear button click
   */
  handleExpandEnterPress(keyboardEvent) {
    if (isEnterPress(keyboardEvent)) {
      this.handleExpand(keyboardEvent);
    }
  }
  genRoutes(routes) {
    return routes.map(route => {
      if (typeof route !== 'object') {
        return {
          name: route,
          _origin: {
            name: route
          }
        };
      }
      let config = {};
      config._origin = route;
      return Object.assign(Object.assign({}, config), route);
    });
  }
}