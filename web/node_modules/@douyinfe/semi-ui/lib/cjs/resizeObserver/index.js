"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ObserverProperty = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _reactRender = require("../_utils/reactRender");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var ObserverProperty;
(function (ObserverProperty) {
  ObserverProperty["Width"] = "width";
  ObserverProperty["Height"] = "height";
  ObserverProperty["All"] = "all";
})(ObserverProperty || (exports.ObserverProperty = ObserverProperty = {}));
class ReactResizeObserver extends _baseComponent.default {
  constructor(props) {
    var _this;
    super(props);
    _this = this;
    this.formerPropertyValue = new Map();
    this.getElement = () => {
      try {
        const node = this.childNode || this;
        return (0, _reactRender.resolveDOM)(node) || (node instanceof Element ? node : null);
      } catch (error) {
        return null;
      }
    };
    this.handleResizeEventTriggered = entries => {
      var _a, _b, _c, _d;
      if (this.props.observerProperty === ObserverProperty.All) {
        (_b = (_a = this.props).onResize) === null || _b === void 0 ? void 0 : _b.call(_a, entries);
      } else {
        const finalEntries = [];
        for (const entry of entries) {
          if (this.formerPropertyValue.has(entry.target)) {
            if (entry.contentRect[this.props.observerProperty] !== this.formerPropertyValue.get(entry.target)) {
              this.formerPropertyValue.set(entry.target, entry.contentRect[this.props.observerProperty]);
              finalEntries.push(entry);
            }
          } else {
            this.formerPropertyValue.set(entry.target, entry.contentRect[this.props.observerProperty]);
            finalEntries.push(entry);
          }
        }
        if (finalEntries.length > 0) {
          (_d = (_c = this.props).onResize) === null || _d === void 0 ? void 0 : _d.call(_c, finalEntries);
        }
      }
    };
    this.observeElement = function () {
      let force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      const element = _this.getElement();
      if (!_this.observer) {
        _this.observer = new ResizeObserver(_this.handleResizeEventTriggered);
      }
      if (!(element && element instanceof Element)) {
        // stop everything if not defined
        _this.observer.disconnect();
        return;
      }
      if (element === _this.element && !force) {
        // abort if given same element -- nothing to update (unless forced)
        return;
      } else {
        // clear observer list if new element
        _this.observer.disconnect();
        // remember element reference for next time
        _this.element = element;
      }
      // observer callback is invoked immediately when observing new elements
      _this.observer.observe(element);
      if (_this.props.observeParent && element.parentNode && element.parentNode.ownerDocument && element.parentNode.ownerDocument.defaultView && element.parentNode instanceof element.parentNode.ownerDocument.defaultView.HTMLElement) {
        _this._parentNode = element.parentNode;
        _this.observer.observe(_this._parentNode);
      }
    };
    this.mergeRef = (ref, node) => {
      this.childNode = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (typeof ref === 'object' && ref && 'current' in ref) {
        ref.current = node;
      }
    };
    if (globalThis['ResizeObserver']) {
      this.observer = new ResizeObserver(this.handleResizeEventTriggered);
    }
  }
  componentDidMount() {
    var _a;
    (_a = this.observeElement) === null || _a === void 0 ? void 0 : _a.call(this);
  }
  componentDidUpdate(prevProps) {
    var _a;
    (_a = this.observeElement) === null || _a === void 0 ? void 0 : _a.call(this, this.props.observeParent !== prevProps.observeParent);
  }
  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
      this.element = null;
    }
  }
  render() {
    const child = _react.default.Children.only(this.props.children);
    const ref = (0, _reactRender.getRef)(child);
    return /*#__PURE__*/_react.default.cloneElement(child, {
      ref: node => this.mergeRef(ref, node)
    });
  }
}
exports.default = ReactResizeObserver;
ReactResizeObserver.propTypes = {
  onResize: _propTypes.default.func,
  observeParent: _propTypes.default.bool,
  observerProperty: _propTypes.default.string,
  delayTick: _propTypes.default.number
};
ReactResizeObserver.defaultProps = {
  onResize: () => {},
  observeParent: false,
  observerProperty: "all",
  delayTick: 0
};