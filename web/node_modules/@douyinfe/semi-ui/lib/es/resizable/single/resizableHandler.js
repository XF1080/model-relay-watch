import React, { createRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ResizableHandlerFoundation } from '@douyinfe/semi-foundation/lib/es/resizable/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/resizable/constants';
import BaseComponent from '../../_base/baseComponent';
const prefixCls = cssClasses.PREFIX;
class ResizableHandler extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      direction: this.props.direction
    };
    this.resizeHandlerRef = /*#__PURE__*/createRef();
    this.foundation = new ResizableHandlerFoundation(this.adapter);
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentDidUpdate(_prevProps) {}
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      registerEvent: () => {
        this.resizeHandlerRef.current.addEventListener('mousedown', this.foundation.onMouseDown);
        this.resizeHandlerRef.current.addEventListener('touchstart', this.foundation.onTouchStart);
      },
      unregisterEvent: () => {
        this.resizeHandlerRef.current.removeEventListener('mousedown', this.foundation.onMouseDown);
        this.resizeHandlerRef.current.removeEventListener('touchstart', this.foundation.onTouchStart);
      }
    });
  }
  render() {
    const {
      children,
      style,
      className
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: classNames(className, prefixCls + '-resizableHandler', prefixCls + '-resizableHandler-' + this.props.direction),
      style: Object.assign({}, style),
      ref: this.resizeHandlerRef
    }, children);
  }
}
ResizableHandler.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.string,
  onResizeStart: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.object
};
ResizableHandler.defaultProps = {};
export default ResizableHandler;