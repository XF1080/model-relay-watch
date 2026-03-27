"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/carousel/constants");
var _semiIcons = require("@douyinfe/semi-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

class CarouselArrow extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.renderLeftIcon = () => {
      return (0, _get2.default)(this.props, 'arrowProps.leftArrow.children', /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronLeft, {
        "aria-label": "Previous index",
        size: "inherit"
      }));
    };
    this.renderRightIcon = () => {
      return (0, _get2.default)(this.props, 'arrowProps.rightArrow.children', /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronRight, {
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
    const classNames = (0, _classnames.default)({
      [_constants.cssClasses.CAROUSEL_ARROW]: true,
      [`${_constants.cssClasses.CAROUSEL_ARROW}-${theme}`]: theme,
      [`${_constants.cssClasses.CAROUSEL_ARROW}-hover`]: type === 'hover'
    });
    const leftClassNames = (0, _classnames.default)({
      [`${_constants.cssClasses.CAROUSEL_ARROW}-prev`]: true,
      [`${_constants.cssClasses.CAROUSEL_ARROW}-${theme}`]: theme
    });
    const rightClassNames = (0, _classnames.default)({
      [`${_constants.cssClasses.CAROUSEL_ARROW}-next`]: true,
      [`${_constants.cssClasses.CAROUSEL_ARROW}-${theme}`]: theme
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      className: classNames
    }, /*#__PURE__*/_react.default.createElement("div", Object.assign({
      // role='button'
      className: leftClassNames,
      onClick: prev
    }, (0, _get2.default)(this.props, 'arrowProps.leftArrow.props'), {
      "x-semi-prop": "arrowProps.leftArrow.children"
    }), this.renderLeftIcon()), /*#__PURE__*/_react.default.createElement("div", Object.assign({
      // role='button'
      // tabIndex={0} 
      className: rightClassNames,
      onClick: next
    }, (0, _get2.default)(this.props, 'arrowProps.rightArrow.props'), {
      "x-semi-prop": "arrowProps.rightArrow.children"
    }), this.renderRightIcon()));
  }
}
var _default = exports.default = CarouselArrow;