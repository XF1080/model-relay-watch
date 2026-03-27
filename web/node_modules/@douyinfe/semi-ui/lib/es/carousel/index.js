import _debounce from "lodash/debounce";
import React, { Children } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import BaseComponent from "../_base/baseComponent";
import { cssClasses, numbers, strings } from '@douyinfe/semi-foundation/lib/es/carousel/constants';
import CarouselFoundation from '@douyinfe/semi-foundation/lib/es/carousel/foundation';
import CarouselIndicator from './CarouselIndicator';
import CarouselArrow from './CarouselArrow';
import '@douyinfe/semi-foundation/lib/es/carousel/carousel.css';
import isNullOrUndefined from '@douyinfe/semi-foundation/lib/es/utils/isNullOrUndefined';
class Carousel extends BaseComponent {
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
      return Children.toArray(originChildren).filter(child => {
        return /*#__PURE__*/React.isValidElement(child);
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
      return /*#__PURE__*/React.createElement(React.Fragment, null, children.map((child, index) => {
        const isCurrent = index === activeIndex;
        const isPrev = index === this.getValidIndex(activeIndex - 1);
        const isNext = index === this.getValidIndex(activeIndex + 1);
        const animateStyle = {
          transitionTimingFunction: 'ease',
          transitionDuration: `${speed}ms`,
          animationTimingFunction: 'ease',
          animationDuration: `${speed}ms`
        };
        return /*#__PURE__*/React.cloneElement(child, {
          style: Object.assign(Object.assign({}, child.props.style), animateStyle),
          className: cls(child.props.className, {
            [`${cssClasses.CAROUSEL_CONTENT}-item-prev`]: isPrev,
            [`${cssClasses.CAROUSEL_CONTENT}-item-next`]: isNext,
            [`${cssClasses.CAROUSEL_CONTENT}-item-current`]: isCurrent,
            [`${cssClasses.CAROUSEL_CONTENT}-item`]: true,
            [`${cssClasses.CAROUSEL_CONTENT}-item-active`]: isCurrent,
            [`${cssClasses.CAROUSEL_CONTENT}-item-slide-in`]: animation === 'slide' && !isInit && isCurrent,
            [`${cssClasses.CAROUSEL_CONTENT}-item-slide-out`]: animation === 'slide' && !isInit && index === preIndex
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
      const carouselIndicatorCls = cls({
        [cssClasses.CAROUSEL_INDICATOR]: true
      });
      const children = this.getChildren();
      if (showIndicator && children.length > 1) {
        return /*#__PURE__*/React.createElement("div", {
          className: carouselIndicatorCls
        }, /*#__PURE__*/React.createElement(CarouselIndicator, {
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
        return /*#__PURE__*/React.createElement(CarouselArrow, {
          type: arrowType,
          theme: theme,
          prev: this.prev,
          next: this.next,
          arrowProps: arrowProps
        });
      }
      return null;
    };
    this.foundation = new CarouselFoundation(this.adapter);
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
    if (!isNullOrUndefined(props.activeIndex) && props.activeIndex !== state.activeIndex) {
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
    const carouselWrapperCls = cls(className, {
      [cssClasses.CAROUSEL]: true
    });
    return /*#__PURE__*/React.createElement("div", Object.assign({
      // role='listbox'
      // tabIndex={0}
      className: carouselWrapperCls,
      style: style,
      onMouseEnter: _debounce(this.handleMouseEnter, 400),
      onMouseLeave: _debounce(this.handleMouseLeave, 400)
    }, this.getDataAttr(this.props)), /*#__PURE__*/React.createElement("div", {
      className: cls([`${cssClasses.CAROUSEL_CONTENT}-${animation}`], {
        [`${cssClasses.CAROUSEL_CONTENT}`]: true,
        [`${cssClasses.CAROUSEL_CONTENT}-reverse`]: slideDirection === 'left' ? isReverse : !isReverse
      }),
      "x-semi-prop": "children"
    }, this.renderChildren()), this.renderIndicator(), this.renderArrow());
  }
}
Carousel.propTypes = {
  activeIndex: PropTypes.number,
  animation: PropTypes.oneOf(strings.ANIMATION_MAP),
  arrowProps: PropTypes.object,
  autoPlay: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  className: PropTypes.string,
  defaultActiveIndex: PropTypes.number,
  indicatorPosition: PropTypes.oneOf(strings.POSITION_MAP),
  indicatorSize: PropTypes.oneOf(strings.SIZE),
  indicatorType: PropTypes.oneOf(strings.TYPE_MAP),
  theme: PropTypes.oneOf(strings.THEME_MAP),
  onChange: PropTypes.func,
  arrowType: PropTypes.oneOf(strings.ARROW_MAP),
  showArrow: PropTypes.bool,
  showIndicator: PropTypes.bool,
  slideDirection: PropTypes.oneOf(strings.DIRECTION),
  speed: PropTypes.number,
  style: PropTypes.object,
  trigger: PropTypes.oneOf(strings.TRIGGER)
};
Carousel.defaultProps = {
  children: [],
  animation: 'slide',
  autoPlay: true,
  arrowType: 'always',
  defaultActiveIndex: numbers.DEFAULT_ACTIVE_INDEX,
  indicatorPosition: 'center',
  indicatorSize: 'small',
  indicatorType: 'dot',
  theme: 'light',
  onChange: () => undefined,
  showArrow: true,
  showIndicator: true,
  slideDirection: 'left',
  speed: numbers.DEFAULT_SPEED,
  trigger: 'click'
};
export default Carousel;