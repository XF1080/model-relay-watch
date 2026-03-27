"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _isEnterPress = _interopRequireDefault(require("../utils/isEnterPress"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class BreadcrumbFoundation extends _foundation.default {
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
    if ((0, _isEnterPress.default)(keyboardEvent)) {
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
exports.default = BreadcrumbFoundation;