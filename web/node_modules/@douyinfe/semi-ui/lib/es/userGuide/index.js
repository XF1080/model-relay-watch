var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, numbers, strings } from '@douyinfe/semi-foundation/lib/es/userGuide/constants';
import UserGuideFoundation from '@douyinfe/semi-foundation/lib/es/userGuide/foundation';
import BaseComponent from '../_base/baseComponent';
import Popover from '../popover';
import Button from '../button';
import Modal from '../modal';
import { noop } from '@douyinfe/semi-foundation/lib/es/utils/function';
import '@douyinfe/semi-foundation/lib/es/userGuide/userGuide.css';
import isNullOrUndefined from '@douyinfe/semi-foundation/lib/es/utils/isNullOrUndefined';
import { getUuidShort } from '@douyinfe/semi-foundation/lib/es/utils/uuid';
import LocaleConsumer from '../locale/localeConsumer';
import { getScrollbarWidth } from '../_utils';
const prefixCls = cssClasses.PREFIX;
class UserGuide extends BaseComponent {
  constructor(props) {
    super(props);
    this.renderStep = (step, index) => {
      const {
        theme,
        position,
        visible,
        className,
        style,
        spotlightPadding
      } = this.props;
      const {
        current
      } = this.state;
      const isCurrentStep = current === index;
      if (!isCurrentStep) {
        return null;
      }
      const target = typeof step.target === 'function' ? step.target() : step.target;
      if (!step.target) {
        return null;
      }
      const basePopoverStyle = {
        padding: 0
      };
      const rect = target.getBoundingClientRect();
      const padding = (step === null || step === void 0 ? void 0 : step.spotlightPadding) || spotlightPadding || numbers.DEFAULT_SPOTLIGHT_PADDING;
      const isPrimaryTheme = theme === 'primary' || (step === null || step === void 0 ? void 0 : step.theme) === 'primary';
      const primaryStyle = isPrimaryTheme ? {
        backgroundColor: 'var(--semi-color-primary)'
      } : {};
      return /*#__PURE__*/React.createElement(Popover, {
        key: `userGuide-popup-${index}`,
        className: cls(`${prefixCls}-popover`, className),
        style: Object.assign(Object.assign(Object.assign({}, basePopoverStyle), primaryStyle), style),
        content: this.renderPopupContent(step, index),
        position: step.position || position,
        trigger: "custom",
        visible: visible && isCurrentStep,
        showArrow: step.showArrow !== false
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          position: 'fixed',
          left: rect.x - padding,
          top: rect.y - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
          pointerEvents: 'none'
        }
      }));
    };
    this.renderIndicator = () => {
      const {
        steps
      } = this.props;
      const {
        current
      } = this.state;
      const indicatorContent = [];
      for (let i = 0; i < steps.length; i++) {
        indicatorContent.push(/*#__PURE__*/React.createElement("span", {
          key: i,
          "data-index": i,
          className: cls([`${cssClasses.PREFIX_MODAL}-indicator-item`], {
            [`${cssClasses.PREFIX_MODAL}-indicator-item-active`]: i === current
          })
        }));
      }
      return indicatorContent;
    };
    this.renderModal = () => {
      const {
        visible,
        steps,
        showSkipButton,
        showPrevButton,
        finishText,
        nextButtonProps,
        prevButtonProps,
        mask
      } = this.props;
      const {
        current
      } = this.state;
      const step = steps[current];
      const isFirst = current === 0;
      const isLast = current === steps.length - 1;
      const {
        cover,
        title,
        description
      } = step;
      return /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "UserGuide"
      }, (locale, localeCode) => (/*#__PURE__*/React.createElement(Modal, {
        className: cssClasses.PREFIX_MODAL,
        bodyStyle: {
          padding: 0
        },
        header: null,
        visible: visible,
        maskClosable: false,
        mask: mask,
        centered: true,
        footer: null
      }, cover && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: `${cssClasses.PREFIX_MODAL}-cover`
      }, cover), /*#__PURE__*/React.createElement("div", {
        className: `${cssClasses.PREFIX_MODAL}-indicator`
      }, this.renderIndicator())), (title || description) && (/*#__PURE__*/React.createElement("div", {
        className: `${cssClasses.PREFIX_MODAL}-body`
      }, title && /*#__PURE__*/React.createElement("div", {
        className: `${cssClasses.PREFIX_MODAL}-body-title`
      }, title), description && /*#__PURE__*/React.createElement("div", {
        className: `${cssClasses.PREFIX_MODAL}-body-description`
      }, description))), /*#__PURE__*/React.createElement("div", {
        className: `${cssClasses.PREFIX_MODAL}-footer`
      }, showSkipButton && !isLast && (/*#__PURE__*/React.createElement(Button, {
        type: 'tertiary',
        onClick: this.foundation.handleSkip
      }, locale.skip)), showPrevButton && !isFirst && (/*#__PURE__*/React.createElement(Button, Object.assign({
        type: 'tertiary',
        onClick: this.foundation.handlePrev
      }, prevButtonProps), (prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.children) || locale.prev)), /*#__PURE__*/React.createElement(Button, Object.assign({
        theme: 'solid',
        onClick: this.foundation.handleNext
      }, nextButtonProps), isLast ? finishText || locale.finish : (nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.children) || locale.next)))));
    };
    this.foundation = new UserGuideFoundation(this.adapter);
    this.state = {
      current: props.current || numbers.DEFAULT_CURRENT,
      spotlightRect: null
    };
    this.scrollBarWidth = 0;
    this.userGuideId = '';
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      disabledBodyScroll: () => {
        const {
          getPopupContainer
        } = this.props;
        this.bodyOverflow = document.body.style.overflow || '';
        if (!getPopupContainer && this.bodyOverflow !== 'hidden') {
          document.body.style.overflow = 'hidden';
          document.body.style.width = `calc(${this.originBodyWidth || '100%'} - ${this.scrollBarWidth}px)`;
        }
      },
      enabledBodyScroll: () => {
        const {
          getPopupContainer
        } = this.props;
        if (!getPopupContainer && this.bodyOverflow !== 'hidden') {
          document.body.style.overflow = this.bodyOverflow;
          document.body.style.width = this.originBodyWidth;
        }
      },
      notifyChange: current => {
        this.props.onChange(current);
      },
      notifyFinish: () => {
        this.props.onFinish();
      },
      notifyNext: current => {
        this.props.onNext(current);
      },
      notifyPrev: current => {
        this.props.onPrev(current);
      },
      notifySkip: () => {
        this.props.onSkip();
      },
      setCurrent: current => {
        this.setState({
          current
        });
      }
    });
  }
  static getDerivedStateFromProps(props, state) {
    const states = {};
    if (!isNullOrUndefined(props.current) && props.current !== state.current) {
      states.current = props.current;
    }
    return states;
  }
  componentDidMount() {
    this.foundation.init();
    this.scrollBarWidth = getScrollbarWidth();
    this.userGuideId = getUuidShort();
  }
  componentDidUpdate(prevProps, prevStates) {
    const {
      steps,
      mode,
      visible
    } = this.props;
    const {
      current
    } = this.state;
    if (visible !== prevProps.visible) {
      if (visible) {
        this.foundation.beforeShow();
        this.setState({
          current: 0
        });
      } else {
        this.foundation.afterHide();
      }
    }
    if (mode === 'popup' && prevStates.current !== current && steps[current] || prevProps.visible !== visible) {
      this.updateSpotlightRect();
    }
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  scrollTargetIntoViewIfNeeded(target) {
    if (!target) {
      return;
    }
    const rect = target.getBoundingClientRect();
    const isInViewport = rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    if (!isInViewport) {
      target.scrollIntoView({
        behavior: 'auto',
        block: 'center'
      });
    }
  }
  updateSpotlightRect() {
    return __awaiter(this, void 0, void 0, function* () {
      const {
        steps,
        spotlightPadding
      } = this.props;
      const {
        current
      } = this.state;
      const step = steps[current];
      if (step.target) {
        const target = typeof step.target === 'function' ? step.target() : step.target;
        // Checks if the target element is within the viewport, and scrolls it into view if not
        this.scrollTargetIntoViewIfNeeded(target);
        const rect = target === null || target === void 0 ? void 0 : target.getBoundingClientRect();
        const padding = (step === null || step === void 0 ? void 0 : step.spotlightPadding) || spotlightPadding || numbers.DEFAULT_SPOTLIGHT_PADDING;
        const newRects = new DOMRect(rect.x - padding, rect.y - padding, rect.width + padding * 2, rect.height + padding * 2);
        requestAnimationFrame(() => {
          this.setState({
            spotlightRect: newRects
          });
        });
      }
    });
  }
  renderPopupContent(step, index) {
    const {
      showPrevButton,
      showSkipButton,
      theme,
      steps,
      finishText,
      nextButtonProps,
      prevButtonProps
    } = this.props;
    const {
      current
    } = this.state;
    const isFirst = index === 0;
    const isLast = index === steps.length - 1;
    const popupPrefixCls = `${prefixCls}-popup-content`;
    const isPrimaryTheme = theme === 'primary' || (step === null || step === void 0 ? void 0 : step.theme) === 'primary';
    const {
      cover,
      title,
      description
    } = step;
    return /*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: "UserGuide"
    }, (locale, localeCode) => (/*#__PURE__*/React.createElement("div", {
      className: cls(`${popupPrefixCls}`, {
        [`${popupPrefixCls}-primary`]: isPrimaryTheme
      })
    }, cover && /*#__PURE__*/React.createElement("div", {
      className: `${popupPrefixCls}-cover`
    }, cover), /*#__PURE__*/React.createElement("div", {
      className: `${popupPrefixCls}-body`
    }, title && /*#__PURE__*/React.createElement("div", {
      className: `${popupPrefixCls}-title`
    }, title), description && /*#__PURE__*/React.createElement("div", {
      className: `${popupPrefixCls}-description`
    }, description), /*#__PURE__*/React.createElement("div", {
      className: `${popupPrefixCls}-footer`
    }, steps.length > 1 && (/*#__PURE__*/React.createElement("div", {
      className: `${popupPrefixCls}-indicator`
    }, current + 1, "/", steps.length)), /*#__PURE__*/React.createElement("div", {
      className: `${popupPrefixCls}-buttons`
    }, showSkipButton && !isLast && (/*#__PURE__*/React.createElement(Button, {
      style: isPrimaryTheme ? {
        backgroundColor: 'var(--semi-color-fill-2)'
      } : {},
      theme: isPrimaryTheme ? 'solid' : 'light',
      type: isPrimaryTheme ? 'primary' : 'tertiary',
      onClick: this.foundation.handleSkip
    }, locale.skip)), showPrevButton && !isFirst && (/*#__PURE__*/React.createElement(Button, Object.assign({
      style: isPrimaryTheme ? {
        backgroundColor: 'var(--semi-color-fill-2)'
      } : {},
      theme: isPrimaryTheme ? 'solid' : 'light',
      type: isPrimaryTheme ? 'primary' : 'tertiary',
      onClick: this.foundation.handlePrev
    }, prevButtonProps), (prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.children) || locale.prev)), /*#__PURE__*/React.createElement(Button, Object.assign({
      style: isPrimaryTheme ? {
        backgroundColor: '#FFF'
      } : {},
      theme: isPrimaryTheme ? 'borderless' : 'solid',
      type: 'primary',
      onClick: this.foundation.handleNext
    }, nextButtonProps), isLast ? finishText || locale.finish : (nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.children) || locale.next)))))));
  }
  renderSpotlight() {
    const {
      steps,
      mask,
      zIndex
    } = this.props;
    const {
      spotlightRect,
      current
    } = this.state;
    const step = steps[current];
    if (!step.target) {
      return null;
    }
    if (!spotlightRect) {
      this.updateSpotlightRect();
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, spotlightRect ? (/*#__PURE__*/React.createElement("svg", {
      className: `${prefixCls}-spotlight`,
      style: {
        zIndex
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("mask", {
      id: `spotlight-${this.userGuideId}`
    }, /*#__PURE__*/React.createElement("rect", {
      width: "100%",
      height: "100%",
      fill: "white"
    }), /*#__PURE__*/React.createElement("rect", {
      className: `${prefixCls}-spotlight-rect`,
      x: spotlightRect.x,
      y: spotlightRect.y,
      width: spotlightRect.width,
      height: spotlightRect.height,
      rx: 4,
      fill: "black"
    }))), mask && (/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      width: "100%",
      height: "100%",
      fill: "var(--semi-color-overlay-bg)",
      mask: `url(#spotlight-${this.userGuideId})`
    }), /*#__PURE__*/React.createElement("rect", {
      x: 0,
      y: 0,
      width: "100%",
      height: spotlightRect.y,
      fill: "transparent",
      className: `${prefixCls}-spotlight-transparent-rect`
    }), /*#__PURE__*/React.createElement("rect", {
      x: 0,
      y: spotlightRect.y,
      width: spotlightRect.x,
      height: spotlightRect.height,
      fill: "transparent",
      className: `${prefixCls}-spotlight-transparent-rect`
    }), /*#__PURE__*/React.createElement("rect", {
      x: spotlightRect.x + spotlightRect.width,
      y: spotlightRect.y,
      width: `calc(100% - ${spotlightRect.x + spotlightRect.width}px)`,
      height: spotlightRect.height,
      fill: "transparent",
      className: `${prefixCls}-spotlight-transparent-rect`
    }), /*#__PURE__*/React.createElement("rect", {
      y: spotlightRect.y + spotlightRect.height,
      width: "100%",
      height: `calc(100% - ${spotlightRect.y + spotlightRect.height}px)`,
      fill: "transparent",
      className: `${prefixCls}-spotlight-transparent-rect`
    }))))) : null);
  }
  render() {
    const {
      mode,
      steps,
      visible
    } = this.props;
    if (!visible || !steps.length) {
      return null;
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, mode === 'popup' ? (/*#__PURE__*/React.createElement(React.Fragment, null, steps === null || steps === void 0 ? void 0 : steps.map((step, index) => this.renderStep(step, index)), this.renderSpotlight())) : null, mode === 'modal' && this.renderModal());
  }
}
UserGuide.propTypes = {
  mask: PropTypes.bool,
  mode: PropTypes.oneOf(strings.MODE),
  onChange: PropTypes.func,
  onFinish: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onSkip: PropTypes.func,
  position: PropTypes.oneOf(strings.POSITION_SET),
  showPrevButton: PropTypes.bool,
  showSkipButton: PropTypes.bool,
  theme: PropTypes.oneOf(strings.THEME),
  visible: PropTypes.bool,
  getPopupContainer: PropTypes.func,
  zIndex: PropTypes.number
};
UserGuide.defaultProps = {
  mask: true,
  mode: 'popup',
  nextButtonProps: {},
  onChange: noop,
  onFinish: noop,
  onNext: noop,
  onPrev: noop,
  onSkip: noop,
  position: 'bottom',
  prevButtonProps: {},
  showPrevButton: true,
  showSkipButton: true,
  steps: [],
  theme: 'default',
  visible: false,
  zIndex: numbers.DEFAULT_Z_INDEX
};
export default UserGuide;