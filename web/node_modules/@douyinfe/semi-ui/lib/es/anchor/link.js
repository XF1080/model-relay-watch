import _isObject from "lodash/isObject";
import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import BaseComponent from '../_base/baseComponent';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/anchor/constants';
import LinkFoundation from '@douyinfe/semi-foundation/lib/es/anchor/linkFoundation';
import AnchorContext from './anchor-context';
import Typography from '../typography/index';
const prefixCls = cssClasses.PREFIX;
// eslint-disable-next-line @typescript-eslint/ban-types
export default class Link extends BaseComponent {
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
      const linkTitleCls = cls(`${prefixCls}-link-tooltip`, {
        [`${prefixCls}-link-tooltip-small`]: size === 'small',
        [`${prefixCls}-link-tooltip-active`]: active,
        [`${prefixCls}-link-tooltip-disabled`]: disabled
      });
      if (showTooltip) {
        const showTooltipObj = _isObject(showTooltip) ? Object.assign({
          opts: {}
        }, showTooltip) : {
          opts: {}
        };
        // The position can be set through showTooltip, here it is compatible with the position API
        if (position) {
          showTooltipObj.opts['position'] = position;
        }
        return /*#__PURE__*/React.createElement(Typography.Text, {
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
        return /*#__PURE__*/React.createElement("div", {
          role: "list"
        }, children);
      }
      return activeLink === href || childMap[href] && childMap[href].has(activeLink) ? (/*#__PURE__*/React.createElement("div", {
        role: "list"
      }, children)) : null;
    };
    this.foundation = new LinkFoundation(this.adapter);
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
    const linkCls = cls(`${prefixCls}-link`, className);
    const linkTitleCls = cls(`${prefixCls}-link-title`, {
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
    return /*#__PURE__*/React.createElement("div", {
      className: linkCls,
      style: style,
      role: "listitem"
    }, /*#__PURE__*/React.createElement("div", Object.assign({
      role: "link",
      tabIndex: 0
    }, ariaProps, {
      className: linkTitleCls,
      onClick: e => this.handleClick(e),
      onKeyPress: e => this.handleClick(e)
    }), this.renderTitle()), this.renderChildren());
  }
}
Link.propTypes = {
  href: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  style: PropTypes.object
};
Link.defaultProps = {
  href: '#',
  title: '',
  className: ''
};
Link.contextType = AnchorContext;