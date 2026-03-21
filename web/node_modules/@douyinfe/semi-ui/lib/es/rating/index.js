var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import BaseComponent from '../_base/baseComponent';
import cls from 'classnames';
import ConfigContext from '../configProvider/context';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/rating/constants';
import PropTypes from 'prop-types';
import { noop } from '@douyinfe/semi-foundation/lib/es/utils/function';
import Item from './item';
import Tooltip from '../tooltip';
import RatingFoundation from '@douyinfe/semi-foundation/lib/es/rating/foundation';
import '@douyinfe/semi-foundation/lib/es/rating/rating.css';
export default class Rating extends BaseComponent {
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
        const content = /*#__PURE__*/React.createElement(Item, {
          ref: this.saveRef(ind),
          index: ind,
          count: count,
          prefixCls: `${prefixCls}-star`,
          allowHalf: allowHalf,
          value: hoverValue === undefined ? value : hoverValue,
          onClick: disabled ? noop : this.onClick,
          onHover: disabled ? noop : this.onHover,
          key: ind,
          disabled: disabled,
          character: character,
          focused: focused,
          size: ind === count ? 0 : size,
          ariaLabelPrefix: ariaLabelPrefix,
          onFocus: disabled || count !== ind ? noop : this.handleStarFocusVisible,
          onBlur: disabled || count !== ind ? noop : this.handleStarBlur
        });
        if (tooltips) {
          const text = tooltips[ind] ? tooltips[ind] : '';
          const showTips = hoverValue - 1 === ind;
          return /*#__PURE__*/React.createElement(Tooltip, {
            visible: showTips,
            trigger: "custom",
            content: text,
            key: `${ind}-${showTips}`
          }, /*#__PURE__*/React.createElement("span", {
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
    this.foundation = new RatingFoundation(this.adapter);
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
    const listCls = cls(prefixCls, {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-focus`]: emptyStarFocusVisible
    }, className);
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      React.createElement("ul", Object.assign({
        "aria-label": ariaLabel,
        "aria-labelledby": this.props['aria-labelledby'],
        "aria-describedby": this.props['aria-describedby'],
        className: listCls,
        style: style,
        onMouseLeave: disabled ? noop : this.onMouseLeave,
        tabIndex: disabled ? -1 : tabIndex,
        onFocus: disabled ? noop : this.onFocus,
        onBlur: disabled ? noop : this.onBlur,
        onKeyDown: disabled ? noop : this.onKeyDown,
        ref: this.saveRate,
        id: id
      }, this.getDataAttr(rest)), itemList)
    );
  }
}
Rating.contextType = ConfigContext;
Rating.propTypes = {
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-required': PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  count: PropTypes.number,
  allowHalf: PropTypes.bool,
  allowClear: PropTypes.bool,
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  onChange: PropTypes.func,
  onHoverChange: PropTypes.func,
  className: PropTypes.string,
  character: PropTypes.node,
  tabIndex: PropTypes.number,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  autoFocus: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.oneOf(strings.SIZE_SET), PropTypes.number]),
  tooltips: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
  preventScroll: PropTypes.bool
};
Rating.defaultProps = {
  defaultValue: 0,
  count: 5,
  allowHalf: false,
  allowClear: true,
  style: {},
  prefixCls: cssClasses.PREFIX,
  onChange: noop,
  onHoverChange: noop,
  tabIndex: -1,
  size: 'default'
};