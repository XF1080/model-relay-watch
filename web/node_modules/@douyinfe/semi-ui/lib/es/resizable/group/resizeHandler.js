import React, { createRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ResizeHandlerFoundation } from '@douyinfe/semi-foundation/lib/es/resizable/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/resizable/constants';
import BaseComponent from '../../_base/baseComponent';
import { ResizeContext } from './resizeContext';
import { IconHandle } from '@douyinfe/semi-icons';
const prefixCls = cssClasses.PREFIX;
class ResizeHandler extends BaseComponent {
  constructor(props) {
    super(props);
    this.onMouseDown = e => {
      const {
        notifyResizeStart
      } = this.context;
      notifyResizeStart(this.handlerIndex, e, 'mouse');
    };
    this.onTouchStart = e => {
      const {
        notifyResizeStart
      } = this.context;
      notifyResizeStart(this.handlerIndex, e.targetTouches[0], 'touch');
    };
    this.getHandler = () => {
      return this.handlerRef.current;
    };
    this.state = {};
    this.handlerRef = /*#__PURE__*/createRef();
    this.foundation = new ResizeHandlerFoundation(this.adapter);
    this.handlerIndex = -1;
  }
  componentDidMount() {
    this.foundation.init();
    if (this.handlerIndex === -1) {
      this.handlerIndex = this.context.registerHandler(this.handlerRef);
    }
  }
  componentDidUpdate(_prevProps) {}
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      registerEvents: () => {
        this.handlerRef.current.addEventListener('mousedown', this.onMouseDown);
        this.handlerRef.current.addEventListener('touchstart', this.onTouchStart);
      },
      unregisterEvents: () => {
        this.handlerRef.current.removeEventListener('mousedown', this.onMouseDown);
        this.handlerRef.current.removeEventListener('touchstart', this.onTouchStart);
      }
    });
  }
  render() {
    const {
      style,
      className,
      children
    } = this.props;
    const {
      direction
    } = this.context;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames(className, prefixCls + '-handler', prefixCls + '-handler-' + direction),
      style: style,
      ref: this.handlerRef
    }, children !== null && children !== void 0 ? children : /*#__PURE__*/React.createElement(IconHandle, {
      size: 'inherit',
      style: {
        rotate: this.context.direction === 'horizontal' ? '0deg' : '90deg'
      }
    }));
  }
}
ResizeHandler.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.string,
  onResizeStart: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object
};
ResizeHandler.defaultProps = {};
ResizeHandler.contextType = ResizeContext;
export default ResizeHandler;