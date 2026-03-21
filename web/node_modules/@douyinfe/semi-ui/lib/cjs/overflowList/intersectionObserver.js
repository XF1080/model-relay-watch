"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactUtils = require("../_base/reactUtils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ReactIntersectionObserver extends _react.default.PureComponent {
  componentDidMount() {
    const {
      items
    } = this.props;
    this.cachedKeys = Object.keys(items);
    const {
      root,
      threshold,
      rootMargin,
      option,
      onIntersect
    } = this.props;
    this.observer = new IntersectionObserver(onIntersect, Object.assign({
      root,
      threshold,
      rootMargin
    }, option));
    this.observeElement();
  }
  componentDidUpdate() {
    const {
      items
    } = this.props;
    const itemKeys = Object.keys(items);
    if (!(0, _isEqual2.default)(this.cachedKeys, itemKeys)) {
      this.observeElement(true);
      this.cachedKeys = itemKeys;
    }
  }
  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
  observeElement() {
    let force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const {
      items
    } = this.props;
    if ((0, _isEmpty2.default)(items)) {
      // stop everything if not defined
      this.observer.disconnect();
      return;
    }
    if (force) {
      this.observer.disconnect();
    }
    // observer callback is invoked immediately when observing new elements
    Object.keys(items).forEach(key => {
      const node = items[key];
      if (!(node && (0, _reactUtils.isHTMLElement)(node))) {
        return;
      }
      this.observer.observe(node);
    });
  }
  render() {
    const {
      children
    } = this.props;
    return children;
  }
}
exports.default = ReactIntersectionObserver;
ReactIntersectionObserver.propTypes = {
  onIntersect: _propTypes.default.func,
  option: _propTypes.default.object,
  root: _propTypes.default.any,
  threshold: _propTypes.default.number,
  rootMargin: _propTypes.default.string,
  items: _propTypes.default.object
};
ReactIntersectionObserver.defaultProps = {
  onIntersect: () => undefined,
  threshold: 0.75,
  rootMargin: '0px',
  option: {},
  items: {}
};