import _noop from "lodash/noop";
import React, { createRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ResizeItemFoundation } from '@douyinfe/semi-foundation/lib/es/resizable/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/resizable/constants';
import BaseComponent from '../../_base/baseComponent';
import { ResizeContext } from './resizeContext';
const prefixCls = cssClasses.PREFIX;
class ResizeItem extends BaseComponent {
  constructor(props) {
    super(props);
    this.itemRef = /*#__PURE__*/createRef();
    this.foundation = new ResizeItemFoundation(this.adapter);
    this.state = {
      isResizing: false
    };
    this.itemIndex = -1;
  }
  componentDidMount() {
    this.foundation.init();
    const {
      min,
      max,
      onResizeStart,
      onChange,
      onResizeEnd,
      defaultSize
    } = this.props;
    if (this.itemIndex === -1) {
      // 开发过程在StrictMode下context方法会执行两次，需要判断一下是否已经注册过
      this.itemIndex = this.context.registerItem(this.itemRef, min, max, defaultSize, onResizeStart, onChange, onResizeEnd);
    }
    this.direction = this.context.direction; // 留一个direction的引用，方便在componentDidUpdate中判断方向是否有变化
  }
  componentDidUpdate(_prevProps) {
    var _a, _b;
    // 支持动态方向，修改item的style
    if (this.context.direction !== this.direction) {
      this.direction = this.context.direction;
      if (this.direction === 'horizontal') {
        const newWidth = (_a = this.itemRef.current) === null || _a === void 0 ? void 0 : _a.style.height;
        this.itemRef.current.style.width = newWidth;
        this.itemRef.current.style.removeProperty('height');
      } else {
        const newHeight = (_b = this.itemRef.current) === null || _b === void 0 ? void 0 : _b.style.width;
        this.itemRef.current.style.height = newHeight;
        this.itemRef.current.style.removeProperty('width');
      }
    }
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    return Object.assign({}, super.adapter);
  }
  render() {
    const style = Object.assign({}, this.props.style);
    return /*#__PURE__*/React.createElement("div", {
      style: style,
      className: classNames(this.props.className, prefixCls + '-item'),
      ref: this.itemRef
    }, this.props.children);
  }
}
ResizeItem.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  children: PropTypes.object,
  onResizeStart: PropTypes.func,
  onChange: PropTypes.func,
  onResizeEnd: PropTypes.func,
  defaultSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
ResizeItem.defaultProps = {
  onResizeStart: _noop,
  onChange: _noop,
  onResizeEnd: _noop
};
ResizeItem.contextType = ResizeContext;
export default ResizeItem;