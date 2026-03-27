"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _classnames = _interopRequireDefault(require("classnames"));
var _context = _interopRequireDefault(require("../configProvider/context"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/rating/constants");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _function = require("@douyinfe/semi-foundation/lib/cjs/utils/function");
var _item = _interopRequireDefault(require("./item"));
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/rating/foundation"));
require("@douyinfe/semi-foundation/lib/cjs/rating/rating.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
class Rating extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.rate = null;
    this.onHover = (event, index) => {
      this.foundation.handleHover(event, index);
    };
    this.onMouseLeave = () => {
      this.foundation.handleMouseLeave();
    };
    this.onClick = (event, index) => {
      this.foundation.handleClick(event, index);
    };
    this.onFocus = e => {
      this.foundation.handleFocus(e);
    };
    this.onBlur = e => {
      this.foundation.handleBlur(e);
    };
    this.onKeyDown = event => {
      const {
        value
      } = this.state;
      this.foundation.handleKeyDown(event, value);
    };
    this.focus = () => {
      const {
        disabled,
        preventScroll
      } = this.props;
      if (!disabled) {
        this.rate.focus({
          preventScroll
        });
      }
    };
    this.blur = () => {
      const {
        disabled
      } = this.props;
      if (!disabled) {
        this.rate.blur();
      }
    };
    this.saveRef = index => node => {
      this.stars[index] = node;
    };
    this.saveRate = node => {
      this.rate = node;
    };
    this.handleStarFocusVisible = event => {
      this.foundation.handleStarFocusVisible(event);
    };
    this.handleStarBlur = event => {
      this.foundation.handleStarBlur(event);
    };
    this.getAriaLabelPrefix = () => {
      if (this.props['aria-label']) {
        return this.props['aria-label'];
      }
      let prefix = 'star';
      const {
        character
      } = this.props;
      if (typeof character === 'string') {
        prefix = character;
      }
      return prefix;
    };
    this.getItemList = ariaLabelPrefix => {
      const {
        count,
        allowHalf,
        prefixCls,
        disabled,
        character,
        size,
        tooltips
      } = this.props;
      const {
        value,
        hoverValue,
        focused
      } = this.state;
      // index == count is for Empty rating
      const itemList = [...Array(count + 1).keys()].map(ind => {
        const content = /*#__PURE__*/_react.default.createElement(_item.default, {
          ref: this.saveRef(ind),
          index: ind,
          count: count,
          prefixCls: `${prefixCls}-star`,
          allowHalf: allowHalf,
          value: hoverValue === undefined ? value : hoverValue,
          onClick: disabled ? _function.noop : this.onClick,
          onHover: disabled ? _function.noop : this.onHover,
          key: ind,
          disabled: disabled,
          character: character,
          focused: focused,
          size: ind === count ? 0 : size,
          ariaLabelPrefix: ariaLabelPrefix,
          onFocus: disabled || count !== ind ? _function.noop : this.handleStarFocusVisible,
          onBlur: disabled || count !== ind ? _function.noop : this.handleStarBlur
        });
        if (tooltips) {
          const text = tooltips[ind] ? tooltips[ind] : '';
          const showTips = hoverValue - 1 === ind;
          return /*#__PURE__*/_react.default.createElement(_tooltip.default, {
            visible: showTips,
            trigger: "custom",
            content: text,
            key: `${ind}-${showTips}`
          }, /*#__PURE__*/_react.default.createElement("span", {
            className: `${prefixCls}-star-outer`
          }, content));
        }
        return content;
      });
      return itemList;
    };
    const value = props.value === undefined ? props.defaultValue : props.value;
    this.stars = {};
    this.state = {
      value,
      focused: false,
      hoverValue: undefined,
      clearedValue: null,
      emptyStarFocusVisible: false
    };
    this.foundation = new _foundation.default(this.adapter);
  }
  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps && nextProps.value !== undefined) {
      return Object.assign(Object.assign({}, state), {
        value: nextProps.value
      });
    }
    return state;
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      focus: () => {
        const {
          disabled,
          count
        } = this.props;
        const {
          value
        } = this.state;
        if (!disabled) {
          const index = Math.ceil(value) - 1;
          this.stars[index < 0 ? count : index].starFocus();
        }
      },
      getStarDOM: index => {
        const instance = this.stars && this.stars[index];
        return instance.getDomNode();
      },
      notifyHoverChange: (hoverValue, clearedValue) => {
        const {
          onHoverChange
        } = this.props;
        this.setState({
          hoverValue,
          clearedValue
        });
        onHoverChange(hoverValue);
      },
      updateValue: value => {
        const {
          onChange
        } = this.props;
        if (!('value' in this.props)) {
          this.setState({
            value
          });
        }
        onChange(value);
      },
      clearValue: clearedValue => {
        this.setState({
          clearedValue
        });
      },
      notifyFocus: e => {
        const {
          onFocus
        } = this.props;
        this.setState({
          focused: true
        });
        onFocus && onFocus(e);
      },
      notifyBlur: e => {
        const {
          onBlur
        } = this.props;
        this.setState({
          focused: false
        });
        onBlur && onBlur(e);
      },
      notifyKeyDown: e => {
        const {
          onKeyDown
        } = this.props;
        this.setState({
          focused: false
        });
        onKeyDown && onKeyDown(e);
      },
      setEmptyStarFocusVisible: focusVisible => {
        this.setState({
          emptyStarFocusVisible: focusVisible
        });
      }
    });
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  render() {
    const _a = this.props,
      {
        style,
        prefixCls,
        disabled,
        className,
        id,
        count,
        tabIndex
      } = _a,
      rest = __rest(_a, ["style", "prefixCls", "disabled", "className", "id", "count", "tabIndex"]);
    const {
      value,
      emptyStarFocusVisible
    } = this.state;
    const ariaLabelPrefix = this.getAriaLabelPrefix();
    const ariaLabel = `Rating: ${value} of ${count} ${ariaLabelPrefix}${value === 1 ? '' : 's'},`;
    const itemList = this.getItemList(ariaLabelPrefix);
    const listCls = (0, _classnames.default)(prefixCls, {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-focus`]: emptyStarFocusVisible
    }, className);
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      _react.default.createElement("ul", Object.assign({
        "aria-label": ariaLabel,
        "aria-labelledby": this.props['aria-labelledby'],
        "aria-describedby": this.props['aria-describedby'],
        className: listCls,
        style: style,
        onMouseLeave: disabled ? _function.noop : this.onMouseLeave,
        tabIndex: disabled ? -1 : tabIndex,
        onFocus: disabled ? _function.noop : this.onFocus,
        onBlur: disabled ? _function.noop : this.onBlur,
        onKeyDown: disabled ? _function.noop : this.onKeyDown,
        ref: this.saveRate,
        id: id
      }, this.getDataAttr(rest)), itemList)
    );
  }
}
exports.default = Rating;
Rating.contextType = _context.default;
Rating.propTypes = {
  'aria-describedby': _propTypes.default.string,
  'aria-errormessage': _propTypes.default.string,
  'aria-invalid': _propTypes.default.bool,
  'aria-label': _propTypes.default.string,
  'aria-labelledby': _propTypes.default.string,
  'aria-required': _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  value: _propTypes.default.number,
  defaultValue: _propTypes.default.number,
  count: _propTypes.default.number,
  allowHalf: _propTypes.default.bool,
  allowClear: _propTypes.default.bool,
  style: _propTypes.default.object,
  prefixCls: _propTypes.default.string,
  onChange: _propTypes.default.func,
  onHoverChange: _propTypes.default.func,
  className: _propTypes.default.string,
  character: _propTypes.default.node,
  tabIndex: _propTypes.default.number,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  autoFocus: _propTypes.default.bool,
  size: _propTypes.default.oneOfType([_propTypes.default.oneOf(_constants.strings.SIZE_SET), _propTypes.default.number]),
  tooltips: _propTypes.default.arrayOf(_propTypes.default.string),
  id: _propTypes.default.string,
  preventScroll: _propTypes.default.bool
};
Rating.defaultProps = {
  defaultValue: 0,
  count: 5,
  allowHalf: false,
  allowClear: true,
  style: {},
  prefixCls: _constants.cssClasses.PREFIX,
  onChange: _function.noop,
  onHoverChange: _function.noop,
  tabIndex: -1,
  size: 'default'
};