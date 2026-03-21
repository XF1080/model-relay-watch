import React, { createRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ResizableFoundation } from '@douyinfe/semi-foundation/lib/es/resizable/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/resizable/constants';
import { directions } from '@douyinfe/semi-foundation/lib/es/resizable/types';
import BaseComponent from '../../_base/baseComponent';
import ResizableHandler from './resizableHandler';
import '@douyinfe/semi-foundation/lib/es/resizable/resizable.css';
const prefixCls = cssClasses.PREFIX;
class Resizable extends BaseComponent {
  constructor(props) {
    var _a, _b;
    super(props);
    this.getResizable = () => {
      var _a;
      return (_a = this.resizableRef) === null || _a === void 0 ? void 0 : _a.current;
    };
    this.renderResizeHandler = () => {
      const {
        enable,
        handleStyle,
        handleClass,
        handleNode,
        handleWrapperStyle,
        handleWrapperClass
      } = this.props;
      if (!enable) {
        return null;
      }
      const handlers = directions.map(dir => {
        var _a;
        if (enable[dir] !== false) {
          return /*#__PURE__*/React.createElement(ResizableHandler, {
            key: dir,
            direction: dir,
            onResizeStart: this.foundation.onResizeStart,
            style: handleStyle && handleStyle[dir],
            className: handleClass && handleClass[dir]
          }, (_a = handleNode === null || handleNode === void 0 ? void 0 : handleNode[dir]) !== null && _a !== void 0 ? _a : null);
        }
        return null;
      });
      return /*#__PURE__*/React.createElement("div", {
        className: handleWrapperClass,
        style: handleWrapperStyle
      }, handlers);
    };
    this.resizableRef = /*#__PURE__*/createRef();
    this.foundation = new ResizableFoundation(this.adapter);
    this.state = {
      isResizing: false,
      width: (_a = this.foundation.propSize.width) !== null && _a !== void 0 ? _a : 'auto',
      height: (_b = this.foundation.propSize.height) !== null && _b !== void 0 ? _b : 'auto',
      direction: 'right',
      original: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      backgroundStyle: {
        cursor: 'auto'
      },
      flexBasis: undefined
    };
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentDidUpdate(_prevProps) {}
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    var _this = this;
    return Object.assign(Object.assign({}, super.adapter), {
      getResizable: this.getResizable,
      registerEvent: function () {
        let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mouse';
        let window = _this.foundation.window;
        if (type === 'mouse') {
          window === null || window === void 0 ? void 0 : window.addEventListener('mouseup', _this.foundation.onMouseUp);
          window === null || window === void 0 ? void 0 : window.addEventListener('mousemove', _this.foundation.onMouseMove);
          window === null || window === void 0 ? void 0 : window.addEventListener('mouseleave', _this.foundation.onMouseUp);
        } else {
          window === null || window === void 0 ? void 0 : window.addEventListener('touchmove', _this.foundation.onTouchMove, {
            passive: false
          });
          window === null || window === void 0 ? void 0 : window.addEventListener('touchend', _this.foundation.onMouseUp);
          window === null || window === void 0 ? void 0 : window.addEventListener('touchcancel', _this.foundation.onMouseUp);
        }
      },
      unregisterEvent: function () {
        let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mouse';
        let window = _this.foundation.window;
        if (type === 'mouse') {
          window === null || window === void 0 ? void 0 : window.removeEventListener('mouseup', _this.foundation.onMouseUp);
          window === null || window === void 0 ? void 0 : window.removeEventListener('mousemove', _this.foundation.onMouseMove);
          window === null || window === void 0 ? void 0 : window.removeEventListener('mouseleave', _this.foundation.onMouseUp);
        } else {
          window === null || window === void 0 ? void 0 : window.removeEventListener('touchmove', _this.foundation.onTouchMove, {
            passive: false
          });
          window === null || window === void 0 ? void 0 : window.removeEventListener('touchend', _this.foundation.onMouseUp);
          window === null || window === void 0 ? void 0 : window.removeEventListener('touchcancel', _this.foundation.onMouseUp);
        }
      }
    });
  }
  render() {
    var _a;
    const {
      className,
      style,
      children,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth
    } = this.props;
    const resizeStyle = Object.assign(Object.assign({
      userSelect: this.state.isResizing ? 'none' : 'auto',
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      minWidth: minWidth,
      minHeight: minHeight
    }, style), this.foundation.sizeStyle);
    if ((_a = this.state) === null || _a === void 0 ? void 0 : _a.flexBasis) {
      style.flexBasis = this.state.flexBasis;
    }
    return /*#__PURE__*/React.createElement("div", Object.assign({
      style: resizeStyle,
      className: classNames(className, prefixCls + '-resizable'),
      ref: this.resizableRef
    }, this.getDataAttr(this.props)), this.state.isResizing && /*#__PURE__*/React.createElement("div", {
      style: this.state.backgroundStyle,
      className: classNames(className, prefixCls + '-background')
    }), children, this.renderResizeHandler());
  }
}
Resizable.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  grid: PropTypes.arrayOf(PropTypes.number),
  snap: PropTypes.shape({
    x: PropTypes.arrayOf(PropTypes.number),
    y: PropTypes.arrayOf(PropTypes.number)
  }),
  snapGap: PropTypes.number,
  bounds: PropTypes.oneOf(['parent', 'window', PropTypes.node]),
  boundsByDirection: PropTypes.bool,
  size: PropTypes.object,
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lockAspectRatio: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  lockAspectRatioExtraWidth: PropTypes.number,
  lockAspectRatioExtraHeight: PropTypes.number,
  enable: PropTypes.object,
  handleStyle: PropTypes.object,
  handleClass: PropTypes.object,
  handleWrapperStyle: PropTypes.object,
  handleWrapperClass: PropTypes.string,
  handleNode: PropTypes.object,
  children: PropTypes.object,
  onResizeStart: PropTypes.func,
  onChange: PropTypes.func,
  onResizeEnd: PropTypes.func,
  defaultSize: PropTypes.object,
  scale: PropTypes.number,
  ratio: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)])
};
Resizable.defaultProps = {
  onResizeStart: () => {},
  onChange: () => {},
  onResizeEnd: () => {},
  enable: {
    top: true,
    right: true,
    bottom: true,
    left: true,
    topRight: true,
    bottomRight: true,
    bottomLeft: true,
    topLeft: true
  },
  style: {},
  grid: [1, 1],
  lockAspectRatio: false,
  lockAspectRatioExtraWidth: 0,
  lockAspectRatioExtraHeight: 0,
  scale: 1,
  ratio: 1,
  snapGap: 0
};
export default Resizable;