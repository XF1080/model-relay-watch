import _get from "lodash/get";
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/carousel/constants';
import { IconChevronLeft, IconChevronRight } from "@douyinfe/semi-icons";
class CarouselArrow extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.renderLeftIcon = () => {
      return _get(this.props, 'arrowProps.leftArrow.children', /*#__PURE__*/React.createElement(IconChevronLeft, {
        "aria-label": "Previous index",
        size: "inherit"
      }));
    };
    this.renderRightIcon = () => {
      return _get(this.props, 'arrowProps.rightArrow.children', /*#__PURE__*/React.createElement(IconChevronRight, {
        "aria-label": "Next index",
        size: "inherit"
      }));
    };
  }
  render() {
    const {
      type,
      theme,
      prev,
      next
    } = this.props;
    const classNames = cls({
      [cssClasses.CAROUSEL_ARROW]: true,
      [`${cssClasses.CAROUSEL_ARROW}-${theme}`]: theme,
      [`${cssClasses.CAROUSEL_ARROW}-hover`]: type === 'hover'
    });
    const leftClassNames = cls({
      [`${cssClasses.CAROUSEL_ARROW}-prev`]: true,
      [`${cssClasses.CAROUSEL_ARROW}-${theme}`]: theme
    });
    const rightClassNames = cls({
      [`${cssClasses.CAROUSEL_ARROW}-next`]: true,
      [`${cssClasses.CAROUSEL_ARROW}-${theme}`]: theme
    });
    return /*#__PURE__*/React.createElement("div", {
      className: classNames
    }, /*#__PURE__*/React.createElement("div", Object.assign({
      // role='button'
      className: leftClassNames,
      onClick: prev
    }, _get(this.props, 'arrowProps.leftArrow.props'), {
      "x-semi-prop": "arrowProps.leftArrow.children"
    }), this.renderLeftIcon()), /*#__PURE__*/React.createElement("div", Object.assign({
      // role='button'
      // tabIndex={0} 
      className: rightClassNames,
      onClick: next
    }, _get(this.props, 'arrowProps.rightArrow.props'), {
      "x-semi-prop": "arrowProps.rightArrow.children"
    }), this.renderRightIcon()));
  }
}
export default CarouselArrow;