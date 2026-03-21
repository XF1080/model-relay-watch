"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/userGuide/constants");
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/userGuide/foundation"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _popover = _interopRequireDefault(require("../popover"));
var _button = _interopRequireDefault(require("../button"));
var _modal = _interopRequireDefault(require("../modal"));
var _function = require("@douyinfe/semi-foundation/lib/cjs/utils/function");
require("@douyinfe/semi-foundation/lib/cjs/userGuide/userGuide.css");
var _isNullOrUndefined = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/isNullOrUndefined"));
var _uuid = require("@douyinfe/semi-foundation/lib/cjs/utils/uuid");
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
var _utils = require("../_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
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
const prefixCls = _constants.cssClasses.PREFIX;
class UserGuide extends _baseComponent.default {
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
      const padding = (step === null || step === void 0 ? void 0 : step.spotlightPadding) || spotlightPadding || _constants.numbers.DEFAULT_SPOTLIGHT_PADDING;
      const isPrimaryTheme = theme === 'primary' || (step === null || step === void 0 ? void 0 : step.theme) === 'primary';
      const primaryStyle = isPrimaryTheme ? {
        backgroundColor: 'var(--semi-color-primary)'
      } : {};
      return /*#__PURE__*/_react.default.createElement(_popover.default, {
        key: `userGuide-popup-${index}`,
        className: (0, _classnames.default)(`${prefixCls}-popover`, className),
        style: Object.assign(Object.assign(Object.assign({}, basePopoverStyle), primaryStyle), style),
        content: this.renderPopupContent(step, index),
        position: step.position || position,
        trigger: "custom",
        visible: visible && isCurrentStep,
        showArrow: step.showArrow !== false
      }, /*#__PURE__*/_react.default.createElement("div", {
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
        indicatorContent.push(/*#__PURE__*/_react.default.createElement("span", {
          key: i,
          "data-index": i,
          className: (0, _classnames.default)([`${_constants.cssClasses.PREFIX_MODAL}-indicator-item`], {
            [`${_constants.cssClasses.PREFIX_MODAL}-indicator-item-active`]: i === current
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
      return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "UserGuide"
      }, (locale, localeCode) => (/*#__PURE__*/_react.default.createElement(_modal.default, {
        className: _constants.cssClasses.PREFIX_MODAL,
        bodyStyle: {
          padding: 0
        },
        header: null,
        visible: visible,
        maskClosable: false,
        mask: mask,
        centered: true,
        footer: null
      }, cover && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: `${_constants.cssClasses.PREFIX_MODAL}-cover`
      }, cover), /*#__PURE__*/_react.default.createElement("div", {
        className: `${_constants.cssClasses.PREFIX_MODAL}-indicator`
      }, this.renderIndicator())), (title || description) && (/*#__PURE__*/_react.default.createElement("div", {
        className: `${_constants.cssClasses.PREFIX_MODAL}-body`
      }, title && /*#__PURE__*/_react.default.createElement("div", {
        className: `${_constants.cssClasses.PREFIX_MODAL}-body-title`
      }, title), description && /*#__PURE__*/_react.default.createElement("div", {
        className: `${_constants.cssClasses.PREFIX_MODAL}-body-description`
      }, description))), /*#__PURE__*/_react.default.createElement("div", {
        className: `${_constants.cssClasses.PREFIX_MODAL}-footer`
      }, showSkipButton && !isLast && (/*#__PURE__*/_react.default.createElement(_button.default, {
        type: 'tertiary',
        onClick: this.foundation.handleSkip
      }, locale.skip)), showPrevButton && !isFirst && (/*#__PURE__*/_react.default.createElement(_button.default, Object.assign({
        type: 'tertiary',
        onClick: this.foundation.handlePrev
      }, prevButtonProps), (prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.children) || locale.prev)), /*#__PURE__*/_react.default.createElement(_button.default, Object.assign({
        theme: 'solid',
        onClick: this.foundation.handleNext
      }, nextButtonProps), isLast ? finishText || locale.finish : (nextButtonProps === null || nextButtonProps === void 0 ? void 0 : nextButtonProps.children) || locale.next)))));
    };
    this.foundation = new _foundation.default(this.adapter);
    this.state = {
      current: props.current || _constants.numbers.DEFAULT_CURRENT,
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
    if (!(0, _isNullOrUndefined.default)(props.current) && props.current !== state.current) {
      states.current = props.current;
    }
    return states;
  }
  componentDidMount() {
    this.foundation.init();
    this.scrollBarWidth = (0, _utils.getScrollbarWidth)();
    this.userGuideId = (0, _uuid.getUuidShort)();
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
        const padding = (step === null || step === void 0 ? void 0 : step.spotlightPadding) || spotlightPadding || _constants.numbers.DEFAULT_SPOTLIGHT_PADDING;
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
    return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "UserGuide"
    }, (locale, localeCode) => (/*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(`${popupPrefixCls}`, {
        [`${popupPrefixCls}-primary`]: isPrimaryTheme
      })
    }, cover && /*#__PURE__*/_react.default.createElement("div", {
      className: `${popupPrefixCls}-cover`
    }, cover), /*#__PURE__*/_react.default.createElement("div", {
      className: `${popupPrefixCls}-body`
    }, title && /*#__PURE__*/_react.default.createElement("div", {
      className: `${popupPrefixCls}-title`
    }, title), description && /*#__PURE__*/_react.default.createElement("div", {
      className: `${popupPrefixCls}-description`
    }, description), /*#__PURE__*/_react.default.createElement("div", {
      className: `${popupPrefixCls}-footer`
    }, steps.length > 1 && (/*#__PURE__*/_react.default.createElement("div", {
      className: `${popupPrefixCls}-indicator`
    }, current + 1, "/", steps.length)), /*#__PURE__*/_react.default.createElement("div", {
      className: `${popupPrefixCls}-buttons`
    }, showSkipButton && !isLast && (/*#__PURE__*/_react.default.createElement(_button.default, {
      style: isPrimaryTheme ? {
        backgroundColor: 'var(--semi-color-fill-2)'
      } : {},
      theme: isPrimaryTheme ? 'solid' : 'light',
      type: isPrimaryTheme ? 'primary' : 'tertiary',
      onClick: this.foundation.handleSkip
    }, locale.skip)), showPrevButton && !isFirst && (/*#__PURE__*/_react.default.createElement(_button.default, Object.assign({
      style: isPrimaryTheme ? {
        backgroundColor: 'var(--semi-color-fill-2)'
      } : {},
      theme: isPrimaryTheme ? 'solid' : 'light',
      type: isPrimaryTheme ? 'primary' : 'tertiary',
      onClick: this.foundation.handlePrev
    }, prevButtonProps), (prevButtonProps === null || prevButtonProps === void 0 ? void 0 : prevButtonProps.children) || locale.prev)), /*#__PURE__*/_react.default.createElement(_button.default, Object.assign({
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
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, spotlightRect ? (/*#__PURE__*/_react.default.createElement("svg", {
      className: `${prefixCls}-spotlight`,
      style: {
        zIndex
      }
    }, /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("mask", {
      id: `spotlight-${this.userGuideId}`
    }, /*#__PURE__*/_react.default.createElement("rect", {
      width: "100%",
      height: "100%",
      fill: "white"
    }), /*#__PURE__*/_react.default.createElement("rect", {
      className: `${prefixCls}-spotlight-rect`,
      x: spotlightRect.x,
      y: spotlightRect.y,
      width: spotlightRect.width,
      height: spotlightRect.height,
      rx: 4,
      fill: "black"
    }))), mask && (/*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("rect", {
      width: "100%",
      height: "100%",
      fill: "var(--semi-color-overlay-bg)",
      mask: `url(#spotlight-${this.userGuideId})`
    }), /*#__PURE__*/_react.default.createElement("rect", {
      x: 0,
      y: 0,
      width: "100%",
      height: spotlightRect.y,
      fill: "transparent",
      className: `${prefixCls}-spotlight-transparent-rect`
    }), /*#__PURE__*/_react.default.createElement("rect", {
      x: 0,
      y: spotlightRect.y,
      width: spotlightRect.x,
      height: spotlightRect.height,
      fill: "transparent",
      className: `${prefixCls}-spotlight-transparent-rect`
    }), /*#__PURE__*/_react.default.createElement("rect", {
      x: spotlightRect.x + spotlightRect.width,
      y: spotlightRect.y,
      width: `calc(100% - ${spotlightRect.x + spotlightRect.width}px)`,
      height: spotlightRect.height,
      fill: "transparent",
      className: `${prefixCls}-spotlight-transparent-rect`
    }), /*#__PURE__*/_react.default.createElement("rect", {
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
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, mode === 'popup' ? (/*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, steps === null || steps === void 0 ? void 0 : steps.map((step, index) => this.renderStep(step, index)), this.renderSpotlight())) : null, mode === 'modal' && this.renderModal());
  }
}
UserGuide.propTypes = {
  mask: _propTypes.default.bool,
  mode: _propTypes.default.oneOf(_constants.strings.MODE),
  onChange: _propTypes.default.func,
  onFinish: _propTypes.default.func,
  onNext: _propTypes.default.func,
  onPrev: _propTypes.default.func,
  onSkip: _propTypes.default.func,
  position: _propTypes.default.oneOf(_constants.strings.POSITION_SET),
  showPrevButton: _propTypes.default.bool,
  showSkipButton: _propTypes.default.bool,
  theme: _propTypes.default.oneOf(_constants.strings.THEME),
  visible: _propTypes.default.bool,
  getPopupContainer: _propTypes.default.func,
  zIndex: _propTypes.default.number
};
UserGuide.defaultProps = {
  mask: true,
  mode: 'popup',
  nextButtonProps: {},
  onChange: _function.noop,
  onFinish: _function.noop,
  onNext: _function.noop,
  onPrev: _function.noop,
  onSkip: _function.noop,
  position: 'bottom',
  prevButtonProps: {},
  showPrevButton: true,
  showSkipButton: true,
  steps: [],
  theme: 'default',
  visible: false,
  zIndex: _constants.numbers.DEFAULT_Z_INDEX
};
var _default = exports.default = UserGuide;