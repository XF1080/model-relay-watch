"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/button/constants");
require("@douyinfe/semi-foundation/lib/cjs/button/button.css");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.PREFIX;
class SplitButtonGroup extends _baseComponent.default {
  constructor() {
    super(...arguments);
    this.containerRef = /*#__PURE__*/_react.default.createRef();
    this.mutationObserver = null;
  }
  componentDidMount() {
    const addClassName = () => {
      const buttons = this.containerRef.current.querySelectorAll('button');
      const firstButton = buttons[0];
      const lastButton = buttons[buttons.length - 1];
      if (!(firstButton === null || firstButton === void 0 ? void 0 : firstButton.classList.contains(`${prefixCls}-first`))) {
        firstButton === null || firstButton === void 0 ? void 0 : firstButton.classList.add(`${prefixCls}-first`);
      }
      if (!(lastButton === null || lastButton === void 0 ? void 0 : lastButton.classList.contains(`${prefixCls}-last`))) {
        lastButton === null || lastButton === void 0 ? void 0 : lastButton.classList.add(`${prefixCls}-last`);
      }
    };
    if (this.containerRef.current) {
      addClassName();
      const mutationObserver = new MutationObserver((mutations, observer) => {
        for (const mutation of mutations) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class' || mutation.type === 'childList' && Array.from(mutation.addedNodes).some(node => node.nodeName === 'BUTTON')) {
            addClassName();
          }
        }
      });
      mutationObserver.observe(this.containerRef.current, {
        attributes: true,
        childList: true,
        subtree: true
      });
      this.mutationObserver = mutationObserver;
    }
  }
  componentWillUnmount() {
    var _a;
    super.componentWillUnmount();
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  render() {
    const {
      children,
      style,
      className
    } = this.props;
    const cls = (0, _classnames.default)(`${prefixCls}-split`, className);
    return /*#__PURE__*/_react.default.createElement("div", {
      ref: this.containerRef,
      className: cls,
      style: style,
      role: "group",
      "aria-label": this.props['aria-label']
    }, children);
  }
}
exports.default = SplitButtonGroup;
SplitButtonGroup.propTypes = {
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  'aria-label': _propTypes.default.string
};