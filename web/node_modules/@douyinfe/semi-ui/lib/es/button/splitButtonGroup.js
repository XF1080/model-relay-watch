import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/button/constants';
import '@douyinfe/semi-foundation/lib/es/button/button.css';
import BaseComponent from '../_base/baseComponent';
const prefixCls = cssClasses.PREFIX;
export default class SplitButtonGroup extends BaseComponent {
  constructor() {
    super(...arguments);
    this.containerRef = /*#__PURE__*/React.createRef();
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
    const cls = classNames(`${prefixCls}-split`, className);
    return /*#__PURE__*/React.createElement("div", {
      ref: this.containerRef,
      className: cls,
      style: style,
      role: "group",
      "aria-label": this.props['aria-label']
    }, children);
  }
}
SplitButtonGroup.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  'aria-label': PropTypes.string
};