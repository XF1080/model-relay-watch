"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _cssAnimation = _interopRequireDefault(require("../../_cssAnimation"));
var _resizable = _interopRequireDefault(require("../../resizable/single/resizable"));
var _semiIcons = require("@douyinfe/semi-icons");
var _index = require("../../index");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/sidebar/constants");
var _baseComponent = _interopRequireDefault(require("../../_base/baseComponent"));
var _propTypes = _interopRequireDefault(require("prop-types"));
require("@douyinfe/semi-foundation/lib/cjs/sidebar/sidebar.css");
var _containerFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/sidebar/containerFoundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.SIDEBAR;
class Container extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.handleKeyDown = e => {
      this.foundation.handleKeyDown(e);
    };
    this.handleCancel = e => {
      this.foundation.handleCancel(e);
    };
    this.renderHeader = () => {
      const {
        renderHeader
      } = this.props;
      const {
        onCancel,
        title,
        showClose
      } = this.props;
      const result = renderHeader === null || renderHeader === void 0 ? void 0 : renderHeader();
      if (result) {
        return result;
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-container-header`
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-container-header-title`
      }, title), showClose && /*#__PURE__*/_react.default.createElement(_index.Button, {
        className: `${prefixCls}-container-header-closeBtn`,
        icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconClose, null),
        theme: "borderless",
        type: "tertiary",
        "aria-label": "close",
        onClick: onCancel,
        size: "small"
      }));
    };
    this.innerContent = props => {
      var _a;
      const {
        animationClassName,
        animationStyle,
        animationEventsNeedBind
      } = props;
      const {
        containerRef
      } = this.props;
      const {
        children,
        style = {},
        className
      } = this.props;
      return /*#__PURE__*/_react.default.createElement("div", Object.assign({
        className: (0, _classnames.default)(`${prefixCls}-container`, {
          [className]: className,
          [animationClassName]: animationClassName
        }),
        ref: containerRef,
        style: Object.assign(Object.assign({}, style), animationStyle)
      }, animationEventsNeedBind), (_a = this.renderHeader) === null || _a === void 0 ? void 0 : _a.call(this), /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-container-content`
      }, children));
    };
    this.renderContent = () => {
      const {
        visible,
        resizable,
        minWidth,
        maxWidth,
        motion,
        defaultSize
      } = this.props;
      // const shouldRender = (this.props.visible || this.props.keepDOM) || (this.props.motion && !this.state.displayNone;
      const shouldRender = this.props.visible || this.props.motion && !this.state.displayNone;
      return /*#__PURE__*/_react.default.createElement(_cssAnimation.default, {
        startClassName: visible ? `${prefixCls}-animation-content_show` : `${prefixCls}-animation-content_hide`,
        animationState: visible ? 'enter' : 'leave',
        motion: motion,
        onAnimationEnd: this.foundation.handleAnimationEnd
      }, _ref => {
        let {
          animationClassName,
          animationStyle,
          animationEventsNeedBind
        } = _ref;
        return shouldRender ? resizable ? /*#__PURE__*/_react.default.createElement(_resizable.default, {
          enable: _constants.strings.DIRECTION,
          minWidth: minWidth,
          defaultSize: defaultSize,
          maxWidth: maxWidth
        }, this.innerContent({
          animationClassName,
          animationStyle,
          animationEventsNeedBind
        })) : this.innerContent({
          animationClassName,
          animationStyle,
          animationEventsNeedBind
        }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
      });
    };
    this.state = {
      displayNone: !props.visible
    };
    this.foundation = new _containerFoundation.default(this.adapter);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      notifyCancel: e => {
        this.props.onCancel && this.props.onCancel(e);
      },
      notifyVisibleChange: visible => {
        var _a, _b;
        (_b = (_a = this.props).afterVisibleChange) === null || _b === void 0 ? void 0 : _b.call(_a, visible);
      },
      setOnKeyDownListener: () => {
        if (typeof window !== 'undefined') {
          window.addEventListener('keydown', this.handleKeyDown);
        }
      },
      removeKeyDownListener: () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('keydown', this.handleKeyDown);
        }
      },
      toggleDisplayNone: displayNone => {
        if (displayNone !== this.state.displayNone) {
          this.setState({
            displayNone: displayNone
          });
        }
      }
    });
  }
  static getDerivedStateFromProps(props, prevState) {
    const newState = {};
    if (props.visible && prevState.displayNone) {
      newState.displayNone = false;
    }
    return newState;
  }
  componentDidMount() {
    if (this.props.visible) {
      this.foundation.beforeShow();
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // hide => show
    if (!prevProps.visible && this.props.visible) {
      this.foundation.beforeShow();
    }
    if (!prevState.displayNone && this.state.displayNone) {
      this.foundation.afterHide();
    }
  }
  componentWillUnmount() {
    if (this.props.visible) {
      this.foundation.destroy();
    }
  }
  render() {
    return this.renderContent();
  }
}
Container.propTypes = {
  title: _propTypes.default.node,
  style: _propTypes.default.object,
  visible: _propTypes.default.bool,
  motion: _propTypes.default.bool,
  minWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  maxWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  onCancel: _propTypes.default.func,
  afterVisibleChange: _propTypes.default.func,
  resizable: _propTypes.default.bool,
  defaultSize: _propTypes.default.object,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  renderHeader: _propTypes.default.func,
  showClose: _propTypes.default.bool
};
Container.__SemiComponentName__ = "Sidebar.Container";
Container.defaultProps = {
  motion: true,
  minWidth: 150,
  showClose: true,
  resizable: true
};
var _default = exports.default = Container;