"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isObject2 = _interopRequireDefault(require("lodash/isObject"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/anchor/constants");
var _linkFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/anchor/linkFoundation"));
var _anchorContext = _interopRequireDefault(require("./anchor-context"));
var _index = _interopRequireDefault(require("../typography/index"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.PREFIX;
// eslint-disable-next-line @typescript-eslint/ban-types
class Link extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.renderTitle = () => {
      const {
        href,
        title,
        disabled = false
      } = this.props;
      const {
        activeLink,
        showTooltip,
        position,
        size
      } = this.context;
      const active = activeLink === href;
      const linkTitleCls = (0, _classnames.default)(`${prefixCls}-link-tooltip`, {
        [`${prefixCls}-link-tooltip-small`]: size === 'small',
        [`${prefixCls}-link-tooltip-active`]: active,
        [`${prefixCls}-link-tooltip-disabled`]: disabled
      });
      if (showTooltip) {
        const showTooltipObj = (0, _isObject2.default)(showTooltip) ? Object.assign({
          opts: {}
        }, showTooltip) : {
          opts: {}
        };
        // The position can be set through showTooltip, here it is compatible with the position API
        if (position) {
          showTooltipObj.opts['position'] = position;
        }
        return /*#__PURE__*/_react.default.createElement(_index.default.Text, {
          size: size === 'default' ? 'normal' : 'small',
          ellipsis: {
            showTooltip: showTooltipObj
          },
          type: 'tertiary',
          className: linkTitleCls
        }, title);
      } else {
        return title;
      }
    };
    this.renderChildren = () => {
      const {
        activeLink,
        childMap
      } = this.context;
      const {
        href,
        children
      } = this.props;
      if (!this.context.autoCollapse) {
        return /*#__PURE__*/_react.default.createElement("div", {
          role: "list"
        }, children);
      }
      return activeLink === href || childMap[href] && childMap[href].has(activeLink) ? (/*#__PURE__*/_react.default.createElement("div", {
        role: "list"
      }, children)) : null;
    };
    this.foundation = new _linkFoundation.default(this.adapter);
    this.handleClick = this.handleClick.bind(this);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      addLink: href => {
        this.context.addLink(href);
      },
      removeLink: href => {
        this.context.removeLink(href);
      }
    });
  }
  handleAddLink() {
    this.foundation.handleAddLink();
  }
  handleRemoveLink() {
    this.foundation.handleRemoveLink();
  }
  handleUpdateLink(href, prevHref) {
    this.foundation.handleUpdateLink(href, prevHref);
  }
  handleClick(e) {
    const {
      disabled,
      href
    } = this.props;
    const {
      onClick
    } = this.context;
    !disabled && onClick(e, href);
  }
  componentDidMount() {
    this.handleAddLink();
  }
  componentDidUpdate(prevProps) {
    const prevHref = prevProps.href;
    const {
      href
    } = this.props;
    this.handleUpdateLink(href, prevHref);
  }
  componentWillUnmount() {
    this.handleRemoveLink();
  }
  render() {
    const {
      href,
      className,
      style,
      disabled = false,
      title,
      level,
      direction
    } = this.props;
    const {
      activeLink,
      showTooltip
    } = this.context;
    const active = activeLink === href;
    const linkCls = (0, _classnames.default)(`${prefixCls}-link`, className);
    const linkTitleCls = (0, _classnames.default)(`${prefixCls}-link-title`, {
      [`${prefixCls}-link-title-active`]: active,
      [`${prefixCls}-link-title-disabled`]: disabled
    });
    const paddingAttributeKey = direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
    const ariaProps = {
      'aria-disabled': disabled,
      style: {
        [paddingAttributeKey]: 8 * level
      }
    };
    if (active) {
      ariaProps['aria-details'] = 'active';
    }
    if (!showTooltip && typeof title === 'string') {
      ariaProps['title'] = title;
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: linkCls,
      style: style,
      role: "listitem"
    }, /*#__PURE__*/_react.default.createElement("div", Object.assign({
      role: "link",
      tabIndex: 0
    }, ariaProps, {
      className: linkTitleCls,
      onClick: e => this.handleClick(e),
      onKeyPress: e => this.handleClick(e)
    }), this.renderTitle()), this.renderChildren());
  }
}
exports.default = Link;
Link.propTypes = {
  href: _propTypes.default.string,
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  className: _propTypes.default.string,
  style: _propTypes.default.object
};
Link.defaultProps = {
  href: '#',
  title: '',
  className: ''
};
Link.contextType = _anchorContext.default;