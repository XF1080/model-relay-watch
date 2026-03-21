"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _iconButton = _interopRequireDefault(require("../iconButton"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/banner/constants");
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/banner/foundation"));
require("@douyinfe/semi-foundation/lib/cjs/banner/banner.css");
var _typography = _interopRequireDefault(require("../typography"));
var _semiIcons = require("@douyinfe/semi-icons");
var _warning = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/warning"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.PREFIX;
const types = _constants.strings.TYPE;
class Banner extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.remove = e => {
      e && e.stopPropagation();
      this.foundation.removeBanner(e);
    };
    this.state = {
      visible: true
    };
    (0, _warning.default)('target' in this.props, '[Semi Banner] \'target\' has been deprecated, please write JSX directly instead.');
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
    this.foundation = new _foundation.default(this.adapter);
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
    const closer = /*#__PURE__*/_react.default.createElement(_iconButton.default, {
      className: `${prefixCls}-close`,
      onClick: this.remove,
      icon: closeIcon || /*#__PURE__*/_react.default.createElement(_semiIcons.IconClose, {
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
      warning: /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertTriangle, {
        size: "large",
        "aria-label": 'warning'
      }),
      success: /*#__PURE__*/_react.default.createElement(_semiIcons.IconTickCircle, {
        size: "large",
        "aria-label": 'success'
      }),
      info: /*#__PURE__*/_react.default.createElement(_semiIcons.IconInfoCircle, {
        size: "large",
        "aria-label": 'info'
      }),
      danger: /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertCircle, {
        size: "large",
        "aria-label": 'danger'
      })
    };
    let iconType = iconMap[type];
    const iconCls = (0, _classnames.default)({
      [`${prefixCls}-icon`]: true
      // [prefixCls + '-' + type]: true,
    });
    if (typeof icon !== 'undefined') {
      iconType = icon;
    }
    if (iconType) {
      return /*#__PURE__*/_react.default.createElement("div", {
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
    const wrapper = (0, _classnames.default)(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-full`]: fullMode,
      [`${prefixCls}-in-container`]: !fullMode,
      [`${prefixCls}-bordered`]: !fullMode && bordered
    });
    const banner = visible ? (/*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: wrapper,
      style: style,
      role: "alert"
    }, this.getDataAttr(this.props)), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-content-wrapper`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-content`
    }, this.renderIcon(), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-content-body`
    }, title ? /*#__PURE__*/_react.default.createElement(_typography.default.Title, {
      heading: 5,
      className: `${prefixCls}-title`,
      component: "div",
      "x-semi-prop": "title"
    }, title) : null, description ? /*#__PURE__*/_react.default.createElement(_typography.default.Paragraph, {
      className: `${prefixCls}-description`,
      component: "div",
      "x-semi-prop": "description"
    }, description) : null)), this.renderCloser()), children ? /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-extra`,
      "x-semi-prop": "children"
    }, children) : null)) : null;
    return banner;
  }
}
exports.default = Banner;
Banner.propTypes = {
  // target: PropTypes.func,
  fullMode: _propTypes.default.bool,
  // insertAfter: PropTypes.func,
  type: _propTypes.default.oneOf(types),
  title: _propTypes.default.node,
  description: _propTypes.default.node,
  icon: _propTypes.default.node,
  closeIcon: _propTypes.default.node,
  children: _propTypes.default.node,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  onClose: _propTypes.default.func,
  bordered: _propTypes.default.bool
};
Banner.defaultProps = {
  onClose: () => {},
  type: 'info',
  fullMode: true
};