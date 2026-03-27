var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/carousel/constants';
import getDataAttr from '@douyinfe/semi-foundation/lib/es/utils/getDataAttr';
class CarouselIndicator extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.onIndicatorChange = activeIndex => {
      this.props.onIndicatorChange(activeIndex);
    };
    this.handleIndicatorClick = activeIndex => {
      const {
        trigger
      } = this.props;
      if (trigger === 'click') {
        this.onIndicatorChange(activeIndex);
      }
    };
    this.handleIndicatorHover = activeIndex => {
      const {
        trigger
      } = this.props;
      if (trigger === 'hover') {
        this.onIndicatorChange(activeIndex);
      }
    };
  }
  renderIndicatorContent() {
    const {
      total,
      theme,
      size,
      activeIndex
    } = this.props;
    const indicatorContent = [];
    for (let i = 0; i < total; i++) {
      indicatorContent.push(/*#__PURE__*/React.createElement("span", {
        // role='none' 
        key: i,
        "data-index": i,
        className: cls([`${cssClasses.CAROUSEL_INDICATOR}-item`], {
          [`${cssClasses.CAROUSEL_INDICATOR}-item-active`]: i === activeIndex,
          [`${cssClasses.CAROUSEL_INDICATOR}-item-${theme}`]: theme,
          [`${cssClasses.CAROUSEL_INDICATOR}-item-${size}`]: size
        }),
        onClick: () => this.handleIndicatorClick(i),
        onMouseEnter: () => this.handleIndicatorHover(i)
      }));
    }
    return indicatorContent;
  }
  render() {
    const _a = this.props,
      {
        type,
        size,
        theme,
        style,
        className,
        position
      } = _a,
      restProps = __rest(_a, ["type", "size", "theme", "style", "className", "position"]);
    const classNames = cls(className, {
      [cssClasses.CAROUSEL_INDICATOR]: true,
      [`${cssClasses.CAROUSEL_INDICATOR}-${type}`]: type,
      [`${cssClasses.CAROUSEL_INDICATOR}-${position}`]: position
    });
    const indicatorContent = this.renderIndicatorContent();
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: classNames,
      style: style
    }, getDataAttr(restProps)), indicatorContent);
  }
}
CarouselIndicator.propTypes = {
  activeKey: PropTypes.number,
  className: PropTypes.string,
  position: PropTypes.oneOf(strings.POSITION_MAP),
  size: PropTypes.oneOf(strings.SIZE),
  style: PropTypes.object,
  theme: PropTypes.oneOf(strings.THEME_MAP),
  total: PropTypes.number,
  onIndicatorChange: PropTypes.func,
  type: PropTypes.oneOf(strings.TYPE_MAP),
  trigger: PropTypes.oneOf(strings.TRIGGER)
};
export default CarouselIndicator;