"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/rating/constants");
require("@douyinfe/semi-foundation/lib/cjs/rating/rating.css");
var _semiIcons = require("@douyinfe/semi-icons");
var _foundation = require("@douyinfe/semi-foundation/lib/cjs/rating/foundation");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Item extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.getDomNode = () => {
      return this.liRef && this.liRef.current;
    };
    this.firstStar = null;
    this.secondStar = null;
    this.onHover = e => {
      const {
        onHover,
        index
      } = this.props;
      onHover(e, index);
    };
    this.onClick = e => {
      const {
        onClick,
        index
      } = this.props;
      onClick(e, index);
    };
    this.onFocus = (e, star) => {
      const {
        onFocus
      } = this.props;
      onFocus && onFocus(e);
      this.foundation.handleFocusVisible(e, star);
    };
    this.onBlur = (e, star) => {
      const {
        onBlur
      } = this.props;
      onBlur && onBlur(e);
      this.foundation.handleBlur(e, star);
    };
    this.onKeyDown = e => {
      const {
        onClick,
        index
      } = this.props;
      if (e.keyCode === 13) {
        onClick(e, index);
      }
    };
    this.starFocus = () => {
      const {
        value,
        index,
        preventScroll
      } = this.props;
      if (value - index === 0.5) {
        this.firstStar.focus({
          preventScroll
        });
      } else {
        this.secondStar.focus({
          preventScroll
        });
      }
    };
    this.saveFirstStar = node => {
      this.firstStar = node;
    };
    this.saveSecondStar = node => {
      this.secondStar = node;
    };
    this.liRef = /*#__PURE__*/_react.default.createRef();
    this.state = {
      firstStarFocus: false,
      secondStarFocus: false
    };
    this.foundation = new _foundation.RatingItemFoundation(this.adapter);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setFirstStarFocus: value => {
        this.setState({
          firstStarFocus: value
        });
      },
      setSecondStarFocus: value => {
        this.setState({
          secondStarFocus: value
        });
      }
    });
  }
  render() {
    const {
      index,
      prefixCls,
      character,
      count,
      value,
      disabled,
      allowHalf,
      focused,
      size,
      ariaLabelPrefix
    } = this.props;
    const {
      firstStarFocus,
      secondStarFocus
    } = this.state;
    const starValue = index + 1;
    const diff = starValue - value;
    // const isHalf = allowHalf && value + 0.5 === starValue;
    const isHalf = allowHalf && diff < 1 && diff > 0;
    const firstWidth = 1 - diff;
    const isFull = starValue <= value;
    const isCustomSize = typeof size === 'number';
    const starCls = (0, _classnames.default)(prefixCls, {
      [`${prefixCls}-half`]: isHalf,
      [`${prefixCls}-full`]: isFull,
      [`${prefixCls}-${size}`]: !isCustomSize
    });
    const sizeStyle = isCustomSize ? {
      width: size,
      height: size,
      fontSize: size
    } : {};
    const iconSize = isCustomSize ? 'inherit' : size === 'small' ? 'default' : 'extra-large';
    const content = character ? character : /*#__PURE__*/_react.default.createElement(_semiIcons.IconStar, {
      size: iconSize,
      style: {
        display: 'block'
      }
    });
    const isEmpty = index === count;
    const starWrapCls = (0, _classnames.default)(`${prefixCls}-wrapper`, {
      [`${prefixCls}-disabled`]: disabled,
      [`${_constants.cssClasses.PREFIX}-focus`]: (firstStarFocus || secondStarFocus) && value !== 0
    });
    const starWrapProps = {
      onClick: disabled ? null : this.onClick,
      onKeyDown: disabled ? null : this.onKeyDown,
      onMouseMove: disabled ? null : this.onHover,
      className: starWrapCls
    };
    const AriaSetSize = allowHalf ? count * 2 + 1 : count + 1;
    const firstStarProps = {
      ref: this.saveFirstStar,
      role: "radio",
      'aria-checked': value === index + 0.5,
      'aria-posinset': 2 * index + 1,
      'aria-setsize': AriaSetSize,
      'aria-disabled': disabled,
      'aria-label': `${index + 0.5} ${ariaLabelPrefix}s`,
      'aria-labelledby': this.props['aria-describedby'],
      'aria-describedby': this.props['aria-describedby'],
      className: (0, _classnames.default)(`${prefixCls}-first`, `${_constants.cssClasses.PREFIX}-no-focus`),
      tabIndex: !disabled && value === index + 0.5 ? 0 : -1,
      onFocus: e => {
        this.onFocus(e, 'first');
      },
      onBlur: e => {
        this.onBlur(e, 'first');
      }
    };
    const secondStarTabIndex = !disabled && (value === index + 1 || isEmpty && value === 0) ? 0 : -1;
    const secondStarProps = {
      ref: this.saveSecondStar,
      role: "radio",
      'aria-checked': isEmpty ? value === 0 : value === index + 1,
      'aria-posinset': allowHalf ? 2 * (index + 1) : index + 1,
      'aria-setsize': AriaSetSize,
      'aria-disabled': disabled,
      'aria-label': `${isEmpty ? 0 : index + 1} ${ariaLabelPrefix}${index === 0 ? '' : 's'}`,
      'aria-labelledby': this.props['aria-describedby'],
      'aria-describedby': this.props['aria-describedby'],
      className: (0, _classnames.default)(`${prefixCls}-second`, `${_constants.cssClasses.PREFIX}-no-focus`),
      tabIndex: secondStarTabIndex,
      onFocus: e => {
        this.onFocus(e, 'second');
      },
      onBlur: e => {
        this.onBlur(e, 'second');
      }
    };
    return /*#__PURE__*/_react.default.createElement("li", {
      className: starCls,
      style: Object.assign({}, sizeStyle),
      key: index,
      ref: this.liRef
    }, /*#__PURE__*/_react.default.createElement("div", Object.assign({}, starWrapProps), allowHalf && !isEmpty && /*#__PURE__*/_react.default.createElement("div", Object.assign({}, firstStarProps, {
      style: {
        width: `${firstWidth * 100}%`
      }
    }), content), /*#__PURE__*/_react.default.createElement("div", Object.assign({}, secondStarProps, {
      "x-semi-prop": "character"
    }), content)));
  }
}
exports.default = Item;
Item.propTypes = {
  value: _propTypes.default.number,
  index: _propTypes.default.number,
  prefixCls: _propTypes.default.string,
  allowHalf: _propTypes.default.bool,
  onHover: _propTypes.default.func,
  onClick: _propTypes.default.func,
  character: _propTypes.default.node,
  focused: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  count: _propTypes.default.number,
  ariaLabelPrefix: _propTypes.default.string,
  size: _propTypes.default.oneOfType([_propTypes.default.oneOf(_constants.strings.SIZE_SET), _propTypes.default.number]),
  'aria-describedby': _propTypes.default.string,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  preventScroll: _propTypes.default.bool
};