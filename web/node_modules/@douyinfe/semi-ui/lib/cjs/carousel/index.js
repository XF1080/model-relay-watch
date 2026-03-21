"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _debounce2 = _interopRequireDefault(require("lodash/debounce"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/carousel/constants");
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/carousel/foundation"));
var _CarouselIndicator = _interopRequireDefault(require("./CarouselIndicator"));
var _CarouselArrow = _interopRequireDefault(require("./CarouselArrow"));
require("@douyinfe/semi-foundation/lib/cjs/carousel/carousel.css");
var _isNullOrUndefined = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/isNullOrUndefined"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Carousel extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.play = () => {
      this.foundation.setForcePlay(true);
      return this.foundation.handleAutoPlay();
    };
    this.stop = () => {
      this.foundation.setForcePlay(false);
      return this.foundation.stop();
    };
    this.goTo = targetIndex => {
      return this.foundation.goTo(targetIndex);
    };
    this.prev = () => {
      return this.foundation.prev();
    };
    this.next = () => {
      return this.foundation.next();
    };
    this.handleAutoPlay = () => {
      if (!this.foundation.getIsControlledComponent()) {
        this.foundation.handleAutoPlay();
      }
    };
    this.handleMouseEnter = () => {
      const {
        autoPlay
      } = this.props;
      if (autoPlay === true || typeof autoPlay === 'object' && autoPlay.hoverToPause) {
        this.foundation.stop();
      }
    };
    this.handleMouseLeave = () => {
      const {
        autoPlay
      } = this.props;
      if ((typeof autoPlay !== 'object' || autoPlay.hoverToPause) && !this.foundation.getIsControlledComponent()) {
        this.foundation.handleAutoPlay();
      }
    };
    this.onIndicatorChange = activeIndex => {
      return this.foundation.onIndicatorChange(activeIndex);
    };
    this.getChildren = () => {
      const {
        children: originChildren
      } = this.props;
      return _react.Children.toArray(originChildren).filter(child => {
        return /*#__PURE__*/_react.default.isValidElement(child);
      });
    };
    this.getValidIndex = activeIndex => {
      return this.foundation.getValidIndex(activeIndex);
    };
    this.renderChildren = () => {
      const {
        speed,
        animation
      } = this.props;
      const {
        activeIndex,
        preIndex,
        isInit
      } = this.state;
      const children = this.getChildren();
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children.map((child, index) => {
        const isCurrent = index === activeIndex;
        const isPrev = index === this.getValidIndex(activeIndex - 1);
        const isNext = index === this.getValidIndex(activeIndex + 1);
        const animateStyle = {
          transitionTimingFunction: 'ease',
          transitionDuration: `${speed}ms`,
          animationTimingFunction: 'ease',
          animationDuration: `${speed}ms`
        };
        return /*#__PURE__*/_react.default.cloneElement(child, {
          style: Object.assign(Object.assign({}, child.props.style), animateStyle),
          className: (0, _classnames.default)(child.props.className, {
            [`${_constants.cssClasses.CAROUSEL_CONTENT}-item-prev`]: isPrev,
            [`${_constants.cssClasses.CAROUSEL_CONTENT}-item-next`]: isNext,
            [`${_constants.cssClasses.CAROUSEL_CONTENT}-item-current`]: isCurrent,
            [`${_constants.cssClasses.CAROUSEL_CONTENT}-item`]: true,
            [`${_constants.cssClasses.CAROUSEL_CONTENT}-item-active`]: isCurrent,
            [`${_constants.cssClasses.CAROUSEL_CONTENT}-item-slide-in`]: animation === 'slide' && !isInit && isCurrent,
            [`${_constants.cssClasses.CAROUSEL_CONTENT}-item-slide-out`]: animation === 'slide' && !isInit && index === preIndex
          })
        });
      }));
    };
    this.renderIndicator = () => {
      const {
        activeIndex
      } = this.state;
      const {
        showIndicator,
        indicatorType,
        theme,
        indicatorPosition,
        indicatorSize,
        trigger
      } = this.props;
      const carouselIndicatorCls = (0, _classnames.default)({
        [_constants.cssClasses.CAROUSEL_INDICATOR]: true
      });
      const children = this.getChildren();
      if (showIndicator && children.length > 1) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: carouselIndicatorCls
        }, /*#__PURE__*/_react.default.createElement(_CarouselIndicator.default, {
          type: indicatorType,
          total: children.length,
          activeIndex: activeIndex,
          position: indicatorPosition,
          trigger: trigger,
          size: indicatorSize,
          theme: theme,
          onIndicatorChange: this.onIndicatorChange
        }));
      }
      return null;
    };
    this.renderArrow = () => {
      const {
        showArrow,
        arrowType,
        theme,
        arrowProps
      } = this.props;
      const children = this.getChildren();
      if (showArrow && children.length > 1) {
        return /*#__PURE__*/_react.default.createElement(_CarouselArrow.default, {
          type: arrowType,
          theme: theme,
          prev: this.prev,
          next: this.next,
          arrowProps: arrowProps
        });
      }
      return null;
    };
    this.foundation = new _foundation.default(this.adapter);
    const defaultActiveIndex = this.foundation.getDefaultActiveIndex();
    this.state = {
      activeIndex: defaultActiveIndex,
      preIndex: defaultActiveIndex,
      isReverse: false,
      isInit: true
    };
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      notifyChange: (activeIndex, preIndex) => {
        this.props.onChange(activeIndex, preIndex);
      },
      setNewActiveIndex: activeIndex => {
        this.setState({
          activeIndex
        });
      },
      setPreActiveIndex: preIndex => {
        this.setState({
          preIndex
        });
      },
      setIsReverse: isReverse => {
        this.setState({
          isReverse
        });
      },
      setIsInit: isInit => {
        this.setState({
          isInit
        });
      },
      getChildren: () => {
        return this.getChildren();
      }
    });
  }
  static getDerivedStateFromProps(props, state) {
    const states = {};
    if (!(0, _isNullOrUndefined.default)(props.activeIndex) && props.activeIndex !== state.activeIndex) {
      states.activeIndex = props.activeIndex;
    }
    return states;
  }
  componentDidMount() {
    this.handleAutoPlay();
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  render() {
    const {
      animation,
      className,
      style,
      slideDirection
    } = this.props;
    const {
      isReverse
    } = this.state;
    const carouselWrapperCls = (0, _classnames.default)(className, {
      [_constants.cssClasses.CAROUSEL]: true
    });
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      // role='listbox'
      // tabIndex={0}
      className: carouselWrapperCls,
      style: style,
      onMouseEnter: (0, _debounce2.default)(this.handleMouseEnter, 400),
      onMouseLeave: (0, _debounce2.default)(this.handleMouseLeave, 400)
    }, this.getDataAttr(this.props)), /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)([`${_constants.cssClasses.CAROUSEL_CONTENT}-${animation}`], {
        [`${_constants.cssClasses.CAROUSEL_CONTENT}`]: true,
        [`${_constants.cssClasses.CAROUSEL_CONTENT}-reverse`]: slideDirection === 'left' ? isReverse : !isReverse
      }),
      "x-semi-prop": "children"
    }, this.renderChildren()), this.renderIndicator(), this.renderArrow());
  }
}
Carousel.propTypes = {
  activeIndex: _propTypes.default.number,
  animation: _propTypes.default.oneOf(_constants.strings.ANIMATION_MAP),
  arrowProps: _propTypes.default.object,
  autoPlay: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.object]),
  className: _propTypes.default.string,
  defaultActiveIndex: _propTypes.default.number,
  indicatorPosition: _propTypes.default.oneOf(_constants.strings.POSITION_MAP),
  indicatorSize: _propTypes.default.oneOf(_constants.strings.SIZE),
  indicatorType: _propTypes.default.oneOf(_constants.strings.TYPE_MAP),
  theme: _propTypes.default.oneOf(_constants.strings.THEME_MAP),
  onChange: _propTypes.default.func,
  arrowType: _propTypes.default.oneOf(_constants.strings.ARROW_MAP),
  showArrow: _propTypes.default.bool,
  showIndicator: _propTypes.default.bool,
  slideDirection: _propTypes.default.oneOf(_constants.strings.DIRECTION),
  speed: _propTypes.default.number,
  style: _propTypes.default.object,
  trigger: _propTypes.default.oneOf(_constants.strings.TRIGGER)
};
Carousel.defaultProps = {
  children: [],
  animation: 'slide',
  autoPlay: true,
  arrowType: 'always',
  defaultActiveIndex: _constants.numbers.DEFAULT_ACTIVE_INDEX,
  indicatorPosition: 'center',
  indicatorSize: 'small',
  indicatorType: 'dot',
  theme: 'light',
  onChange: () => undefined,
  showArrow: true,
  showIndicator: true,
  slideDirection: 'left',
  speed: _constants.numbers.DEFAULT_SPEED,
  trigger: 'click'
};
var _default = exports.default = Carousel;