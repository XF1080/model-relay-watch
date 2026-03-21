"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/carousel/constants");
var _getDataAttr = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/getDataAttr"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

class CarouselIndicator extends _react.default.PureComponent {
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
      indicatorContent.push(/*#__PURE__*/_react.default.createElement("span", {
        // role='none' 
        key: i,
        "data-index": i,
        className: (0, _classnames.default)([`${_constants.cssClasses.CAROUSEL_INDICATOR}-item`], {
          [`${_constants.cssClasses.CAROUSEL_INDICATOR}-item-active`]: i === activeIndex,
          [`${_constants.cssClasses.CAROUSEL_INDICATOR}-item-${theme}`]: theme,
          [`${_constants.cssClasses.CAROUSEL_INDICATOR}-item-${size}`]: size
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
    const classNames = (0, _classnames.default)(className, {
      [_constants.cssClasses.CAROUSEL_INDICATOR]: true,
      [`${_constants.cssClasses.CAROUSEL_INDICATOR}-${type}`]: type,
      [`${_constants.cssClasses.CAROUSEL_INDICATOR}-${position}`]: position
    });
    const indicatorContent = this.renderIndicatorContent();
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: classNames,
      style: style
    }, (0, _getDataAttr.default)(restProps)), indicatorContent);
  }
}
CarouselIndicator.propTypes = {
  activeKey: _propTypes.default.number,
  className: _propTypes.default.string,
  position: _propTypes.default.oneOf(_constants.strings.POSITION_MAP),
  size: _propTypes.default.oneOf(_constants.strings.SIZE),
  style: _propTypes.default.object,
  theme: _propTypes.default.oneOf(_constants.strings.THEME_MAP),
  total: _propTypes.default.number,
  onIndicatorChange: _propTypes.default.func,
  type: _propTypes.default.oneOf(_constants.strings.TYPE_MAP),
  trigger: _propTypes.default.oneOf(_constants.strings.TRIGGER)
};
var _default = exports.default = CarouselIndicator;