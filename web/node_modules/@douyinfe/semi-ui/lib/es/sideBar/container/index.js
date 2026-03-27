import React from 'react';
import cls from 'classnames';
import CSSAnimation from '../../_cssAnimation';
import Resizable from '../../resizable/single/resizable';
import { IconClose } from '@douyinfe/semi-icons';
import { Button } from '../../index';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/sidebar/constants';
import BaseComponent from '../../_base/baseComponent';
import PropTypes from 'prop-types';
import '@douyinfe/semi-foundation/lib/es/sidebar/sidebar.css';
import ContainerFoundation from '@douyinfe/semi-foundation/lib/es/sidebar/containerFoundation';
const prefixCls = cssClasses.SIDEBAR;
class Container extends BaseComponent {
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
      return /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-container-header`
      }, /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-container-header-title`
      }, title), showClose && /*#__PURE__*/React.createElement(Button, {
        className: `${prefixCls}-container-header-closeBtn`,
        icon: /*#__PURE__*/React.createElement(IconClose, null),
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
      return /*#__PURE__*/React.createElement("div", Object.assign({
        className: cls(`${prefixCls}-container`, {
          [className]: className,
          [animationClassName]: animationClassName
        }),
        ref: containerRef,
        style: Object.assign(Object.assign({}, style), animationStyle)
      }, animationEventsNeedBind), (_a = this.renderHeader) === null || _a === void 0 ? void 0 : _a.call(this), /*#__PURE__*/React.createElement("div", {
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
      return /*#__PURE__*/React.createElement(CSSAnimation, {
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
        return shouldRender ? resizable ? /*#__PURE__*/React.createElement(Resizable, {
          enable: strings.DIRECTION,
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
        }) : /*#__PURE__*/React.createElement(React.Fragment, null);
      });
    };
    this.state = {
      displayNone: !props.visible
    };
    this.foundation = new ContainerFoundation(this.adapter);
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
  title: PropTypes.node,
  style: PropTypes.object,
  visible: PropTypes.bool,
  motion: PropTypes.bool,
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onCancel: PropTypes.func,
  afterVisibleChange: PropTypes.func,
  resizable: PropTypes.bool,
  defaultSize: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  renderHeader: PropTypes.func,
  showClose: PropTypes.bool
};
Container.__SemiComponentName__ = "Sidebar.Container";
Container.defaultProps = {
  motion: true,
  minWidth: 150,
  showClose: true,
  resizable: true
};
export default Container;