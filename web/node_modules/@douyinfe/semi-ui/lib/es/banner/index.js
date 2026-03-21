import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import Button from '../iconButton';
import { strings, cssClasses } from '@douyinfe/semi-foundation/lib/es/banner/constants';
import BannerFoundation from '@douyinfe/semi-foundation/lib/es/banner/foundation';
import '@douyinfe/semi-foundation/lib/es/banner/banner.css';
import Typography from '../typography';
import { IconClose, IconAlertTriangle, IconInfoCircle, IconTickCircle, IconAlertCircle } from '@douyinfe/semi-icons';
import warning from '@douyinfe/semi-foundation/lib/es/utils/warning';
import BaseComponent from '../_base/baseComponent';
const prefixCls = cssClasses.PREFIX;
const types = strings.TYPE;
export default class Banner extends BaseComponent {
  constructor(props) {
    super(props);
    this.remove = e => {
      e && e.stopPropagation();
      this.foundation.removeBanner(e);
    };
    this.state = {
      visible: true
    };
    warning('target' in this.props, '[Semi Banner] \'target\' has been deprecated, please write JSX directly instead.');
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setVisible: () => {
        this.setState({
          visible: false
        });
      },
      notifyClose: e => {
        const {
          onClose
        } = this.props;
        onClose(e);
      }
    });
  }
  componentDidMount() {
    this.foundation = new BannerFoundation(this.adapter);
    this.foundation.init();
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  renderCloser() {
    const {
      closeIcon
    } = this.props;
    if (closeIcon === null) {
      return closeIcon;
    }
    const closer = /*#__PURE__*/React.createElement(Button, {
      className: `${prefixCls}-close`,
      onClick: this.remove,
      icon: closeIcon || /*#__PURE__*/React.createElement(IconClose, {
        "x-semi-prop": "closeIcon",
        "aria-hidden": true
      }),
      theme: "borderless",
      size: "small",
      type: "tertiary",
      "aria-label": 'Close'
    });
    return closer;
  }
  renderIcon() {
    const {
      type,
      icon
    } = this.props;
    const iconMap = {
      warning: /*#__PURE__*/React.createElement(IconAlertTriangle, {
        size: "large",
        "aria-label": 'warning'
      }),
      success: /*#__PURE__*/React.createElement(IconTickCircle, {
        size: "large",
        "aria-label": 'success'
      }),
      info: /*#__PURE__*/React.createElement(IconInfoCircle, {
        size: "large",
        "aria-label": 'info'
      }),
      danger: /*#__PURE__*/React.createElement(IconAlertCircle, {
        size: "large",
        "aria-label": 'danger'
      })
    };
    let iconType = iconMap[type];
    const iconCls = cls({
      [`${prefixCls}-icon`]: true
      // [prefixCls + '-' + type]: true,
    });
    if (typeof icon !== 'undefined') {
      iconType = icon;
    }
    if (iconType) {
      return /*#__PURE__*/React.createElement("div", {
        className: iconCls,
        "x-semi-prop": "icon"
      }, iconType);
    }
    return null;
  }
  render() {
    const {
      children,
      type,
      className,
      style,
      bordered,
      title,
      description,
      fullMode
    } = this.props;
    const {
      visible
    } = this.state;
    const wrapper = cls(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-full`]: fullMode,
      [`${prefixCls}-in-container`]: !fullMode,
      [`${prefixCls}-bordered`]: !fullMode && bordered
    });
    const banner = visible ? (/*#__PURE__*/React.createElement("div", Object.assign({
      className: wrapper,
      style: style,
      role: "alert"
    }, this.getDataAttr(this.props)), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-content-wrapper`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-content`
    }, this.renderIcon(), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-content-body`
    }, title ? /*#__PURE__*/React.createElement(Typography.Title, {
      heading: 5,
      className: `${prefixCls}-title`,
      component: "div",
      "x-semi-prop": "title"
    }, title) : null, description ? /*#__PURE__*/React.createElement(Typography.Paragraph, {
      className: `${prefixCls}-description`,
      component: "div",
      "x-semi-prop": "description"
    }, description) : null)), this.renderCloser()), children ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-extra`,
      "x-semi-prop": "children"
    }, children) : null)) : null;
    return banner;
  }
}
Banner.propTypes = {
  // target: PropTypes.func,
  fullMode: PropTypes.bool,
  // insertAfter: PropTypes.func,
  type: PropTypes.oneOf(types),
  title: PropTypes.node,
  description: PropTypes.node,
  icon: PropTypes.node,
  closeIcon: PropTypes.node,
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  onClose: PropTypes.func,
  bordered: PropTypes.bool
};
Banner.defaultProps = {
  onClose: () => {},
  type: 'info',
  fullMode: true
};